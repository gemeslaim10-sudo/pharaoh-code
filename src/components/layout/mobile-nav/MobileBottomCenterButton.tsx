'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface MobileBottomCenterButtonProps {
  activeLogo: string;
  isLight: boolean;
  language: string;
}

export function MobileBottomCenterButton({
  activeLogo,
  isLight,
  language,
}: MobileBottomCenterButtonProps) {
  return (
    <div className="relative -top-5 flex flex-col items-center justify-center shrink-0">
      <Link
        href="/"
        aria-label="Home"
        className="group relative flex items-center justify-center focus:outline-none"
      >
        {/* Ambient Pulsing Glow behind Center Button */}
        <div className={`absolute -inset-1.5 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none ${
          isLight
            ? 'bg-gradient-to-tr from-[#8A5800]/30 via-[#C5A16F]/40 to-[#8A5800]/30'
            : 'bg-gradient-to-tr from-[#C5A16F]/40 via-[#DFB77D]/50 to-[#9E7D47]/40'
        }`} />

        {/* Elevated Button Body */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center border-2 shadow-2xl transition-all duration-300 relative z-10 overflow-hidden ${
            isLight
              ? 'bg-white border-[#C5A16F]/50 shadow-[0_8px_25px_rgba(138,88,0,0.2)] p-2'
              : 'bg-[#0A192F] border-[#C5A16F]/60 shadow-[0_8px_25px_rgba(197,161,111,0.35)] p-2'
          }`}
        >
          {activeLogo ? (
            <img 
              src={activeLogo} 
              alt="Logo" 
              className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110 select-none" 
            />
          ) : (
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#C5A16F] drop-shadow-[0_0_6px_rgba(197,161,111,0.5)]" fill="currentColor">
              <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z" />
            </svg>
          )}
        </motion.div>
      </Link>
      <span className={`text-[9px] font-black tracking-wider uppercase mt-1 transition-colors ${
        isLight ? 'text-slate-800' : 'text-[#C5A16F]'
      }`}>
        {language === 'ar' ? 'الرئيسية' : 'Home'}
      </span>
    </div>
  );
}
