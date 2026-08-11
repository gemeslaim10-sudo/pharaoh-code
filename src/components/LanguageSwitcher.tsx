'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
  iconOnly?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '', iconOnly = false }) => {
  const { language, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle language"
        className={iconOnly 
          ? `w-10 h-10 rounded-xl border border-[#C5A16F]/20 bg-[#0F2338] text-gray-400 flex items-center justify-center opacity-50 ${className}`
          : `px-2.5 py-1 rounded-lg border border-[#C5A16F]/20 bg-[#0F2338] text-gray-400 text-xs font-bold flex items-center gap-1.5 opacity-50 ${className}`}
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  if (iconOnly) {
    return (
      <button
        onClick={toggleLanguage}
        title={language === 'ar' ? 'English (EN)' : 'العربية (AR)'}
        aria-label="Toggle language"
        className={`w-10 h-10 rounded-xl border border-[#C5A16F]/30 bg-[#0F2338] text-[#C5A16F] hover:border-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#0A192F] transition-all shadow-md flex items-center justify-center group ${className}`}
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:rotate-45 duration-300"
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
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className={`px-2.5 py-1 rounded-lg border border-[#C5A16F]/30 bg-[#0F2338] text-white hover:border-[#C5A16F] hover:bg-[#112240] transition-all text-xs font-bold flex items-center gap-1.5 ${className}`}
    >
      <svg
        className="w-3.5 h-3.5 text-[#C5A16F]"
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
      <span className="text-[#C5A16F] font-extrabold uppercase tracking-wider">{language === 'ar' ? 'EN' : 'AR'}</span>
    </button>
  );
};
