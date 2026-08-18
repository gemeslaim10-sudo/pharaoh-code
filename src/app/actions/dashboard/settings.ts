'use server';

import { cache } from 'react';
import { admin, serializeData } from '@/lib/firebase/admin';

export async function updateIdentity(token: string, data: any) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');
        
        const db = admin.firestore();
        await db.collection('settings').doc('identity').set(data, { merge: true });
        
        return { success: true };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getIdentity = cache(async function getIdentity() {
    try {
        const db = admin.firestore();
        const doc = await db.collection('settings').doc('identity').get();
        return serializeData(doc.data() || null);
    } catch (error: any) {
        return null;
    }
});

export async function getAdmins() {
    try {
        const db = admin.firestore();
        const snap = await db.collection('admins').get();
        return snap.docs.map(doc => serializeData({ id: doc.id, ...doc.data() }));
    } catch (error: any) {
        return [];
    }
}

export async function addAdmin(token: string, email: string) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');
        
        const db = admin.firestore();
        
        await db.collection('admins').add({
            email,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        
        return { success: true };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function removeAdmin(token: string, id: string) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');
        
        const db = admin.firestore();
        await db.collection('admins').doc(id).delete();
        
        return { success: true };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function checkIsAdminAction(email: string) {
    if (!email) return false;
    if (email === 'cubsacademy29@gmail.com') return true;
    
    try {
        const db = admin.firestore();
        const snap = await db.collection('admins').where('email', '==', email).limit(1).get();
        return !snap.empty;
    } catch (error) {
        console.error("Failed to check admin status:", error);
        return false;
    }
}

export const getSocialLinks = cache(async function getSocialLinks() {
    try {
        const db = admin.firestore();
        const doc = await db.collection('settings').doc('social').get();
        return serializeData(doc.data() || { fb: '#', wa: '#', ig: '#' });
    } catch (error: any) {
        return { fb: '#', wa: '#', ig: '#' };
    }
});

export async function updateSocialLinks(token: string, data: { fb: string; wa: string; ig: string }) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');
        
        const db = admin.firestore();
        await db.collection('settings').doc('social').set(data, { merge: true });
        
        return { success: true };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getSystemStatus = cache(async function getSystemStatus() {
    try {
        const db = admin.firestore();
        const doc = await db.collection('settings').doc('system').get();
        return serializeData(doc.data() || { mode: 'off', message: 'نحن نقوم بتحديث منصتنا حالياً، سنعود قريباً.' });
    } catch (error: any) {
        return { mode: 'off', message: 'نحن نقوم بتحديث منصتنا حالياً، سنعود قريباً.' };
    }
});

export async function updateSystemStatus(token: string, data: { mode: string; message: string }) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');
        
        const db = admin.firestore();
        await db.collection('settings').doc('system').set({
            ...data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        return { success: true };
    } catch (error: any) {
        throw new Error(error.message);
    }
}
