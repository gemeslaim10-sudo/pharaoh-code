'use client';

import { SectionData, SectionItem } from '@/types';
import { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import PortfolioCard from '@/components/services/portfolio/PortfolioCard';
import { HomePortfolioHeader } from './portfolio/HomePortfolioHeader';
import { HomePortfolioFilterBar } from './portfolio/HomePortfolioFilterBar';
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
      const cats: string[] = Array.isArray((item as Record<string, unknown>).categories)
        ? ((item as Record<string, unknown>).categories as string[]).map((c: string) => c.toLowerCase())
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
        540: { slidesPerView: 2, spaceBetween: 18 },
        840: { slidesPerView: 3, spaceBetween: 20 },
        1140: { slidesPerView: 4, spaceBetween: 22 },
      },
    });

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, [language, filteredItems.length]);

  const filterOptions = useMemo(() => {
    const options = [
      { label: t("portfolio.filterAll") || (language === 'ar' ? 'الكل' : 'All'), filter: 'all' },
    ];
    const dbCats = (data as any)?.categories as Array<{ id: string; nameAr: string; nameEn: string; slug: string }> | undefined;
    if (dbCats && dbCats.length > 0) {
      dbCats.forEach(c => {
        options.push({
          label: language === 'ar' ? (c.nameAr || c.nameEn) : (c.nameEn || c.nameAr),
          filter: (c.slug || c.id).toLowerCase(),
        });
      });
      return options;
    }
    return [
      { label: t("portfolio.filterAll") || (language === 'ar' ? 'الكل' : 'All'), filter: 'all' },
      { label: t("portfolio.filterWeb") || 'تطبيقات الويب', filter: 'web' },
      { label: t("portfolio.filterApp") || 'تطبيقات الموبايل', filter: 'app' },
      { label: t("portfolio.filterMotion") || 'موشن جرافيكس', filter: 'motion' },
    ];
  }, [data, language, t]);

  return (
    <section id="portfolio" className="relative py-12 sm:py-20 bg-[#0A192F] overflow-hidden" dir={direction}>
      {/* High-Performance Radial Ambient Lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle, rgba(197,161,111,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-10 left-0 w-96 h-96 pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <HomePortfolioHeader
          subtitle={getDynamicText(data, 'subtitle', language) || t("portfolio.subtitle")}
          titlePart1={t("portfolio.titlePart1")}
          titlePart2={t("portfolio.titlePart2")}
          desc={getDynamicText(data, 'description', language) || (language === 'ar' ? 'معرض يضم أبرز مشاريعنا وحلولنا البرمجية المبتكرة ذات الأثر الملموس.' : 'A showcase of our premier digital architectures and high-impact software solutions.')}
          direction={direction}
          viewAllText={t("portfolio.viewAllProjects") || (language === 'ar' ? 'عرض كافة الأعمال' : 'View Full Portfolio')}
        />

        <HomePortfolioFilterBar
          filterOptions={filterOptions}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          direction={direction}
        />
        
        {/* Portfolio Swiper Carousel with Anti-Clipping Padding */}
        <div ref={swiperContainerRef} className="swiper portfolioSwiper !overflow-visible -mx-2 sm:-mx-3 px-2 sm:px-3 pt-2 pb-6 sm:pt-3 sm:pb-8">
          <div className="swiper-wrapper">
            {filteredItems.map((item: SectionItem, index: number) => (
              <div key={item.id || index} className="swiper-slide h-auto">
                <PortfolioCard item={item} />
              </div>
            ))}
          </div>

          <div className="portfolio-swiper-pagination flex justify-center items-center gap-1.5 mt-6" />
        </div>
      </div>
    </section>
  );
}
