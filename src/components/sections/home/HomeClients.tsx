'use client';

import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ClientItem, HomeClientCard } from './clients/HomeClientCard';
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
  }, [language, clients.length]);

  if (clients.length === 0) return null;

  return (
    <section 
      id="our-clients" 
      className="relative py-12 sm:py-20 bg-[#050B14] overflow-hidden text-white select-none" 
      dir={direction}
    >
      {/* Background ambient lighting - High Performance Radial Gradients */}
      <div 
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(197,161,111,0.12) 0%, transparent 70%)' }} 
      />
      <div 
        className="absolute bottom-1/3 -left-32 w-[500px] h-[500px] pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-4 sm:mb-5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping shrink-0" />
              <h2 className="text-[#C5A16F] font-bold tracking-[0.15em] uppercase text-[11px] sm:text-xs leading-normal">
                {t("clients.subtitle")}
              </h2>
            </div>
            
            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-normal leading-[1.3] pt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t("clients.titlePart1")}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
                {t("clients.titlePart2")}
              </span>
            </h3>

            <p className={`mt-2 text-xs sm:text-sm md:text-base leading-relaxed font-light ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
              {language === 'ar' ? 'شركاء النجاح الذين وضعوا ثقتهم في حلولنا الرقمية والهندسية المتطورة.' : 'Visionary partners who trust our high-performance software and digital solutions.'}
            </p>
          </div>

          {/* Navigation Controls & Link */}
          <div className="flex items-center gap-3">
            {/* Custom Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button 
                aria-label="Previous Partners"
                className="clients-swiper-prev w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A16F] text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#050B14] transition-all flex items-center justify-center cursor-pointer shadow-md disabled:opacity-30 disabled:pointer-events-none"
              >
                <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                aria-label="Next Partners"
                className="clients-swiper-next w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A16F] text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#050B14] transition-all flex items-center justify-center cursor-pointer shadow-md disabled:opacity-30 disabled:pointer-events-none"
              >
                <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <Link
              href="/clients"
              className="inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-white/5 hover:bg-[#C5A16F] text-gray-300 hover:text-[#050B14] font-bold text-xs border border-white/10 hover:border-[#C5A16F] transition-all duration-300 group shadow-md"
            >
              <span>{t("clients.viewAllClients") || (language === 'ar' ? 'عرض كافة الشركاء' : 'View All Partners')}</span>
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

        {/* High-End Partners Showcase Swiper Carousel */}
        <div ref={swiperContainerRef} className="swiper clientsSwiper overflow-hidden px-1 py-3">
          <div className="swiper-wrapper">
            {clients.map((client) => (
              <div key={client.id} className="swiper-slide h-auto">
                <HomeClientCard client={client} />
              </div>
            ))}
          </div>

          {/* Swiper Pagination Dots */}
          <div className="clients-swiper-pagination flex justify-center items-center gap-1.5 mt-6" />
        </div>
      </div>
    </section>
  );
}
