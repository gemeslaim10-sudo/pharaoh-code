'use client';

import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { motion } from 'framer-motion';
import { TeamHeroHeader } from './TeamHeroHeader';
import { TeamHeroMemberCard } from './TeamHeroMemberCard';

export default function TeamHero({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (!data) return null;

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
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section id="our-team" className="relative pt-24 sm:pt-32 pb-14 sm:pb-20 bg-[#050D1A] overflow-hidden" dir={direction}>
      {/* Rich background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundImage: 'radial-gradient(ellipse at 70% 0%, rgba(197,161,111,0.07) 0%, transparent 50%), radial-gradient(ellipse at 30% 100%, rgba(59,130,246,0.04) 0%, transparent 50%)' }} />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: 'linear-gradient(rgba(197,161,111,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,161,111,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <TeamHeroHeader
          subtitle={getDynamicText(data, 'subtitle', language) || 'The Creators'}
          titlePart1={getDynamicText(data, 'titlePart1', language) || t('team.titlePart1')}
          titlePart2={getDynamicText(data, 'titlePart2', language) || t('team.titlePart2')}
          desc={getDynamicText(data, 'description', language) || t('team.subtitle')}
          isLight={isLight}
          direction={direction}
        />

        {/* Team cards — Staggered Framer Motion Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {data.members?.map((member: SectionItem, index: number) => {
            const name = getDynamicText(member, 'name', language) || member.name || '';
            const role = getDynamicText(member, 'role', language) || member.role || '';
            const memberImg = member.imageUrl || member.image || '';

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
              >
                <TeamHeroMemberCard
                  member={member}
                  name={name}
                  role={role}
                  memberImg={memberImg}
                  isLight={isLight}
                  direction={direction}
                  language={language}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
