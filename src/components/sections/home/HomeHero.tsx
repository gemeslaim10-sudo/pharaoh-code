'use client';
import { SectionData } from '@/types';
import { useEffect, useRef } from 'react';

import { useLanguage } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function HomeHero({ data }: { data?: SectionData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const { language } = useLanguage();

  useEffect(() => {
    let checkInterval: any;
    
    const initSwiper = () => {
      // @ts-ignore
      if (window.Swiper && containerRef.current && !swiperRef.current) {
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
          checkInterval = setTimeout(initSwiper, 100);
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
  if (!data) {
    console.warn("HomeHero: No data provided from Firebase, using default fallback content.");
  }

  return (
    <div ref={containerRef} key={language} className="swiper heroSwiper h-screen">
        <div className="swiper-wrapper">

            <div className="swiper-slide bg-pharaohNavy">
                <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-20">
                    <source src={heroData.slides?.[0]?.videoUrl || heroData.videoUrl || "https://res.cloudinary.com/dstlpavbf/video/upload/v1780700304/120-135736520_medium_iv1x7e.mp4"} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-pharaohNavy to-transparent"></div>
                <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
                    <div className="max-w-4xl content-up opacity-0">
                        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight">
                            {getDynamicText(heroData.slides?.[0] || heroData, 'titlePart1', language) || (language === 'ar' ? "نبني" : "We Build")} <span className="text-pharaohGold">{getDynamicText(heroData.slides?.[0] || heroData, 'titlePart2', language) || (language === 'ar' ? "أهرامات" : "Digital")}</span> {getDynamicText(heroData.slides?.[0] || heroData, 'titlePart3', language) || (language === 'ar' ? "رقمية" : "Pyramids")}
                        </h1>
                        <p className="text-gray-300 text-xl md:text-2xl mb-10">
                            {getDynamicText(heroData.slides?.[0] || heroData, 'subtitle', language) || getDynamicText(heroData, 'description', language) || (language === 'ar' ? "نجمع بين عظمة الفكر الهندسي وأحدث تقنيات البرمجة العالمية." : "We merge engineering mastery with cutting-edge global software technology.")}
                        </p>
                        <button className="bg-pharaohGold text-pharaohNavy px-12 py-5 rounded-full font-black text-lg shadow-2xl hover:bg-white transition-all">
                            {getDynamicText(heroData.slides?.[0] || heroData, 'buttonText', language) || (language === 'ar' ? "اكتشف أساليبنا" : "Discover Our Methods")}
                        </button>
                    </div>
                </div>
            </div>

            <div className="swiper-slide">
                <img src={heroData.slides?.[1]?.imageUrl || heroData.slides?.[1]?.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920"} className="absolute inset-0 w-full h-full object-cover" alt="Coding" />
                <div className="absolute inset-0 bg-pharaohNavy/80"></div>
                <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
                    <div className="max-w-4xl content-up opacity-0">
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                            {getDynamicText(heroData.slides?.[1], 'titlePart1', language) || (language === 'ar' ? "كود نظيف.." : "Clean Code..")} <br /><span className="text-pharaohGold italic">{getDynamicText(heroData.slides?.[1], 'titlePart2', language) || (language === 'ar' ? "أداء أسطوري" : "Legendary Performance")}</span>
                        </h2>
                        <p className="text-gray-300 text-xl mb-10">
                            {getDynamicText(heroData.slides?.[1], 'subtitle', language) || (language === 'ar' ? "مواقعنا مصممة لتكون الأسرع والأكثر أماناً في فضاء الإنترنت." : "Our systems are built to be the fastest and most secure on the web.")}
                        </p>
                        <button className="border-2 border-pharaohGold text-pharaohGold px-12 py-4 rounded-full font-bold hover:bg-pharaohGold hover:text-white transition-all">
                            {getDynamicText(heroData.slides?.[1], 'buttonText', language) || (language === 'ar' ? "أنظمتنا البرمجية" : "Our Software Systems")}
                        </button>
                    </div>
                </div>
            </div>

        </div>
        <div className="swiper-pagination"></div>
    </div>
  );
}
