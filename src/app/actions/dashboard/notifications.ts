'use server';

import { db, serializeData } from '@/lib/firebase/admin';
import { authenticateAdmin } from './auth';

export async function getRecentNotifications(idToken: string) {
  await authenticateAdmin(idToken);

  try {
    const snapshot = await db.collection('notifications')
                             .orderBy('createdAt', 'desc')
                             .get();

    if (snapshot.empty) {
      return [];
    }

    const docs = snapshot.docs;
    
    if (docs.length > 6) {
        const toDelete = docs.slice(6);
        for (let i = 0; i < toDelete.length; i += 500) {
            const batch = db.batch();
            const chunk = toDelete.slice(i, i + 500);
            chunk.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
        }
    }

    return docs.slice(0, 6).map(doc => serializeData({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching and cleaning notifications:', error);
    throw new Error('Failed to fetch notifications.');
  }
}
