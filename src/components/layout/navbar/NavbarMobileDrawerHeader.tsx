'use client';

import Link from 'next/link';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
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
  const nameParts = siteName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');

  return (
    <div className="flex items-center justify-between pb-6 border-b border-white/10">
      <Link href="/" onClick={onClose} className="flex items-center gap-2">
        {activeLogo ? (
          <img src={activeLogo} alt={siteName} className="h-10 w-auto object-contain" />
        ) : (
          <span className="text-white font-black text-xl tracking-tight">
            {firstWord} {restWords && <span className="text-[#C5A16F]">{restWords}</span>}
          </span>
        )}
      </Link>

      <div className="flex items-center gap-2.5">
        <ThemeSwitcher />
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
