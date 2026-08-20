'use client';

import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { useRef, useEffect } from 'react';
import { HomeTeamHeader } from './team/HomeTeamHeader';
import { HomeTeamCard } from './team/HomeTeamCard';
import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function HomeTeam({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const activeLogo = isLight ? (data?.logoLightUrl || data?.logoUrl || '') : (data?.logoUrl || data?.logoLightUrl || '');
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
  }, [language, membersToRender.length]);

  return (
    <section id="our-team" className="relative py-12 sm:py-20 bg-[#050B14] overflow-hidden text-white select-none" dir={direction}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] pointer-events-none opacity-40" style={{ background: 'radial-gradient(circle, rgba(197,161,111,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <HomeTeamHeader
          subtitle={getDynamicText(data, 'subtitle', language) || t("team.subtitle")}
          titlePart1={t("team.titlePart1")}
          titlePart2={t("team.titlePart2")}
          desc={getDynamicText(data, 'description', language) || (language === 'ar' ? 'نخبة من المهندسين والمطورين المبدعين في صناعة البرمجيات وتطوير الحلول السيادية.' : 'Elite engineers and digital architects dedicated to software craftsmanship and sovereign solutions.')}
          isLight={isLight}
          direction={direction}
          viewAllText={t("team.viewMembers") || (language === 'ar' ? 'استعرض كافة الفريق' : 'View Full Team')}
        />

        {/* High-End Team Elite Cards Swiper Carousel with Anti-Clipping Padding */}
        <div ref={swiperContainerRef} className="swiper teamSwiper !overflow-visible -mx-2 sm:-mx-3 px-2 sm:px-3 pt-2 pb-6 sm:pt-3 sm:pb-8">
          <div className="swiper-wrapper">
            {membersToRender.map((member: SectionItem, index: number) => {
              const memberName = getDynamicText(member, 'name', language) || member.name || '';
              const memberRole = getDynamicText(member, 'role', language) || member.role || '';
              const memberImage = member.imageUrl || member.image || '';

              return (
                <div key={index} className="swiper-slide h-auto">
                  <HomeTeamCard
                    member={member}
                    memberName={memberName}
                    memberRole={memberRole}
                    memberImage={memberImage}
                    isLight={isLight}
                    activeLogo={activeLogo}
                    direction={direction}
                    language={language}
                  />
                </div>
              );
            })}
          </div>

          <div className="team-swiper-pagination flex justify-center items-center gap-1.5 mt-6" />
        </div>
      </div>
    </section>
  );
}
