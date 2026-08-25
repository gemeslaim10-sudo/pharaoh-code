'use server';

import { db, serializeData } from '@/lib/firebase/admin';
import { authenticateAdmin } from './auth';
import { CreativityType } from '@/types/creativity';
import { revalidatePath } from 'next/cache';

export async function addCreativityItem(idToken: string, type: CreativityType, data: any) {
  await authenticateAdmin(idToken);

  try {
    const docRef = db.collection(type).doc();
    await docRef.set({
      ...data,
      createdAt: new Date().toISOString()
    });

    revalidatePath('/');
    revalidatePath('/portfolio');
    revalidatePath('/dashboard/creativity');

    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error(`Error adding to ${type}:`, error);
    throw new Error(error.message || `Failed to add ${type} item`);
  }
}

export async function deleteCreativityItem(idToken: string, type: CreativityType, id: string) {
  await authenticateAdmin(idToken);

  try {
    await db.collection(type).doc(id).delete();

    revalidatePath('/');
    revalidatePath('/portfolio');
    revalidatePath('/dashboard/creativity');

    return { success: true };
  } catch (error: any) {
    console.error(`Error deleting from ${type}:`, error);
    throw new Error(error.message || `Failed to delete ${type} item`);
  }
}

export async function getCreativityItems(idToken: string, type: CreativityType) {
  await authenticateAdmin(idToken);

  try {
    const snapshot = await db.collection(type).orderBy('createdAt', 'desc').get();
    if (snapshot.empty) return [];

    return snapshot.docs.map(doc => serializeData({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error: any) {
    console.error(`Error fetching ${type}:`, error);
    throw new Error(error.message || `Failed to fetch ${type} items`);
  }
}
