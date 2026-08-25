'use server';

import { admin, serializeData } from '@/lib/firebase/admin';
import { revalidatePath } from 'next/cache';

export async function getCategories() {
    try {
        const db = admin.firestore();
        const snap = await db.collection('categories').orderBy('createdAt', 'asc').get();
        if (snap.empty) {
            return [];
        }
        const docs = snap.docs.map(doc => {
            const d = doc.data();
            const nameAr = d.name_ar || d.nameAr || d.name || '';
            const nameEn = d.name_en || d.nameEn || '';
            return serializeData({
                id: doc.id,
                name_ar: nameAr,
                name_en: nameEn,
                nameAr: nameAr,
                nameEn: nameEn,
                slug: d.slug || doc.id,
                createdAt: d.createdAt,
                updatedAt: d.updatedAt
            });
        });
        return docs;
    } catch (error: any) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export async function addCategory(token: string, categoryData: { name_ar: string; name_en: string; slug?: string | undefined }) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');

        const db = admin.firestore();
        const slug = (categoryData.slug || categoryData.name_en || categoryData.name_ar || Date.now().toString())
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\u0600-\u06FF]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '') || `cat-${Date.now()}`;

        const docRef = await db.collection('categories').add({
            name_ar: categoryData.name_ar,
            name_en: categoryData.name_en,
            nameAr: categoryData.name_ar,
            nameEn: categoryData.name_en,
            slug: slug,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        revalidatePath('/');
        revalidatePath('/portfolio');
        revalidatePath('/dashboard/creativity');
        revalidatePath('/dashboard/categories');

        return { success: true, id: docRef.id };
    } catch (error: any) {
        console.error("Error adding category:", error);
        return { success: false, error: error.message };
    }
}

export async function updateCategory(token: string, id: string, categoryData: { name_ar: string; name_en: string; slug?: string | undefined }) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');

        const db = admin.firestore();
        const slug = (categoryData.slug || categoryData.name_en || categoryData.name_ar || id)
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\u0600-\u06FF]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '') || id;

        await db.collection('categories').doc(id).set({
            name_ar: categoryData.name_ar,
            name_en: categoryData.name_en,
            nameAr: categoryData.name_ar,
            nameEn: categoryData.name_en,
            slug: slug,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        revalidatePath('/');
        revalidatePath('/portfolio');
        revalidatePath('/dashboard/creativity');
        revalidatePath('/dashboard/categories');

        return { success: true };
    } catch (error: any) {
        console.error("Error updating category:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteCategory(token: string, id: string) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');

        const db = admin.firestore();
        await db.collection('categories').doc(id).delete();

        revalidatePath('/');
        revalidatePath('/portfolio');
        revalidatePath('/dashboard/creativity');
        revalidatePath('/dashboard/categories');

        return { success: true };
    } catch (error: any) {
        console.error("Error deleting category:", error);
        return { success: false, error: error.message };
    }
}
