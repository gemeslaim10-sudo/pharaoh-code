'use server';

import { authenticateAdmin } from './auth';

import { admin, serializeData } from '@/lib/firebase/admin';
import { revalidateSite } from '@/lib/revalidateSite';

export async function getAboutContent() {
    try {
        const db = admin.firestore();
        const doc = await db.collection('pages').doc('about').get();
        return serializeData(doc.data() || {});
    } catch (error: any) {
        console.error("Error fetching about page content:", error);
        return {};
    }
}

export async function updateAboutContent(token: string, data: any) {
    try {
        await authenticateAdmin(token);
        
        const db = admin.firestore();
        await db.collection('pages').doc('about').set({
            ...data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        revalidateSite();
        
        return { success: true };
    } catch (error: any) {
        console.error("Error updating about page content:", error);
        return { success: false, error: error.message };
    }
}
