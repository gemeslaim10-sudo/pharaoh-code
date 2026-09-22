'use server';

import { authenticateAdmin } from './auth';

import { admin, serializeData } from '@/lib/firebase/admin';
import { revalidateSite } from '@/lib/revalidateSite';

/**
 * Section keys of `pages/home` that the Home content editor owns.
 * `stats` is deliberately excluded: it belongs to /dashboard/stats and must never
 * be read back into this form nor overwritten by it.
 */
const HOME_CONTENT_SECTIONS = [
  'hero',
  'portfolio',
  'services',
  'clients',
  'creative',
  'workflow',
  'team',
  'testimonials',
] as const;

/** Returns the `pages/home` document (minus `stats`), serialized for the client. */
export async function getHomeContent() {
  try {
    const db = admin.firestore();
    const doc = await db.collection('pages').doc('home').get();
    const raw = doc.data() || {};
    const { stats: _ignoredStats, ...rest } = raw;
    return serializeData(rest) as Record<string, any>;
  } catch (error: any) {
    console.error('Error fetching home page content:', error);
    return {} as Record<string, any>;
  }
}

/** Merges the given home sections into `pages/home` without touching `stats`. */
export async function updateHomeContent(token: string, data: any) {
  try {
    await authenticateAdmin(token);

    const payload: Record<string, unknown> = {};
    for (const key of HOME_CONTENT_SECTIONS) {
      if (data && data[key] !== undefined && data[key] !== null) {
        payload[key] = data[key];
      }
    }

    const db = admin.firestore();
    await db.collection('pages').doc('home').set({
      ...payload,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    revalidateSite();

    return { success: true };
  } catch (error: any) {
    console.error('Error updating home page content:', error);
    return { success: false, error: error.message };
  }
}
