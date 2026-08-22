import { admin } from '@/lib/firebase/admin';
import { getTeamMembers } from '@/app/actions/dashboard/team';
import { getIdentity } from '@/app/actions/dashboard/settings';
import { notFound } from 'next/navigation';
import TeamMemberDetailClient from '@/components/team/TeamMemberDetailClient';

export async function generateStaticParams() {
    const members = await getTeamMembers();
    return members.map((member: any) => ({
        id: member.id,
    }));
}

export default async function TeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let member: admin.firestore.DocumentData | null = null;
    let identity: any = null;
    try {
        const db = admin.firestore();
        const [doc, identityData] = await Promise.all([
            db.collection('team_members').doc(id).get(),
            getIdentity()
        ]);
        if (doc.exists) {
            const data = doc.data() || {};
            member = {
                id: doc.id,
                ...data,
                name: data.name || data.name_ar || '',
                name_ar: data.name_ar || data.name || '',
                name_en: data.name_en || data.name || '',
                role: data.role || data.role_ar || '',
                role_ar: data.role_ar || data.role || '',
                role_en: data.role_en || data.role || '',
                description: data.description || data.description_ar || '',
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
            };
        }
        identity = identityData;
    } catch (error) {
        console.error("Failed to fetch team member from firebase:", error);
    }
    
    if (!member) {
        notFound();
    }
    
    const logoUrl = identity?.logo || identity?.logo_dark || '';
    const logoLightUrl = identity?.logo_light || '';
    
    return <TeamMemberDetailClient member={member as any} logoUrl={logoUrl} logoLightUrl={logoLightUrl} />;
}
