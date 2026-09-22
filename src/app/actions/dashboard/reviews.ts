'use server';

import { db, serializeData } from '@/lib/firebase/admin';
import { authenticateAdmin } from './auth';
import { revalidateSite } from '@/lib/revalidateSite';

export async function getReviews(idToken: string) {
  await authenticateAdmin(idToken);

  try {
    const snapshot = await db.collection('reviews').orderBy('date', 'desc').get();
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map(doc => serializeData({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch reviews.');
  }
}

export async function approveReview(idToken: string, reviewId: string) {
  await authenticateAdmin(idToken);

  try {
    await db.collection('reviews').doc(reviewId).update({ status: 'approved' });
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error('Error approving review:', error);
    throw new Error('Failed to approve review.');
  }
}

export async function deleteReview(idToken: string, reviewId: string) {
  await authenticateAdmin(idToken);

  try {
    await db.collection('reviews').doc(reviewId).delete();
    revalidateSite();
    return { success: true };
  } catch (error) {
    console.error('Error deleting review:', error);
    throw new Error('Failed to delete review.');
  }
}
