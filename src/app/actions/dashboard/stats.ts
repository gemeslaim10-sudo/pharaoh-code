'use server';

import { admin, serializeData } from '@/lib/firebase/admin';
import { revalidatePath } from 'next/cache';
import { StatsSectionData, DEFAULT_STATS_DATA } from '@/types/stats';


export async function getStatsContent(): Promise<StatsSectionData> {
  try {
    const db = admin.firestore();
    const doc = await db.collection('pages').doc('home').get();
    const data = doc.data() || {};
    const stats = data.stats || {};

    return serializeData({
      subtitle_ar: stats.subtitle_ar || stats.subtitle || DEFAULT_STATS_DATA.subtitle_ar,
      subtitle_en: stats.subtitle_en || DEFAULT_STATS_DATA.subtitle_en,
      titlePart1_ar: stats.titlePart1_ar || stats.titlePart1 || DEFAULT_STATS_DATA.titlePart1_ar,
      titlePart1_en: stats.titlePart1_en || DEFAULT_STATS_DATA.titlePart1_en,
      titlePart2_ar: stats.titlePart2_ar || stats.titlePart2 || DEFAULT_STATS_DATA.titlePart2_ar,
      titlePart2_en: stats.titlePart2_en || DEFAULT_STATS_DATA.titlePart2_en,
      description_ar: stats.description_ar || stats.description || DEFAULT_STATS_DATA.description_ar,
      description_en: stats.description_en || stats.desc_en || DEFAULT_STATS_DATA.description_en,
      items: Array.isArray(stats.items) && stats.items.length === 4 ? stats.items : DEFAULT_STATS_DATA.items,
    });
  } catch (error: any) {
    console.error("Error fetching stats content:", error);
    return DEFAULT_STATS_DATA;
  }
}

export async function updateStatsContent(token: string, statsData: StatsSectionData) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) throw new Error('Unauthorized');

    const db = admin.firestore();
    await db.collection('pages').doc('home').set({
      stats: statsData,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    revalidatePath('/');

    return { success: true };
  } catch (error: any) {
    console.error("Error updating stats content:", error);
    return { success: false, error: error.message };
  }
}
