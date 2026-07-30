'use server';

import { admin, db, serializeData } from '@/lib/firebase/admin';
import { revalidatePath } from 'next/cache';

export async function getServices() {
    try {
        const snap = await db.collection('services').orderBy('createdAt', 'desc').get();
        if (snap.empty) {
            return [];
        }
        return snap.docs.map(doc => serializeData({ id: doc.id, ...doc.data() }));
    } catch (error: any) {
        console.error("Failed to get services:", error);
        return [];
    }
}

export async function addService(token: string, serviceData: any) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');

        const docRef = db.collection('services').doc();
        await docRef.set({
            ...serviceData,
            createdAt: new Date().toISOString()
        });
        
        revalidatePath('/');
        revalidatePath('/portfolio');
        return { success: true, id: docRef.id };
    } catch (error: any) {
        console.error("Failed to add service:", error);
        throw new Error(error.message);
    }
}

export async function updateService(token: string, id: string, serviceData: any) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');

        await db.collection('services').doc(id).update(serviceData);
        
        revalidatePath('/');
        revalidatePath('/portfolio');
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update service:", error);
        throw new Error(error.message);
    }
}

export async function deleteService(token: string, id: string) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');

        await db.collection('services').doc(id).delete();
        
        revalidatePath('/');
        revalidatePath('/portfolio');
        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete service:", error);
        throw new Error(error.message);
    }
}
