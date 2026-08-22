'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { TeamMemberData } from '@/types/team';
import TeamMemberImageModal from './TeamMemberImageModal';
import TeamMemberSkillsSection from './TeamMemberSkillsSection';
import TeamMemberStatsSection from './TeamMemberStatsSection';
import TeamMemberSocialLinks from './TeamMemberSocialLinks';
import { TeamMemberDetailAvatar } from './TeamMemberDetailAvatar';
import { TeamMemberDetailInfo } from './TeamMemberDetailInfo';
import { TeamMemberDetailBackBtn } from './TeamMemberDetailBackBtn';

export type { TeamMemberData };

interface TeamMemberDetailCardProps {
  member: TeamMemberData;
  activeLogo?: string | undefined;
  isLight?: boolean;
}

export default function TeamMemberDetailCard({ member, activeLogo, isLight = false }: TeamMemberDetailCardProps) {
  const { t, language } = useTranslation();
  const [isImageOpen, setIsImageOpen] = useState(false);
  const skills = member?.skills || [];
  const stats = member?.stats || [];

  const name = getDynamicText(member, 'name', language) || member?.name || '';
  const role = getDynamicText(member, 'role', language) || member?.role || '';
  const description = getDynamicText(member, 'description', language) || member?.description || '';
  const avatarUrl = member?.image || member?.imageUrl || '';

  const socialLinks = member?.social
    ? {
        facebook: member.social.facebook,
        instagram: member.social.instagram,
      }
    : undefined;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 25, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`team-card rounded-3xl md:rounded-tr-[3.5rem] md:rounded-bl-[3.5rem] p-5 sm:p-8 md:p-10 relative overflow-hidden transition-all duration-500 border ${
          isLight
            ? 'bg-white/95 backdrop-blur-2xl border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08),0_0_30px_rgba(197,161,111,0.08)]'
            : 'bg-[#0B1528]/95 backdrop-blur-2xl border-pharaohGold/30 shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(197,161,111,0.06)]'
        }`}
      >
        {/* Floating Compact Back Icon Button */}
        <TeamMemberDetailBackBtn
          isLight={isLight}
          language={language}
          backText={t('team.backToTeam') || 'العودة للفريق'}
        />

        {/* Decorative Ambient Pattern & Glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] sm:text-[18rem] font-serif opacity-[0.015] select-none pointer-events-none ${
          isLight ? 'text-[#8A5800]' : 'text-pharaohGold'
        }`}>
          ✦
        </div>

        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity ${
          isLight ? 'bg-amber-100/40 opacity-70' : 'bg-pharaohGold/5 opacity-100'
        }`} />
        
        {/* Header Layout - Enlarged Avatar & Member Info */}
        <div className={`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start gap-6 sm:gap-8 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b relative z-10 ${
          isLight ? 'border-slate-200/80' : 'border-white/10'
        }`}>
          <TeamMemberDetailAvatar
            avatarUrl={avatarUrl}
            name={name}
            activeLogo={activeLogo}
            isLight={isLight}
            language={language}
            onOpenImage={() => setIsImageOpen(true)}
          />

          <TeamMemberDetailInfo
            name={name}
            role={role}
            description={description}
            isLight={isLight}
          />
        </div>
        
        {/* Dynamic Skills and Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 relative z-10">
          {/* Skills Column */}
          <TeamMemberSkillsSection
            skills={skills}
            isLight={isLight}
            language={language}
            skillsTitle={t('team.skillsTitle') || 'المهارات والخبرات البرمجية'}
            noSkillsText={t('team.noSkills') || 'لا توجد مهارات مسجلة'}
          />
          
          {/* Stats Column & Contact Channels */}
          <div className="flex flex-col justify-between gap-5 sm:gap-6">
            <TeamMemberStatsSection
              stats={stats}
              isLight={isLight}
              language={language}
              noStatsText={t('team.noStats') || 'لا توجد إحصائيات مسجلة'}
            />
            
            <TeamMemberSocialLinks
              social={socialLinks}
              isLight={isLight}
              contactTitle={t('team.contactChannels') || 'قنوات التواصل المباشرة'}
            />
          </div>
        </div>
      </motion.div>

      {/* Lightbox / Zoomed Image Modal */}
      <TeamMemberImageModal
        isOpen={isImageOpen}
        onClose={() => setIsImageOpen(false)}
        imageUrl={avatarUrl}
        name={name}
        role={role}
        language={language}
      />
    </>
  );
}
