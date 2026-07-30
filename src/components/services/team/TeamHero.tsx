'use client';
import { SectionData, SectionItem } from '@/types';
import Link from 'next/link';

export default function TeamHero({ data }: { data: SectionData }) {
  if (!data) return null;

  return (
    <section id="our-team" className="relative py-24 bg-[#0A192F] overflow-hidden" dir="rtl">
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

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-right">
            <div className="mb-20">
                <h2 className="text-[#C5A16F] font-bold tracking-[0.4em] uppercase text-xs mb-4">
                    {data.subtitle || "The Creators"}
                </h2>
                <h3 className="text-4xl md:text-6xl font-black text-white">
                    {data.titlePart1 || "تعرف على"} <span className="text-[#C5A16F]">{data.titlePart2 || "خبراء الصرح"}</span>
                </h3>
                <p className="text-gray-400 mt-6 max-w-2xl text-lg leading-relaxed border-r-4 border-[#C5A16F] pr-6">
                    {data.description || "نخبة من المبدعين اجتمعوا تحت راية Pharaoh Code ليحولوا شغف التكنولوجيا إلى حلول رقمية أسطورية."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {data.members?.map((member: SectionItem, index: number) => (
                    <Link href={`/team/${member.id}`} key={index} 
                         className="team-card group relative cursor-pointer block"
                         data-name={member.name || ""}
                         data-role={member.role || ""}
                         data-img={member.image || member.imageUrl || ""}
                         data-desc={member.description || ""}
                         data-skill1-name={member.skills?.[0]?.name || member.skill1Name || ""}
                         data-skill1-val={member.skills?.[0]?.value || member.skill1Val || ""}
                         data-skill2-name={member.skills?.[1]?.name || member.skill2Name || ""}
                         data-skill2-val={member.skills?.[1]?.value || member.skill2Val || ""}
                         data-skill3-name={member.skills?.[2]?.name || member.skill3Name || ""}
                         data-skill3-val={member.skills?.[2]?.value || member.skill3Val || ""}
                         data-stat1={member.stats?.[0]?.value || member.stat1Val || member.stat1 || ""}
                         data-stat1-lbl={member.stats?.[0]?.label || member.stat1Lbl || member.stat1Label || ""}
                         data-stat2={member.stats?.[1]?.value || member.stat2Val || member.stat2 || ""}
                         data-stat2-lbl={member.stats?.[1]?.label || member.stat2Lbl || member.stat2Label || ""}
                         data-fb={member.social?.facebook || member.facebook || member.fbUrl || "#"}
                         data-insta={member.social?.instagram || member.instagram || member.instaUrl || "#"}>
                        <div className="relative bg-[#112240] p-6 rounded-tr-[4rem] rounded-bl-[4rem] border-r-2 border-t-2 border-[#C5A16F]/20 group-hover:border-[#C5A16F] transition-all duration-500 shadow-2xl">
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#0A192F] border border-[#C5A16F] rounded-xl z-20 flex items-center justify-center transform group-hover:rotate-[360deg] transition-all duration-700">
                                <div className="w-8 h-8 bg-[#C5A16F]/20 rounded-lg flex items-center justify-center text-[#C5A16F] group-hover:bg-[#C5A16F] group-hover:text-[#0A192F]">
                                    <span className="text-xs font-bold">{String(index + 1).padStart(2, '0')}</span>
                                </div>
                            </div>
                            <div className="relative aspect-[4/5] rounded-tr-[3rem] rounded-bl-[3rem] overflow-hidden mb-6">
                                <img src={(member.imageUrl || member.image)} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" alt={member.name} />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-60"></div>
                            </div>
                            <h4 className="text-white text-2xl font-black">{member.name}</h4>
                            <p className="text-[#C5A16F] font-bold text-sm mt-1 uppercase tracking-widest">{member.role}</p>
                            <div className="w-10 h-1 bg-[#C5A16F] mt-4 group-hover:w-full transition-all duration-500"></div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  );
}
