'use server';

import { authenticateAdmin } from './auth';

import { db, serializeData } from '@/lib/firebase/admin';
import { revalidateSite } from '@/lib/revalidateSite';
import { safeExternalUrl } from '@/lib/safeUrl';

export async function getClients() {
    try {
        const snap = await db.collection('clients').orderBy('createdAt', 'desc').get();
        if (snap.empty) {
            return [];
        }
        return snap.docs.map(doc => {
            const data = doc.data();
            return serializeData({
                id: doc.id,
                ...data,
                websiteUrl: data.websiteUrl ? safeExternalUrl(data.websiteUrl) : '',
            });
        });
    } catch (error: any) {
        console.error("Failed to get clients:", error);
        return [];
    }
}

export async function addClient(token: string, clientData: any) {
    try {
        await authenticateAdmin(token);

        const docRef = db.collection('clients').doc();
        await docRef.set({
            ...clientData,
            createdAt: new Date().toISOString()
        });
        
        revalidateSite();
        return { success: true, id: docRef.id };
    } catch (error: any) {
        console.error("Failed to add client:", error);
        throw new Error(error.message);
    }
}

export async function updateClient(token: string, id: string, clientData: any) {
    try {
        await authenticateAdmin(token);

        await db.collection('clients').doc(id).update(clientData);
        
        revalidateSite();
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update client:", error);
        throw new Error(error.message);
    }
}

export async function deleteClient(token: string, id: string) {
    try {
        await authenticateAdmin(token);

        await db.collection('clients').doc(id).delete();
        
        revalidateSite();
        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete client:", error);
        throw new Error(error.message);
    }
}
