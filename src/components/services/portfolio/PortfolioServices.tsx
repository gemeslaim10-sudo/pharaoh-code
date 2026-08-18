'use client';

import Link from 'next/link';
import { SectionData } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { motion } from 'framer-motion';

export default function PortfolioServices({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const itemsToRender = data?.items || [];

  if (itemsToRender.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
    <section className="py-14 sm:py-16 bg-pharaohNavy relative overflow-hidden" dir={direction}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-5 h-[2px] bg-[#C5A16F]" />
            <span className="text-[#C5A16F] tracking-[0.3em] uppercase text-[10px] font-bold">
              {language === 'ar' ? 'خدماتنا' : 'OUR SERVICES'}
            </span>
            <div className="w-5 h-[2px] bg-[#C5A16F]" />
          </div>

          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-2.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {getDynamicText(data, 'titlePart1', language) || t('services.titlePart1')}{' '}
            <span className="text-pharaohGold">
              {getDynamicText(data, 'titlePart2', language) || t('services.titlePart2')}
            </span>
          </h2>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto font-light ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
            {getDynamicText(data, 'description', language) || t('services.subtitle')}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5"
        >
          {itemsToRender.map((item: any, index: number) => {
            const itemTitle = getDynamicText(item, 'title', language);
            const itemDesc = getDynamicText(item, 'description', language) || getDynamicText(item, 'desc', language);
            const actionText = getDynamicText(item, 'actionText', language) || t('services.exploreBtn');

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <Link 
                  href="/contact" 
                  className={`block group relative p-5 sm:p-6 rounded-xl border transition-colors duration-300 h-full ${
                    isLight
                      ? 'bg-white border-slate-200/90 shadow-sm hover:border-[#C5A16F] hover:shadow-[0_12px_28px_-6px_rgba(197,161,111,0.2)]'
                      : 'bg-gradient-to-b from-[#0F1E38] to-[#0A182E] border-white/10 hover:border-[#C5A16F]/50 shadow-md hover:shadow-[0_12px_28px_-6px_rgba(197,161,111,0.22)]'
                  }`}
                >
                  {/* Top golden beam */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="w-10 h-10 bg-[#C5A16F]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#C5A16F] transition-colors duration-200">
                    <div 
                      className={`w-5 h-5 transition-colors duration-200 ${isLight ? 'text-[#8A5800] group-hover:text-[#0A192F]' : 'text-[#C5A16F] group-hover:text-[#0A192F]'}`}
                      dangerouslySetInnerHTML={{ __html: item.iconSvg || item.icon }} 
                    />
                  </div>

                  <h3 className={`text-base font-bold mb-1.5 transition-colors duration-200 ${isLight ? 'text-slate-900 group-hover:text-[#8A5800]' : 'text-white group-hover:text-[#C5A16F]'}`}>
                    {itemTitle}
                  </h3>

                  <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                    {itemDesc}
                  </p>

                  <div className={`inline-flex items-center text-xs font-bold gap-1 transition-colors duration-200 ${isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]'}`}>
                    <span>{actionText}</span>
                    <span className="text-xs transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
