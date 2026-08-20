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
    <div className={`flex items-center justify-between pb-5 border-b ${
      isLight ? 'border-slate-200' : 'border-white/10'
    }`}>
      <Link href="/" onClick={onClose} className="flex items-center gap-2">
        {activeLogo ? (
          <img src={activeLogo} alt={siteName} className="h-9 w-auto object-contain" />
        ) : (
          <span className={`font-black text-lg tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {firstWord} {restWords && <span className="text-[#C5A16F]">{restWords}</span>}
          </span>
        )}
      </Link>

      <div className="flex items-center gap-2">
        <ThemeSwitcher className="!w-9 !h-9 !rounded-xl" />
        <LanguageSwitcher iconOnly={true} className="!h-9 !rounded-xl" />
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          aria-label="Close drawer"
          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
            isLight
              ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
