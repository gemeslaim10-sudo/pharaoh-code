'use client';

import { SectionData, SectionItem } from '@/types';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function ServicesGrid({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();

  if (!data) return null;

  return (
    <section className="py-20 sm:py-28 bg-[#040810] text-white overflow-hidden select-none relative" dir={direction}>
        {/* Ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#C5A16F]/8 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-3 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping" />
                    <h2 className="text-[#C5A16F] font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
                        {getDynamicText(data, 'subtitle', language) || t('services.subtitle')}
                    </h2>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
                    {getDynamicText(data, 'titlePart1', language) || t('services.titlePart1')}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
                        {getDynamicText(data, 'titlePart2', language) || t('services.titlePart2')}
                    </span>
                </h3>

                <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-light">
                    {getDynamicText(data, 'description', language) || t('services.subtitle')}
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {data.items?.map((item: SectionItem, index: number) => {
                    const titleText = getDynamicText(item, 'title', language) || item.title || '';
                    const descText = getDynamicText(item, 'description', language) || getDynamicText(item, 'desc', language) || item.description || '';
                    const linkText = getDynamicText(item, 'linkText', language) || item.linkText_ar || t('services.exploreBtn') || (language === 'ar' ? 'استكشف الخدمة' : 'Explore Service');
                    const metaKeyText = getDynamicText(item, 'metaKey', language) || item.metaKey_ar || (item.metaValue ? (language === 'ar' ? 'السعر يبدأ من' : 'Starting from') : '');
                    const metaValText = getDynamicText(item, 'metaValue', language) || item.metaValue || '';
                    const badgeRight = getDynamicText(item, 'badgeTopRight', language) || item.badgeTopRight;
                    const badgeLeft = getDynamicText(item, 'badgeTopLeft', language) || item.badgeTopLeft;
                    const serviceLink = item.linkUrl || `/services/${item.id || 'default'}`;

                    return (
                        <div 
                            key={index} 
                            className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050B14] border border-white/5 hover:border-[#C5A16F]/40 transition-all duration-500 hover:-translate-y-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between"
                        >
                            {/* Top Glowing Beam */}
                            <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 shadow-[0_0_10px_#C5A16F] z-20" />

                            <div>
                                {/* Service Image Container */}
                                <div className="relative h-52 sm:h-60 overflow-hidden bg-[#0B1528]">
                                    <img 
                                        src={(item.imageUrl || item.image)} 
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                                        alt={titleText} 
                                        loading="lazy"
                                    />
                                    
                                    {badgeRight && (
                                        <div className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[10px] font-bold text-white shadow-md z-10">
                                            {badgeRight}
                                        </div>
                                    )}
                                    
                                    {badgeLeft && (
                                        <div className="absolute top-3.5 left-3.5 bg-[#C5A16F] text-[#050B14] px-3 py-1 rounded-full text-[10px] font-black shadow-md z-10">
                                            {badgeLeft}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 sm:p-7 text-center sm:text-start">
                                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-2.5 group-hover:text-[#C5A16F] transition-colors duration-300">
                                        {titleText}
                                    </h4>
                                    
                                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light line-clamp-2 mb-6">
                                        {descText}
                                    </p>
                                </div>
                            </div>

                            {/* Card Footer & Action */}
                            <div className="p-6 sm:p-7 pt-0">
                                {metaValText && (
                                    <div className="flex justify-between items-center mb-4 pt-3 border-t border-white/5 text-xs">
                                        <span className="text-gray-400 font-light">{metaKeyText}</span>
                                        <span className="text-[#C5A16F] font-bold font-mono">{metaValText}</span>
                                    </div>
                                )}
                                
                                <Link 
                                    href={serviceLink} 
                                    className="w-full py-3.5 px-4 rounded-xl bg-[#C5A16F]/10 hover:bg-[#C5A16F] text-[#C5A16F] hover:text-[#050B14] font-bold text-xs sm:text-sm border border-[#C5A16F]/30 hover:border-[#C5A16F] transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group/btn"
                                >
                                    <span>{linkText}</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 ${direction === 'rtl' ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`}
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
                    );
                })}
            </div>
        </div>
    </section>
  );
}
