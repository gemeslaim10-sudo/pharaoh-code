'use server';

import { authenticateAdmin } from './auth';

import { admin, serializeData } from '@/lib/firebase/admin';
import { revalidateSite } from '@/lib/revalidateSite';
import { type SocialPlatform } from '@/types/settings';
import { OWNER_EMAIL, normalizeEmail } from '@/lib/authPolicy';

export async function updateIdentity(token: string, data: any) {
    try {
        await authenticateAdmin(token);
        
        const db = admin.firestore();
        await db.collection('settings').doc('identity').set(data, { merge: true });
        revalidateSite();
        
        return { success: true };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getIdentity() {
    try {
        const db = admin.firestore();
        const doc = await db.collection('settings').doc('identity').get();
        return serializeData(doc.data() || null);
    } catch (error: any) {
        return null;
    }
}

export async function getAdmins(token: string) {
    await authenticateAdmin(token);
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
        await authenticateAdmin(token);
        email = normalizeEmail(email);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email');
        if (email === OWNER_EMAIL) throw new Error('Owner is already an administrator');
        
        const db = admin.firestore();
        await admin.auth().getUserByEmail(email);
        
        const existing = await db.collection('admins').get();
        if (existing.docs.some(doc => normalizeEmail(doc.data().email) === email)) {
            return { success: true };
        }
        await db.collection('admins').doc(encodeURIComponent(email)).set({
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
        await authenticateAdmin(token);
        
        const db = admin.firestore();
        const target = await db.collection('admins').doc(id).get();
        if (!target.exists) return { success: true };
        const email = normalizeEmail(target.data()?.email);
        if (email === OWNER_EMAIL) throw new Error('Cannot remove the owner');
        // Remove legacy duplicate rows too; leaving one would preserve access.
        const admins = await db.collection('admins').get();
        const matches = admins.docs.filter(doc => doc.id === id || (email && normalizeEmail(doc.data().email) === email));
        const batch = db.batch();
        matches.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
        
        return { success: true };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function checkIsAdminAction(token: string) {
    try {
        await authenticateAdmin(token);
        return true;
    } catch {
        return false;
    }
}

export async function getSocialLinks() {
    try {
        const db = admin.firestore();
        const doc = await db.collection('settings').doc('social').get();
        if (!doc.exists) {
            return { items: [] };
        }
        const data = doc.data() || {};
        const items: SocialPlatform[] = Array.isArray(data.items) ? data.items : [];

        // If items array is not present but legacy fields exist, convert non-empty non-hash values
        if (items.length === 0) {
            const legacyKeys: Array<{ key: string; name: string; icon: string; color: string }> = [
                { key: 'fb', name: 'Facebook', icon: 'facebook', color: '#1877F2' },
                { key: 'wa', name: 'WhatsApp', icon: 'whatsapp', color: '#25D366' },
                { key: 'ig', name: 'Instagram', icon: 'instagram', color: '#E4405F' },
                { key: 'x', name: 'X (Twitter)', icon: 'x', color: '#000000' },
                { key: 'twitter', name: 'Twitter', icon: 'x', color: '#000000' },
                { key: 'linkedin', name: 'LinkedIn', icon: 'linkedin', color: '#0A66C2' },
                { key: 'youtube', name: 'YouTube', icon: 'youtube', color: '#FF0000' },
                { key: 'tiktok', name: 'TikTok', icon: 'tiktok', color: '#000000' },
                { key: 'telegram', name: 'Telegram', icon: 'telegram', color: '#26A5E4' },
                { key: 'github', name: 'GitHub', icon: 'github', color: '#24292e' },
            ];

            legacyKeys.forEach(lk => {
                const val = data[lk.key];
                if (val && typeof val === 'string' && val.trim() && val !== '#') {
                    items.push({
                        id: `legacy-${lk.key}`,
                        name: lk.name,
                        url: val.trim(),
                        icon: lk.icon,
                        color: lk.color,
                    });
                }
            });
        }

        return serializeData({
            ...data,
            items,
        });
    } catch (error: any) {
        console.error("Failed to fetch social links:", error);
        return { items: [] };
    }
}

export async function saveSocialPlatforms(token: string, items: SocialPlatform[]) {
    try {
        await authenticateAdmin(token);

        const db = admin.firestore();

        // Extract whatsapp url if present for quick access
        const waPlatform = items.find(i => 
            i.name.toLowerCase().includes('whatsapp') || 
            i.name.includes('واتساب') || 
            i.icon === 'whatsapp'
        );

        await db.collection('settings').doc('social').set({
            items,
            wa: waPlatform ? waPlatform.url : '',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        revalidateSite();

        return { success: true };
    } catch (error: any) {
        console.error("Error saving social platforms:", error);
        throw new Error(error.message || 'Failed to save social platforms');
    }
}

export async function addSocialPlatform(token: string, platformData: Omit<SocialPlatform, 'id'>) {
    try {
        await authenticateAdmin(token);

        const current = await getSocialLinks();
        const currentItems: SocialPlatform[] = Array.isArray(current.items) ? current.items : [];

        const newId = `platform-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const newItem: SocialPlatform = {
            id: newId,
            name: platformData.name,
            url: platformData.url,
            ...(platformData.name_ar ? { name_ar: platformData.name_ar } : {}),
            ...(platformData.name_en ? { name_en: platformData.name_en } : {}),
            ...(platformData.icon ? { icon: platformData.icon } : {}),
            ...(platformData.iconSvg ? { iconSvg: platformData.iconSvg } : {}),
            ...(platformData.color ? { color: platformData.color } : {}),
            createdAt: new Date().toISOString()
        };

        const updatedItems = [...currentItems, newItem];
        return await saveSocialPlatforms(token, updatedItems);
    } catch (error: any) {
        console.error("Error adding social platform:", error);
        throw new Error(error.message || 'Failed to add social platform');
    }
}

export async function updateSocialPlatform(token: string, id: string, platformData: Partial<SocialPlatform>) {
    try {
        await authenticateAdmin(token);

        const current = await getSocialLinks();
        const currentItems: SocialPlatform[] = Array.isArray(current.items) ? current.items : [];

        const updatedItems = currentItems.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    ...platformData,
                    updatedAt: new Date().toISOString()
                };
            }
            return item;
        });

        return await saveSocialPlatforms(token, updatedItems);
    } catch (error: any) {
        console.error("Error updating social platform:", error);
        throw new Error(error.message || 'Failed to update social platform');
    }
}

export async function deleteSocialPlatform(token: string, id: string) {
    try {
        await authenticateAdmin(token);

        const current = await getSocialLinks();
        const currentItems: SocialPlatform[] = Array.isArray(current.items) ? current.items : [];

        const updatedItems = currentItems.filter(item => item.id !== id);
        return await saveSocialPlatforms(token, updatedItems);
    } catch (error: any) {
        console.error("Error deleting social platform:", error);
        throw new Error(error.message || 'Failed to delete social platform');
    }
}

export async function updateSocialLinks(token: string, data: { fb: string; wa: string; ig: string }) {
    try {
        await authenticateAdmin(token);
        
        const db = admin.firestore();
        await db.collection('settings').doc('social').set(data, { merge: true });

        revalidateSite();
        
        return { success: true };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getSystemStatus() {
    try {
        const db = admin.firestore();
        const doc = await db.collection('settings').doc('system').get();
        return serializeData(doc.data() || { mode: 'off', message: 'نحن نقوم بتحديث منصتنا حالياً، سنعود قريباً.' });
    } catch (error: any) {
        return { mode: 'off', message: 'نحن نقوم بتحديث منصتنا حالياً، سنعود قريباً.' };
    }
}

export async function updateSystemStatus(token: string, data: { mode: string; message: string }) {
    try {
        await authenticateAdmin(token);
        
        const db = admin.firestore();
        await db.collection('settings').doc('system').set({
            ...data,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        revalidateSite();
        
        return { success: true };
    } catch (error: any) {
        throw new Error(error.message);
    }
}
