import { admin } from '@/lib/firebase/admin';
import { getTeamMembers } from '@/app/actions/dashboard/team';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TeamMemberDetailCard from '@/components/team/TeamMemberDetailCard';

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
    
    return (
        <section className="relative py-32 bg-[#0A192F] overflow-hidden text-right min-h-screen flex items-center" dir="rtl">
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="pharaoh-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <text x="0" y="50" fontFamily="serif" fontSize="20" fill="#C5A16F">𓂀</text>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#pharaoh-pattern)" />
                </svg>
            </div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pharaohGold/5 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
                <div className="mb-8 flex justify-start">
                    <Link href="/team" className="bg-[#112240] border border-pharaohGold/30 text-pharaohGold hover:bg-pharaohGold hover:text-[#0A192F] px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-pharaohGold/10">
                        ← العودة لكتيبة العمل
                    </Link>
                </div>
                
                <TeamMemberDetailCard member={member} />
            </div>
        </section>
    );
}
