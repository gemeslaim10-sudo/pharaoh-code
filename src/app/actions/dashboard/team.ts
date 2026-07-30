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
                    role: member.role,
                    image: member.image,
                    description: member.description,
                    skills: member.skills || [],
                    stats: member.stats || [],
                    social: member.social || { facebook: '', instagram: '' },
                    createdAt: new Date(Date.now() + index * 1000).toISOString()
                };
                batch.set(docRef, data);
                return { id: member.id, ...data };
            });
            await batch.commit();
            return serializeData(seededMembers);
        }
        return snap.docs.map(doc => serializeData({ id: doc.id, ...doc.data() }));
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
