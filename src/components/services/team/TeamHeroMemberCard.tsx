'use client';

import Link from 'next/link';
import { SectionItem } from '@/types';

interface TeamHeroMemberCardProps {
  member: SectionItem;
  name: string;
  role: string;
  memberImg: string;
  isLight: boolean;
  activeLogo?: string;
  direction: 'rtl' | 'ltr';
  language: string;
}

export function TeamHeroMemberCard({
  member,
  name,
  role,
  memberImg,
  isLight,
  activeLogo,
  direction,
  language,
}: TeamHeroMemberCardProps) {
  return (
    <Link
      href={`/team/${member.id}`}
      className={`team-card group relative flex flex-col justify-between h-full rounded-2xl p-3.5 sm:p-4 border transition-all duration-400 overflow-hidden text-center block select-none ${
        isLight
          ? 'bg-white border-slate-300 shadow-sm hover:border-[#8A5800] hover:shadow-[0_16px_36px_-8px_rgba(138,88,0,0.2)]'
          : 'bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050B14] border-white/10 hover:border-[#C5A16F]/60 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_36px_-8px_rgba(197,161,111,0.25)]'
      }`}
    >
      {/* Top glowing beam */}
      <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 shadow-[0_0_12px_#C5A16F]" />

      {/* Shimmer Light Sweep on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30" />

      {/* Sovereign Portrait Frame - Sleek Compact Aspect Ratio with Perfectly Centered Focus (X & Y) */}
      <div className="relative w-full aspect-[16/11] sm:aspect-[4/3] rounded-xl overflow-hidden mb-3 border transition-all duration-500 shadow-md group-hover:shadow-[0_10px_25px_rgba(197,161,111,0.2)]">
        <div className={`w-full h-full relative overflow-hidden ${
          isLight ? 'bg-slate-100' : 'bg-[#081222]'
        }`}>
          {memberImg ? (
            <img
              src={memberImg}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out transform group-hover:scale-106 group-hover:brightness-105"
              alt={name}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#112240] to-[#0A192F] text-3xl font-bold text-[#C5A16F]">
              {name?.charAt(0) || '✦'}
            </div>
          )}

          {/* Gradient shadow at bottom of image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

          {/* Top Floating Dynamic Logo Badge */}
          <div className={`absolute top-2.5 ${direction === 'rtl' ? 'right-2.5' : 'left-2.5'} z-10 w-7 h-7 rounded-lg border flex items-center justify-center shadow-md backdrop-blur-md transition-all duration-300 p-1 overflow-hidden ${
            isLight
              ? 'bg-white/95 border-[#8A5800]/40 shadow-sm'
              : 'bg-[#070F1E]/95 border-[#C5A16F]/40 shadow-black/50'
          }`}>
            {activeLogo ? (
              <img src={activeLogo} alt="Logo" className="w-full h-full object-contain select-none" />
            ) : (
              <svg className="w-3.5 h-3.5 text-[#C5A16F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </div>

          {/* Role Pill embedded inside image banner - Centered on both X & Y axis */}
          <div className={`absolute bottom-2.5 ${direction === 'rtl' ? 'right-2.5' : 'left-2.5'} z-10 flex items-center`}>
            <span className={`inline-flex items-center justify-center text-center text-[10px] font-black uppercase tracking-wider px-2.5 py-1 min-h-[22px] leading-none rounded-lg border backdrop-blur-md shadow-md ${
              isLight
                ? 'bg-white/95 text-[#8A5800] border-[#8A5800]/30 shadow-amber-900/10'
                : 'bg-[#060D1A]/95 text-[#C5A16F] border-[#C5A16F]/30 shadow-black/50'
            }`}>
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Member Name */}
      <div className="flex flex-col justify-between flex-grow relative z-10">
        <h4 className={`text-base sm:text-lg font-black tracking-tight mb-3 line-clamp-1 transition-colors duration-300 ${
          isLight
            ? 'text-slate-900 group-hover:text-[#8A5800]'
            : 'text-white group-hover:text-[#C5A16F]'
        }`}>
          {name}
        </h4>

        {/* Action Button */}
        <div className={`pt-2.5 border-t mt-auto ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
          <div className={`relative overflow-hidden w-full py-2 sm:py-2.5 px-3 rounded-xl transition-all duration-300 flex items-center justify-between text-xs font-bold ${
            isLight
              ? 'bg-slate-100 text-slate-900 border border-slate-300 group-hover:border-[#8A5800] group-hover:bg-[#8A5800] group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(138,88,0,0.3)]'
              : 'bg-white/[0.04] text-gray-200 border border-white/10 group-hover:border-[#C5A16F]/60 group-hover:bg-gradient-to-r group-hover:from-[#C5A16F] group-hover:via-[#DFB77D] group-hover:to-[#C5A16F] group-hover:text-[#070F1E] group-hover:shadow-[0_4px_18px_rgba(197,161,111,0.4)]'
          }`}>
            <span className="font-extrabold text-[11px] tracking-wide relative z-10 transition-colors">
              {language === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}
            </span>

            <div className={`w-5.5 h-5.5 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm relative z-10 shrink-0 ${
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
