'use client';

import { SectionData, SectionItem } from '@/types';
import { CategoryItem } from '@/types/category';
import { useState, useMemo } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { isProjectInCategory } from '@/lib/categoryHelper';
import PortfolioCard from './PortfolioCard';
import { PortfolioHeroHeader } from './PortfolioHeroHeader';
import { PortfolioHeroFilterDock, PortfolioFilterItem } from './PortfolioHeroFilterDock';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortfolioHero({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeFilter, setActiveFilter] = useState('all');

  const items: SectionItem[] = useMemo(() => data?.items || [], [data?.items]);

  const categories: CategoryItem[] = useMemo(() => {
    return (data as any)?.categories || [];
  }, [data]);

  const filterOptions: PortfolioFilterItem[] = useMemo(() => {
    const dynamicList: PortfolioFilterItem[] = [
      { label: t('portfolio.filterAll') || (language === 'ar' ? 'الكل' : 'All'), filter: 'all', count: items.length }
    ];

    if (categories && categories.length > 0) {
      categories.forEach(c => {
        const slug = (c.slug || c.id || '').toLowerCase();
        const count = items.filter((item: SectionItem) => isProjectInCategory(item, c)).length;
        const label = language === 'ar'
          ? (c.name_ar || c.nameAr || c.name_en || c.nameEn || slug)
          : (c.name_en || c.nameEn || c.name_ar || c.nameAr || slug);

        dynamicList.push({
          label,
          filter: slug,
          count,
        });
      });
    }

    return dynamicList;
  }, [items, categories, language, t]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return items;
    const targetCat = categories.find(c => (c.slug || c.id || '').toLowerCase() === activeFilter.toLowerCase());
    return items.filter((item: SectionItem) => {
      if (targetCat) {
        return isProjectInCategory(item, targetCat);
      }
      return isProjectInCategory(item, activeFilter);
    });
  }, [items, activeFilter, categories]);

  if (!data) return null;

  return (
    <section id="portfolio" className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-[#0A192F] relative overflow-hidden" dir={direction}>
      <div className="absolute top-10 right-1/4 w-[400px] h-[300px] bg-[#C5A16F]/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[350px] h-[300px] bg-blue-600/4 blur-[130px] rounded-full pointer-events-none" />
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

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[250px]">
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
                  <PortfolioCard item={item} categories={categories} />
                </motion.div>
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="col-span-full py-12 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#C5A16F]/10 border border-[#C5A16F]/20 flex items-center justify-center text-[#C5A16F] text-xl">✦</div>
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
