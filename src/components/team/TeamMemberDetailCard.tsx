'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import TeamMemberImageModal from './TeamMemberImageModal';
import TeamMemberSkillsSection from './TeamMemberSkillsSection';
import TeamMemberStatsSection from './TeamMemberStatsSection';
import TeamMemberSocialLinks from './TeamMemberSocialLinks';

interface TeamMemberDetailCardProps {
  member: any;
  activeLogo?: string;
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
        <Link
          href="/team"
          title={t('team.backToTeam') || 'العودة للفريق'}
          aria-label={t('team.backToTeam') || 'العودة للفريق'}
          className={`absolute top-3.5 end-3.5 sm:top-6 sm:end-6 z-30 w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-sm ${
            isLight
              ? 'bg-white/90 text-slate-700 border-slate-200 hover:border-[#C5A16F] hover:text-[#8A5800] hover:bg-slate-50 hover:shadow-md'
              : 'bg-[#060D1A]/80 text-[#C5A16F] border-white/10 hover:border-pharaohGold/40 hover:bg-pharaohGold hover:text-[#060D1A] hover:shadow-[0_0_15px_rgba(197,161,111,0.3)]'
          }`}
        >
          <svg
            className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 ${
              language === 'ar'
                ? 'group-hover:translate-x-0.5'
                : 'group-hover:-translate-x-0.5'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d={language === 'ar' ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
            />
          </svg>
        </Link>

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
          
          {/* Enlarged Clickable Circular Avatar with Dynamic Logo Badge */}
          <motion.div 
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => setIsImageOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsImageOpen(true); }}
            title={language === 'ar' ? 'انقر لتكبير الصورة' : 'Click to zoom image'}
            className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 shrink-0 group/detail-avatar cursor-pointer select-none"
          >
            {/* Animated Glow Halo */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#C5A16F]/50 via-[#DFB77D]/30 to-[#9E7D47]/50 blur-lg opacity-60 group-hover/detail-avatar:opacity-100 transition-all duration-700 pointer-events-none" />
            
            <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-tr from-[#C5A16F] via-[#DFB77D] to-[#9E7D47] group-hover/detail-avatar:scale-105 transition-all duration-500 shadow-xl">
              <div className={`w-full h-full rounded-full p-1 overflow-hidden relative ${
                isLight ? 'bg-white' : 'bg-[#060D1A]'
              }`}>
                <img 
                  src={avatarUrl} 
                  alt={name} 
                  className="w-full h-full object-cover rounded-full transition-all duration-700 transform group-hover/detail-avatar:scale-110 group-hover/detail-avatar:brightness-105" 
                />

                {/* Zoom Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-full opacity-0 group-hover/detail-avatar:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                  <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center shadow-lg transform group-hover/detail-avatar:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-pharaohGold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Platform Logo Badge */}
            <div className={`absolute bottom-1 end-1 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center shadow-lg group-hover/detail-avatar:scale-115 group-hover/detail-avatar:rotate-12 transition-all duration-300 p-1.5 overflow-hidden ${
              isLight 
                ? 'bg-white border-[#C5A16F] shadow-amber-900/10' 
                : 'bg-[#070F1E] border-[#C5A16F] shadow-black/40'
            }`}>
              {activeLogo ? (
                <img src={activeLogo} alt="Logo" className="w-full h-full object-contain select-none" />
              ) : (
                <svg className="w-4 h-4 text-[#C5A16F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </div>
          </motion.div>

          {/* Member Details: Role, Name, Description */}
          <div className="flex-1 space-y-2 sm:space-y-3">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <span className={`inline-block text-[11px] sm:text-xs font-black px-3.5 py-1 rounded-xl tracking-wider uppercase border shadow-sm ${
                isLight
                  ? 'bg-amber-100/90 text-[#8A5800] border-amber-300'
                  : 'bg-pharaohGold/10 text-pharaohGold border-pharaohGold/25'
              }`}>
                {role}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {name}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-normal ${
                isLight ? 'text-slate-600' : 'text-gray-300'
              }`}
            >
              {description}
            </motion.p>
          </div>
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
              social={member?.social}
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
