'use server';

import { db, serializeData } from '@/lib/firebase/admin';
import { authenticateAdmin } from './auth';
import { type CreativityType } from '@/types/creativity';
import { revalidateSite } from '@/lib/revalidateSite';

function validateType(type: CreativityType) {
  if (!['portfolio', 'philosophy', 'services'].includes(type)) {
    throw new Error('Invalid collection');
  }
}

export async function addCreativityItem(idToken: string, type: CreativityType, data: any) {
  await authenticateAdmin(idToken);
  validateType(type);

  try {
    const docRef = db.collection(type).doc();
    await docRef.set({
      ...data,
      createdAt: new Date().toISOString()
    });

    revalidateSite();

    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error(`Error adding to ${type}:`, error);
    throw new Error(error.message || `Failed to add ${type} item`);
  }
}

export async function updateCreativityItem(idToken: string, type: CreativityType, id: string, data: any) {
  await authenticateAdmin(idToken);
  validateType(type);

  try {
    await db.collection(type).doc(id).set({
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    revalidateSite();

    return { success: true };
  } catch (error: any) {
    console.error(`Error updating ${type}:`, error);
    throw new Error(error.message || `Failed to update ${type} item`);
  }
}

export async function deleteCreativityItem(idToken: string, type: CreativityType, id: string) {
  await authenticateAdmin(idToken);
  validateType(type);

  try {
    await db.collection(type).doc(id).delete();

    revalidateSite();

    return { success: true };
  } catch (error: any) {
    console.error(`Error deleting from ${type}:`, error);
    throw new Error(error.message || `Failed to delete ${type} item`);
  }
}

export async function getCreativityItems(idToken: string, type: CreativityType) {
  await authenticateAdmin(idToken);
  validateType(type);

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
