'use client';

import Link from 'next/link';
import { SectionItem } from '@/types';
import { stripSvgColors } from './homeServicesHelpers';

interface HomeServicesCardProps {
  item: SectionItem;
  index: number;
  titleText: string;
  descText: string;
  tags: string[];
  highlights: string[];
  serviceUrl: string;
  isLight: boolean;
  direction: 'rtl' | 'ltr';
  exploreBtnText: string;
}

export function HomeServicesCard({
  item,
  index,
  titleText,
  descText,
  tags,
  highlights,
  serviceUrl,
  isLight,
  direction,
  exploreBtnText,
}: HomeServicesCardProps) {
  return (
    <div 
      className={`group relative rounded-2xl p-6 sm:p-7 border transition-all duration-400 shadow-xl flex flex-col justify-between overflow-hidden h-full hover:-translate-y-2 select-none ${
        isLight
          ? 'bg-white border-slate-300 hover:border-[#8A5800] hover:shadow-[0_20px_40px_-10px_rgba(138,88,0,0.2)]'
          : 'bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050B14] border-white/10 hover:border-[#C5A16F]/70 hover:shadow-[0_20px_45px_-10px_rgba(197,161,111,0.3)]'
      }`}
    >
      {/* Top Glowing Beam */}
      <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_12px_#C5A16F] z-30" />

      {/* Shimmer Light Sweep on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30" />

      <div className="relative z-10">
        {/* Top Header inside Card */}
        <div className="flex items-center justify-between mb-5">
          <div className={`w-13 h-13 rounded-2xl border flex items-center justify-center transition-all duration-400 shadow-md group-hover:scale-108 ${
            isLight
              ? 'bg-slate-100 border-slate-300 group-hover:bg-[#8A5800] group-hover:border-[#8A5800] group-hover:text-white'
              : 'bg-white/5 border-white/10 group-hover:bg-gradient-to-br group-hover:from-[#C5A16F] group-hover:to-[#9E7D47] group-hover:border-[#C5A16F]'
          }`}>
            <div 
              className={`transition-colors duration-400 group-hover:text-white ${
                isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]'
              }`}
              dangerouslySetInnerHTML={{ __html: stripSvgColors(item.iconSvg || '') }} 
            />
          </div>

          <span className={`font-mono text-xs font-black px-2.5 py-1 rounded-lg border transition-all duration-300 shadow-sm ${
            isLight
              ? 'bg-amber-50 border-[#8A5800]/40 text-[#8A5800]'
              : 'bg-white/5 border-[#C5A16F]/30 text-[#C5A16F]'
          }`}>
            0{index + 1}
          </span>
        </div>

        {/* Title & Description */}
        <h4 className={`text-lg sm:text-xl font-black mb-2.5 transition-colors duration-300 line-clamp-1 ${
          isLight
            ? 'text-slate-900 group-hover:text-[#8A5800]'
            : 'text-white group-hover:text-[#C5A16F]'
        }`}>
          {titleText}
        </h4>

        <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 ${
          isLight ? 'text-slate-800 font-normal' : 'text-gray-300 font-light'
        }`}>
          {descText}
        </p>

        {/* Highlights Checklist */}
        <div className={`space-y-2 mb-5 py-2 border-y ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
          {highlights.map((highlight: string, hIdx: number) => (
            <div key={hIdx} className="flex items-center gap-2 text-xs">
              <span className={`font-bold text-xs ${isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]'}`}>✓</span>
              <span className={`line-clamp-1 font-medium ${isLight ? 'text-slate-900' : 'text-gray-300'}`}>
                {highlight}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.map((tag: string, tIdx: number) => (
            <span 
              key={tIdx}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-white/5 border-white/10 text-gray-300'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Action Link Button */}
      <div className={`pt-3.5 border-t relative z-10 ${
        isLight ? 'border-slate-200' : 'border-white/5'
      }`}>
        <Link
          href={serviceUrl}
          className={`w-full py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-xl font-extrabold text-xs flex items-center justify-between transition-all duration-300 shadow-sm border whitespace-nowrap shrink-0 ${
            isLight
              ? 'bg-amber-50/80 border-[#C5A16F]/40 text-[#8A5800] group-hover:bg-[#C5A16F] group-hover:text-[#050B14]'
              : 'bg-[#C5A16F]/10 border-[#C5A16F]/30 text-[#C5A16F] group-hover:bg-[#C5A16F] group-hover:text-[#050B14] group-hover:shadow-[0_0_15px_rgba(197,161,111,0.4)]'
          }`}
        >
          <span className="whitespace-nowrap shrink-0">{exploreBtnText}</span>
          <svg
            className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
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
  );
}
