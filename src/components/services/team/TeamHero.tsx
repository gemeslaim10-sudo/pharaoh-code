'use client';
import { SectionData, SectionItem } from '@/types';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function TeamHero({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  if (!data) return null;

  return (
    <section id="our-team" className="relative py-24 bg-[#050D1A] overflow-hidden" dir={direction}>
      {/* Rich background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundImage: 'radial-gradient(ellipse at 70% 0%, rgba(197,161,111,0.07) 0%, transparent 50%), radial-gradient(ellipse at 30% 100%, rgba(59,130,246,0.04) 0%, transparent 50%)' }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: 'linear-gradient(rgba(197,161,111,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,161,111,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section intro */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-gradient-to-r from-[#C5A16F] to-transparent" />
              <span className="text-[#C5A16F] font-bold tracking-[0.4em] uppercase text-[11px] bg-[#C5A16F]/8 px-4 py-1.5 rounded-full border border-[#C5A16F]/20">
                {getDynamicText(data, 'subtitle', language) || 'The Creators'}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {getDynamicText(data, 'titlePart1', language) || t('team.titlePart1')}
              <br />
              <span className="bg-gradient-to-r from-[#C5A16F] via-[#E8C97E] to-[#C5A16F] bg-clip-text text-transparent">
                {getDynamicText(data, 'titlePart2', language) || t('team.titlePart2')}
              </span>
            </h2>
          </div>
          <p className={`text-gray-400 max-w-xs text-sm leading-relaxed ${direction === 'rtl' ? 'border-r-4 pr-5' : 'border-l-4 pl-5'} border-[#C5A16F]/50 shrink-0`}>
            {getDynamicText(data, 'description', language) || t('team.subtitle')}
          </p>
        </div>

        {/* Team cards — masonry-style with first card being featured */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {data.members?.map((member: SectionItem, index: number) => {
            const name = getDynamicText(member, 'name', language) || member.name;
            const role = getDynamicText(member, 'role', language) || member.role;
            const desc = getDynamicText(member, 'description', language) || member.description;
            const isFeatured = index === 0;

            return (
              <Link
                href={`/team/${member.id}`}
                key={index}
                className={`team-card group relative block ${isFeatured ? 'row-span-1 md:col-span-1' : ''}`}
                data-name={name}
                data-role={role}
                data-img={member.image || member.imageUrl || ''}
                data-desc={desc}
                data-skill1-name={member.skills?.[0]?.name || member.skill1Name || ''}
                data-skill1-val={member.skills?.[0]?.value || member.skill1Val || ''}
                data-skill2-name={member.skills?.[1]?.name || member.skill2Name || ''}
                data-skill2-val={member.skills?.[1]?.value || member.skill2Val || ''}
                data-skill3-name={member.skills?.[2]?.name || member.skill3Name || ''}
                data-skill3-val={member.skills?.[2]?.value || member.skill3Val || ''}
                data-stat1={member.stats?.[0]?.value || member.stat1Val || member.stat1 || ''}
                data-stat1-lbl={member.stats?.[0]?.label || member.stat1Lbl || member.stat1Label || ''}
                data-stat2={member.stats?.[1]?.value || member.stat2Val || member.stat2 || ''}
                data-stat2-lbl={member.stats?.[1]?.label || member.stat2Lbl || member.stat2Label || ''}
                data-fb={member.social?.facebook || member.facebook || member.fbUrl || '#'}
                data-insta={member.social?.instagram || member.instagram || member.instaUrl || '#'}
              >
                <div className="relative bg-gradient-to-b from-[#0F1E38] to-[#081222] rounded-3xl border border-white/6 group-hover:border-[#C5A16F]/50 transition-all duration-500 overflow-hidden shadow-2xl group-hover:-translate-y-3 group-hover:shadow-[0_30px_80px_-20px_rgba(197,161,111,0.3)]"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}>

                  {/* Top glowing beam */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Overlay gradient that reveals on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/95 via-[#0A192F]/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-600 z-10" />

                  {/* Shimmer sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none z-20" />

                  {/* Photo */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={member.imageUrl || member.image}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                      alt={name}
                    />
                  </div>

                  {/* Info panel — slides up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                    {/* Role badge */}
                    <span className="inline-block text-[9px] font-black uppercase tracking-[0.2em] text-[#C5A16F] bg-[#C5A16F]/15 border border-[#C5A16F]/30 px-2.5 py-1 rounded-full mb-2">
                      {role}
                    </span>
                    <h4 className="text-white text-lg font-black leading-tight">{name}</h4>

                    {/* Divider that animates */}
                    <div className="w-0 h-[2px] bg-gradient-to-r from-[#C5A16F] to-transparent group-hover:w-full transition-all duration-500 mt-2 rounded-full" />

                    {/* View profile — appears on hover */}
                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100">
                      <span className="text-[#C5A16F] text-xs font-bold">
                        {language === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}
                      </span>
                      <svg className="w-3 h-3 text-[#C5A16F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
