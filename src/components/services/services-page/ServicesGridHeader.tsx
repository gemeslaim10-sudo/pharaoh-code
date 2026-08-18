'use client';

import { motion } from 'framer-motion';

interface ServicesGridHeaderProps {
  subtitle: string;
  titlePart1: string;
  titlePart2: string;
  desc: string;
  isLight: boolean;
}

export function ServicesGridHeader({
  subtitle,
  titlePart1,
  titlePart2,
  desc,
  isLight,
}: ServicesGridHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 relative"
    >
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-4 sm:mb-5 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping shrink-0" />
        <h2 className="text-[#C5A16F] font-bold tracking-[0.15em] uppercase text-[11px] sm:text-xs leading-normal">
          {subtitle}
        </h2>
      </div>

      <h3 className={`text-2xl sm:text-3xl md:text-4xl font-black leading-[1.3] mb-2.5 tracking-normal pt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
        {titlePart1}{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
          {titlePart2}
        </span>
      </h3>

      <p className={`text-xs sm:text-sm leading-relaxed font-light max-w-xl mx-auto ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
        {desc}
      </p>
    </motion.div>
  );
}
