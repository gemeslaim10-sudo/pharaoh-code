'use client';

import { useState, useEffect } from 'react';
import { SectionData } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { TestimonialItem, FALLBACK_TESTIMONIALS } from './testimonials/HomeTestimonialsData';
import { HomeTestimonialsCard } from './testimonials/HomeTestimonialsCard';
import { HomeTestimonialsList } from './testimonials/HomeTestimonialsList';

export default function HomeTestimonials({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();
  const dbItems = (data?.items || []) as TestimonialItem[];
  const displayItems: TestimonialItem[] = dbItems.length > 0 ? dbItems : FALLBACK_TESTIMONIALS;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoPlay || displayItems.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayItems.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, displayItems.length]);

  const activeReview: TestimonialItem = displayItems[activeIndex] ?? displayItems[0] ?? FALLBACK_TESTIMONIALS[0]!;
  const activeName = getDynamicText(activeReview, 'name', language) || activeReview.name || '';
  const activeRole = getDynamicText(activeReview, 'role', language) || activeReview.role || (language === 'ar' ? 'شريك نجاح' : 'Success Partner');
  const activeContent = getDynamicText(activeReview, 'content', language) || getDynamicText(activeReview, 'text', language) || activeReview.content || activeReview.text || '';
  const activeCompany = activeReview.company || '';
  const activeImg = activeReview.imageUrl || activeReview.image || '';

  return (
    <section 
      id="happy-clients" 
      className="relative py-14 sm:py-20 bg-[#040810] overflow-hidden text-white select-none" 
      dir={direction}
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Ambient background spotlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#C5A16F]/8 via-blue-900/8 to-[#C5A16F]/5 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-4 sm:mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping shrink-0" />
            <h2 className="text-[#C5A16F] font-bold tracking-[0.15em] uppercase text-[11px] sm:text-xs leading-normal">
              {getDynamicText(data, 'subtitle', language) || t("testimonials.subtitle")}
            </h2>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-[1.3] mb-2.5 tracking-normal pt-0.5">
            {t("testimonials.titlePart1")}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
              {t("testimonials.titlePart2")}
            </span>
          </h3>

          <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-light max-w-2xl">
            {language === 'ar' 
              ? 'شهادات حقيقية من قادة الأعمال والشركات التي وثقت بنا لتحقيق تحولها الرقمي وصناعة الفارق.' 
              : 'Authentic testimonials from industry leaders and visionary enterprises who partnered with us.'}
          </p>
        </div>

        {/* Master Testimonial Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch max-w-5xl mx-auto">
          <HomeTestimonialsCard
            activeName={activeName}
            activeRole={activeRole}
            activeContent={activeContent}
            activeCompany={activeCompany}
            activeImg={activeImg}
          />
          <HomeTestimonialsList
            items={displayItems}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </div>
      </div>
    </section>
  );
}
