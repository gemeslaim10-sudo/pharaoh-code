'use server';

import { admin, db, serializeData } from '@/lib/firebase/admin';
import teamFallback from '@/data/frontend/team.json';
import { revalidatePath } from 'next/cache';

export async function getTeamMembers() {
    try {
        const snap = await db.collection('team_members').orderBy('createdAt', 'asc').get();
        if (snap.empty) {
            // Seed fallback data
            const batch = db.batch();
            const seededMembers = teamFallback.map((member, index) => {
                const docRef = db.collection('team_members').doc(member.id);
                const data = {
                    name: member.name,
                    name_ar: member.name_ar || member.name,
                    name_en: member.name_en || member.name,
                    role: member.role,
                    role_ar: member.role_ar || member.role,
                    role_en: member.role_en || member.role,
                    image: member.image,
                    description: member.description,
                    description_ar: member.description_ar || member.description,
                    description_en: member.description_en || member.description,
                    skills: (member.skills || []).map((s: any) => ({
                        name: s.name_ar || s.name,
                        name_ar: s.name_ar || s.name,
                        name_en: s.name_en || s.name,
                        value: s.value
                    })),
                    stats: (member.stats || []).map((st: any) => ({
                        value: st.value,
                        label: st.label_ar || st.label,
                        label_ar: st.label_ar || st.label,
                        label_en: st.label_en || st.label
                    })),
                    social: member.social || { facebook: '', instagram: '' },
                    createdAt: new Date(Date.now() + index * 1000).toISOString()
                };
                batch.set(docRef, data);
                return { id: member.id, ...data };
            });
            await batch.commit();
            return serializeData(seededMembers);
        }
        return snap.docs.map(doc => {
            const data = doc.data();
            return serializeData({
                id: doc.id,
                ...data,
                name_ar: data.name_ar || data.name || '',
                name_en: data.name_en || data.name || '',
                role_ar: data.role_ar || data.role || '',
                role_en: data.role_en || data.role || '',
                description_ar: data.description_ar || data.description || '',
                description_en: data.description_en || data.description || '',
                skills: (data.skills || []).map((s: any) => ({
                    name: s.name_ar || s.name || '',
                    name_ar: s.name_ar || s.name || '',
                    name_en: s.name_en || (s.name && !/[\u0600-\u06FF]/.test(s.name) ? s.name : ''),
                    value: s.value || ''
                })),
                stats: (data.stats || []).map((st: any) => ({
                    value: st.value || '',
                    label: st.label_ar || st.label || '',
                    label_ar: st.label_ar || st.label || '',
                    label_en: st.label_en || (st.label && !/[\u0600-\u06FF]/.test(st.label) ? st.label : '')
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
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');

        const docRef = db.collection('team_members').doc();
        await docRef.set({
            ...memberData,
            createdAt: new Date().toISOString()
        });
        
        revalidatePath('/');
        revalidatePath('/team');
        return { success: true, id: docRef.id };
    } catch (error: any) {
        console.error("Failed to add team member:", error);
        throw new Error(error.message);
    }
}

export async function updateTeamMember(token: string, id: string, memberData: any) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');

        await db.collection('team_members').doc(id).update(memberData);
        
        revalidatePath('/');
        revalidatePath('/team');
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update team member:", error);
        throw new Error(error.message);
    }
}

export async function deleteTeamMember(token: string, id: string) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');

        await db.collection('team_members').doc(id).delete();
        
        revalidatePath('/');
        revalidatePath('/team');
        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete team member:", error);
        throw new Error(error.message);
    }
}
