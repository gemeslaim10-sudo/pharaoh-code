'use client';

import { SectionData, SectionItem } from '@/types';
import { CategoryItem } from '@/types/category';
import { useState, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { isProjectInCategory } from '@/lib/categoryHelper';
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

  const categories: CategoryItem[] = useMemo(() => {
    return (data as any)?.categories || [];
  }, [data]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return portfolioItems;
    const targetCat = categories.find(c => (c.slug || c.id || '').toLowerCase() === activeFilter.toLowerCase());
    return portfolioItems.filter(item => {
      if (targetCat) {
        return isProjectInCategory(item, targetCat);
      }
      return isProjectInCategory(item, activeFilter);
    });
  }, [portfolioItems, activeFilter, categories]);

  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const swiperInstanceRef = useRef<Swiper | null>(null);

  useEffect(() => {
    if (!swiperContainerRef.current) return;

    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.destroy(true, true);
      swiperInstanceRef.current = null;
    }

    if (filteredItems.length > 0) {
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
    }

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
    if (categories && categories.length > 0) {
      categories.forEach(c => {
        const slug = (c.slug || c.id || '').toLowerCase();
        const label = language === 'ar'
          ? (c.name_ar || c.nameAr || c.name_en || c.nameEn || slug)
          : (c.name_en || c.nameEn || c.name_ar || c.nameAr || slug);
        options.push({
          label,
          filter: slug,
        });
      });
    }
    return options;
  }, [categories, language, t]);

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
        
        {/* Portfolio Content */}
        {filteredItems.length > 0 ? (
          <div ref={swiperContainerRef} className="swiper portfolioSwiper !overflow-visible -mx-2 sm:-mx-3 px-2 sm:px-3 pt-2 pb-6 sm:pt-3 sm:pb-8">
            <div className="swiper-wrapper">
              {filteredItems.map((item: SectionItem, index: number) => (
                <div key={item.id || index} className="swiper-slide h-auto">
                  <PortfolioCard item={item} categories={categories} />
                </div>
              ))}
            </div>

            <div className="portfolio-swiper-pagination flex justify-center items-center gap-1.5 mt-6" />
          </div>
        ) : (
          <div className="py-16 text-center bg-[#091528]/50 border border-white/5 rounded-2xl my-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#C5A16F]/10 border border-[#C5A16F]/20 flex items-center justify-center text-[#C5A16F] text-xl">✦</div>
            <p className="text-sm font-semibold text-gray-400">
              {language === 'ar' ? 'لا توجد مشاريع متوفرة في هذا التصنيف حالياً' : 'No projects available in this category currently.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
