'use server';

import { authenticateAdmin } from './auth';

import { admin, serializeData } from '@/lib/firebase/admin';
import { type HeroThemeConfig } from '@/types/heroTheme';
import { revalidateSite } from '@/lib/revalidateSite';

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
        await authenticateAdmin(token);
        
        const db = admin.firestore();
        await db.collection('settings').doc('heroTheme').set({
            ...data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        revalidateSite();
        return { success: true };
    } catch (error: any) {
        throw new Error(error.message);
    }
}
