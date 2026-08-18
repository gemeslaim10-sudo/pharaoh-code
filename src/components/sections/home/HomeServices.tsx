'use client';
import { SectionData, SectionItem } from '@/types';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { TECH_TAGS, FALLBACK_SERVICES, stripSvgColors } from './services/homeServicesHelpers';
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
    <section 
      id="services" 
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
      
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-4 sm:mb-5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping shrink-0" />
              <h2 className="text-[#C5A16F] font-bold tracking-[0.15em] uppercase text-[11px] sm:text-xs leading-normal">
                {getDynamicText(data, 'subtitle', language) || t("services.subtitle")}
              </h2>
            </div>
            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-normal leading-[1.3] pt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t("services.titlePart1")}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
                {t("services.titlePart2")}
              </span>
            </h3>
            <p className={`mt-2 text-xs sm:text-sm md:text-base leading-relaxed font-light ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
              {language === 'ar' 
                ? 'حزمة متكاملة من الحلول البرمجية السيادية المطورة بأعلى معايير الدقة والهندسة الرقمية.' 
                : 'A sovereign suite of full-cycle software architectures engineered with surgical precision.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Custom Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous service"
                className={`services-swiper-prev w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md disabled:opacity-30 disabled:pointer-events-none ${
                  isLight
                    ? 'bg-white hover:bg-[#C5A16F] hover:text-[#050B14] text-slate-700 border-slate-200 hover:border-[#C5A16F]'
                    : 'bg-white/5 hover:bg-[#C5A16F] hover:text-[#050B14] text-[#C5A16F] border-white/10 hover:border-[#C5A16F]'
                }`}
              >
                <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                aria-label="Next service"
                className={`services-swiper-next w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md disabled:opacity-30 disabled:pointer-events-none ${
                  isLight
                    ? 'bg-white hover:bg-[#C5A16F] hover:text-[#050B14] text-slate-700 border-slate-200 hover:border-[#C5A16F]'
                    : 'bg-white/5 hover:bg-[#C5A16F] hover:text-[#050B14] text-[#C5A16F] border-white/10 hover:border-[#C5A16F]'
                }`}
              >
                <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <Link
              href="/services"
              className={`inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs border transition-all duration-300 group shadow-md ${
                isLight
                  ? 'bg-white hover:bg-[#C5A16F] text-slate-800 hover:text-[#050B14] border-slate-200 hover:border-[#C5A16F]'
                  : 'bg-white/5 hover:bg-[#C5A16F] text-gray-200 hover:text-[#050B14] border-white/10 hover:border-[#C5A16F]'
              }`}
            >
              <span>{language === 'ar' ? 'عرض كافة الخدمات' : 'View All Services'}</span>
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

        {/* High-End Services Swiper Carousel */}
        <div ref={swiperContainerRef} className="swiper servicesSwiper overflow-hidden px-1 py-3">
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
                  <div 
                    className={`group relative rounded-2xl p-6 sm:p-7 border transition-all duration-400 shadow-xl flex flex-col justify-between overflow-hidden h-full hover:-translate-y-2 select-none ${
                      isLight
                        ? 'bg-white border-slate-200/90 hover:border-[#C5A16F] hover:shadow-[0_20px_40px_-10px_rgba(197,161,111,0.3)]'
                        : 'bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050B14] border-white/10 hover:border-[#C5A16F]/70 hover:shadow-[0_20px_45px_-10px_rgba(197,161,111,0.3)]'
                    }`}
                  >
                    {/* Top Glowing Beam */}
                    <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_12px_#C5A16F] z-30" />

                    {/* Shimmer Light Sweep on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30" />

                    <div className="relative z-10">
                      {/* Top Header inside Card */}
                      <div className="flex items-center justify-between mb-5">
                        <div className={`w-13 h-13 rounded-2xl border flex items-center justify-center transition-all duration-400 shadow-md group-hover:scale-108 ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 group-hover:bg-[#C5A16F] group-hover:border-[#C5A16F]'
                            : 'bg-white/5 border-white/10 group-hover:bg-gradient-to-br group-hover:from-[#C5A16F] group-hover:to-[#9E7D47] group-hover:border-[#C5A16F]'
                        }`}>
                          <div 
                            className={`transition-colors duration-400 group-hover:text-[#050B14] ${
                              isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]'
                            }`}
                            dangerouslySetInnerHTML={{ __html: stripSvgColors(item.iconSvg || '') }} 
                          />
                        </div>

                        <span className={`font-mono text-xs font-black px-2.5 py-1 rounded-lg border transition-all duration-300 shadow-sm ${
                          isLight
                            ? 'bg-amber-50/80 border-[#C5A16F]/30 text-[#8A5800]'
                            : 'bg-white/5 border-[#C5A16F]/30 text-[#C5A16F]'
                        }`}>
                          0{index + 1}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h4 className={`text-lg sm:text-xl font-black mb-2.5 transition-colors duration-300 line-clamp-1 ${
                        isLight
                          ? 'text-slate-900 group-hover:text-[#8A5800]'
                          : 'text-white group-hover:text-[#C5A16F]'
                      }`}>
                        {titleText}
                      </h4>

                      <p className={`text-xs sm:text-sm leading-relaxed font-light line-clamp-2 mb-4 ${
                        isLight ? 'text-slate-600' : 'text-gray-300'
                      }`}>
                        {descText}
                      </p>

                      {/* Highlights Checklist */}
                      <div className="space-y-2 mb-5 py-2 border-y border-white/5">
                        {highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-xs">
                            <span className="text-[#C5A16F] font-bold text-xs">✓</span>
                            <span className={`line-clamp-1 ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                              isLight
                                ? 'bg-slate-100 border-slate-200 text-slate-700'
                                : 'bg-white/5 border-white/10 text-gray-300'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Link Button */}
                    <div className={`pt-3.5 border-t relative z-10 ${
                      isLight ? 'border-slate-100' : 'border-white/5'
                    }`}>
                      <Link
                        href={serviceUrl}
                        className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-between transition-all duration-300 shadow-sm border ${
                          isLight
                            ? 'bg-amber-50/80 border-[#C5A16F]/40 text-[#8A5800] group-hover:bg-[#C5A16F] group-hover:text-[#050B14]'
                            : 'bg-[#C5A16F]/10 border-[#C5A16F]/30 text-[#C5A16F] group-hover:bg-[#C5A16F] group-hover:text-[#050B14] group-hover:shadow-[0_0_15px_rgba(197,161,111,0.4)]'
                        }`}
                      >
                        <span>{t("services.exploreBtn") || (language === 'ar' ? 'استكشف الحل البرمجي' : 'Explore Solution')}</span>
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
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
                </div>
              );
            })}
          </div>

          {/* Swiper Pagination Dots */}
          <div className="services-swiper-pagination flex justify-center items-center gap-1.5 mt-6" />
        </div>

      </div>
    </section>
  );
}
