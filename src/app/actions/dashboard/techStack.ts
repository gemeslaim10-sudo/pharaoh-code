'use server';

import { authenticateAdmin } from './auth';

import { admin, serializeData } from '@/lib/firebase/admin';
import { revalidateSite } from '@/lib/revalidateSite';

export async function getTechStackContent() {
    try {
        const db = admin.firestore();
        const doc = await db.collection('pages').doc('services').get();
        const data = doc.data() || {};
        return serializeData(data.techStack || {});
    } catch (error: any) {
        console.error("Error fetching tech stack content:", error);
        return {};
    }
}

/** Header block of the public /services page (pages/services -> grid). */
export async function getServicesPageHeader() {
    try {
        const db = admin.firestore();
        const doc = await db.collection('pages').doc('services').get();
        const data = doc.data() || {};
        const grid = data.grid || {};
        // `items` is generated from the services collection at render time — never edited here.
        const { items, ...header } = grid;
        return serializeData(header);
    } catch (error: any) {
        console.error("Error fetching services page header:", error);
        return {};
    }
}

export async function updateServicesPageHeader(token: string, data: any) {
    try {
        await authenticateAdmin(token);

        const db = admin.firestore();
        await db.collection('pages').doc('services').set({
            grid: data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        revalidateSite();

        return { success: true };
    } catch (error: any) {
        console.error("Error updating services page header:", error);
        return { success: false, error: error.message };
    }
}

export async function updateTechStackContent(token: string, data: any) {
    try {
        await authenticateAdmin(token);
        
        const db = admin.firestore();
        await db.collection('pages').doc('services').set({
            techStack: data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        revalidateSite();
        
        return { success: true };
    } catch (error: any) {
        console.error("Error updating tech stack content:", error);
        return { success: false, error: error.message };
    }
}
