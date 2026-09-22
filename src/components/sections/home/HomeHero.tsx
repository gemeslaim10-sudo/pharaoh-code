'use client';

import Swiper from 'swiper';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { type SectionData } from '@/types';
import { useEffect, useRef } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { type HeroThemeConfig } from '@/types/heroTheme';
import { isMediaVideo } from '@/lib/mediaHelper';
import { HomeHeroButtons } from './hero/HomeHeroButtons';
import { HomeHeroSlide } from './hero/HomeHeroSlide';
import { HeroTypingTitle } from './hero/HeroTypingTitle';

interface HomeHeroProps {
  data?: SectionData;
  heroThemeConfig?: HeroThemeConfig | null;
}

export default function HomeHero({ data, heroThemeConfig }: HomeHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<Swiper | null>(null);
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    if (swiperRef.current) {
      swiperRef.current.destroy(true, true);
      swiperRef.current = null;
    }

    swiperRef.current = new Swiper(containerRef.current, {
      modules: [Autoplay, Pagination, EffectFade],
      loop: true,
      speed: 1000,
      autoplay: { delay: 6000, disableOnInteraction: false },
      pagination: { el: containerRef.current.querySelector(".swiper-pagination") as HTMLElement, clickable: true },
      effect: "fade",
      fadeEffect: { crossFade: true },
    });

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };
  }, [language, theme]);

  const heroData = data || {};

  const defaultSlide1Light = "/assets/images/hero-light-slide1.jpg";
  const defaultSlide1Dark = "/assets/images/hero-dark-slide1.jpg";
  const slide1Media = theme === 'light'
    ? (heroThemeConfig?.lightSlide1Media || heroThemeConfig?.lightSlide1Image || heroThemeConfig?.lightSlide1Video || heroData.slides?.[0]?.imageUrl || heroData.slides?.[0]?.image || defaultSlide1Light)
    : (heroThemeConfig?.darkSlide1Media || heroThemeConfig?.darkSlide1Image || heroThemeConfig?.darkSlide1Video || heroData.slides?.[0]?.videoUrl || heroData.videoUrl || heroData.slides?.[0]?.imageUrl || heroData.slides?.[0]?.image || defaultSlide1Dark);

  const defaultSlide2Light = "/assets/images/hero-light-slide2.jpg";
  const defaultSlide2Dark = "/assets/images/hero-dark-slide2.jpg";
  const slide2Media = theme === 'light'
    ? (heroThemeConfig?.lightSlide2Media || heroThemeConfig?.lightSlide2Image || heroThemeConfig?.lightSlide2Video || heroData.slides?.[1]?.imageUrl || heroData.slides?.[1]?.image || defaultSlide2Light)
    : (heroThemeConfig?.darkSlide2Media || heroThemeConfig?.darkSlide2Image || heroThemeConfig?.darkSlide2Video || heroData.slides?.[1]?.imageUrl || heroData.slides?.[1]?.image || defaultSlide2Dark);

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

  // CMS (dashboard → الصفحة الرئيسية) wins, then the legacy `slides[]` shape, then i18n.
  const slide1Title1 = getDynamicText(heroData, 'titlePart1', language) || getDynamicText(heroData.slides?.[0], 'titlePart1', language) || t('hero.slide1.titlePart1') || 'نبني المستقبل';
  const slide1Title2 = getDynamicText(heroData, 'titlePart2', language) || getDynamicText(heroData.slides?.[0], 'titlePart2', language) || t('hero.slide1.titlePart2') || 'الرقمي';
  const slide1Title3 = getDynamicText(heroData, 'titlePart3', language) || getDynamicText(heroData.slides?.[0], 'titlePart3', language) || t('hero.slide1.titlePart3') || 'بفكر فرعوني سيادي';
  const slide1Subtitle = getDynamicText(heroData, 'subtitle', language)
    || getDynamicText(heroData, 'description', language)
    || getDynamicText(heroData.slides?.[0], 'subtitle', language)
    || t('hero.slide1.subtitle');

  const slide2Title1 = getDynamicText(heroData, 'slide2TitlePart1', language) || getDynamicText(heroData.slides?.[1], 'titlePart1', language) || t('hero.slide2.titlePart1') || 'حلول برمجية';
  const slide2Title2 = getDynamicText(heroData, 'slide2TitlePart2', language) || getDynamicText(heroData.slides?.[1], 'titlePart2', language) || t('hero.slide2.titlePart2') || 'استثنائية وفارقة';
  const slide2Subtitle = getDynamicText(heroData, 'slide2Subtitle', language) || getDynamicText(heroData.slides?.[1], 'subtitle', language) || t('hero.slide2.subtitle');

  const primaryBtnText = getDynamicText(heroData, 'primaryBtnText', language) || (language === 'ar' ? 'اكتشف عالمنا' : 'Discover Our World');
  const secondaryBtnText = getDynamicText(heroData, 'secondaryBtnText', language) || (language === 'ar' ? 'تواصل معنا' : 'Contact Us');
  const primaryBtnLink = (typeof heroData.primaryBtnLink === 'string' && heroData.primaryBtnLink.trim()) || '/services';
  const secondaryBtnLink = (typeof heroData.secondaryBtnLink === 'string' && heroData.secondaryBtnLink.trim()) || '/contact';

  const buttons = (
    <HomeHeroButtons
      discoverText={primaryBtnText}
      contactText={secondaryBtnText}
      discoverHref={primaryBtnLink}
      contactHref={secondaryBtnLink}
    />
  );

  return (
    <div ref={containerRef} key={`${language}-${theme}`} dir={direction} className="swiper heroSwiper h-screen">
      <div className="swiper-wrapper">
        <HomeHeroSlide
          mediaSrc={slide1Media}
          isVideo={isMediaVideo(slide1Media)}
          theme={theme}
          title={
            <HeroTypingTitle
              part1={slide1Title1}
              part2={slide1Title2}
              part3={slide1Title3}
              accentClass={accentClass}
              theme={theme}
              holdTime={1500}
              typingSpeed={70}
              deletingSpeed={35}
            />
          }
          subtitle={slide1Subtitle}
          buttons={buttons}
        />
        <HomeHeroSlide
          mediaSrc={slide2Media}
          isVideo={isMediaVideo(slide2Media)}
          theme={theme}
          title={
            <HeroTypingTitle
              part1={slide2Title1}
              part2={slide2Title2}
              accentClass={accentClass}
              theme={theme}
              holdTime={1500}
              typingSpeed={70}
              deletingSpeed={35}
            />
          }
          subtitle={slide2Subtitle}
          buttons={buttons}
        />
      </div>
      <div className="swiper-pagination" />
    </div>
  );
}
