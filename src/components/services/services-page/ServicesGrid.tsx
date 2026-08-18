'use client';

import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { motion } from 'framer-motion';
import { ServicesGridHeader } from './ServicesGridHeader';
import { ServicesGridCard } from './ServicesGridCard';

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
        <ServicesGridHeader
          subtitle={getDynamicText(data, 'subtitle', language) || t('services.subtitle')}
          titlePart1={getDynamicText(data, 'titlePart1', language) || t('services.titlePart1')}
          titlePart2={getDynamicText(data, 'titlePart2', language) || t('services.titlePart2')}
          desc={getDynamicText(data, 'description', language) || t('services.subtitle')}
          isLight={isLight}
        />

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
            const linkText = getDynamicText(item, 'linkText', language) || (item as Record<string, unknown>).linkText_ar as string || t('services.exploreBtn') || (language === 'ar' ? 'استكشف الخدمة' : 'Explore Service');
            const metaKeyText = getDynamicText(item, 'metaKey', language) || (item as Record<string, unknown>).metaKey_ar as string || (item.metaValue ? (language === 'ar' ? 'يبدأ من' : 'From') : '');
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
              >
                <ServicesGridCard
                  item={item}
                  titleText={titleText}
                  descText={descText}
                  linkText={linkText}
                  metaKeyText={metaKeyText}
                  metaValText={metaValText}
                  badgeRight={badgeRight}
                  badgeLeft={badgeLeft}
                  serviceLink={serviceLink}
                  isLight={isLight}
                  direction={direction}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
