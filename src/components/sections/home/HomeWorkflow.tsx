'use client';
import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { useRef, useEffect } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

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

export default function HomeWorkflow({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const defaultSteps = [
    {
      title: t("workflow.step1Title"),
      description: t("workflow.step1Desc"),
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`
    },
    {
      title: t("workflow.step2Title"),
      description: t("workflow.step2Desc"),
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>`
    },
    {
      title: t("workflow.step3Title"),
      description: t("workflow.step3Desc"),
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`
    },
    {
      title: t("workflow.step4Title"),
      description: t("workflow.step4Desc"),
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>`
    }
  ];

  const stepsToRender = (data?.steps && data.steps.length > 0 && data.steps[0].iconSvg) ? data.steps : defaultSteps;

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
      loop: stepsToRender.length > 4,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.workflow-swiper-pagination',
        clickable: true,
        bulletActiveClass: '!bg-[#C5A16F] !w-6 !rounded-full',
      },
      navigation: {
        nextEl: '.workflow-swiper-next',
        prevEl: '.workflow-swiper-prev',
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
  }, [language, stepsToRender.length]);

  return (
    <section 
      id="workflow" 
      className="relative py-12 sm:py-20 bg-[#050B14] overflow-hidden text-white select-none" 
      dir={direction}
    >
      {/* Background ambient lighting - High Performance Radial Gradients */}
      <div 
        className="absolute top-1/4 -right-32 w-[500px] h-[500px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(197,161,111,0.12) 0%, transparent 70%)' }} 
      />
      <div 
        className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }} 
      />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-4 sm:mb-5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping shrink-0" />
              <h2 className="text-[#C5A16F] font-bold tracking-[0.15em] uppercase text-[11px] sm:text-xs leading-normal">
                {getDynamicText(data, 'subtitle', language) || t("workflow.subtitle")}
              </h2>
            </div>
            
            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-normal leading-[1.3] pt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t("workflow.titlePart1")}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
                {t("workflow.titlePart2")}
              </span>
            </h3>

            <p className={`mt-2 text-xs sm:text-sm md:text-base leading-relaxed font-light ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
              {getDynamicText(data, 'description', language) || (language === 'ar' ? 'منهجية دقيقة ومحكمة تقود مشروعك من الفكرة المجردة إلى إطلاق سيادي متكامل.' : 'A refined methodology that transforms your vision into a sovereign digital reality.')}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button 
              aria-label="Previous Steps"
              className="workflow-swiper-prev w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A16F] text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#050B14] transition-all flex items-center justify-center cursor-pointer shadow-md disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              aria-label="Next Steps"
              className="workflow-swiper-next w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A16F] text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#050B14] transition-all flex items-center justify-center cursor-pointer shadow-md disabled:opacity-30 disabled:pointer-events-none"
            >
              <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Responsive Timeline / Workflow Steps Swiper Carousel */}
        <div ref={swiperContainerRef} className="swiper workflowSwiper overflow-hidden px-1 py-3">
          <div className="swiper-wrapper">
            {stepsToRender.map((step: SectionItem, index: number) => {
              const stepTitle = getDynamicText(step, 'title', language) || step.title || '';
              const stepDesc = getDynamicText(step, 'description', language) || step.description || '';
              
              return (
                <div key={index} className="swiper-slide h-auto">
                  <div 
                    className={`group relative rounded-2xl p-5 sm:p-6 border transition-all duration-400 shadow-xl flex flex-col justify-between overflow-hidden h-full hover:-translate-y-2 select-none ${
                      isLight
                        ? 'bg-white border-slate-200/90 hover:border-[#C5A16F] hover:shadow-[0_20px_40px_-10px_rgba(197,161,111,0.3)]'
                        : 'bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050B14] border-white/10 hover:border-[#C5A16F]/70 hover:shadow-[0_20px_45px_-10px_rgba(197,161,111,0.3)]'
                    }`}
                  >
                    {/* Top Subtle Edge Highlight */}
                    <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_12px_#C5A16F] z-30" />

                    {/* Shimmer Light Sweep on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30" />

                    <div className="relative z-10">
                      {/* Step Header with Number + Icon */}
                      <div className="flex items-center justify-between mb-4 sm:mb-5">
                        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-400 shadow-md group-hover:scale-108 ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 group-hover:bg-[#C5A16F] group-hover:border-[#C5A16F]'
                            : 'bg-white/5 border-white/10 group-hover:bg-[#C5A16F] group-hover:border-[#C5A16F]'
                        }`}>
                          <div 
                            className={`transition-colors duration-400 group-hover:text-[#050B14] ${
                              isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]'
                            }`}
                            dangerouslySetInnerHTML={{ __html: stripSvgColors(step.iconSvg || '') }} 
                          />
                        </div>

                        <span className={`font-mono text-xs font-black px-2.5 py-1 rounded-lg border transition-all duration-300 shadow-sm ${
                          isLight
                            ? 'bg-amber-50/80 border-[#C5A16F]/30 text-[#8A5800] group-hover:bg-[#C5A16F] group-hover:text-[#050B14]'
                            : 'bg-white/5 border-[#C5A16F]/30 text-[#C5A16F] group-hover:bg-[#C5A16F] group-hover:text-[#050B14]'
                        }`}>
                          0{index + 1}
                        </span>
                      </div>

                      <h4 className={`text-base sm:text-lg font-black mb-2 transition-colors duration-300 ${
                        isLight
                          ? 'text-slate-900 group-hover:text-[#8A5800]'
                          : 'text-white group-hover:text-[#C5A16F]'
                      }`}>
                        {stepTitle}
                      </h4>
                      <p className={`text-xs leading-relaxed font-light line-clamp-3 ${
                        isLight ? 'text-slate-600' : 'text-gray-300'
                      }`}>
                        {stepDesc}
                      </p>
                    </div>

                    {/* Bottom Progress Accent */}
                    <div className={`mt-5 pt-3.5 border-t flex items-center justify-between relative z-10 ${
                      isLight ? 'border-slate-100' : 'border-white/5'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-[#C5A16F]/50 group-hover:bg-[#C5A16F] group-hover:shadow-[0_0_8px_#C5A16F] transition-all" />
                      <div className="h-0.5 flex-1 mx-2.5 bg-white/5 group-hover:bg-[#C5A16F]/40 rounded-full transition-all duration-500" />
                      <span className="w-2 h-2 rounded-full bg-[#C5A16F]/50 group-hover:bg-[#C5A16F] group-hover:shadow-[0_0_8px_#C5A16F] transition-all" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Swiper Pagination Dots */}
          <div className="workflow-swiper-pagination flex justify-center items-center gap-1.5 mt-6" />
        </div>

      </div>
    </section>
  );
}
