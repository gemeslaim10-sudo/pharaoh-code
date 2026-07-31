import { admin } from '@/lib/firebase/admin';
import { getTeamMembers } from '@/app/actions/dashboard/team';
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
    try {
        const db = admin.firestore();
        const doc = await db.collection('team_members').doc(id).get();
        if (doc.exists) {
            member = doc.data() || null;
        }
    } catch (error) {
        console.error("Failed to fetch team member from firebase:", error);
    }
    
    if (!member) {
        notFound();
    }
    
    return <TeamMemberDetailClient member={member} />;
}
