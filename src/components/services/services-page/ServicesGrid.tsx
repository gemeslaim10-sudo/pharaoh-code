'use client';

import { SectionData, SectionItem } from '@/types';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { motion } from 'framer-motion';

export default function ServicesGrid({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (!data) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-[#040810] text-white overflow-hidden select-none relative" dir={direction}>
      {/* Ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#C5A16F]/6 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 relative"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-4 sm:mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping shrink-0" />
            <h2 className="text-[#C5A16F] font-bold tracking-[0.15em] uppercase text-[11px] sm:text-xs leading-normal">
              {getDynamicText(data, 'subtitle', language) || t('services.subtitle')}
            </h2>
          </div>

          <h3 className={`text-2xl sm:text-3xl md:text-4xl font-black leading-[1.3] mb-2.5 tracking-normal pt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {getDynamicText(data, 'titlePart1', language) || t('services.titlePart1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
              {getDynamicText(data, 'titlePart2', language) || t('services.titlePart2')}
            </span>
          </h3>

          <p className={`text-xs sm:text-sm leading-relaxed font-light max-w-xl mx-auto ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
            {getDynamicText(data, 'description', language) || t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid - 4 Columns on Large Screens with Framer Motion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-4.5"
        >
          {data.items?.map((item: SectionItem, index: number) => {
            const titleText = getDynamicText(item, 'title', language) || item.title || '';
            const descText = getDynamicText(item, 'description', language) || getDynamicText(item, 'desc', language) || item.description || '';
            const linkText = getDynamicText(item, 'linkText', language) || item.linkText_ar || t('services.exploreBtn') || (language === 'ar' ? 'استكشف الخدمة' : 'Explore Service');
            const metaKeyText = getDynamicText(item, 'metaKey', language) || item.metaKey_ar || (item.metaValue ? (language === 'ar' ? 'يبدأ من' : 'From') : '');
            const metaValText = getDynamicText(item, 'metaValue', language) || item.metaValue || '';
            const badgeRight = getDynamicText(item, 'badgeTopRight', language) || item.badgeTopRight;
            const badgeLeft = getDynamicText(item, 'badgeTopLeft', language) || item.badgeTopLeft;
            const serviceLink = item.linkUrl || `/services/${item.id || 'default'}`;

            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
                whileTap={{ scale: 0.98 }}
                className={`group relative rounded-xl overflow-hidden border transition-colors duration-300 flex flex-col justify-between h-full ${
                  isLight
                    ? 'bg-white border-slate-200 shadow-sm hover:border-[#C5A16F] hover:shadow-[0_12px_30px_-6px_rgba(197,161,111,0.22)]'
                    : 'bg-[#0A1628]/90 border-white/10 hover:border-[#C5A16F]/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_30px_-6px_rgba(197,161,111,0.22)]'
                }`}
              >
                {/* Media Image Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#06101E]">
                  {(item.imageUrl || item.image) ? (
                    <img 
                      src={(item.imageUrl || item.image)} 
                      alt={titleText} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
                      loading="lazy" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#0B172A] text-[#C5A16F]/30 text-3xl">
                      ✦
                    </div>
                  )}

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-black/30 pointer-events-none" />

                  {/* Badges */}
                  {(badgeRight || badgeLeft) && (
                    <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none z-10 gap-1.5">
                      {badgeRight && (
                        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#070F1E]/85 backdrop-blur-md text-[#C5A16F] border border-[#C5A16F]/30 shadow-sm">
                          {badgeRight}
                        </span>
                      )}
                      {badgeLeft && (
                        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30 shadow-sm ms-auto">
                          {badgeLeft}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className={`text-sm sm:text-base font-bold mb-1.5 transition-colors line-clamp-1 ${
                      isLight ? 'text-slate-900 group-hover:text-[#8A5800]' : 'text-white group-hover:text-[#C5A16F]'
                    }`}>
                      {titleText}
                    </h4>

                    <p className={`text-xs leading-relaxed mb-3 line-clamp-2 font-light ${
                      isLight ? 'text-slate-600' : 'text-gray-400'
                    }`}>
                      {descText}
                    </p>
                  </div>

                  {/* Footer Meta & Explore Button */}
                  <div className={`pt-2.5 border-t flex items-center justify-between gap-2 text-xs ${
                    isLight ? 'border-slate-100' : 'border-white/5'
                  }`}>
                    {metaValText ? (
                      <div className="flex flex-col">
                        <span className={`text-[9px] uppercase tracking-wider font-bold ${
                          isLight ? 'text-slate-400' : 'text-gray-400'
                        }`}>
                          {metaKeyText}
                        </span>
                        <span className={`text-xs font-black ${
                          isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]'
                        }`}>
                          {metaValText}
                        </span>
                      </div>
                    ) : <div />}

                    <Link 
                      href={serviceLink}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 shadow-sm ${
                        isLight
                          ? 'bg-slate-100 hover:bg-[#C5A16F] text-slate-800 hover:text-[#050B14]'
                          : 'bg-white/10 hover:bg-[#C5A16F] text-gray-200 hover:text-[#050B14]'
                      }`}
                    >
                      <span>{linkText}</span>
                      <svg 
                        className={`w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`}
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
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
