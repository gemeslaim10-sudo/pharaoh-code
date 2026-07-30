'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle language"
        className={`px-3 py-1.5 rounded-md border border-gray-700 bg-[#0F2338] text-gray-200 opacity-50 text-sm font-medium flex items-center gap-2 ${className}`}
      >
        <span className="w-4 h-4" />
        <span>...</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className={`px-3 py-1.5 rounded-md border border-gray-700 bg-[#0F2338] text-gray-200 hover:text-white hover:border-cyan-500/50 transition-all text-sm font-medium flex items-center gap-2 ${className}`}
    >
      <svg
        className="w-4 h-4 text-cyan-400"
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
      <span>{language === 'ar' ? 'English' : 'العربية'}</span>
    </button>
  );
};
