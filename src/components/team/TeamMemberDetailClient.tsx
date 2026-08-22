'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { TeamMemberData } from '@/types/team';
import TeamMemberDetailCard from './TeamMemberDetailCard';

interface TeamMemberDetailClientProps {
  member: TeamMemberData;
  logoUrl?: string | undefined;
  logoLightUrl?: string | undefined;
}

export default function TeamMemberDetailClient({
  member,
  logoUrl,
  logoLightUrl,
}: TeamMemberDetailClientProps) {
  const { direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const activeLogo = isLight ? (logoLightUrl || logoUrl || '') : (logoUrl || logoLightUrl || '');

  return (
    <section 
      className={`relative pt-20 sm:pt-24 pb-12 sm:pb-20 overflow-hidden min-h-screen flex items-center justify-center transition-colors duration-500 ${
        isLight ? 'bg-slate-50' : 'bg-[#060D1A]'
      }`} 
      dir={direction}
    >
      {/* Ambient Background Aura */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-700 ${
        isLight ? 'bg-[#C5A16F]/10 opacity-70' : 'bg-[#C5A16F]/5 opacity-100'
      }`} />

      <div className="max-w-4xl mx-auto px-3 sm:px-6 relative z-10 w-full">
        {/* Animated Member Profile Card */}
        <TeamMemberDetailCard member={member} activeLogo={activeLogo} isLight={isLight} />
      </div>
    </section>
  );
}
