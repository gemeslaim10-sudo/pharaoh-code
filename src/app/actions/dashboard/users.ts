'use server';

import { authenticateAdmin, authenticateUser } from './auth';

import { admin } from '@/lib/firebase/admin';
import { fetchAllUsersAndStats } from './usersFetchers';

/**
 * Record or update user profile upon login
 */
export async function recordUserLoginAction(token: string) {
  try {
    const verified = await authenticateUser(token);
    const account = await admin.auth().getUser(verified.uid);
    if (!account.email) return { success: false };
    const userData = {
      uid: account.uid,
      email: account.email,
      displayName: account.displayName,
      photoURL: account.photoURL,
      provider: verified.firebase.sign_in_provider,
    };
    const db = admin.firestore();
    const userRef = db.collection('users').doc(userData.uid);
    const doc = await userRef.get();
    const now = admin.firestore.FieldValue.serverTimestamp();

    if (!doc.exists) {
      await userRef.set({
        uid: userData.uid,
        email: userData.email.toLowerCase(),
        displayName: userData.displayName || userData.email.split('@')[0],
        photoURL: userData.photoURL || '',
        provider: userData.provider || 'google',
        createdAt: now,
        lastLoginAt: now,
      });
    } else {
      await userRef.update({
        email: userData.email.toLowerCase(),
        displayName: userData.displayName || doc.data()?.displayName || userData.email.split('@')[0],
        photoURL: userData.photoURL || doc.data()?.photoURL || '',
        provider: userData.provider || doc.data()?.provider || 'google',
        lastLoginAt: now,
      });
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("Error recording user login:", error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: message };
  }
}

/**
 * Get all registered / logged-in users with admin badges and statistics
 */
export async function getRegisteredUsersAction(token: string) {
  return fetchAllUsersAndStats(token);
}

/**
 * Delete a registered user record (Dashboard Admin only)
 */
export async function deleteRegisteredUserAction(token: string, userId: string) {
  try {
    await authenticateAdmin(token);

    const db = admin.firestore();
    const doc = await db.collection('users').doc(userId).get();
    const targetUid = (doc.data()?.uid as string | undefined) || userId;

    // Remove the Firebase Auth account as well, otherwise the user simply reappears on next login.
    try {
      await admin.auth().deleteUser(targetUid);
    } catch (authError: any) {
      if (authError?.code !== 'auth/user-not-found') throw authError;
    }
    await db.collection('users').doc(userId).delete();

    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to delete registered user:", error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: message };
  }
}
