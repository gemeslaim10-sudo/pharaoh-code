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
          ? `w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl border opacity-50 flex items-center justify-center ${
              isLight ? 'bg-white border-slate-200 text-slate-400' : 'bg-[#0F2338] border-white/10 text-gray-400'
            } ${className}`
          : `px-3 py-1.5 rounded-xl border opacity-50 inline-flex flex-row items-center justify-center gap-1.5 ${
              isLight ? 'bg-white border-slate-200 text-slate-400' : 'bg-[#0F2338] border-white/10 text-gray-400'
            } ${className}`}
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
        className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl border transition-all duration-300 flex items-center justify-center group cursor-pointer shadow-sm shrink-0 ${
          isLight
            ? 'bg-white border-slate-300 text-slate-700 hover:border-[#C5A16F] hover:text-[#8A5800] hover:bg-slate-50'
            : 'bg-[#0F2338] border-[#C5A16F]/30 text-[#C5A16F] hover:border-[#C5A16F] hover:bg-[#112240] hover:text-white'
        } ${className}`}
      >
        <svg
          className="w-4 h-4 transition-transform group-hover:rotate-12 duration-300 shrink-0 block"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
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
      className={`px-3 py-1.5 rounded-xl border transition-all duration-300 text-xs font-bold inline-flex flex-row items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
        isLight
          ? 'bg-white border-slate-300 text-slate-800 hover:border-[#8A5800] hover:text-[#8A5800] hover:bg-slate-50'
          : 'bg-[#0F2338] border-[#C5A16F]/30 text-white hover:border-[#C5A16F] hover:bg-[#112240]'
      } ${className}`}
    >
      <svg
        className="w-3.5 h-3.5 text-[#C5A16F] shrink-0 block"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
      <span className="text-[#C5A16F] font-extrabold uppercase tracking-wider leading-none inline-flex items-center justify-center">{language === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
    </button>
  );
};

