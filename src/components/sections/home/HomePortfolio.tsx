'use client';
import { SectionData, SectionItem } from '@/types';
import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import PortfolioCard from '@/components/services/portfolio/PortfolioCard';

import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function HomePortfolio({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();

  const [activeFilter, setActiveFilter] = useState('all');

  const portfolioItems: SectionItem[] = useMemo(() => {
    return data?.items || [];
  }, [data?.items]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return portfolioItems;
    return portfolioItems.filter(item => {
      const cat = (item.category || item.filterClass || '').toLowerCase();
      const cats: string[] = Array.isArray((item as any).categories)
        ? (item as any).categories.map((c: string) => c.toLowerCase())
        : [];
      return cat.includes(activeFilter.toLowerCase()) || cats.some((c: string) => c.includes(activeFilter.toLowerCase()));
    });
  }, [portfolioItems, activeFilter]);

  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const swiperInstanceRef = useRef<Swiper | null>(null);

  useEffect(() => {
    if (!swiperContainerRef.current) return;

    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.destroy(true, true);
      swiperInstanceRef.current = null;
    }

    swiperInstanceRef.current = new Swiper(swiperContainerRef.current, {
      modules: [Autoplay, Pagination, Navigation],
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 550,
      grabCursor: true,
      watchSlidesProgress: true,
      loop: filteredItems.length > 4,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.portfolio-swiper-pagination',
        clickable: true,
        bulletActiveClass: '!bg-[#C5A16F] !w-6 !rounded-full',
      },
      navigation: {
        nextEl: '.portfolio-swiper-next',
        prevEl: '.portfolio-swiper-prev',
      },
      breakpoints: {
        540: {
          slidesPerView: 2,
          spaceBetween: 18,
        },
        840: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1140: {
          slidesPerView: 4,
          spaceBetween: 22,
        },
      },
    });

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, [language, filteredItems.length]);

  const filterOptions = [
    { label: t("portfolio.filterAll") || 'الكل', filter: 'all' },
    { label: t("portfolio.filterWeb") || 'تطبيقات الويب', filter: 'web' },
    { label: t("portfolio.filterApp") || 'تطبيقات الموبايل', filter: 'app' },
    { label: t("portfolio.filterMotion") || 'موشن جرافيكس', filter: 'motion' },
  ];

  return (
    <section id="portfolio" className="relative py-12 sm:py-20 bg-[#0A192F] overflow-hidden" dir={direction}>
      {/* High-Performance Radial Ambient Lighting */}
      <div 
        className="absolute top-1/4 right-0 w-96 h-96 pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(197,161,111,0.12) 0%, transparent 70%)' }} 
      />
      <div 
        className="absolute bottom-10 left-0 w-96 h-96 pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-4 sm:mb-5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping shrink-0" />
              <h2 className="text-[#C5A16F] font-bold tracking-[0.15em] uppercase text-[11px] sm:text-xs leading-normal">
                {getDynamicText(data, 'subtitle', language) || t("portfolio.subtitle")}
              </h2>
            </div>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-normal leading-[1.3] pt-0.5">
              {t("portfolio.titlePart1")}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
                {t("portfolio.titlePart2")}
              </span>
            </h3>

            <p className="text-gray-400 mt-2 text-xs sm:text-sm md:text-base leading-relaxed font-light">
              {getDynamicText(data, 'description', language) || (language === 'ar' ? 'معرض يضم أبرز مشاريعنا وحلولنا البرمجية المبتكرة ذات الأثر الملموس.' : 'A showcase of our premier digital architectures and high-impact software solutions.')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-white/5 hover:bg-[#C5A16F] text-gray-200 hover:text-[#050B14] font-bold text-xs border border-white/10 hover:border-[#C5A16F] transition-all duration-300 group shadow-md"
            >
              <span>{t("portfolio.viewAllProjects") || (language === 'ar' ? 'عرض كافة الأعمال' : 'View Full Portfolio')}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`}
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

        {/* Filter Tabs + Swiper Nav */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((tab) => (
              <button
                key={tab.filter}
                onClick={() => setActiveFilter(tab.filter)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeFilter === tab.filter
                    ? 'bg-[#C5A16F] text-[#050B14] shadow-md shadow-[#C5A16F]/20'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button 
              aria-label="Previous Projects"
              className="portfolio-swiper-prev w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A16F] text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#050B14] transition-all flex items-center justify-center cursor-pointer shadow-md disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              aria-label="Next Projects"
              className="portfolio-swiper-next w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A16F] text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#050B14] transition-all flex items-center justify-center cursor-pointer shadow-md disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Portfolio Swiper Carousel */}
        <div ref={swiperContainerRef} className="swiper portfolioSwiper overflow-hidden px-1 py-3">
          <div className="swiper-wrapper">
            {filteredItems.map((item: SectionItem, index: number) => (
              <div key={(item as any).id || index} className="swiper-slide h-auto">
                <PortfolioCard item={item} />
              </div>
            ))}
          </div>

          {/* Swiper Pagination Dots */}
          <div className="portfolio-swiper-pagination flex justify-center items-center gap-1.5 mt-6" />
        </div>
      </div>
    </section>
  );
}
