'use client';
import Link from 'next/link';
import { SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { stripSvgColors } from './homeServicesHelpers';

interface HomeServicesSpotlightProps {
  activeItem: SectionItem;
  activeTitle: string;
  activeDesc: string;
  activeUrl: string;
  activeTags: string[];
}

export function HomeServicesSpotlight({
  activeItem,
  activeTitle,
  activeDesc,
  activeUrl,
  activeTags,
}: HomeServicesSpotlightProps) {
  const { t, language, direction } = useTranslation();

  return (
    <div className="md:col-span-5 flex flex-col">
      <div className="relative rounded-2xl p-7 bg-gradient-to-br from-[#0F1F3D] via-[#091427] to-[#050B14] border border-[#C5A16F]/35 shadow-xl flex flex-col justify-between overflow-hidden group h-full">
        {/* Background Luxury Glow Orb */}
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-[#C5A16F]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Bar: Icon + Enterprise Badge */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#C5A16F] via-[#D4AF37] to-[#9E7D47] text-[#050B14] flex items-center justify-center p-3 shadow-md">
            <div
              className="w-7 h-7 flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: stripSvgColors(activeItem?.iconSvg || '') }}
            />
          </div>
          
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {language === 'ar' ? 'حل سيادي معتمد' : 'Enterprise Ready'}
          </span>
        </div>

        {/* Middle: Title, Description & Tech Tags */}
        <div className="relative z-10 my-5">
          <h4 className="text-2xl font-bold text-white mb-2 leading-snug">
            {activeTitle}
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light line-clamp-4">
            {activeDesc}
          </p>

          {/* Tech Pills */}
          <div className="flex flex-wrap gap-1.5">
            {activeTags.map((tag, i) => (
              <span 
                key={i} 
                className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-white/5 border border-white/10 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="relative z-10 pt-3 border-t border-white/10">
          <Link
            href={activeUrl}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C5A16F] via-[#D4AF37] to-[#C5A16F] text-[#050B14] font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
          >
            <span>{t("services.exploreBtn") || (language === 'ar' ? 'استكشف كافة التفاصيل' : 'Explore Details')}</span>
            <svg
              className={`w-3.5 h-3.5 shrink-0 ${direction === 'rtl' ? 'rotate-180' : ''}`}
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
