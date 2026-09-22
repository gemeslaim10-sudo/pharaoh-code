'use server';

import { db, serializeData } from '@/lib/firebase/admin';
import { authenticateAdmin } from './auth';

export async function getRecentNotifications(idToken: string) {
  await authenticateAdmin(idToken);

  try {
    const snapshot = await db.collection('notifications')
                             .orderBy('createdAt', 'desc')
                             .limit(6)
                             .get();

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map(doc => serializeData({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching and cleaning notifications:', error);
    throw new Error('Failed to fetch notifications.');
  }
}
