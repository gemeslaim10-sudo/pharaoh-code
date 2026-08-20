'use server';

import { admin, serializeData } from '@/lib/firebase/admin';

export interface RegisteredUser {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isAdmin?: boolean;
  createdAt?: string | null;
  lastLoginAt?: string | null;
  provider?: string;
}

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
  } catch (error: any) {
    console.error("Error recording user login:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Get all registered / logged-in users with admin badges and statistics
 */
export async function getRegisteredUsersAction() {
  try {
    const db = admin.firestore();
    
    // Fetch users & admins concurrently
    const [usersSnap, adminsSnap] = await Promise.all([
      db.collection('users').get(),
      db.collection('admins').get().catch(() => ({ docs: [] } as any)),
    ]);

    const adminEmails = new Set(
      adminsSnap.docs.map((doc: any) => (doc.data().email || '').toLowerCase().trim())
    );

    const users: RegisteredUser[] = usersSnap.docs.map((doc) => {
      const data = doc.data();
      const email = (data.email || '').toLowerCase().trim();
      const isAdmin = adminEmails.has(email);

      return serializeData({
        id: doc.id,
        uid: data.uid || doc.id,
        email: data.email || '',
        displayName: data.displayName || data.name || data.email?.split('@')[0] || 'مستخدم',
        photoURL: data.photoURL || data.image || '',
        isAdmin,
        createdAt: data.createdAt ? new Date(data.createdAt._seconds * 1000).toISOString() : null,
        lastLoginAt: data.lastLoginAt ? new Date(data.lastLoginAt._seconds * 1000).toISOString() : null,
        provider: data.provider || 'google',
      });
    });

    // Sort users by lastLoginAt or createdAt descending
    users.sort((a, b) => {
      const timeA = a.lastLoginAt ? new Date(a.lastLoginAt).getTime() : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
      const timeB = b.lastLoginAt ? new Date(b.lastLoginAt).getTime() : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
      return timeB - timeA;
    });

    // Compute metrics
    const totalUsers = users.length;
    const adminCount = users.filter(u => u.isAdmin).length;
    const now = Date.now();
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    const activeRecentCount = users.filter(u => {
      if (!u.lastLoginAt) return false;
      return now - new Date(u.lastLoginAt).getTime() <= thirtyDaysMs;
    }).length;

    return {
      success: true,
      users,
      stats: {
        totalUsers,
        adminCount,
        memberCount: totalUsers - adminCount,
        activeRecentCount,
      },
    };
  } catch (error: any) {
    console.error("Failed to get registered users:", error);
    return {
      success: false,
      users: [],
      stats: {
        totalUsers: 0,
        adminCount: 0,
        memberCount: 0,
        activeRecentCount: 0,
      },
      error: error.message,
    };
  }
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
  } catch (error: any) {
    console.error("Failed to delete registered user:", error);
    return { success: false, error: error.message };
  }
}
