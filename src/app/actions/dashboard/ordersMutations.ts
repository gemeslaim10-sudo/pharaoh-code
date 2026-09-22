'use server';

import { db } from '@/lib/firebase/admin';
import { authenticateAdmin } from './auth';

export async function updateOrderStatus(idToken: string, orderId: string, status: string, extra?: { rejectReason?: string }) {
  await authenticateAdmin(idToken);
  const allowedStatuses = ['pending', 'contacted', 'active', 'completed', 'rejected'];
  if (!allowedStatuses.includes(status)) throw new Error('Invalid order status.');

  try {
    const update: Record<string, unknown> = { status, statusUpdatedAt: new Date().toISOString() };
    if (status === 'rejected') update.rejectReason = (extra?.rejectReason || '').toString().trim().slice(0, 500);
    await db.collection('orders').doc(orderId).update(update);
    return { success: true };
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status.');
  }
}

export async function deleteOrder(idToken: string, orderId: string) {
  await authenticateAdmin(idToken);

  try {
    await db.collection('orders').doc(orderId).delete();
    return { success: true };
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new Error('Failed to delete order.');
  }
}
