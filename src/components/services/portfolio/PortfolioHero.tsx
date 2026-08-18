'use client';

import { SectionData, SectionItem } from '@/types';
import { useState, useMemo } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import PortfolioCard from './PortfolioCard';
import { PortfolioHeroHeader } from './PortfolioHeroHeader';
import { PortfolioHeroFilterDock, PortfolioFilterItem } from './PortfolioHeroFilterDock';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortfolioHero({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [activeFilter, setActiveFilter] = useState('all');

  const items: SectionItem[] = useMemo(() => {
    return data?.items || [];
  }, [data?.items]);

  const filterOptions: PortfolioFilterItem[] = useMemo(() => [
    { label: t('portfolio.filterAll') || 'الكل', filter: 'all', count: items.length },
    { 
      label: t('portfolio.filterMobile') || 'تطبيقات', 
      filter: 'mobile',
      count: items.filter((item: SectionItem) => {
        const cat = (item.category || (item as Record<string, unknown>).category_en as string || (item as Record<string, unknown>).category_ar as string || '').toLowerCase();
        return cat.includes('mobile') || cat.includes('جوال') || cat.includes('تطبيق');
      }).length
    },
    { 
      label: t('portfolio.filterWeb') || 'مواقع الويب', 
      filter: 'web',
      count: items.filter((item: SectionItem) => {
        const cat = (item.category || (item as Record<string, unknown>).category_en as string || (item as Record<string, unknown>).category_ar as string || '').toLowerCase();
        return cat.includes('web') || cat.includes('موقع') || cat.includes('ويب');
      }).length
    },
    { 
      label: t('portfolio.filterSystems') || 'أنظمة', 
      filter: 'systems',
      count: items.filter((item: SectionItem) => {
        const cat = (item.category || (item as Record<string, unknown>).category_en as string || (item as Record<string, unknown>).category_ar as string || '').toLowerCase();
        return cat.includes('system') || cat.includes('نظام') || cat.includes('crm') || cat.includes('erp');
      }).length
    },
    { 
      label: t('portfolio.filterDesign') || 'تصميم', 
      filter: 'design',
      count: items.filter((item: SectionItem) => {
        const cat = (item.category || (item as Record<string, unknown>).category_en as string || (item as Record<string, unknown>).category_ar as string || '').toLowerCase();
        return cat.includes('design') || cat.includes('ui') || cat.includes('ux') || cat.includes('تصميم');
      }).length
    },
  ], [items, t]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return items;
    return items.filter((item: SectionItem) => {
      const cat = (item.category || (item as Record<string, unknown>).category_en as string || (item as Record<string, unknown>).category_ar as string || '').toLowerCase();
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
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_50%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <PortfolioHeroHeader
          subtitle={getDynamicText(data, 'subtitle', language) || t('portfolio.subtitle')}
          titlePart1={getDynamicText(data, 'titlePart1', language) || t('portfolio.titlePart1')}
          titlePart2={getDynamicText(data, 'titlePart2', language) || t('portfolio.titlePart2')}
          desc={getDynamicText(data, 'description', language) || t('portfolio.subtitle')}
          isLight={isLight}
        />

        <PortfolioHeroFilterDock
          filterOptions={filterOptions}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          isLight={isLight}
        />

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-4.5 min-h-[250px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map((item: SectionItem, index: number) => (
                <motion.div 
                  key={item.id || index}
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
