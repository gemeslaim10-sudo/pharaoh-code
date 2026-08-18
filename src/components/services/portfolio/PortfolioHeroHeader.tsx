'use client';

import { motion } from 'framer-motion';

interface PortfolioHeroHeaderProps {
  subtitle: string;
  titlePart1: string;
  titlePart2: string;
  desc: string;
  isLight: boolean;
}

export function PortfolioHeroHeader({
  subtitle,
  titlePart1,
  titlePart2,
  desc,
  isLight,
}: PortfolioHeroHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto mb-6 sm:mb-8"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/25 text-[#C5A16F] text-[10px] font-black tracking-widest uppercase mb-3 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-pulse" />
        <span>{subtitle}</span>
      </div>

      <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
        {titlePart1}{' '}
        <span className="text-[#C5A16F] italic relative inline-block">
          {titlePart2}
          <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C5A16F] via-[#D4AF37] to-transparent rounded-full" />
        </span>
      </h1>

      <p className={`mt-2.5 text-xs sm:text-sm leading-relaxed font-light max-w-xl mx-auto ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
        {desc}
      </p>
    </motion.div>
  );
}
