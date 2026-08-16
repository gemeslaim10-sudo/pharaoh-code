'use client';
import { SectionData, SectionItem } from '@/types';
import { useState, useEffect } from 'react';
import Link from 'next/link';
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

const TECH_TAGS: Record<number, string[]> = {
  0: ['Enterprise Cloud', 'Custom API', 'High Scale'],
  1: ['iOS Native', 'Android Native', 'Flutter'],
  2: ['Next.js 15', 'Full-Stack', 'SSR & Edge'],
  3: ['UI / UX', 'Design System', 'Figma Mastery'],
  4: ['AI Automation', 'LLM Models', 'Smart Workflows'],
  5: ['Cyber Security', 'Pen Testing', 'Zero Trust'],
  6: ['DevOps', 'Kubernetes', 'CI / CD Pipelines'],
  7: ['Growth SEO', 'Performance', 'Rank #1'],
};

const FALLBACK_SERVICES: SectionItem[] = [
  {
    title: 'تطوير البرمجيات والأنظمة',
    title_en: 'Enterprise Software Engineering',
    description: 'بناء أنظمة برمجية سحابية مخصصة ومصممة بأعلى معايير الأداء وقابلية التوسع.',
    description_en: 'Custom cloud software architectures engineered for extreme scale and performance.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`
  },
  {
    title: 'تطبيقات الهواتف الذكية',
    title_en: 'Mobile Applications',
    description: 'تطبيقات أصلية فائقة السرعة على منصات iOS و Android بأحدث التقنيات العالمية.',
    description_en: 'High-performance native apps for iOS & Android built with cutting-edge tech.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>`
  },
  {
    title: 'تطوير مواقع الويب الحديثة',
    title_en: 'Modern Web Platforms',
    description: 'واجهات وتطبيقات ويب سريعة جداً مبنية بأحدث معمارية Next.js والـ Edge Computing.',
    description_en: 'Blazing fast web platforms powered by Next.js and modern Edge architectures.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>`
  },
  {
    title: 'تصميم تجربة المستخدم UI/UX',
    title_en: 'UI / UX Design Systems',
    description: 'تصاميم فريدة وفاخرة تواكب أعلى معايير الجاذبية والسهولة لزيادة التفاعل.',
    description_en: 'Bespoke, luxury user experiences and atomic design systems that drive engagement.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>`
  }
];

