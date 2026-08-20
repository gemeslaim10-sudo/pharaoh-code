'use client';

import { motion } from 'framer-motion';
import { getDynamicText } from '@/lib/i18nHelper';
import { Language } from '@/types/i18n';

interface TeamMemberSkillsSectionProps {
  skills: any[];
  isLight: boolean;
  language: Language;
  skillsTitle?: string;
  noSkillsText?: string;
}

export default function TeamMemberSkillsSection({
  skills,
  isLight,
  language,
  skillsTitle = 'المهارات والخبرات البرمجية',
  noSkillsText = 'لا توجد مهارات مسجلة'
}: TeamMemberSkillsSectionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`space-y-4 p-4 sm:p-6 rounded-2xl sm:rounded-tr-[2rem] sm:rounded-bl-[2rem] border transition-colors ${
        isLight
          ? 'bg-slate-50/90 border-slate-200/80 shadow-sm'
          : 'bg-[#060D1A]/70 border-white/5 shadow-inner'
      }`}
    >
      <h4 className={`font-bold text-xs sm:text-sm mb-3 sm:mb-4 flex items-center gap-2 ${
        isLight ? 'text-slate-900' : 'text-white'
      }`}>
        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
          isLight ? 'bg-amber-100 text-[#8A5800]' : 'bg-pharaohGold/10 text-pharaohGold'
        }`}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span>{skillsTitle}</span>
      </h4>

      {skills.length === 0 ? (
        <p className={`text-xs ${isLight ? 'text-slate-400' : 'text-gray-500'}`}>
          {noSkillsText}
        </p>
      ) : (
        skills.map((skill: any, idx: number) => {
          const valStr = String(skill.value || '');
          const widthStyle = valStr.includes('%') ? valStr : `${valStr}%`;
          return (
            <div key={idx} className="space-y-1.5">
              <div className={`flex justify-between text-xs font-medium ${
                isLight ? 'text-slate-700' : 'text-gray-300'
              }`}>
                <span className="font-semibold">{getDynamicText(skill, 'name', language) || skill.name}</span>
                <span className={`font-bold font-mono ${isLight ? 'text-[#8A5800]' : 'text-pharaohGold'}`}>{valStr}</span>
              </div>
              <div className={`w-full h-2 rounded-full overflow-hidden ${
                isLight ? 'bg-slate-200/90' : 'bg-[#091528]'
              }`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: widthStyle }}
                  transition={{ duration: 1, delay: 0.35 + idx * 0.1, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    isLight 
                      ? 'bg-gradient-to-r from-[#C5A16F] to-[#8A5800]' 
                      : 'bg-gradient-to-r from-pharaohGold to-[#F0D597]'
                  }`}
                />
              </div>
            </div>
          );
        })
      )}
    </motion.div>
  );
}
