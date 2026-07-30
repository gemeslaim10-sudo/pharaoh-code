'use server';

import { revalidatePath } from 'next/cache';

export async function clearSystemCache() {
    try {
        // Revalidate the entire application by revalidating the root layout
        revalidatePath('/', 'layout');
        return { success: true, message: 'تم تفريغ ذاكرة التخزين المؤقت (Cache) بنجاح!' };
    } catch (error) {
        console.error('Failed to clear cache:', error);
        return { success: false, error: 'حدث خطأ أثناء تفريغ الكاش.' };
    }
}