export default function HomeServices({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  const itemsToRender = (data?.items && data.items.length > 0 && data.items[0]?.iconSvg)
    ? data.items
    : FALLBACK_SERVICES;

  useEffect(() => {
    if (!isAutoPlay || itemsToRender.length <= 1) return;
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % itemsToRender.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlay, itemsToRender.length]);

  const activeItem: SectionItem = itemsToRender[selectedIndex] ?? itemsToRender[0] ?? FALLBACK_SERVICES[0]!;
  const activeTitle = getDynamicText(activeItem, 'title', language) || activeItem.title || '';
  const activeDesc = getDynamicText(activeItem, 'description', language) || activeItem.description || '';
  const activeUrl = activeItem?.id ? `/services/${activeItem.id}` : '/services';
  const activeTags = TECH_TAGS[selectedIndex % Object.keys(TECH_TAGS).length] || ['High Performance', 'Scalable', 'Modern'];

  return (
    <section 
      id="services" 
      className="relative py-12 sm:py-20 bg-[#050B14] overflow-hidden text-white select-none" 
      dir={direction}
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-[#C5A16F]/8 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] bg-blue-600/8 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-12 gap-3 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-2 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping" />
              <h2 className="text-[#C5A16F] font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
                {t("services.subtitle")}
              </h2>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {t("services.titlePart1")}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
                {t("services.titlePart2")}
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setSelectedIndex((prev) => (prev === 0 ? itemsToRender.length - 1 : prev - 1))}
              aria-label="Previous service"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0D182E] hover:bg-[#C5A16F] hover:text-[#050B14] text-gray-300 border border-white/10 hover:border-[#C5A16F] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md active:scale-95"
            >
              <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedIndex((prev) => (prev + 1) % itemsToRender.length)}
              aria-label="Next service"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0D182E] hover:bg-[#C5A16F] hover:text-[#050B14] text-gray-300 border border-white/10 hover:border-[#C5A16F] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md active:scale-95"
            >
              <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

          {/* DESKTOP & TABLET: MASTER SPOTLIGHT + 2-COLUMN GRID (Hidden on Mobile) */}
          <div className="hidden md:grid md:grid-cols-12 gap-6 items-stretch">
            
            {/* LEFT: MASTER HERO CARD (Spotlight on Active Service) */}
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

            {/* RIGHT: COMPACT REFINED 2-COLUMN GRID */}
            <div className="md:col-span-7 grid grid-cols-2 gap-3.5">
              {itemsToRender.map((item: SectionItem, index: number) => {
                const isSelected = selectedIndex === index;
                const titleText = getDynamicText(item, 'title', language) || item.title || '';
                const descText = getDynamicText(item, 'description', language) || item.description || '';

                return (
                  <div
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`p-4.5 rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#122345] to-[#0A162B] border-[#C5A16F] shadow-lg'
                        : 'bg-[#0B1528]/80 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                          isSelected
                            ? 'bg-[#C5A16F] text-[#050B14] shadow-sm'
                            : 'bg-white/5 text-[#C5A16F]'
                        }`}
                      >
                        <div
                          className="w-4.5 h-4.5 flex items-center justify-center"
                          dangerouslySetInnerHTML={{ __html: stripSvgColors(item.iconSvg || '') }}
                        />
                      </div>
                    </div>

                    <div>
                      <h5
                        className={`text-base font-bold transition-colors mb-1 line-clamp-1 ${
                          isSelected ? 'text-white' : 'text-gray-300'
                        }`}
                      >
                        {titleText}
                      </h5>
                      <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed font-light">
                        {descText}
                      </p>
                    </div>

                    {/* Micro Footer Indicator */}
                    <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between text-[11px]">
                      <span className={`font-medium ${isSelected ? 'text-[#C5A16F]' : 'text-gray-500'}`}>
                        {isSelected 
                          ? (language === 'ar' ? 'معروض ✦' : 'Active ✦') 
                          : (language === 'ar' ? 'معاينة' : 'Preview')}
                      </span>
                      <svg 
                        className={`w-3 h-3 ${isSelected ? 'text-[#C5A16F]' : 'text-gray-600'} ${direction === 'rtl' ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* MOBILE EXCLUSIVE DEDICATED DESIGN (Spacious, Luxury Cards with Carousel Paging) */}
          <div className="md:hidden space-y-4">
            {/* Active Service Showcase Card for Mobile */}
            <div className="relative rounded-2xl p-5 bg-gradient-to-br from-[#0F1F3D] via-[#091427] to-[#050B14] border border-[#C5A16F]/40 shadow-2xl overflow-hidden">
              <div className="absolute top-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent shadow-[0_0_10px_#C5A16F]" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C5A16F] via-[#D4AF37] to-[#9E7D47] text-[#050B14] flex items-center justify-center p-2.5 shadow-lg shadow-[#C5A16F]/20">
                  <div
                    className="w-6 h-6 flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: stripSvgColors(activeItem?.iconSvg || '') }}
                  />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
                  {language === 'ar' ? `خدمة 0${selectedIndex + 1}` : `Service 0${selectedIndex + 1}`}
                </span>
              </div>

              <h4 className="text-xl font-black text-white mb-2 leading-tight">
                {activeTitle}
              </h4>
              <p className="text-gray-300 text-xs leading-relaxed mb-4 font-light">
                {activeDesc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {activeTags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-white/5 border border-white/10 text-[#C5A16F]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Direct Action Link */}
              <Link
                href={activeUrl}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C5A16F] via-[#D4AF37] to-[#C5A16F] text-[#050B14] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#C5A16F]/20 active:scale-95 transition-all"
              >
                <span>{t("services.exploreBtn") || (language === 'ar' ? 'استكشف كافة التفاصيل' : 'Explore Details')}</span>
                <svg
                  className={`w-4 h-4 shrink-0 ${direction === 'rtl' ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Mobile Horizontal Pill / Tab Selector with Smooth Scrolling */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
              {itemsToRender.map((item: SectionItem, index: number) => {
                const isSelected = selectedIndex === index;
                const titleText = getDynamicText(item, 'title', language) || item.title || '';

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`snap-start shrink-0 px-4 py-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-[#C5A16F] text-[#050B14] border-[#C5A16F] shadow-lg shadow-[#C5A16F]/20'
                        : 'bg-[#0B1528] text-gray-300 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 flex items-center justify-center ${isSelected ? 'text-[#050B14]' : 'text-[#C5A16F]'}`}
                      dangerouslySetInnerHTML={{ __html: stripSvgColors(item.iconSvg || '') }}
                    />
                    <span>{titleText}</span>
                  </button>
                );
              })}
            </div>
          </div>
      </div>
    </section>
  );
}
