'use server';

import { db } from '@/lib/firebase/admin';
import { authenticateAdmin } from './auth';

export async function updateOrderStatus(idToken: string, orderId: string, status: string) {
  await authenticateAdmin(idToken);

  try {
    await db.collection('orders').doc(orderId).update({ status });
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
