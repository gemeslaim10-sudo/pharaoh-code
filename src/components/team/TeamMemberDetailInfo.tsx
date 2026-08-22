'use client';

import { motion } from 'framer-motion';

interface TeamMemberDetailInfoProps {
  name: string;
  role: string;
  description: string;
  isLight: boolean;
}

export function TeamMemberDetailInfo({
  name,
  role,
  description,
  isLight,
}: TeamMemberDetailInfoProps) {
  return (
    <motion.div 
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex-1 w-full"
    >
      {/* Role Pill Badge */}
      <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-3 border shadow-sm ${
        isLight
          ? 'bg-amber-50 text-[#8A5800] border-[#C5A16F]/40'
          : 'bg-pharaohGold/10 text-pharaohGold border-pharaohGold/30'
      }`}>
        <span className="text-[#C5A16F]">✦</span>
        {role}
      </span>

      {/* Member Name */}
      <h1 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-tight mb-3 ${
        isLight ? 'text-slate-900' : 'text-white'
      }`}>
        {name}
      </h1>

      {/* Dynamic Member Bio */}
      {description && (
        <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
          isLight ? 'text-slate-600' : 'text-gray-300'
        }`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
