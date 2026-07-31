'use server';

import { admin, serializeData } from '@/lib/firebase/admin';
import { revalidatePath } from 'next/cache';

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
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');
        
        const db = admin.firestore();
        await db.collection('pages').doc('about').set({
            ...data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        revalidatePath('/about');
        
        return { success: true };
    } catch (error: any) {
        console.error("Error updating about page content:", error);
        return { success: false, error: error.message };
    }
}
