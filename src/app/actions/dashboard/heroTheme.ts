import { cache } from 'react';
import { admin, serializeData } from '@/lib/firebase/admin';

export interface HeroThemeConfig {
    darkSlide1Media?: string;
    darkSlide1Video?: string;
    darkSlide1Image?: string;

    darkSlide2Media?: string;
    darkSlide2Video?: string;
    darkSlide2Image?: string;

    darkPreset?: string; // 'royal_gold' | 'luminous_gold' | 'sovereign_silver' | 'cinematic'

    lightSlide1Media?: string;
    lightSlide1Video?: string;
    lightSlide1Image?: string;

    lightSlide2Media?: string;
    lightSlide2Video?: string;
    lightSlide2Image?: string;

    lightPreset?: string; // 'royal_gold' | 'luminous_gold' | 'sovereign_silver' | 'cinematic'
}

export const getHeroThemeConfig = cache(async function getHeroThemeConfig(): Promise<HeroThemeConfig | null> {
    try {
        const db = admin.firestore();
        const doc = await db.collection('settings').doc('heroTheme').get();
        return serializeData(doc.data() || null);
    } catch (error: any) {
        return null;
    }
});

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
