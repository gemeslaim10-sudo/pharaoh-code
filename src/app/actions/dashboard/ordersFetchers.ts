'use server';

import { db, serializeData } from '@/lib/firebase/admin';
import { authenticateAdmin } from './auth';

export async function getRecentOrders(idToken: string) {
  await authenticateAdmin(idToken);

  try {
    const snapshot = await db.collection('orders').orderBy('date', 'desc').limit(10).get();
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map(doc => serializeData({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    throw new Error('Failed to fetch recent orders.');
  }
}

export async function getProjectRequests(idToken: string) {
  await authenticateAdmin(idToken);

  try {
    const snapshot = await db.collection('orders')
      .where('type', '==', 'project_request')
      .orderBy('createdAt', 'desc')
      .get();
      
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map(doc => serializeData({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error: any) {
    console.error('Error fetching project requests:', error);
    throw new Error(error.message || 'Failed to fetch project requests.');
  }
}
