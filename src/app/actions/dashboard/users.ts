'use server';

import { admin } from '@/lib/firebase/admin';
import { fetchAllUsersAndStats } from './usersFetchers';

/**
 * Record or update user profile upon login
 */
export async function recordUserLoginAction(userData: {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  provider?: string;
}) {
  if (!userData?.uid || !userData?.email) return { success: false };

  try {
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
export async function getRegisteredUsersAction() {
  return fetchAllUsersAndStats();
}

/**
 * Delete a registered user record (Dashboard Admin only)
 */
export async function deleteRegisteredUserAction(token: string, userId: string) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) throw new Error('غير مصرح لك بتنفيذ هذه العملية');

    const db = admin.firestore();
    await db.collection('users').doc(userId).delete();

    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to delete registered user:", error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: message };
  }
}
