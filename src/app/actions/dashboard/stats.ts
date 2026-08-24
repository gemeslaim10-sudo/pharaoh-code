'use server';

import { admin, serializeData } from '@/lib/firebase/admin';
import { revalidatePath } from 'next/cache';

export interface StatItemData {
  title_ar?: string;
  title_en?: string;
  value?: string;
  prefix?: string;
  suffix?: string;
  iconSvg?: string;
}

export interface StatsSectionData {
  subtitle_ar?: string;
  subtitle_en?: string;
  titlePart1_ar?: string;
  titlePart1_en?: string;
  titlePart2_ar?: string;
  titlePart2_en?: string;
  description_ar?: string;
  description_en?: string;
  items?: StatItemData[];
}

export const DEFAULT_STATS_DATA: StatsSectionData = {
  subtitle_ar: 'أرقامنا القياسية',
  subtitle_en: 'RECORD NUMBERS',
  titlePart1_ar: 'إنجازات صنعت',
  titlePart1_en: 'Achievements That Made',
  titlePart2_ar: 'فارقاً حقيقياً',
  titlePart2_en: 'A Real Difference',
  description_ar: 'أرقام تعكس التزامنا بالتميز الهندسي وثقة شركاء النجاح حول العالم.',
  description_en: 'Numbers reflecting our commitment to engineering excellence and trust of success partners worldwide.',
  items: [
    {
      title_ar: 'مهندس ومطور',
      title_en: 'Engineers & Developers',
      value: '25',
      prefix: '+',
      suffix: '',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`
    },
    {
      title_ar: 'عميل سعيد',
      title_en: 'Happy Clients',
      value: '80',
      prefix: '+',
      suffix: '',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    },
    {
      title_ar: 'مشروع منجز',
      title_en: 'Completed Projects',
      value: '150',
      prefix: '+',
      suffix: '',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    },
    {
      title_ar: 'سنوات خبرة',
      title_en: 'Years Experience',
      value: '8',
      prefix: '+',
      suffix: '',
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08-.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    }
  ]
};

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
