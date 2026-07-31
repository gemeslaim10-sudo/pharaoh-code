'use server';

import { admin, serializeData } from '@/lib/firebase/admin';
import { revalidatePath } from 'next/cache';

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

export async function updateTechStackContent(token: string, data: any) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');
        
        const db = admin.firestore();
        await db.collection('pages').doc('services').set({
            techStack: data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        revalidatePath('/services');
        
        return { success: true };
    } catch (error: any) {
        console.error("Error updating tech stack content:", error);
        return { success: false, error: error.message };
    }
}
