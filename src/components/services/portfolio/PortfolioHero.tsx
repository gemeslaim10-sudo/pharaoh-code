'use client';
import { SectionData, SectionItem } from '@/types';
import { useState, useMemo } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import PortfolioCard from './PortfolioCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortfolioHero({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [activeFilter, setActiveFilter] = useState('all');

  const items: SectionItem[] = useMemo(() => {
    return data?.items || [];
  }, [data?.items]);

  const filterOptions = useMemo(() => [
    { label: t('portfolio.filterAll') || 'الكل', filter: 'all', count: items.length },
    { 
      label: t('portfolio.filterMobile') || 'تطبيقات', 
      filter: 'mobile',
      count: items.filter((item: SectionItem) => {
        const cat = (item.category || item.category_en || item.category_ar || '').toLowerCase();
        return cat.includes('mobile') || cat.includes('جوال') || cat.includes('تطبيق');
      }).length
    },
    { 
      label: t('portfolio.filterWeb') || 'مواقع الويب', 
      filter: 'web',
      count: items.filter((item: SectionItem) => {
        const cat = (item.category || item.category_en || item.category_ar || '').toLowerCase();
        return cat.includes('web') || cat.includes('موقع') || cat.includes('ويب');
      }).length
    },
    { 
      label: t('portfolio.filterSystems') || 'أنظمة', 
      filter: 'systems',
      count: items.filter((item: SectionItem) => {
        const cat = (item.category || item.category_en || item.category_ar || '').toLowerCase();
        return cat.includes('system') || cat.includes('نظام') || cat.includes('crm') || cat.includes('erp');
      }).length
    },
    { 
      label: t('portfolio.filterDesign') || 'تصميم', 
      filter: 'design',
      count: items.filter((item: SectionItem) => {
        const cat = (item.category || item.category_en || item.category_ar || '').toLowerCase();
        return cat.includes('design') || cat.includes('ui') || cat.includes('ux') || cat.includes('تصميم');
      }).length
    },
  ], [items, t]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return items;
    return items.filter((item: SectionItem) => {
      const cat = (item.category || item.category_en || item.category_ar || '').toLowerCase();
      if (activeFilter === 'mobile') return cat.includes('mobile') || cat.includes('جوال') || cat.includes('تطبيق');
      if (activeFilter === 'web') return cat.includes('web') || cat.includes('موقع') || cat.includes('ويب');
      if (activeFilter === 'systems') return cat.includes('system') || cat.includes('نظام') || cat.includes('crm') || cat.includes('erp');
      if (activeFilter === 'design') return cat.includes('design') || cat.includes('ui') || cat.includes('ux') || cat.includes('تصميم');
      return true;
    });
  }, [items, activeFilter]);

  if (!data) return null;

  return (
    <section id="portfolio" className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-[#0A192F] relative overflow-hidden" dir={direction}>
      {/* Ambient glowing orbs */}
      <div className="absolute top-10 right-1/4 w-[400px] h-[300px] bg-[#C5A16F]/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[350px] h-[300px] bg-blue-600/4 blur-[130px] rounded-full pointer-events-none" />

      {/* Cyber Grid Subtle Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_50%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/25 text-[#C5A16F] text-[10px] font-black tracking-widest uppercase mb-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-pulse" />
            <span>{getDynamicText(data, 'subtitle', language) || t('portfolio.subtitle')}</span>
          </div>

          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {getDynamicText(data, 'titlePart1', language) || t('portfolio.titlePart1')}
            {' '}
            <span className="text-[#C5A16F] italic relative inline-block">
              {getDynamicText(data, 'titlePart2', language) || t('portfolio.titlePart2')}
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C5A16F] via-[#D4AF37] to-transparent rounded-full" />
            </span>
          </h1>

          <p className={`mt-2.5 text-xs sm:text-sm leading-relaxed font-light max-w-xl mx-auto ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
            {getDynamicText(data, 'description', language) || t('portfolio.subtitle')}
          </p>
        </motion.div>

        {/* Compact, Sleek Filter Dock with Spring Animated Pill */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className={`inline-flex flex-wrap items-center justify-center p-1 rounded-xl sm:rounded-full border backdrop-blur-xl transition-all shadow-md gap-1 relative ${
            isLight
              ? 'bg-slate-100/90 border-slate-200/90 shadow-slate-200/50'
              : 'bg-[#091528]/85 border-white/10 shadow-black/20'
          }`}>
            {filterOptions.map(({ label, filter, count }) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  data-active={isActive ? "true" : "false"}
                  className={`filter-btn portfolio-filter-btn relative px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-full text-xs font-bold transition-colors duration-200 flex items-center gap-1.5 select-none ${
                    isActive
                      ? 'active !text-[#070F1E] font-black'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="portfolioActivePill"
                      className="absolute inset-0 bg-gradient-to-r from-[#C5A16F] via-[#DFB77D] to-[#C5A16F] rounded-lg sm:rounded-full shadow-[0_2px_10px_rgba(197,161,111,0.35)]"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "!text-[#070F1E] font-black" : ""}`}>{label}</span>
                  {count > 0 && (
                    <span className={`relative z-10 count-badge text-[9px] px-1.5 py-0.2 rounded-full font-mono font-black transition-colors ${
                      isActive
                        ? 'bg-[#070F1E]/15 !text-[#070F1E]'
                        : isLight
                          ? 'bg-slate-200/80 text-slate-700'
                          : 'bg-white/10 text-gray-400'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid - Animated Entrance & Filter Transitions */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-4.5 min-h-[250px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map((item: SectionItem, index: number) => (
                <motion.div 
                  key={(item as any).id || index}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -10 }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                >
                  <PortfolioCard item={item} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-12 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#C5A16F]/10 border border-[#C5A16F]/20 flex items-center justify-center text-[#C5A16F] text-xl">
                  ✦
                </div>
                <p className={`text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                  {language === 'ar' ? 'لا توجد مشاريع متوفرة في هذا القسم حالياً' : 'No projects available in this category currently.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
