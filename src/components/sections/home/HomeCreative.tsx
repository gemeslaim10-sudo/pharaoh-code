'use client';

import { useState } from 'react';
import { SectionData } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { FALLBACK_CREATIVE } from './creative/creativeHelpers';
import { HomeCreativePillars } from './creative/HomeCreativePillars';
import { HomeCreativeBanner } from './creative/HomeCreativeBanner';

export default function HomeCreative({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();
  const [activePillar, setActivePillar] = useState<number>(0);

  const creativeItems = (data?.items && data.items.length > 0) ? data.items : FALLBACK_CREATIVE;

  return (
    <section 
      id="about-creative" 
      className="relative py-14 sm:py-20 bg-[#040810] overflow-hidden text-white select-none" 
      dir={direction}
    >
      {/* Background Lighting Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#C5A16F]/8 via-blue-900/8 to-transparent blur-[140px] rounded-full pointer-events-none" />
      
      {/* Background Architectural Geometry Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A16F_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Monumental Typography */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-4 sm:mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-pulse shrink-0" />
            <h2 className="text-[#C5A16F] font-bold tracking-[0.15em] uppercase text-[11px] sm:text-xs leading-normal">
              {getDynamicText(data, 'subtitle', language) || t("creative.subtitle")}
            </h2>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-[1.3] mb-3 tracking-normal pt-0.5">
            {t("creative.titlePart1")}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5DEB3] via-[#C5A16F] to-[#9E7D47] italic">
              {t("creative.titlePart2")}
            </span>
          </h3>

          <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-light max-w-2xl">
            {getDynamicText(data, 'description', language) || (language === 'ar' ? 'فلسفتنا لا تقتصر على كتابة الأكواد، بل تقوم على هندسة حلول برمجية مستدامة تعكس الفخامة والقوة التقنية.' : 'Our philosophy extends beyond clean code to engineering timeless, high-performance digital ecosystems.')}
          </p>
        </div>

        <HomeCreativePillars
          items={creativeItems}
          activePillar={activePillar}
          onHoverPillar={setActivePillar}
        />

        <HomeCreativeBanner />
      </div>
    </section>
  );
}
