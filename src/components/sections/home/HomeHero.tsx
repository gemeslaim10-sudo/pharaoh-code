'use client';
import { SectionData } from '@/types';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function HomeHero({ data }: { data?: SectionData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const { t, language, direction } = useTranslation();

  useEffect(() => {
    let checkInterval: any;
    
    const initSwiper = () => {
      // @ts-ignore
      if (window.Swiper && containerRef.current) {
        if (swiperRef.current && swiperRef.current.destroy) {
          swiperRef.current.destroy(true, true);
          swiperRef.current = null;
        }
        // @ts-ignore
        swiperRef.current = new window.Swiper(containerRef.current, {
            loop: true,
            speed: 1000,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: containerRef.current.querySelector(".swiper-pagination"), clickable: true },
            effect: "fade",
            fadeEffect: { crossFade: true },
        });
      } else if (!window.Swiper) {
          checkInterval = setTimeout(initSwiper, 50);
      }
    };
    
    initSwiper();

    return () => {
      if (checkInterval) clearTimeout(checkInterval);
      if (swiperRef.current && swiperRef.current.destroy) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };
  }, [language]);

  const heroData = data || {};

  const slide1Title1 = getDynamicText(heroData.slides?.[0] || heroData, 'titlePart1', language) || t('hero.slide1.titlePart1');
  const slide1Title2 = getDynamicText(heroData.slides?.[0] || heroData, 'titlePart2', language) || t('hero.slide1.titlePart2');
  const slide1Title3 = getDynamicText(heroData.slides?.[0] || heroData, 'titlePart3', language) || t('hero.slide1.titlePart3');
  const slide1Subtitle = getDynamicText(heroData.slides?.[0] || heroData, 'subtitle', language) || getDynamicText(heroData, 'description', language) || t('hero.slide1.subtitle');

  const slide2Title1 = getDynamicText(heroData.slides?.[1], 'titlePart1', language) || t('hero.slide2.titlePart1');
  const slide2Title2 = getDynamicText(heroData.slides?.[1], 'titlePart2', language) || t('hero.slide2.titlePart2');
  const slide2Subtitle = getDynamicText(heroData.slides?.[1], 'subtitle', language) || t('hero.slide2.subtitle');

  const buttonText = language === 'ar' ? 'اكتشف عالمنا' : 'Discover Our World';

  return (
    <div ref={containerRef} key={language} dir={direction} className="swiper heroSwiper h-screen">
        <div className="swiper-wrapper">

            {/* SLIDE 1 */}
            <div className="swiper-slide bg-pharaohNavy">
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
                    <source src={heroData.slides?.[0]?.videoUrl || heroData.videoUrl || "https://res.cloudinary.com/dstlpavbf/video/upload/v1780700304/120-135736520_medium_iv1x7e.mp4"} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-pharaohNavy to-transparent"></div>
                <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
                    <div className="max-w-4xl content-up transition-opacity duration-700">
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
                            {slide1Title1} <span className="text-pharaohGold">{slide1Title2}</span> {slide1Title3}
                        </h1>
                        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
                            {slide1Subtitle}
                        </p>
                        <Link href="/services" className="inline-block bg-pharaohGold text-pharaohNavy px-10 py-4 sm:px-12 sm:py-5 rounded-full font-black text-base sm:text-lg shadow-2xl hover:bg-white transition-all">
                            {buttonText}
                        </Link>
                    </div>
                </div>
            </div>

            {/* SLIDE 2 */}
            <div className="swiper-slide">
                <img src={heroData.slides?.[1]?.imageUrl || heroData.slides?.[1]?.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920"} className="absolute inset-0 w-full h-full object-cover" alt="Coding" />
                <div className="absolute inset-0 bg-pharaohNavy/80"></div>
                <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
                    <div className="max-w-4xl content-up transition-opacity duration-700">
                        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                            {slide2Title1} <span className="text-pharaohGold italic block sm:inline">{slide2Title2}</span>
                        </h2>
                        <p className="text-gray-300 text-lg sm:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
                            {slide2Subtitle}
                        </p>
                        <Link href="/services" className="inline-block border-2 border-pharaohGold text-pharaohGold px-10 py-4 sm:px-12 sm:py-4 rounded-full font-bold hover:bg-pharaohGold hover:text-white transition-all">
                            {buttonText}
                        </Link>
                    </div>
                </div>
            </div>

        </div>
        <div className="swiper-pagination"></div>
    </div>
  );
}
