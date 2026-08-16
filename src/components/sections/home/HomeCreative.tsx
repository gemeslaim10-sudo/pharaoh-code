'use client';

import { useState } from 'react';
import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

function stripSvgColors(svg: string): string {
  if (!svg) return '';
  return svg
    .replace(/\s*(?:group-hover:|group-active:)?text-\[#[^\]]+\]/g, '')
    .replace(/\s*(?:group-hover:|group-active:)?stroke-\[#[^\]]+\]/g, '')
    .replace(/stroke="#[a-fA-F0-9]{3,6}"/g, 'stroke="currentColor"')
    .replace(/fill="#[a-fA-F0-9]{3,6}"/g, 'fill="currentColor"')
    .replace(/stroke:#[a-fA-F0-9]{3,6}/g, 'stroke:currentColor')
    .replace(/fill:#[a-fA-F0-9]{3,6}/g, 'fill:currentColor');
}

// Visual highlights / badges for philosophy pillars
const PILLAR_METRICS = [
  { metric: '100%', labelAr: 'دقة هندسية', labelEn: 'Precision' },
  { metric: '0.1s', labelAr: 'استجابة فائقة', labelEn: 'Ultra Speed' },
  { metric: '24/7', labelAr: 'استقرار سيادي', labelEn: 'Availability' },
  { metric: 'A+', labelAr: 'معايير أمان', labelEn: 'Security Grade' },
];

// Fallback items in case data from Firebase is empty or network fails
const FALLBACK_CREATIVE: SectionItem[] = [
  {
    title: 'هندسة معمارية نظيفة',
    title_en: 'Clean Architecture',
    description: 'بناء معمارية برمجية صلبة ومرنة تضمن أعلى مستويات الأمان وسهولة التوسع المستقبلي.',
    description_en: 'Building resilient software architecture ensuring supreme security and effortless scalability.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>`
  },
  {
    title: 'تجربة مستخدم استثنائية',
    title_en: 'Exceptional UX',
    description: 'تصميم تجارب رقمية فاخرة وسلسة تحول زوار منصتك إلى عملاء دائمين.',
    description_en: 'Designing bespoke digital journeys that turn platform visitors into loyal partners.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>`
  },
  {
    title: 'أداء فائق واستقرار سيادي',
    title_en: 'Sovereign Performance',
    description: 'تحسين سرعة الاستجابة بأحدث تقنيات الـ Edge لضمان التواجد المستمر على مدار الساعة.',
    description_en: 'Optimizing response speed with edge tech to ensure 24/7 sovereign availability.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`
  }
];

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-2.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-pulse" />
            <h2 className="text-[#C5A16F] font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
              {getDynamicText(data, 'subtitle', language) || t("creative.subtitle")}
            </h2>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3 tracking-tight">
            {t("creative.titlePart1")}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5DEB3] via-[#C5A16F] to-[#9E7D47] italic">
              {t("creative.titlePart2")}
            </span>
          </h3>

          <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-light max-w-2xl">
            {getDynamicText(data, 'description', language) || (language === 'ar' ? 'فلسفتنا لا تقتصر على كتابة الأكواد، بل تقوم على هندسة حلول برمجية مستدامة تعكس الفخامة والقوة التقنية.' : 'Our philosophy extends beyond clean code to engineering timeless, high-performance digital ecosystems.')}
          </p>
        </div>

        {/* The 3 Pillars Monument Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {creativeItems.map((item: SectionItem, index: number) => {
            const isHovered = activePillar === index;
            const itemTitle = getDynamicText(item, 'title', language) || item.title || '';
            const itemDesc = getDynamicText(item, 'description', language) || item.description || '';
            const metricData = PILLAR_METRICS[index % PILLAR_METRICS.length] || { metric: '100%', labelAr: 'دقة هندسية', labelEn: 'Precision' };

            return (
              <div
                key={index}
                onMouseEnter={() => setActivePillar(index)}
                className={`relative group rounded-2xl p-5 sm:p-7 transition-all duration-400 flex flex-col justify-between overflow-hidden border cursor-default ${
                  isHovered
                    ? 'bg-gradient-to-b from-[#0F1E38] via-[#0A162B] to-[#070F1E] border-[#C5A16F]/40 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(197,161,111,0.15)] -translate-y-1'
                    : 'bg-[#081222]/80 border-white/5 hover:border-white/15'
                }`}
              >
                {/* Top Glowing Beam */}
                <div
                  className={`absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent transition-opacity duration-400 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Top Header inside Card */}
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    {/* Glowing Tech Icon Container */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-400 ${
                        isHovered
                          ? 'bg-gradient-to-br from-[#C5A16F] to-[#9E7D47] text-[#040810] shadow-[0_6px_20px_rgba(197,161,111,0.3)] rotate-2'
                          : 'bg-white/5 text-[#C5A16F] group-hover:bg-[#C5A16F]/20'
                      }`}
                    >
                      <div
                        className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: stripSvgColors(item.iconSvg || '') }}
                      />
                    </div>

                    {/* Quality Label Badge */}
                    <div className="text-right">
                      <span className="text-[11px] font-mono text-[#C5A16F] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md bg-[#C5A16F]/10 border border-[#C5A16F]/20">
                        {language === 'ar' ? metricData.labelAr : metricData.labelEn}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h4 className="text-base sm:text-xl font-bold text-white mb-2 group-hover:text-white transition-colors duration-300">
                    {itemTitle}
                  </h4>
                  <p className="text-gray-300 sm:text-gray-400 text-xs sm:text-sm leading-relaxed font-light mb-4 sm:mb-6">
                    {itemDesc}
                  </p>
                </div>

                {/* Bottom Metric & Accent Line */}
                <div className="relative z-10 pt-3.5 sm:pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg sm:text-xl font-black text-[#C5A16F] font-mono">
                      {metricData.metric}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {language === 'ar' ? metricData.labelAr : metricData.labelEn}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <div className={`h-[2px] transition-all duration-400 ${isHovered ? 'w-8 bg-[#C5A16F]' : 'w-4 bg-white/10'}`} />
                    <span className="w-1 h-1 rounded-full bg-[#C5A16F]" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-10 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#0F1E38]/50 via-[#0A162B]/70 to-[#0F1E38]/50 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <p className="text-xs sm:text-sm text-gray-300 font-light">
              {language === 'ar' 
                ? 'كل سطر برمجي نصنعه يخضع لاختبارات أداء وأمان قياسية لضمان أقصى كفاءة.'
                : 'Every line of code undergoes rigorous performance benchmarks and security audits.'}
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold tracking-wider text-[#C5A16F] uppercase px-2.5 py-1 rounded-md bg-[#C5A16F]/10 border border-[#C5A16F]/20 shrink-0">
            PHARAOH ARCHITECTURE
          </span>
        </div>

      </div>
    </section>
  );
}
