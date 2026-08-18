'use client';

import { motion } from 'framer-motion';

interface TechStackSidebarProps {
  subtitle: string;
  title1: string;
  title2: string;
  desc: string;
  cleanArch: string;
  aesEncrypt: string;
  direction: 'rtl' | 'ltr';
}

export function TechStackSidebar({
  subtitle,
  title1,
  title2,
  desc,
  cleanArch,
  aesEncrypt,
  direction,
}: TechStackSidebarProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: direction === 'rtl' ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="lg:w-1/3 space-y-5"
    >
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-4 sm:mb-5 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping shrink-0" />
        <h2 className="text-[#C5A16F] font-bold tracking-[0.15em] uppercase text-[11px] sm:text-xs leading-normal">{subtitle}</h2>
      </div>

      <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-[1.3] pt-0.5">
        {title1} <br /> 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
          {title2}
        </span>
      </h3>

      <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-light">
        {desc}
      </p>

      <div className="space-y-3 pt-3 border-t border-white/5">
        <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300 font-medium">
          <span className="w-6 h-6 rounded-lg bg-[#C5A16F]/10 border border-[#C5A16F]/30 flex items-center justify-center text-[#C5A16F] shrink-0">✔</span>
          {cleanArch}
        </div>
        <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300 font-medium">
          <span className="w-6 h-6 rounded-lg bg-[#C5A16F]/10 border border-[#C5A16F]/30 flex items-center justify-center text-[#C5A16F] shrink-0">✔</span>
          {aesEncrypt}
        </div>
      </div>
    </motion.div>
  );
}
