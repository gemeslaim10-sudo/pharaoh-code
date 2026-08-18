'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ClientItem, HomeClientCard } from './clients/HomeClientCard';
import { HomeClientsHeader } from './clients/HomeClientsHeader';
import { useRef, useEffect } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function HomeClients({ clients = [] }: { clients?: ClientItem[] }) {
  const { t, language, direction } = useTranslation();
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
      modules: [Autoplay, Pagination, Navigation],
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 550,
      grabCursor: true,
      watchSlidesProgress: true,
      loop: clients.length > 4,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.clients-swiper-pagination',
        clickable: true,
        bulletActiveClass: '!bg-[#C5A16F] !w-6 !rounded-full',
      },
      navigation: {
        nextEl: '.clients-swiper-next',
        prevEl: '.clients-swiper-prev',
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
  }, [language, clients.length]);

  if (clients.length === 0) return null;

  return (
    <section id="our-clients" className="relative py-12 sm:py-20 bg-[#050B14] overflow-hidden text-white select-none" dir={direction}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] pointer-events-none opacity-40" style={{ background: 'radial-gradient(circle, rgba(197,161,111,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/3 -left-32 w-[500px] h-[500px] pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <HomeClientsHeader
          subtitle={t("clients.subtitle")}
          titlePart1={t("clients.titlePart1")}
          titlePart2={t("clients.titlePart2")}
          desc={language === 'ar' ? 'شركاء النجاح الذين وضعوا ثقتهم في حلولنا الرقمية والهندسية المتطورة.' : 'Visionary partners who trust our high-performance software and digital solutions.'}
          isLight={isLight}
          direction={direction}
          viewAllText={t("clients.viewAllClients") || (language === 'ar' ? 'عرض كافة الشركاء' : 'View All Partners')}
        />

        {/* High-End Partners Showcase Swiper Carousel */}
        <div ref={swiperContainerRef} className="swiper clientsSwiper overflow-hidden px-1 py-3">
          <div className="swiper-wrapper">
            {clients.map((client) => (
              <div key={client.id} className="swiper-slide h-auto">
                <HomeClientCard client={client} />
              </div>
            ))}
          </div>

          <div className="clients-swiper-pagination flex justify-center items-center gap-1.5 mt-6" />
        </div>
      </div>
    </section>
  );
}
