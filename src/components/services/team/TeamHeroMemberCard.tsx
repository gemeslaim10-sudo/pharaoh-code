'use client';

import Link from 'next/link';
import { SectionItem } from '@/types';

interface TeamHeroMemberCardProps {
  member: SectionItem;
  name: string;
  role: string;
  memberImg: string;
  isLight: boolean;
  direction: 'rtl' | 'ltr';
  language: string;
}

export function TeamHeroMemberCard({
  member,
  name,
  role,
  memberImg,
  isLight,
  direction,
  language,
}: TeamHeroMemberCardProps) {
  return (
    <Link
      href={`/team/${member.id}`}
      className={`team-card group relative flex flex-col justify-between h-full rounded-2xl p-4 sm:p-5 border transition-all duration-300 overflow-hidden text-center block ${
        isLight
          ? 'bg-white border-slate-200/90 shadow-sm hover:border-[#C5A16F] hover:shadow-[0_16px_36px_-8px_rgba(197,161,111,0.25)]'
          : 'bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050B14] border-white/10 hover:border-[#C5A16F]/60 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_36px_-8px_rgba(197,161,111,0.25)]'
      }`}
    >
      {/* Top glowing beam */}
      <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Enlarged Circular Avatar with Animated Glowing Orbit Rings */}
      <div className="relative mx-auto mb-3.5 mt-1">
        <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-[#C5A16F]/40 via-[#DFB77D]/25 to-[#9E7D47]/40 blur-md opacity-40 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 pointer-events-none" />

        <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-38 md:h-38 rounded-full p-[3px] bg-gradient-to-tr from-[#C5A16F] via-[#DFB77D] to-[#9E7D47] group-hover:scale-104 transition-transform duration-500 ease-out shadow-xl group-hover:shadow-[0_0_25px_rgba(197,161,111,0.5)]">
          <div className={`w-full h-full rounded-full p-1 overflow-hidden transition-colors ${
            isLight ? 'bg-white' : 'bg-[#081222]'
          }`}>
            {memberImg ? (
              <img
                src={memberImg}
                className="w-full h-full object-cover rounded-full transition-transform duration-500 ease-out transform group-hover:scale-108 group-hover:brightness-105"
                alt={name}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-[#112240] to-[#0A192F] text-3xl font-bold text-[#C5A16F]">
                {name?.charAt(0) || '✦'}
              </div>
            )}
          </div>
        </div>

        {/* Pharaoh Logo Emblem Badge */}
        <div className={`absolute bottom-0.5 end-0.5 z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 ${
          isLight 
            ? 'bg-white border-[#C5A16F] text-[#8A5800] shadow-[#C5A16F]/30 group-hover:shadow-[#C5A16F]/60' 
            : 'bg-[#070F1E] border-[#C5A16F] text-[#C5A16F] shadow-black/80 group-hover:shadow-[#C5A16F]/40'
        }`}>
          <span className="text-sm font-serif leading-none font-bold select-none drop-shadow-[0_0_4px_rgba(197,161,111,0.6)]">
            𓂀
          </span>
        </div>
      </div>

      {/* Compact Info Panel */}
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <div className="mb-1.5">
            <span className={`inline-block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
              isLight
                ? 'text-[#8A5800] bg-[#C5A16F]/15 border-[#C5A16F]/30'
                : 'text-[#C5A16F] bg-[#C5A16F]/10 border-[#C5A16F]/20'
            }`}>
              {role}
            </span>
          </div>

          <h4 className={`text-sm sm:text-base font-black tracking-tight mb-2 sm:mb-2.5 line-clamp-1 transition-colors duration-300 ${
            isLight
              ? 'text-slate-900 group-hover:text-[#8A5800]'
              : 'text-white group-hover:text-[#C5A16F]'
          }`}>
            {name}
          </h4>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-white/5 mt-auto">
          <div className={`relative overflow-hidden w-full py-2 px-3 rounded-xl transition-all duration-300 flex items-center justify-between text-xs font-bold ${
            isLight
              ? 'bg-slate-100/90 text-slate-800 border border-slate-200/80 group-hover:border-[#C5A16F] group-hover:bg-gradient-to-r group-hover:from-[#C5A16F] group-hover:via-[#DFB77D] group-hover:to-[#C5A16F] group-hover:text-[#070F1E] group-hover:shadow-[0_4px_16px_rgba(197,161,111,0.35)]'
              : 'bg-white/[0.04] text-gray-200 border border-white/10 group-hover:border-[#C5A16F]/60 group-hover:bg-gradient-to-r group-hover:from-[#C5A16F] group-hover:via-[#DFB77D] group-hover:to-[#C5A16F] group-hover:text-[#070F1E] group-hover:shadow-[0_4px_18px_rgba(197,161,111,0.4)]'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

            <span className="font-extrabold text-[11px] tracking-wide relative z-10 transition-colors">
              {language === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}
            </span>

            <div className={`w-5.5 h-5.5 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm relative z-10 ${
              isLight
                ? 'bg-white text-slate-800 group-hover:bg-[#070F1E] group-hover:text-[#C5A16F]'
                : 'bg-white/10 text-gray-200 group-hover:bg-[#070F1E] group-hover:text-[#C5A16F]'
            }`}>
              <svg
                className={`w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`}
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
      </div>
    </Link>
  );
}
