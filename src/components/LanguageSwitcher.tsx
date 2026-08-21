'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

interface LanguageSwitcherProps {
  className?: string;
  iconOnly?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '', iconOnly = false }) => {
  const { language, toggleLanguage } = useLanguage();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle language"
        className={iconOnly 
          ? `w-10 h-10 rounded-xl border border-white/10 bg-white/5 opacity-50 flex items-center justify-center ${className}`
          : `px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 opacity-50 inline-flex items-center justify-center gap-2 ${className}`}
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
        aria-label="Toggle language"
        className={`
          relative w-10 h-10 rounded-xl border flex items-center justify-center cursor-pointer select-none
          transition-all duration-300 active:scale-95 group/lang shrink-0
          ${isLight
            ? 'bg-white border-slate-200 text-amber-600 shadow-sm hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-600 hover:border-amber-600 hover:text-white hover:shadow-[0_4px_16px_rgba(217,119,6,0.35)] hover:-translate-y-0.5'
            : 'bg-[#0A1A30]/80 border-[#C5A16F]/30 text-[#C5A16F] shadow-[0_2px_10px_rgba(0,0,0,0.3)] hover:bg-[#C5A16F] hover:border-[#F3E0B5] hover:text-[#040A15] hover:shadow-[0_0_20px_rgba(197,161,111,0.55)] hover:-translate-y-0.5'
          } ${className}
        `}
      >
        <svg
          className="w-4 h-4 transition-transform duration-500 group-hover/lang:rotate-45 group-hover/lang:scale-110 shrink-0 block"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      dir="ltr"
      className={`
        relative px-3.5 py-2 rounded-xl border transition-all duration-300 text-xs font-black
        inline-flex flex-row items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 group/lang
        ${isLight
          ? 'bg-white border-slate-200 text-slate-800 hover:border-amber-600 hover:text-amber-700 hover:bg-amber-50'
          : 'bg-[#0A1A30]/80 border-[#C5A16F]/30 text-white hover:border-[#C5A16F] hover:bg-[#C5A16F]/15 hover:text-[#C5A16F]'
        } ${className}
      `}
    >
      <svg
        className={`w-4 h-4 shrink-0 block transition-transform duration-300 group-hover/lang:rotate-12 ${isLight ? 'text-amber-600' : 'text-[#C5A16F]'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
      <span className="font-extrabold uppercase tracking-wider leading-none">
        {language === 'ar' ? 'English (EN)' : 'العربية (AR)'}
      </span>
    </button>
  );
};
