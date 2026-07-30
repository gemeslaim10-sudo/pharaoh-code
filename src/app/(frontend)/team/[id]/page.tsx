import { admin } from '@/lib/firebase/admin';
import { getTeamMembers } from '@/app/actions/dashboard/team';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    const skills = member.skills || [];
    const stats = member.stats || [];
    
    return (
        <section className="relative py-32 bg-[#0A192F] overflow-hidden text-right min-h-screen flex items-center" dir="rtl">
            {/* Background Pattern */}
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
                {/* Back Button */}
                <div className="mb-8 flex justify-start">
                    <Link href="/team" className="bg-[#112240] border border-pharaohGold/30 text-pharaohGold hover:bg-pharaohGold hover:text-[#0A192F] px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-pharaohGold/10">
                        ← العودة لكتيبة العمل
                    </Link>
                </div>
                
                {/* Main Member Profile Card */}
                <div className="bg-[#112240] border-t-2 border-r-2 border-pharaohGold/40 rounded-tr-[4rem] rounded-bl-[4rem] shadow-[0_25px_60px_rgba(197,161,111,0.15)] p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] font-serif opacity-[0.01] text-pharaohGold select-none pointer-events-none">𓂀</div>
                    
                    {/* Header Layout */}
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 border-b border-pharaohGold/10 pb-8 mb-8 relative z-10">
                        <div className="w-44 h-56 rounded-tr-[3rem] rounded-bl-[3rem] overflow-hidden p-1 border-2 border-pharaohGold/40 shadow-2xl shrink-0 bg-[#0A192F] group">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-tr-[2.8rem] rounded-bl-[2.8rem] transition-all duration-500 transform group-hover:scale-105" />
                        </div>
                        <div className="flex-1 text-center md:text-right">
                            <span className="inline-block bg-pharaohGold/10 text-pharaohGold text-xs font-bold px-4 py-1.5 rounded-lg tracking-wider uppercase border border-pharaohGold/20 shadow-md">
                                {member.role}
                            </span>
                            <h1 className="text-3xl md:text-5xl font-black text-white mt-4 mb-3 tracking-tight">
                                {member.name}
                            </h1>
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl font-light">
                                {member.description}
                            </p>
                        </div>
                    </div>
                    
                    {/* Dynamic Skills and Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        
                        {/* Skills column */}
                        <div className="space-y-5 bg-[#0A192F]/50 p-6 rounded-tr-[2.5rem] rounded-bl-[2.5rem] border border-white/5 shadow-inner">
                            <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                                <span className="text-pharaohGold text-base">𓂀</span> المهارات والخبرات الفنية
                            </h4>
                            {skills.length === 0 ? (
                                <p className="text-xs text-gray-500">لا يوجد مهارات مضافة حالياً.</p>
                            ) : (
                                skills.map((skill: any, idx: number) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between text-xs text-gray-300 font-medium mb-1">
                                            <span>{skill.name}</span>
                                            <span className="text-pharaohGold font-bold">{skill.value}</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-[#0A192F] rounded-full overflow-hidden">
                                            <div className="h-full bg-pharaohGold rounded-full animate-grow-width" style={{ width: skill.value.includes('%') ? skill.value : `${skill.value}%` }}></div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <style>{`
                                @keyframes growWidth {
                                    from { width: 0%; }
                                }
                                .animate-grow-width {
                                    animation: growWidth 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                                }
                            `}</style>
                        </div>
                        
                        {/* Stats column & Contact links */}
                        <div className="flex flex-col justify-between gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                {stats.length === 0 ? (
                                    <div className="col-span-2 bg-[#0A192F]/50 border border-white/5 p-5 rounded-xl text-center shadow-md">
                                        <p className="text-xs text-gray-500">لا يوجد إحصائيات رقمية مضافة.</p>
                                    </div>
                                ) : (
                                    stats.map((stat: any, idx: number) => (
                                        <div key={idx} className="bg-[#0A192F]/50 border border-white/5 p-5 rounded-xl text-center shadow-md">
                                            <span className="text-3xl font-black text-pharaohGold block mb-1">{stat.value}</span>
                                            <span className="text-gray-400 text-xs">{stat.label}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                            
                            {/* Contact Links */}
                            {member.social && (member.social.facebook || member.social.instagram) && (
                                <div className="border-t border-pharaohGold/10 pt-5">
                                    <span className="text-gray-400 text-xs block mb-3 font-medium">قنوات التواصل:</span>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        {member.social.facebook && (
                                            <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 px-4 rounded-xl bg-[#0A192F] text-gray-300 hover:text-pharaohGold hover:border-pharaohGold/80 border border-white/5 transition-all text-center text-xs font-bold tracking-wide shadow-md hover:bg-[#112240]">
                                                Facebook
                                            </a>
                                        )}
                                        {member.social.instagram && (
                                            <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 px-4 rounded-xl bg-[#0A192F] text-gray-300 hover:text-pharaohGold hover:border-pharaohGold/80 border border-white/5 transition-all text-center text-xs font-bold tracking-wide shadow-md hover:bg-[#112240]">
                                                Instagram
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
