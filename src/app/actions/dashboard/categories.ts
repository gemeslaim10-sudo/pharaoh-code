'use server';

import { admin, serializeData } from '@/lib/firebase/admin';
import { revalidatePath } from 'next/cache';

const DEFAULT_CATEGORIES = [
    { id: 'web', slug: 'web', name_ar: 'تطوير الويب', name_en: 'Web Development' },
    { id: 'app', slug: 'app', name_ar: 'تطبيقات الهواتف والويب', name_en: 'App Development' },
    { id: 'motion', slug: 'motion', name_ar: 'موشن جرافيك وتصميم', name_en: 'Graphics & Motion' }
];

export async function getCategories() {
    try {
        const db = admin.firestore();
        const snap = await db.collection('categories').orderBy('createdAt', 'asc').get();
        if (snap.empty) {
            return DEFAULT_CATEGORIES;
        }
        const docs = snap.docs.map(doc => serializeData({ id: doc.id, ...doc.data() }));
        return docs;
    } catch (error: any) {
        console.error("Error fetching categories:", error);
        return DEFAULT_CATEGORIES;
    }
}

export async function addCategory(token: string, categoryData: { name_ar: string; name_en: string; slug?: string | undefined }) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');

        const db = admin.firestore();
        const slug = categoryData.slug || categoryData.name_en.toLowerCase().replace(/[^a-z0-9]/g, '-') || Date.now().toString();

        const docRef = await db.collection('categories').add({
            name_ar: categoryData.name_ar,
            name_en: categoryData.name_en,
            slug: slug,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

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
        await db.collection('categories').doc(id).set({
            ...categoryData,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

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

        revalidatePath('/portfolio');
        revalidatePath('/dashboard/creativity');
        revalidatePath('/dashboard/categories');

        return { success: true };
    } catch (error: any) {
        console.error("Error deleting category:", error);
        return { success: false, error: error.message };
    }
}
