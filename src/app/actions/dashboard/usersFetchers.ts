import { admin, serializeData } from '@/lib/firebase/admin';
import { RegisteredUser, UsersFetchStats } from '@/types/user';

export async function fetchAllUsersAndStats(): Promise<{
  success: boolean;
  users: RegisteredUser[];
  stats: UsersFetchStats;
  error?: string;
}> {
  try {
    const db = admin.firestore();
    
    // Fetch users & admins concurrently
    const [usersSnap, adminsSnap] = await Promise.all([
      db.collection('users').get(),
      db.collection('admins').get().catch(() => ({ docs: [] })),
    ]);

    const adminEmails = new Set(
      adminsSnap.docs.map((doc) => {
        const data = doc.data() as { email?: string };
        return (data.email || '').toLowerCase().trim();
      })
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

    const totalUsers = users.length;
    const adminCount = users.filter((u) => u.isAdmin).length;
    const now = Date.now();
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    const activeRecentCount = users.filter((u) => {
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
  } catch (error: unknown) {
    console.error("Failed to get registered users:", error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      users: [],
      stats: {
        totalUsers: 0,
        adminCount: 0,
        memberCount: 0,
        activeRecentCount: 0,
      },
      error: message,
    };
  }
}
