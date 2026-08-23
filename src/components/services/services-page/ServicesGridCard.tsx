'use client';

import Link from 'next/link';
import { SectionItem } from '@/types';

interface ServicesGridCardProps {
  item: SectionItem;
  titleText: string;
  descText: string;
  linkText: string;
  metaKeyText: string;
  metaValText: string;
  badgeRight?: string;
  badgeLeft?: string;
  serviceLink: string;
  isLight: boolean;
  direction: 'rtl' | 'ltr';
}

export function ServicesGridCard({
  item,
  titleText,
  descText,
  linkText,
  metaKeyText,
  metaValText,
  badgeRight,
  badgeLeft,
  serviceLink,
  isLight,
  direction,
}: ServicesGridCardProps) {
  const imgSrc = item.imageUrl || item.image;

  return (
    <div
      className={`group relative rounded-xl overflow-hidden border transition-colors duration-300 flex flex-col justify-between h-full ${
        isLight
          ? 'bg-white border-slate-200 shadow-sm hover:border-[#C5A16F] hover:shadow-[0_12px_30px_-6px_rgba(197,161,111,0.22)]'
          : 'bg-[#0A1628]/90 border-white/10 hover:border-[#C5A16F]/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_30px_-6px_rgba(197,161,111,0.22)]'
      }`}
    >
      {/* Media Image Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#06101E]">
        {imgSrc ? (
          <img 
            src={imgSrc} 
            alt={titleText} 
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
            loading="lazy" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#0B172A] text-[#C5A16F]/30 text-3xl">
            ✦
          </div>
        )}

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-black/30 pointer-events-none" />

        {/* Badges */}
        {(badgeRight || badgeLeft) && (
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none z-10 gap-1.5">
            {badgeRight && (
              <span className="inline-flex items-center text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#070F1E]/85 backdrop-blur-md text-[#C5A16F] border border-[#C5A16F]/30 shadow-sm leading-none">
                {badgeRight}
              </span>
            )}
            {badgeLeft && (
              <span className="inline-flex items-center text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30 shadow-sm ms-auto leading-none">
                {badgeLeft}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-grow">
        <div>
          <h4 className={`text-sm sm:text-base font-bold mb-1.5 transition-colors line-clamp-1 ${
            isLight ? 'text-slate-900 group-hover:text-[#8A5800]' : 'text-white group-hover:text-[#C5A16F]'
          }`}>
            {titleText}
          </h4>

          <p className={`text-xs leading-relaxed mb-3 line-clamp-2 font-light ${
            isLight ? 'text-slate-600' : 'text-gray-400'
          }`}>
            {descText}
          </p>
        </div>

        {/* Footer Meta & Explore Button */}
        <div className={`pt-2.5 border-t flex items-center justify-between gap-2 text-xs ${
          isLight ? 'border-slate-100' : 'border-white/5'
        }`}>
          {metaValText ? (
            <div className="flex flex-col">
              <span className={`text-[9px] uppercase tracking-wider font-bold ${
                isLight ? 'text-slate-400' : 'text-gray-400'
              }`}>
                {metaKeyText}
              </span>
              <span className={`text-xs font-black ${
                isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]'
              }`}>
                {metaValText}
              </span>
            </div>
          ) : <div />}

          <Link 
            href={serviceLink}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 shadow-sm ${
              isLight
                ? 'bg-slate-100 hover:bg-[#C5A16F] text-slate-800 hover:text-[#050B14]'
                : 'bg-white/10 hover:bg-[#C5A16F] text-gray-200 hover:text-[#050B14]'
            }`}
          >
            <span>{linkText}</span>
            <svg 
              className={`w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`}
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
    </div>
  );
}
