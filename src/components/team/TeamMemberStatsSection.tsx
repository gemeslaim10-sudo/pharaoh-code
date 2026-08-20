'use client';

import { motion } from 'framer-motion';
import { getDynamicText } from '@/lib/i18nHelper';
import { Language } from '@/types/i18n';

interface TeamMemberStatsSectionProps {
  stats: any[];
  isLight: boolean;
  language: Language;
  noStatsText?: string;
}

export default function TeamMemberStatsSection({
  stats,
  isLight,
  language,
  noStatsText = 'لا توجد إحصائيات مسجلة'
}: TeamMemberStatsSectionProps) {
  if (stats.length === 0) {
    return (
      <div className={`col-span-2 p-4 sm:p-5 rounded-2xl text-center border ${
        isLight ? 'bg-slate-50/90 border-slate-200/80' : 'bg-[#060D1A]/70 border-white/5'
      }`}>
        <p className={`text-xs ${isLight ? 'text-slate-400' : 'text-gray-500'}`}>
          {noStatsText}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {stats.map((stat: any, idx: number) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 + idx * 0.1 }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className={`p-3.5 sm:p-5 rounded-2xl text-center border transition-all shadow-sm ${
            isLight 
              ? 'bg-slate-50/90 border-slate-200/80 hover:border-amber-300 hover:shadow-md' 
              : 'bg-[#060D1A]/70 border-white/5 hover:border-pharaohGold/30 hover:shadow-lg'
          }`}
        >
          <span className={`text-2xl sm:text-3xl font-black block mb-1 font-mono ${
            isLight ? 'text-[#8A5800]' : 'text-pharaohGold'
          }`}>
            {stat.value}
          </span>
          <span className={`text-[11px] sm:text-xs font-semibold ${
            isLight ? 'text-slate-500' : 'text-gray-400'
          }`}>
            {getDynamicText(stat, 'label', language) || stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
