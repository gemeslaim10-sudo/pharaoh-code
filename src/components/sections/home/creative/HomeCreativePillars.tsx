'use client';
import { SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { stripSvgColors, PILLAR_METRICS } from './creativeHelpers';
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
        540: {
          slidesPerView: 2,
          spaceBetween: 18,
        },
        1024: {
          slidesPerView: 3,
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
  }, [language, items.length]);

  return (
    <div className="relative">
      <div ref={swiperContainerRef} className="swiper creativeSwiper overflow-hidden px-1 py-3">
        <div className="swiper-wrapper">
          {items.map((item: SectionItem, index: number) => {
            const isHovered = activePillar === index;
            const itemTitle = getDynamicText(item, 'title', language) || item.title || '';
            const itemDesc = getDynamicText(item, 'description', language) || item.description || '';
            const metricData = PILLAR_METRICS[index % PILLAR_METRICS.length] || { metric: '100%', labelAr: 'دقة هندسية', labelEn: 'Precision' };

            return (
              <div key={index} className="swiper-slide h-auto">
                <div
                  onMouseEnter={() => onHoverPillar(index)}
                  className={`relative group rounded-2xl p-5 sm:p-7 transition-all duration-400 flex flex-col justify-between overflow-hidden border cursor-default h-full hover:-translate-y-2 select-none ${
                    isLight
                      ? isHovered
                        ? 'bg-white border-[#C5A16F] shadow-[0_20px_40px_-10px_rgba(197,161,111,0.3)]'
                        : 'bg-white border-slate-200 shadow-sm hover:border-[#C5A16F]/50'
                      : isHovered
                        ? 'bg-gradient-to-b from-[#0F1E38] via-[#0A162B] to-[#070F1E] border-[#C5A16F]/70 shadow-[0_20px_45px_-10px_rgba(197,161,111,0.3)]'
                        : 'bg-[#081222]/90 border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Top Glowing Beam */}
                  <div
                    className={`absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent transition-opacity duration-500 shadow-[0_0_12px_#C5A16F] z-30 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Shimmer Light Sweep on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30" />

                  {/* Top Header inside Card */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4 sm:mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-400 shadow-md ${
                          isHovered
                            ? 'bg-gradient-to-br from-[#C5A16F] via-[#DFB77D] to-[#9E7D47] text-[#040810] shadow-[0_6px_20px_rgba(197,161,111,0.35)] rotate-3'
                            : isLight
                              ? 'bg-slate-100 text-[#8A5800]'
                              : 'bg-white/5 text-[#C5A16F] group-hover:bg-[#C5A16F]/20'
                        }`}
                      >
                        <div
                          className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
                          dangerouslySetInnerHTML={{ __html: stripSvgColors(item.iconSvg || '') }}
                        />
                      </div>

                      <div className="text-right">
                        <span className={`text-[11px] font-mono uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-lg border shadow-sm ${
                          isLight
                            ? 'text-[#8A5800] bg-amber-50/90 border-[#C5A16F]/30'
                            : 'text-[#C5A16F] bg-[#C5A16F]/10 border-[#C5A16F]/30'
                        }`}>
                          {language === 'ar' ? metricData.labelAr : metricData.labelEn}
                        </span>
                      </div>
                    </div>

                    <h4 className={`text-base sm:text-lg font-black mb-2 transition-colors duration-300 ${
                      isLight ? 'text-slate-900 group-hover:text-[#8A5800]' : 'text-white group-hover:text-[#C5A16F]'
                    }`}>
                      {itemTitle}
                    </h4>
                    <p className={`text-xs sm:text-sm leading-relaxed font-light mb-4 sm:mb-6 ${
                      isLight ? 'text-slate-600' : 'text-gray-300'
                    }`}>
                      {itemDesc}
                    </p>
                  </div>

                  {/* Bottom Metric & Accent Line */}
                  <div className={`relative z-10 pt-3.5 sm:pt-4 border-t flex items-center justify-between ${
                    isLight ? 'border-slate-100' : 'border-white/5'
                  }`}>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-lg sm:text-xl font-black font-mono ${
                        isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]'
                      }`}>
                        {metricData.metric}
                      </span>
                      <span className={`text-[11px] font-medium ${
                        isLight ? 'text-slate-500' : 'text-gray-400'
                      }`}>
                        {language === 'ar' ? metricData.labelAr : metricData.labelEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className={`h-[2px] transition-all duration-500 ${
                        isHovered ? 'w-8 bg-[#C5A16F] shadow-[0_0_6px_#C5A16F]' : 'w-4 bg-white/10'
                      }`} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F]" />
                    </div>
                  </div>
                </div>
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
