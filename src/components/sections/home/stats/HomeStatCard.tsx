'use client';

import { motion, Variants } from 'framer-motion';
import { SectionItem } from '@/types';
import StatCounter from '../StatCounter';

function stripSvgColors(svg: string): string {
  if (!svg) return '';
  return svg
    .replace(/\s*(?:group-hover:|group-active:)?text-\[#[^\]]+\]/g, '')
    .replace(/\s*(?:group-hover:|group-active:)?stroke-\[#[^\]]+\]/g, '')
    .replace(/stroke="#[a-fA-F0-9]{3,6}"/g, 'stroke="currentColor"')
    .replace(/fill="#[a-fA-F0-9]{3,6}"/g, 'fill="currentColor"')
    .replace(/stroke:#[a-fA-F0-9]{3,6}/g, 'stroke:currentColor')
    .replace(/fill:#[a-fA-F0-9]{3,6}/g, 'fill:currentColor');
}

interface HomeStatCardProps {
  item: SectionItem;
  title: string;
  numVal: number;
  prefix: string;
  suffix: string;
  isLight: boolean;
  itemVariants: Variants;
}

export function HomeStatCard({
  item,
  title,
  numVal,
  prefix,
  suffix,
  isLight,
  itemVariants,
}: HomeStatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      whileTap={{ scale: 0.98 }}
      className={`group relative rounded-2xl p-5 sm:p-6 border transition-colors duration-300 shadow-lg flex flex-col items-center text-center overflow-hidden h-full ${
        isLight
          ? 'bg-white border-slate-300 hover:border-[#8A5800] hover:shadow-[0_10px_30px_rgba(138,88,0,0.2)]'
          : 'bg-gradient-to-b from-[#0F1E38] via-[#0A162B] to-[#070F1E] border-white/5 hover:border-[#C5A16F]/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
      }`}
    >
      {/* Top Subtle Neon Edge Light */}
      <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 shadow-[0_0_10px_#C5A16F]" />

      {/* Floating Glowing Icon */}
      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 transition-all duration-400 group-hover:scale-105 group-hover:bg-[#C5A16F] shadow-md ${
        isLight
          ? 'bg-slate-100 border-slate-300 group-hover:border-[#C5A16F]/30'
          : 'bg-white/5 border-white/10 group-hover:border-[#C5A16F]/30'
      }`}>
        <div
          className={`w-5.5 h-5.5 transition-colors duration-400 flex items-center justify-center group-hover:text-[#060D1A] ${
            isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]'
          }`}
          dangerouslySetInnerHTML={{ __html: stripSvgColors(item.iconSvg || '') }}
        />
      </div>

      {/* Animated Stat Value */}
      <div className="flex items-baseline justify-center gap-0.5 mb-1.5">
        {prefix && (
          <span className={`text-2xl sm:text-3xl font-bold font-mono ${isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]'}`}>
            {prefix}
          </span>
        )}
        <span className={`text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight transition-all ${
          isLight ? 'text-slate-900 group-hover:text-[#8A5800]' : 'text-white group-hover:text-[#C5A16F]'
        }`}>
          <StatCounter targetValue={numVal} />
        </span>
        {suffix && (
          <span className={`text-2xl sm:text-3xl font-bold font-mono ${isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]'}`}>
            {suffix}
          </span>
        )}
      </div>

      {/* Metric Label */}
      <p className={`font-bold text-xs sm:text-sm tracking-wide transition-colors ${
        isLight ? 'text-slate-800 group-hover:text-slate-950' : 'text-gray-300 group-hover:text-white'
      }`}>
        {title}
      </p>

      {/* Bottom decorative gold dash */}
      <div className="w-6 h-0.5 bg-[#C5A16F]/20 group-hover:w-12 group-hover:bg-[#C5A16F] rounded-full mt-4 transition-all duration-400" />
    </motion.div>
  );
}
