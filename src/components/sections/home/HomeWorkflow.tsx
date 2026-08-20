'use client';

import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { useRef, useEffect } from 'react';
import { HomeWorkflowHeader } from './workflow/HomeWorkflowHeader';
import { HomeWorkflowCard } from './workflow/HomeWorkflowCard';
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function HomeWorkflow({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const defaultSteps: SectionItem[] = [
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
  }, [language, stepsToRender.length]);

  return (
    <section id="workflow" className="relative py-12 sm:py-20 bg-[#050B14] overflow-hidden text-white select-none" dir={direction}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] pointer-events-none opacity-40" style={{ background: 'radial-gradient(circle, rgba(197,161,111,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <HomeWorkflowHeader
          subtitle={getDynamicText(data, 'subtitle', language) || t("workflow.subtitle")}
          titlePart1={t("workflow.titlePart1")}
          titlePart2={t("workflow.titlePart2")}
          desc={getDynamicText(data, 'description', language) || (language === 'ar' ? 'منهجية دقيقة ومحكمة تقود مشروعك من الفكرة المجردة إلى إطلاق سيادي متكامل.' : 'A refined methodology that transforms your vision into a sovereign digital reality.')}
          isLight={isLight}
          direction={direction}
        />

        {/* Responsive Timeline / Workflow Steps Swiper Carousel with Anti-Clipping Padding */}
        <div ref={swiperContainerRef} className="swiper workflowSwiper !overflow-visible -mx-2 sm:-mx-3 px-2 sm:px-3 pt-2 pb-6 sm:pt-3 sm:pb-8">
          <div className="swiper-wrapper">
            {stepsToRender.map((step: SectionItem, index: number) => {
              const stepTitle = getDynamicText(step, 'title', language) || step.title || '';
              const stepDesc = getDynamicText(step, 'description', language) || step.description || '';
              
              return (
                <div key={index} className="swiper-slide h-auto">
                  <HomeWorkflowCard
                    step={step}
                    index={index}
                    stepTitle={stepTitle}
                    stepDesc={stepDesc}
                    isLight={isLight}
                  />
                </div>
              );
            })}
          </div>

          <div className="workflow-swiper-pagination flex justify-center items-center gap-1.5 mt-6" />
        </div>
      </div>
    </section>
  );
}
