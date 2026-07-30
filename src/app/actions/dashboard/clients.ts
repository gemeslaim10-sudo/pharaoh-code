'use server';

import { admin, db, serializeData } from '@/lib/firebase/admin';
import { revalidatePath } from 'next/cache';

export async function getClients() {
    try {
        const snap = await db.collection('clients').orderBy('createdAt', 'desc').get();
        if (snap.empty) {
            return [];
        }
        return snap.docs.map(doc => serializeData({ id: doc.id, ...doc.data() }));
    } catch (error: any) {
        console.error("Failed to get clients:", error);
        return [];
    }
}

export async function addClient(token: string, clientData: any) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');

        const docRef = db.collection('clients').doc();
        await docRef.set({
            ...clientData,
            createdAt: new Date().toISOString()
        });
        
        revalidatePath('/');
        revalidatePath('/clients');
        revalidatePath('/clients/[id]');
        return { success: true, id: docRef.id };
    } catch (error: any) {
        console.error("Failed to add client:", error);
        throw new Error(error.message);
    }
}

export async function updateClient(token: string, id: string, clientData: any) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');

        await db.collection('clients').doc(id).update(clientData);
        
        revalidatePath('/');
        revalidatePath('/clients');
        revalidatePath('/clients/[id]');
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update client:", error);
        throw new Error(error.message);
    }
}

export async function deleteClient(token: string, id: string) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');

        await db.collection('clients').doc(id).delete();
        
        revalidatePath('/');
        revalidatePath('/clients');
        revalidatePath('/clients/[id]');
        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete client:", error);
        throw new Error(error.message);
    }
}
