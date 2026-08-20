'use client';

import { SectionData, SectionItem } from '@/types';
import { useRef, useEffect } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { TECH_TAGS, FALLBACK_SERVICES } from './services/homeServicesHelpers';
import { HomeServicesHeader } from './services/HomeServicesHeader';
import { HomeServicesCard } from './services/HomeServicesCard';
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function HomeServices({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const itemsToRender = (data?.items && data.items.length > 0 && data.items[0]?.iconSvg)
    ? data.items
    : FALLBACK_SERVICES;

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
      spaceBetween: 18,
      speed: 550,
      grabCursor: true,
      watchSlidesProgress: true,
      loop: itemsToRender.length > 4,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.services-swiper-pagination',
        clickable: true,
        bulletActiveClass: '!bg-[#C5A16F] !w-6 !rounded-full',
      },
      navigation: {
        nextEl: '.services-swiper-next',
        prevEl: '.services-swiper-prev',
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
  }, [language, itemsToRender.length]);

  const serviceHighlights: Record<number, string[]> = {
    0: language === 'ar' ? ['بنية تحتية سحابية سيادية', 'أنظمة قابلة للتوسع اللانهائي', 'معايير أمان معتمدة عالمياً'] : ['Sovereign Cloud Architecture', 'Infinite Scalability', 'Zero-Trust Security'],
    1: language === 'ar' ? ['تطبيقات أصلية فائقة السرعة', 'تجربة مستخدم تفاعلية وسلسة', 'تكامل كامل مع خدمات الدفع'] : ['Blazing Fast Native Apps', 'Fluid Intuitive UI/UX', 'Full Payment Integrations'],
    2: language === 'ar' ? ['معمارية Next.js 15 الحديثة', 'سرعة تحميل أقل من ثانية', 'تهيئة متقدمة لمحركات البحث'] : ['Modern Next.js 15 Core', 'Sub-second Load Times', 'Advanced Technical SEO'],
    3: language === 'ar' ? ['أنظمة تصميم ذكية ومتكاملة', 'أبحاث سلوك وتجربة المستخدم', 'واجهات تفاعلية تبهر العميل'] : ['Atomic Design Systems', 'User Psychology Research', 'Immersive Interactions'],
    4: language === 'ar' ? ['أتمتة الأعمال بنماذج الذكاء الاصطناعي', 'روبوتات ومساعدات ذكية', 'تحليل تنبؤي متقدم للبيانات'] : ['Enterprise AI Automation', 'Intelligent Workflows', 'Predictive Data Analytics'],
    5: language === 'ar' ? ['اختبارات اختراق وحماية مشددة', 'تشفير بيانات متطور', 'مراقبة أمنية على مدار الساعة'] : ['Penetration Testing', 'End-to-End Encryption', '24/7 Security Auditing'],
  };

  return (
    <section id="services" className="relative py-12 sm:py-20 bg-[#050B14] overflow-hidden text-white select-none" dir={direction}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] pointer-events-none opacity-40" style={{ background: 'radial-gradient(circle, rgba(197,161,111,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <HomeServicesHeader
          subtitle={getDynamicText(data, 'subtitle', language) || t("services.subtitle")}
          titlePart1={t("services.titlePart1")}
          titlePart2={t("services.titlePart2")}
          desc={language === 'ar' ? 'حزمة متكاملة من الحلول البرمجية السيادية المطورة بأعلى معايير الدقة والهندسة الرقمية.' : 'A sovereign suite of full-cycle software architectures engineered with surgical precision.'}
          isLight={isLight}
          direction={direction}
          language={language}
          viewAllText={language === 'ar' ? 'عرض كافة الخدمات' : 'View All Services'}
        />

        {/* High-End Services Swiper Carousel with Anti-Clipping Padding */}
        <div ref={swiperContainerRef} className="swiper servicesSwiper !overflow-visible -mx-2 sm:-mx-3 px-2 sm:px-3 pt-2 pb-6 sm:pt-3 sm:pb-8">
          <div className="swiper-wrapper">
            {itemsToRender.map((item: SectionItem, index: number) => {
              const titleText = getDynamicText(item, 'title', language) || item.title || '';
              const descText = getDynamicText(item, 'description', language) || item.description || '';
              const tags = TECH_TAGS[index % Object.keys(TECH_TAGS).length] || ['High Scale', 'Sovereign', 'Cloud Native'];
              const highlights = serviceHighlights[index % Object.keys(serviceHighlights).length] || [
                language === 'ar' ? 'معمارية سحابية موثوقة' : 'Reliable Architecture',
                language === 'ar' ? 'أداء فائق السرعة' : 'High Performance',
                language === 'ar' ? 'أمان سيادي متقدم' : 'Enterprise Security'
              ];
              const serviceUrl = item.id ? `/services/${item.id}` : '/services';

              return (
                <div key={index} className="swiper-slide h-auto">
                  <HomeServicesCard
                    item={item}
                    index={index}
                    titleText={titleText}
                    descText={descText}
                    tags={tags}
                    highlights={highlights}
                    serviceUrl={serviceUrl}
                    isLight={isLight}
                    direction={direction}
                    exploreBtnText={t("services.exploreBtn") || (language === 'ar' ? 'استكشف الحل البرمجي' : 'Explore Solution')}
                  />
                </div>
              );
            })}
          </div>

          <div className="services-swiper-pagination flex justify-center items-center gap-1.5 mt-6" />
        </div>
      </div>
    </section>
  );
}
