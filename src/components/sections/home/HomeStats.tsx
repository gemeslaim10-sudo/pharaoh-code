'use client';

import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { HomeStatsHeader } from './stats/HomeStatsHeader';
import { HomeStatCard } from './stats/HomeStatCard';
import { motion } from 'framer-motion';

export default function HomeStats({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const defaultItems: SectionItem[] = [
    {
      title: t("stats.teamLabel"),
      value: "25",
      prefix: "+",
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`
    },
    {
      title: t("stats.clientsLabel"),
      value: "80",
      prefix: "+",
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    },
    {
      title: t("stats.projectsLabel"),
      value: "150",
      prefix: "+",
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    },
    {
      title: t("stats.experienceLabel"),
      value: "8",
      prefix: "+",
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08-.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    }
  ];

  const itemsToRender = (Array.isArray(data?.items) && data.items.length > 0) ? data.items : defaultItems;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
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

  const subtitle = getDynamicText(data, 'subtitle', language) || t("stats.subtitle");
  const titlePart1 = getDynamicText(data, 'titlePart1', language) || t("stats.titlePart1");
  const titlePart2 = getDynamicText(data, 'titlePart2', language) || t("stats.titlePart2");
  const desc = getDynamicText(data, 'description', language) || t("stats.description");

  return (
    <section 
      id="stats" 
      className={`relative py-14 sm:py-20 overflow-hidden select-none transition-colors duration-300 ${
        isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#060D1A] text-white'
      }`} 
      dir={direction}
    >
      {/* Dynamic ambient spotlight */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] blur-[150px] rounded-full pointer-events-none ${
        isLight ? 'bg-[#C5A16F]/10' : 'bg-[#C5A16F]/8'
      }`} />
      <div className={`absolute inset-0 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none ${
        isLight 
          ? 'bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]' 
          : 'bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <HomeStatsHeader
          subtitle={subtitle}
          titlePart1={titlePart1}
          titlePart2={titlePart2}
          desc={desc}
          isLight={isLight}
        />

        {/* High-End Stats Metrics Grid with Staggered Framer Motion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {itemsToRender.map((item: SectionItem, index: number) => {
            const rawVal = item.value || '0';
            const numVal = parseInt(rawVal.replace(/[^0-9]/g, ''), 10) || 0;
            const prefix = item.prefix || (rawVal.startsWith('+') ? '+' : '');
            const suffix = item.suffix || (rawVal.endsWith('+') ? '+' : rawVal.endsWith('%') ? '%' : '');
            const title = getDynamicText(item, 'title', language) || item.title || '';

            return (
              <HomeStatCard
                key={index}
                item={item}
                title={title}
                numVal={numVal}
                prefix={prefix}
                suffix={suffix}
                isLight={isLight}
                itemVariants={itemVariants}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
