'use client';

import { SectionData, SectionItem } from '@/types';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function HomeTeam({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();
  const membersToRender = (data?.members || []) as SectionItem[];

  return (
    <section id="our-team" className="relative py-12 sm:py-20 bg-[#050B14] overflow-hidden text-white select-none" dir={direction}>
      {/* Background ambient glow spotlights */}
      <div className="absolute top-1/4 -right-32 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-[#C5A16F]/8 blur-[120px] sm:blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-blue-600/8 blur-[120px] sm:blur-[150px] rounded-full pointer-events-none" />

      {/* Cyber Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header with Responsive Layout & View All Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-2 sm:mb-2.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping" />
              <h2 className="text-[#C5A16F] font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
                {getDynamicText(data, 'subtitle', language) || t("team.subtitle")}
              </h2>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-2 sm:mb-2.5 tracking-tight">
              {t("team.titlePart1")}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
                {t("team.titlePart2")}
              </span>
            </h3>

            <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-light">
              {getDynamicText(data, 'description', language) || (language === 'ar' ? 'نخبة من المهندسين والمطورين المبدعين في صناعة البرمجيات وتطوير الحلول السيادية.' : 'Elite engineers and digital architects dedicated to software craftsmanship and sovereign solutions.')}
            </p>
          </div>

          <div className="flex items-center">
            <Link
              href="/team"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-[#C5A16F] text-gray-200 hover:text-[#050B14] font-bold text-xs border border-white/10 hover:border-[#C5A16F] transition-all duration-300 group shadow-md"
            >
              <span>{t("team.viewMembers") || (language === 'ar' ? 'استعرض كافة الفريق' : 'View Full Team')}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* High-End Team Elite Cards Grid - Fully Responsive for Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {membersToRender.slice(0, 4).map((member: SectionItem, index: number) => {
            const memberName = getDynamicText(member, 'name', language) || member.name || '';
            const memberRole = getDynamicText(member, 'role', language) || member.role || '';
            const memberImage = member.imageUrl || member.image || '';

            return (
              <Link 
                href={`/team/${member.id}`} 
                key={index} 
                className="team-card group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl p-3.5 sm:p-4.5 bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050B14] border border-white/10 hover:border-[#C5A16F]/50 transition-all duration-400 hover:-translate-y-1.5 shadow-[0_12px_35px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Top Glowing Beam */}
                <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 shadow-[0_0_10px_#C5A16F]" />

                {/* Member Portrait with Cinematic Depth */}
                <div className="relative aspect-[4/3] sm:aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden mb-3 bg-[#0B1528] border border-white/5">
                  {memberImage ? (
                    <img 
                      src={memberImage} 
                      className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105" 
                      alt={memberName} 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#112240] to-[#0A192F] text-4xl font-bold text-[#C5A16F]/40">
                      {memberName.charAt(0) || '✦'}
                    </div>
                  )}
                  
                  {/* Floating Role Pill on Mobile */}
                  <div className="absolute bottom-2.5 inset-x-2.5 sm:hidden z-10">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-[#0A192F]/90 backdrop-blur-md text-[#C5A16F] border border-[#C5A16F]/30 text-[10px] font-bold tracking-wide">
                      {memberRole}
                    </span>
                  </div>
                </div>

                {/* Member Info */}
                <div className="px-1 pb-1">
                  <div className="hidden sm:block mb-1.5">
                    <span className="inline-block text-[#C5A16F] text-[11px] font-bold uppercase tracking-wider bg-[#C5A16F]/10 px-2.5 py-0.5 rounded-full border border-[#C5A16F]/20">
                      {memberRole}
                    </span>
                  </div>

                  <h4 className="text-white text-base sm:text-lg font-bold tracking-tight mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#F3E0B5] transition-all">
                    {memberName}
                  </h4>

                  {/* Profile Action Line */}
                  <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-gray-300 group-hover:text-[#C5A16F] transition-colors">
                    <span className="font-semibold text-[11px] sm:text-xs">
                      {language === 'ar' ? 'عرض الملف الشخصي' : 'View Full Profile'}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-[#C5A16F] flex items-center justify-center transition-colors">
                      <svg
                        className={`w-3 h-3 text-gray-300 group-hover:text-[#050B14] transition-all duration-300 group-hover:translate-x-0.5 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>

              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
