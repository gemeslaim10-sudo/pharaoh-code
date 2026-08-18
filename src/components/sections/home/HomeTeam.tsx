'use client';

import { SectionData, SectionItem } from '@/types';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { useRef, useEffect } from 'react';
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function HomeTeam({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const membersToRender = (data?.members || []) as SectionItem[];

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
      loop: membersToRender.length > 4,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      pagination: {
        el: '.team-swiper-pagination',
        clickable: true,
        bulletActiveClass: '!bg-[#C5A16F] !w-6 !rounded-full',
      },
      navigation: {
        nextEl: '.team-swiper-next',
        prevEl: '.team-swiper-prev',
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
  }, [language, membersToRender.length]);

  return (
    <section id="our-team" className="relative py-12 sm:py-20 bg-[#050B14] overflow-hidden text-white select-none" dir={direction}>
      {/* Background ambient lighting - High Performance Radial Gradients */}
      <div 
        className="absolute top-1/4 -right-32 w-[500px] h-[500px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(197,161,111,0.12) 0%, transparent 70%)' }} 
      />
      <div 
        className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }} 
      />

      {/* Cyber Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-4 sm:mb-5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping shrink-0" />
              <h2 className="text-[#C5A16F] font-bold tracking-[0.15em] uppercase text-[11px] sm:text-xs leading-normal">
                {getDynamicText(data, 'subtitle', language) || t("team.subtitle")}
              </h2>
            </div>

            <h3 className={`text-2xl sm:text-3xl md:text-4xl font-black leading-[1.3] mb-2.5 tracking-normal pt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {t("team.titlePart1")}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
                {t("team.titlePart2")}
              </span>
            </h3>

            <p className={`text-xs sm:text-sm md:text-base leading-relaxed font-light ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
              {getDynamicText(data, 'description', language) || (language === 'ar' ? 'نخبة من المهندسين والمطورين المبدعين في صناعة البرمجيات وتطوير الحلول السيادية.' : 'Elite engineers and digital architects dedicated to software craftsmanship and sovereign solutions.')}
            </p>
          </div>

          {/* Navigation Controls & View All Link */}
          <div className="flex items-center gap-3">
            {/* Custom Luxury Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button 
                aria-label="Previous Team Members"
                className="team-swiper-prev w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A16F] text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#050B14] transition-all flex items-center justify-center cursor-pointer shadow-md disabled:opacity-30 disabled:pointer-events-none"
              >
                <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                aria-label="Next Team Members"
                className="team-swiper-next w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A16F] text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#050B14] transition-all flex items-center justify-center cursor-pointer shadow-md disabled:opacity-30 disabled:pointer-events-none"
              >
                <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <Link
              href="/team"
              className={`inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs border transition-all duration-300 group shadow-md ${
                isLight
                  ? 'bg-white hover:bg-[#C5A16F] text-slate-800 hover:text-[#050B14] border-slate-200 hover:border-[#C5A16F]'
                  : 'bg-white/5 hover:bg-[#C5A16F] text-gray-200 hover:text-[#050B14] border-white/10 hover:border-[#C5A16F]'
              }`}
            >
              <span>{t("team.viewMembers") || (language === 'ar' ? 'استعرض كافة الفريق' : 'View Full Team')}</span>
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

        {/* High-End Team Elite Cards Swiper Carousel */}
        <div ref={swiperContainerRef} className="swiper teamSwiper overflow-hidden px-1 py-3">
          <div className="swiper-wrapper">
            {membersToRender.map((member: SectionItem, index: number) => {
              const memberName = getDynamicText(member, 'name', language) || member.name || '';
              const memberRole = getDynamicText(member, 'role', language) || member.role || '';
              const memberImage = member.imageUrl || member.image || '';

              return (
                <div key={index} className="swiper-slide h-auto">
                  <div className="h-full">
                    <Link 
                      href={`/team/${member.id}`} 
                      className={`team-card group relative flex flex-col justify-between h-full rounded-2xl p-5 sm:p-6 border transition-all duration-300 overflow-hidden text-center block hover:-translate-y-1.5 select-none ${
                        isLight
                          ? 'bg-white border-slate-200/90 shadow-sm hover:border-[#C5A16F] hover:shadow-[0_16px_36px_-8px_rgba(197,161,111,0.25)]'
                          : 'bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050B14] border-white/10 hover:border-[#C5A16F]/70 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_36px_-8px_rgba(197,161,111,0.25)]'
                      }`}
                    >
                      {/* Top Glowing Beam */}
                      <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_#C5A16F] z-30" />

                      {/* Shimmer Light Sweep on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none z-30" />

                      {/* Circular Avatar */}
                      <div className="relative mx-auto mb-4 mt-1 z-10">
                        {/* Outer Ambient Glow Ring */}
                        <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-[#C5A16F]/30 via-[#DFB77D]/20 to-[#9E7D47]/30 blur-md opacity-30 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        {/* Luxury Gradient Ring Frame */}
                        <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-[3px] bg-gradient-to-tr from-[#C5A16F] via-[#DFB77D] to-[#9E7D47] group-hover:scale-103 transition-transform duration-300 ease-out shadow-lg">
                          {/* Inner Dark/Light Background Ring */}
                          <div className={`w-full h-full rounded-full p-1 overflow-hidden transition-colors ${
                            isLight ? 'bg-white' : 'bg-[#081222]'
                          }`}>
                            {memberImage ? (
                              <img 
                                src={memberImage} 
                                className="w-full h-full object-cover rounded-full transition-transform duration-300 ease-out transform group-hover:scale-106" 
                                alt={memberName} 
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-[#112240] to-[#0A192F] text-3xl font-bold text-[#C5A16F]">
                                {memberName.charAt(0) || '✦'}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Pharaoh Logo Emblem Badge */}
                        <div className={`absolute bottom-0.5 end-0.5 z-20 w-8.5 h-8.5 rounded-full border-2 flex items-center justify-center shadow-lg group-hover:scale-108 transition-transform duration-300 ${
                          isLight 
                            ? 'bg-white border-[#C5A16F] text-[#8A5800] shadow-[#C5A16F]/30' 
                            : 'bg-[#070F1E] border-[#C5A16F] text-[#C5A16F] shadow-black/80'
                        }`}>
                          <span className="text-sm font-serif leading-none font-bold select-none drop-shadow-[0_0_4px_rgba(197,161,111,0.6)]">
                            𓂀
                          </span>
                        </div>
                      </div>

                      {/* Member Info */}
                      <div className="flex flex-col justify-between flex-grow relative z-10">
                        <div>
                          <div className="mb-2">
                            <span className={`inline-block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full border shadow-sm ${
                              isLight
                                ? 'text-[#8A5800] bg-amber-50/90 border-[#C5A16F]/30'
                                : 'text-[#C5A16F] bg-[#C5A16F]/10 border-[#C5A16F]/20'
                            }`}>
                              {memberRole}
                            </span>
                          </div>

                          <h4 className={`text-base sm:text-lg font-black tracking-tight mb-2 sm:mb-2.5 line-clamp-1 transition-colors duration-300 ${
                            isLight
                              ? 'text-slate-900 group-hover:text-[#8A5800]'
                              : 'text-white group-hover:text-[#C5A16F]'
                          }`}>
                            {memberName}
                          </h4>
                        </div>

                        {/* Enhanced Luxury View Profile Action Button */}
                        <div className="pt-3 border-t border-white/5 mt-auto">
                          <div className={`relative overflow-hidden w-full py-2.5 px-3.5 rounded-xl transition-all duration-300 flex items-center justify-between text-xs font-bold ${
                            isLight
                              ? 'bg-slate-100/90 text-slate-800 border border-slate-200/80 group-hover:border-[#C5A16F] group-hover:bg-gradient-to-r group-hover:from-[#C5A16F] group-hover:via-[#DFB77D] group-hover:to-[#C5A16F] group-hover:text-[#070F1E] group-hover:shadow-[0_4px_16px_rgba(197,161,111,0.35)]'
                              : 'bg-white/[0.04] text-gray-200 border border-white/10 group-hover:border-[#C5A16F]/60 group-hover:bg-gradient-to-r group-hover:from-[#C5A16F] group-hover:via-[#DFB77D] group-hover:to-[#C5A16F] group-hover:text-[#070F1E] group-hover:shadow-[0_4px_18px_rgba(197,161,111,0.4)]'
                          }`}>
                            <span className="font-extrabold text-xs tracking-wide relative z-10 transition-colors">
                              {language === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}
                            </span>

                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm relative z-10 ${
                              isLight
                                ? 'bg-white text-slate-800 group-hover:bg-[#070F1E] group-hover:text-[#C5A16F]'
                                : 'bg-white/10 text-gray-200 group-hover:bg-[#070F1E] group-hover:text-[#C5A16F]'
                            }`}>
                              <svg
                                className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Swiper Pagination Dots */}
          <div className="team-swiper-pagination flex justify-center items-center gap-1.5 mt-6" />
        </div>

      </div>
    </section>
  );
}
