'use client';

import { motion } from 'framer-motion';

interface TeamHeroHeaderProps {
  subtitle: string;
  titlePart1: string;
  titlePart2: string;
  desc: string;
  isLight: boolean;
  direction: 'rtl' | 'ltr';
}

export function TeamHeroHeader({
  subtitle,
  titlePart1,
  titlePart2,
  desc,
  isLight,
  direction,
}: TeamHeroHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6"
    >
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-5 sm:w-6 h-[2px] bg-gradient-to-r from-[#C5A16F] to-transparent" />
          <span className="text-[#C5A16F] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[10px] sm:text-[11px] bg-[#C5A16F]/10 px-3 py-1 rounded-full border border-[#C5A16F]/20">
            {subtitle}
          </span>
        </div>
        <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
          {titlePart1}{' '}
          <span className="bg-gradient-to-r from-[#C5A16F] via-[#E8C97E] to-[#C5A16F] bg-clip-text text-transparent">
            {titlePart2}
          </span>
        </h2>
      </div>
      <p className={`max-w-sm text-xs sm:text-sm leading-relaxed ${direction === 'rtl' ? 'border-r-2 sm:border-r-4 pr-3 sm:pr-4' : 'border-l-2 sm:border-l-4 pl-3 sm:pl-4'} border-[#C5A16F]/50 shrink-0 font-light ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
        {desc}
      </p>
    </motion.div>
  );
}
