'use client';
import { SectionData } from '@/types';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { HeroThemeConfig } from '@/app/actions/dashboard/heroTheme';
import { isMediaVideo } from '@/lib/mediaHelper';

export default function HomeHero({ data, heroThemeConfig }: { data?: SectionData; heroThemeConfig?: HeroThemeConfig | null }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();

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

  // Media selection based on theme for Slide 1
  const slide1Media = theme === 'light'
    ? (heroThemeConfig?.lightSlide1Media || heroThemeConfig?.lightSlide1Video || heroThemeConfig?.lightSlide1Image || heroThemeConfig?.darkSlide1Media || heroThemeConfig?.darkSlide1Video || heroThemeConfig?.darkSlide1Image || heroData.slides?.[0]?.videoUrl || heroData.videoUrl || "https://res.cloudinary.com/dstlpavbf/video/upload/v1780700304/120-135736520_medium_iv1x7e.mp4")
    : (heroThemeConfig?.darkSlide1Media || heroThemeConfig?.darkSlide1Video || heroThemeConfig?.darkSlide1Image || heroData.slides?.[0]?.videoUrl || heroData.videoUrl || "https://res.cloudinary.com/dstlpavbf/video/upload/v1780700304/120-135736520_medium_iv1x7e.mp4");

  const isSlide1Video = isMediaVideo(slide1Media);

  // Media selection based on theme for Slide 2
  const slide2Media = theme === 'light'
    ? (heroThemeConfig?.lightSlide2Media || heroThemeConfig?.lightSlide2Video || heroThemeConfig?.lightSlide2Image || heroThemeConfig?.darkSlide2Media || heroThemeConfig?.darkSlide2Video || heroThemeConfig?.darkSlide2Image || heroData.slides?.[1]?.imageUrl || heroData.slides?.[1]?.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920")
    : (heroThemeConfig?.darkSlide2Media || heroThemeConfig?.darkSlide2Video || heroThemeConfig?.darkSlide2Image || heroData.slides?.[1]?.imageUrl || heroData.slides?.[1]?.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920");

  const isSlide2Video = isMediaVideo(slide2Media);

  // Active Color Preset
  const activePresetKey = theme === 'light'
    ? (heroThemeConfig?.lightPreset || 'royal_gold')
    : (heroThemeConfig?.darkPreset || 'royal_gold');

  const presetAccentClasses: Record<string, string> = {
    royal_gold: 'text-pharaohGold',
    luminous_gold: 'text-amber-400',
    sovereign_silver: 'text-yellow-400',
    cinematic: 'text-yellow-300'
  };

  const accentClass = presetAccentClasses[activePresetKey] || 'text-pharaohGold';

  const slide1Title1 = getDynamicText(heroData.slides?.[0] || heroData, 'titlePart1', language) || t('hero.slide1.titlePart1');
  const slide1Title2 = getDynamicText(heroData.slides?.[0] || heroData, 'titlePart2', language) || t('hero.slide1.titlePart2');
  const slide1Title3 = getDynamicText(heroData.slides?.[0] || heroData, 'titlePart3', language) || t('hero.slide1.titlePart3');
  const slide1Subtitle = getDynamicText(heroData.slides?.[0] || heroData, 'subtitle', language) || getDynamicText(heroData, 'description', language) || t('hero.slide1.subtitle');

  const slide2Title1 = getDynamicText(heroData.slides?.[1], 'titlePart1', language) || t('hero.slide2.titlePart1');
  const slide2Title2 = getDynamicText(heroData.slides?.[1], 'titlePart2', language) || t('hero.slide2.titlePart2');
  const slide2Subtitle = getDynamicText(heroData.slides?.[1], 'subtitle', language) || t('hero.slide2.subtitle');

  const discoverButtonText = language === 'ar' ? 'اكتشف عالمنا' : 'Discover Our World';
  const contactButtonText = language === 'ar' ? 'تواصل معنا' : 'Contact Us';

  const renderButtons = () => (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Link 
        href="/services" 
        className="btn-pharaoh-gold px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl font-extrabold text-sm sm:text-base shadow-xl hover:shadow-pharaohGold/40 transition-all flex items-center gap-2 group text-pharaohNavy"
      >
        <span>{discoverButtonText}</span>
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </Link>
      <Link 
        href="/contact" 
        className="btn-pharaoh-glass px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 group border border-white/30 text-white hover:border-pharaohGold hover:text-pharaohGold bg-black/30 backdrop-blur-md"
      >
        <span>{contactButtonText}</span>
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      </Link>
    </div>
  );

  return (
    <div ref={containerRef} key={`${language}-${theme}`} dir={direction} className="swiper heroSwiper h-screen">
        <div className="swiper-wrapper">

            {/* SLIDE 1 */}
            <div className="swiper-slide bg-pharaohNavy">
                {isSlide1Video ? (
                    <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-75 sm:opacity-85">
                        <source src={slide1Media} type="video/mp4" />
                    </video>
                ) : (
                    <img src={slide1Media} className="absolute inset-0 w-full h-full object-cover opacity-70 sm:opacity-80" alt="Hero Background 1" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-pharaohNavy via-pharaohNavy/30 to-transparent"></div>
                <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
                    <div className="max-w-4xl content-up transition-opacity duration-700">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
                            {slide1Title1} <span className={accentClass}>{slide1Title2}</span> {slide1Title3}
                        </h1>
                        <p className="text-slate-200 text-sm sm:text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
                            {slide1Subtitle}
                        </p>
                        {renderButtons()}
                    </div>
                </div>
            </div>

            {/* SLIDE 2 */}
            <div className="swiper-slide bg-pharaohNavy">
                {isSlide2Video ? (
                    <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-75 sm:opacity-85">
                        <source src={slide2Media} type="video/mp4" />
                    </video>
                ) : (
                    <img src={slide2Media} className="absolute inset-0 w-full h-full object-cover opacity-70 sm:opacity-80" alt="Coding" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-pharaohNavy via-pharaohNavy/30 to-transparent"></div>
                <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
                    <div className="max-w-4xl content-up transition-opacity duration-700">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
                            {slide2Title1} <span className={accentClass}>{slide2Title2}</span>
                        </h1>
                        <p className="text-slate-200 text-sm sm:text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
                            {slide2Subtitle}
                        </p>
                        {renderButtons()}
                    </div>
                </div>
            </div>

        </div>
        <div className="swiper-pagination"></div>
    </div>
  );
}
