'use client';

import { motion } from 'framer-motion';

interface ClientsGridHeaderProps {
  subtitle: string;
  titlePart1: string;
  titlePart2: string;
  desc: string;
}

export function ClientsGridHeader({
  subtitle,
  titlePart1,
  titlePart2,
  desc,
}: ClientsGridHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-3 mb-5">
        <div className="w-10 h-[2px] bg-gradient-to-r from-transparent to-[#C5A16F]" />
        <span className="text-[#C5A16F] font-bold tracking-[0.4em] uppercase text-[11px] bg-[#C5A16F]/8 px-4 py-1.5 rounded-full border border-[#C5A16F]/20">
          {subtitle}
        </span>
        <div className="w-10 h-[2px] bg-gradient-to-l from-transparent to-[#C5A16F]" />
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
        {titlePart1}{' '}
        <span className="bg-gradient-to-r from-[#C5A16F] via-[#E8C97E] to-[#C5A16F] bg-clip-text text-transparent">
          {titlePart2}
        </span>
      </h2>
      <p className="text-gray-300 dark:text-gray-400 max-w-xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed font-normal">
        {desc}
      </p>
      <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent mx-auto mt-5 rounded-full shadow-[0_0_15px_rgba(197,161,111,0.4)]" />
    </motion.div>
  );
}
