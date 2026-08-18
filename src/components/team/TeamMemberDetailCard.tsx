'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

interface TeamMemberDetailCardProps {
  member: any;
}

export default function TeamMemberDetailCard({ member }: TeamMemberDetailCardProps) {
  const { t, language } = useTranslation();
  const skills = member.skills || [];
  const stats = member.stats || [];

  const name = getDynamicText(member, 'name', language) || member.name;
  const role = getDynamicText(member, 'role', language) || member.role;
  const description = getDynamicText(member, 'description', language) || member.description;

  return (
    <div className="team-card bg-[#112240] border-t-2 border-r-2 border-pharaohGold/40 rounded-3xl md:rounded-tr-[4rem] md:rounded-bl-[4rem] shadow-[0_25px_60px_rgba(197,161,111,0.15)] p-5 sm:p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] sm:text-[18rem] font-serif opacity-[0.015] text-pharaohGold select-none pointer-events-none">
        𓂀
      </div>
      
      {/* Header Layout - Mobile Optimized with Circular Avatar */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start gap-5 sm:gap-8 border-b border-pharaohGold/10 pb-6 sm:pb-8 mb-6 sm:mb-8 relative z-10">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0 group/detail-avatar">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#C5A16F]/40 via-[#DFB77D]/20 to-[#9E7D47]/40 blur-md opacity-50 group-hover/detail-avatar:opacity-100 transition-all duration-700 pointer-events-none" />
          <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-tr from-[#C5A16F] via-[#DFB77D] to-[#9E7D47] group-hover/detail-avatar:rotate-180 transition-transform duration-1000 ease-out shadow-xl">
            <div className="w-full h-full rounded-full p-1 overflow-hidden bg-[#0A192F]">
              <img 
                src={member.image || member.imageUrl} 
                alt={name} 
                className="w-full h-full object-cover rounded-full transition-all duration-700 transform group-hover/detail-avatar:scale-115 group-hover/detail-avatar:brightness-105" 
              />
            </div>
          </div>
          <div className="absolute bottom-1 end-1 z-10 w-8 h-8 rounded-full border-2 bg-[#070F1E] border-[#C5A16F] text-[#C5A16F] flex items-center justify-center shadow-lg group-hover/detail-avatar:scale-115 group-hover/detail-avatar:rotate-12 transition-all duration-300">
            <span className="text-sm font-serif leading-none font-bold select-none drop-shadow-[0_0_4px_rgba(197,161,111,0.6)]">
              𓂀
            </span>
          </div>
        </div>
        <div className="flex-1">
          <span className="inline-block bg-pharaohGold/10 text-pharaohGold text-[11px] sm:text-xs font-bold px-3.5 py-1 rounded-lg tracking-wider uppercase border border-pharaohGold/20 shadow-sm">
            {role}
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mt-3 sm:mt-4 mb-2 sm:mb-3 tracking-tight">
            {name}
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-light">
            {description}
          </p>
        </div>
      </div>
      
      {/* Dynamic Skills and Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
        
        {/* Skills column */}
        <div className="space-y-4 bg-[#0A192F]/50 p-4 sm:p-6 rounded-2xl sm:rounded-tr-[2.5rem] sm:rounded-bl-[2.5rem] border border-white/5 shadow-inner">
          <h4 className="text-white font-bold text-xs sm:text-sm mb-3 sm:mb-4 flex items-center gap-2">
            <span className="text-pharaohGold text-sm sm:text-base">𓂀</span> {t('team.skillsTitle')}
          </h4>
          {skills.length === 0 ? (
            <p className="text-xs text-gray-500">{t('team.noSkills')}</p>
          ) : (
            skills.map((skill: any, idx: number) => {
              const valStr = String(skill.value || '');
              const widthStyle = valStr.includes('%') ? valStr : `${valStr}%`;
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-300 font-medium">
                    <span>{getDynamicText(skill, 'name', language) || skill.name}</span>
                    <span className="text-pharaohGold font-bold">{valStr}</span>
                  </div>
                  <div className="w-full h-1.5 sm:h-2 bg-[#0A192F] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-pharaohGold to-[#E8C97E] rounded-full transition-all duration-1000" 
                      style={{ width: widthStyle }} 
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        {/* Stats column & Contact links */}
        <div className="flex flex-col justify-between gap-5 sm:gap-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.length === 0 ? (
              <div className="col-span-2 bg-[#0A192F]/50 border border-white/5 p-4 sm:p-5 rounded-xl text-center shadow-md">
                <p className="text-xs text-gray-500">{t('team.noStats')}</p>
              </div>
            ) : (
              stats.map((stat: any, idx: number) => (
                <div key={idx} className="bg-[#0A192F]/50 border border-white/5 p-3.5 sm:p-5 rounded-xl text-center shadow-md">
                  <span className="text-2xl sm:text-3xl font-black text-pharaohGold block mb-0.5 sm:mb-1">{stat.value}</span>
                  <span className="text-gray-400 text-[11px] sm:text-xs">{getDynamicText(stat, 'label', language) || stat.label}</span>
                </div>
              ))
            )}
          </div>
          
          {/* Contact Links */}
          {member.social && (member.social.facebook || member.social.instagram) && (
            <div className="border-t border-pharaohGold/10 pt-4 sm:pt-5">
              <span className="text-gray-400 text-xs block mb-2.5 sm:mb-3 font-medium">{t('team.contactChannels')}</span>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                {member.social.facebook && (
                  <a 
                    href={member.social.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-[#0A192F] text-gray-200 hover:text-pharaohGold hover:border-pharaohGold/80 border border-white/10 transition-all text-center text-xs font-bold tracking-wide shadow-md hover:bg-[#112240]"
                  >
                    Facebook
                  </a>
                )}
                {member.social.instagram && (
                  <a 
                    href={member.social.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-[#0A192F] text-gray-200 hover:text-pharaohGold hover:border-pharaohGold/80 border border-white/10 transition-all text-center text-xs font-bold tracking-wide shadow-md hover:bg-[#112240]"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
