'use server';

import { authenticateAdmin } from './auth';

import { db, serializeData } from '@/lib/firebase/admin';
import { revalidateSite } from '@/lib/revalidateSite';
import { safeExternalUrl } from '@/lib/safeUrl';
import { normalizeMemberLinks } from '@/lib/memberLinks';

export async function getTeamMembers() {
    try {
        const snap = await db.collection('team_members').orderBy('createdAt', 'asc').get();
        if (snap.empty) {
            return [];
        }
        return snap.docs.map(doc => {
            const data = doc.data();
            return serializeData({
                id: doc.id,
                ...data,
                name_ar: data.name_ar || data.name || '',
                name_en: data.name_en || '',
                role_ar: data.role_ar || data.role || '',
                role_en: data.role_en || '',
                description_ar: data.description_ar || data.description || '',
                description_en: data.description_en || '',
                social: {
                    facebook: data.social?.facebook ? safeExternalUrl(data.social.facebook) : '',
                    instagram: data.social?.instagram ? safeExternalUrl(data.social.instagram) : '',
                },
                links: normalizeMemberLinks(data.links),
                skills: (data.skills || []).map((s: any) => ({
                    name: s.name || s.name_ar || '',
                    name_ar: s.name_ar || s.name || '',
                    name_en: s.name_en || '',
                    value: s.value || ''
                })),
                stats: (data.stats || []).map((st: any) => ({
                    value: st.value || '',
                    label: st.label || st.label_ar || '',
                    label_ar: st.label_ar || st.label || '',
                    label_en: st.label_en || ''
                }))
            });
        });
    } catch (error: any) {
        console.error("Failed to get team members:", error);
        return [];
    }
}

export async function addTeamMember(token: string, memberData: any) {
    try {
        await authenticateAdmin(token);

        const docRef = db.collection('team_members').doc();
        await docRef.set({
            ...memberData,
            createdAt: new Date().toISOString()
        });
        
        revalidateSite();
        return { success: true, id: docRef.id };
    } catch (error: any) {
        console.error("Failed to add team member:", error);
        throw new Error(error.message);
    }
}

export async function updateTeamMember(token: string, id: string, memberData: any) {
    try {
        await authenticateAdmin(token);

        await db.collection('team_members').doc(id).update(memberData);
        
        revalidateSite();
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update team member:", error);
        throw new Error(error.message);
    }
}

export async function deleteTeamMember(token: string, id: string) {
    try {
        await authenticateAdmin(token);

        await db.collection('team_members').doc(id).delete();
        
        revalidateSite();
        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete team member:", error);
        throw new Error(error.message);
    }
}
