'use client';
import { SectionData, SectionItem } from '@/types';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { TECH_TAGS, FALLBACK_SERVICES } from './services/homeServicesHelpers';
import { HomeServicesSpotlight } from './services/HomeServicesSpotlight';
import { HomeServicesGrid } from './services/HomeServicesGrid';
import { HomeServicesMobile } from './services/HomeServicesMobile';

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

        {/* Desktop & Tablet: Master Spotlight + 2-Column Grid */}
        <div className="hidden md:grid md:grid-cols-12 gap-6 items-stretch">
          <HomeServicesSpotlight
            activeItem={activeItem}
            activeTitle={activeTitle}
            activeDesc={activeDesc}
            activeUrl={activeUrl}
            activeTags={activeTags}
          />
          <HomeServicesGrid
            items={itemsToRender}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />
        </div>

        {/* Mobile Exclusive View */}
        <HomeServicesMobile
          items={itemsToRender}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          activeItem={activeItem}
          activeTitle={activeTitle}
          activeDesc={activeDesc}
          activeUrl={activeUrl}
          activeTags={activeTags}
        />
      </div>
    </section>
  );
}
