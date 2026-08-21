'use client';

import Link from 'next/link';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

interface NavbarMobileDrawerHeaderProps {
  siteName: string;
  activeLogo?: string | undefined;
  onClose: () => void;
}

export function NavbarMobileDrawerHeader({
  siteName,
  activeLogo,
  onClose,
}: NavbarMobileDrawerHeaderProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const nameParts = siteName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');

  return (
    <div className={`flex items-center justify-between pb-5 mb-1 border-b ${isLight ? 'border-slate-100' : 'border-white/[0.08]'}`}>
      {/* Logo */}
      <Link href="/" onClick={onClose} className="group flex items-center gap-2.5">
        {activeLogo ? (
          <div className="relative overflow-hidden rounded-xl">
            <img src={activeLogo} alt={siteName} className="h-9 w-auto object-contain" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className={`
              w-9 h-9 rounded-xl flex items-center justify-center border shrink-0
              ${isLight
                ? 'bg-gradient-to-br from-[#C5A16F]/20 to-[#9E7D47]/10 border-[#C5A16F]/30 shadow-[0_2px_10px_rgba(197,161,111,0.15)]'
                : 'bg-gradient-to-br from-[#C5A16F]/15 to-[#9E7D47]/8 border-[#C5A16F]/22 shadow-[0_2px_10px_rgba(197,161,111,0.12)]'
              }
            `}>
              <svg viewBox="0 0 24 24" className={`w-4.5 h-4.5 ${isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]'}`} fill="currentColor">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-black text-[16px] tracking-tight uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {firstWord}{' '}
                {restWords && <span className={isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]'}>{restWords}</span>}
              </span>
              <span className={`text-[9px] tracking-[0.2em] uppercase font-medium mt-0.5 ${isLight ? 'text-[#C5A16F]/55' : 'text-[#C5A16F]/40'}`}>
                Software House
              </span>
            </div>
          </div>
        )}
      </Link>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        <ThemeSwitcher className="!w-9 !h-9" />
        <LanguageSwitcher iconOnly={true} className="!w-9 !h-9" />
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={onClose}
          aria-label="Close drawer"
          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer group ${
            isLight
              ? 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-red-50 hover:border-red-300 hover:text-red-500'
              : 'bg-white/[0.05] border-white/[0.09] text-gray-400 hover:bg-red-500/15 hover:border-red-400/30 hover:text-red-400'
          }`}
        >
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
