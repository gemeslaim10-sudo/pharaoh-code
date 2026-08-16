'use client';

import { useState, useEffect } from 'react';
import { SectionData } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

interface TestimonialItem {
  id?: string;
  name?: string;
  name_en?: string;
  role?: string;
  role_en?: string;
  company?: string;
  rating?: number | string;
  content?: string;
  content_en?: string;
  text?: string;
  imageUrl?: string;
  image?: string;
  verified?: boolean;
}

const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'جمال سليم',
    name_en: 'Gamal Sellim',
    role: 'شريك نجاح | الرئيس التنفيذي',
    role_en: 'Success Partner | CEO',
    company: 'NextGen Solutions',
    rating: 5,
    content: 'من أفضل الفرق البرمجية التي تعاملت معها على المستوى الشخصي والمهني. دقة فائقة في المواعيد وكود نظيف بأعلى معايير الأمان وقابلية التوسع.',
    content_en: 'One of the finest software engineering teams I have collaborated with professionally. Unmatched precision, clean code, and sovereign security.',
    verified: true,
  },
  {
    name: 'م. أحمد خالد',
    name_en: 'Eng. Ahmed Khaled',
    role: 'مدير قطاع التكنولوجيا',
    role_en: 'Chief Technology Officer',
    company: 'Apex Cloud Systems',
    rating: 5,
    content: 'تم تسليم منصتنا السحابية قبل الموعد المحدد بأداء فائق وتصميم استثنائي. دعمهم الفني المستمر بعد الإطلاق جعلهم شريكاً استراتيجياً حقيقياً لأعمالنا.',
    content_en: 'Delivered our cloud platform ahead of schedule with lightning performance. Their dedicated post-launch support made them our true strategic partner.',
    verified: true,
  },
  {
    name: 'د. سارة المنصوري',
    name_en: 'Dr. Sara Al-Mansouri',
    role: 'مؤسس المنصة',
    role_en: 'Platform Founder',
    company: 'Visionary Retail Group',
    rating: 5,
    content: 'تجربة المستخدم التي صمموها لتطبيق الجوال ضاعفت معدل التحويل لدينا بشكل ملحوظ. اهتمامهم بالتفاصيل الدقيقة والجمالية هو ما يميزهم عن غيرهم.',
    content_en: 'The UX design they crafted for our mobile app significantly doubled our conversion rate. Their meticulous eye for luxury aesthetics sets them apart.',
    verified: true,
  }
];

export default function HomeTestimonials({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();
  const dbItems = (data?.items || []) as TestimonialItem[];
  const displayItems: TestimonialItem[] = dbItems.length > 0 ? dbItems : FALLBACK_TESTIMONIALS;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  // Auto-cycle through reviews every 6 seconds if multiple reviews exist
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-2.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping" />
            <h2 className="text-[#C5A16F] font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
              {getDynamicText(data, 'subtitle', language) || t("testimonials.subtitle")}
            </h2>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-2.5 tracking-tight">
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
          
          {/* MAIN HERO TESTIMONIAL DISPLAY (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#0F1E38] via-[#091528] to-[#050B14] border border-[#C5A16F]/30 shadow-[0_15px_40px_rgba(0,0,0,0.7)] relative overflow-hidden group">
            
            {/* Top Glowing Beam */}
            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent shadow-[0_0_10px_#C5A16F]" />

            {/* Giant Luxury Quote Mark Watermark */}
            <span className={`absolute -top-3 ${direction === 'rtl' ? 'left-4' : 'right-4'} font-serif text-7xl sm:text-8xl font-black text-[#C5A16F]/[0.05] select-none pointer-events-none`}>
              “
            </span>

            {/* Top Stars & Verified Status */}
            <div className="flex items-center justify-between relative z-10 mb-5">
              <div className="flex items-center gap-0.5 text-[#C5A16F] text-sm sm:text-base">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="drop-shadow-[0_0_6px_rgba(197,161,111,0.5)]">★</span>
                ))}
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/20 text-[#C5A16F] text-[10px] sm:text-[11px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F]" />
                {language === 'ar' ? 'شريك موثق' : 'Verified Partner'}
              </span>
            </div>

            {/* Quote Content */}
            <div className="relative z-10 my-2">
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-normal italic">
                "{activeContent}"
              </p>
            </div>

            {/* Author Details Footer */}
            <div className="relative z-10 pt-5 mt-5 border-t border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-[#112240] border border-[#C5A16F]/40 shrink-0 shadow-md">
                  {activeImg ? (
                    <img src={activeImg} alt={activeName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-base text-[#C5A16F]">
                      {activeName.charAt(0) || '✦'}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-white text-base sm:text-lg font-bold">
                    {activeName}
                  </h4>
                  <p className="text-gray-400 text-xs font-light">
                    {activeRole} {activeCompany && <span className="text-[#C5A16F]">@ {activeCompany}</span>}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* SIDE LIST SELECTOR (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-2.5">
            {displayItems.map((item, idx) => {
              const isSelected = activeIndex === idx;
              const name = getDynamicText(item, 'name', language) || item.name || '';
              const text = getDynamicText(item, 'content', language) || getDynamicText(item, 'text', language) || item.content || item.text || '';
              const img = item.imageUrl || item.image || '';

              return (
                <div
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 border flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#10203C] border-[#C5A16F] shadow-[0_8px_20px_rgba(197,161,111,0.15)] -translate-y-0.5'
                      : 'bg-[#091427]/70 hover:bg-[#0E1E38]/80 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs ${
                    isSelected ? 'bg-[#C5A16F] text-[#050B14]' : 'bg-[#112240] text-gray-300 border border-white/10'
                  }`}>
                    {img ? (
                      <img src={img} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{name.charAt(0) || '✦'}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h5 className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                        {name}
                      </h5>
                    </div>
                    <p className="text-gray-400 text-[11px] truncate font-light">
                      {text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
