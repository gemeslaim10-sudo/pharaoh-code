'use client';

import { SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { PILLAR_METRICS } from './creativeHelpers';
import { HomeCreativePillarCard } from './HomeCreativePillarCard';
import { useRef, useEffect } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

interface HomeCreativePillarsProps {
  items: SectionItem[];
  activePillar: number;
  onHoverPillar: (index: number) => void;
}

export function HomeCreativePillars({
  items,
  activePillar,
  onHoverPillar,
}: HomeCreativePillarsProps) {
  const { language } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const swiperInstanceRef = useRef<Swiper | null>(null);

  useEffect(() => {
    if (!swiperContainerRef.current) return;

    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.destroy(true, true);
      swiperInstanceRef.current = null;
    }

    swiperInstanceRef.current = new Swiper(swiperContainerRef.current, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 550,
      grabCursor: true,
      watchSlidesProgress: true,
      loop: items.length > 3,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.creative-swiper-pagination',
        clickable: true,
        bulletActiveClass: '!bg-[#C5A16F] !w-6 !rounded-full',
      },
      breakpoints: {
        540: { slidesPerView: 2, spaceBetween: 18 },
        1024: { slidesPerView: 3, spaceBetween: 22 },
      },
    });

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, [language, items.length]);

  return (
    <div className="relative">
      <div ref={swiperContainerRef} className="swiper creativeSwiper !overflow-visible -mx-2 sm:-mx-3 px-2 sm:px-3 pt-2 pb-6 sm:pt-3 sm:pb-8">
        <div className="swiper-wrapper">
          {items.map((item: SectionItem, index: number) => {
            const isHovered = activePillar === index;
            const itemTitle = getDynamicText(item, 'title', language) || item.title || '';
            const itemDesc = getDynamicText(item, 'description', language) || item.description || '';
            const metricData = PILLAR_METRICS[index % PILLAR_METRICS.length] || { metric: '100%', labelAr: 'دقة هندسية', labelEn: 'Precision' };

            return (
              <div key={index} className="swiper-slide h-auto">
                <HomeCreativePillarCard
                  item={item}
                  isHovered={isHovered}
                  onHover={() => onHoverPillar(index)}
                  itemTitle={itemTitle}
                  itemDesc={itemDesc}
                  metricData={metricData}
                  isLight={isLight}
                  language={language}
                />
              </div>
            );
          })}
        </div>

        {/* Swiper Pagination Dots */}
        <div className="creative-swiper-pagination flex justify-center items-center gap-1.5 mt-6" />
      </div>
    </div>
  );
}
