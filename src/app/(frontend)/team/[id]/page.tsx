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
            member = doc.data() || null;
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
    
    return <TeamMemberDetailClient member={member} logoUrl={logoUrl} logoLightUrl={logoLightUrl} />;
}
