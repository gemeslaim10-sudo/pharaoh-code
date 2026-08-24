'use server';

import { admin, serializeData } from '@/lib/firebase/admin';
import { HeroThemeConfig } from '@/types/heroTheme';

export async function getHeroThemeConfig(): Promise<HeroThemeConfig | null> {
    try {
        const db = admin.firestore();
        const doc = await db.collection('settings').doc('heroTheme').get();
        return serializeData(doc.data() || null);
    } catch (error: any) {
        return null;
    }
}

export async function updateHeroThemeConfig(token: string, data: HeroThemeConfig) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');
        
        const db = admin.firestore();
        await db.collection('settings').doc('heroTheme').set({
            ...data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        return { success: true };
    } catch (error: any) {
        throw new Error(error.message);
    }
}
