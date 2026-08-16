'use client';
import { SectionData, SectionItem } from '@/types';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function TeamHero({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  if (!data) return null;

  return (
    <section id="our-team" className="relative py-14 sm:py-24 bg-[#050D1A] overflow-hidden" dir={direction}>
      {/* Rich background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundImage: 'radial-gradient(ellipse at 70% 0%, rgba(197,161,111,0.07) 0%, transparent 50%), radial-gradient(ellipse at 30% 100%, rgba(59,130,246,0.04) 0%, transparent 50%)' }} />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: 'linear-gradient(rgba(197,161,111,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,161,111,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section intro */}
        <div className="mb-10 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-2.5 sm:mb-4">
              <div className="w-6 sm:w-8 h-[2px] bg-gradient-to-r from-[#C5A16F] to-transparent" />
              <span className="text-[#C5A16F] font-bold tracking-[0.2em] sm:tracking-[0.4em] uppercase text-[10px] sm:text-[11px] bg-[#C5A16F]/8 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#C5A16F]/20">
                {getDynamicText(data, 'subtitle', language) || 'The Creators'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white leading-tight">
              {getDynamicText(data, 'titlePart1', language) || t('team.titlePart1')}{' '}
              <span className="bg-gradient-to-r from-[#C5A16F] via-[#E8C97E] to-[#C5A16F] bg-clip-text text-transparent">
                {getDynamicText(data, 'titlePart2', language) || t('team.titlePart2')}
              </span>
            </h2>
          </div>
          <p className={`text-gray-400 max-w-sm text-xs sm:text-sm leading-relaxed ${direction === 'rtl' ? 'border-r-2 sm:border-r-4 pr-3 sm:pr-5' : 'border-l-2 sm:border-l-4 pl-3 sm:pl-5'} border-[#C5A16F]/50 shrink-0 font-light`}>
            {getDynamicText(data, 'description', language) || t('team.subtitle')}
          </p>
        </div>

        {/* Team cards — Fully Responsive Mobile & Desktop Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {data.members?.map((member: SectionItem, index: number) => {
            const name = getDynamicText(member, 'name', language) || member.name;
            const role = getDynamicText(member, 'role', language) || member.role;
            const memberImg = member.imageUrl || member.image;

            return (
              <Link
                href={`/team/${member.id}`}
                key={index}
                className="team-card group relative flex flex-col justify-between bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#081222] rounded-2xl sm:rounded-3xl border border-white/10 hover:border-[#C5A16F]/50 transition-all duration-400 overflow-hidden shadow-xl hover:-translate-y-1.5 p-3.5 sm:p-5"
              >
                {/* Top glowing beam */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Portrait Photo Container */}
                <div className="relative aspect-[4/3] sm:aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden mb-3.5 bg-[#0B1528] border border-white/5">
                  {memberImg ? (
                    <img
                      src={memberImg}
                      className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-105"
                      alt={name}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#112240] to-[#0A192F] text-4xl font-bold text-[#C5A16F]/40">
                      {name?.charAt(0) || '✦'}
                    </div>
                  )}

                  {/* Mobile Role Badge */}
                  <div className="absolute bottom-2.5 inset-x-2.5 sm:hidden z-10">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-[#0A192F]/90 backdrop-blur-md text-[#C5A16F] border border-[#C5A16F]/30 text-[10px] font-bold tracking-wide">
                      {role}
                    </span>
                  </div>
                </div>

                {/* Info Panel */}
                <div className="px-1 pb-1">
                  <div className="hidden sm:block mb-1.5">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#C5A16F] bg-[#C5A16F]/15 border border-[#C5A16F]/30 px-2.5 py-0.5 rounded-full">
                      {role}
                    </span>
                  </div>

                  <h4 className="text-white text-base sm:text-lg font-bold leading-tight mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#F3E0B5] transition-all">
                    {name}
                  </h4>

                  {/* View Profile Action Bar */}
                  <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-gray-300 group-hover:text-[#C5A16F] transition-colors">
                    <span className="font-semibold text-[11px] sm:text-xs">
                      {language === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}
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
