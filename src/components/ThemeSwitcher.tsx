'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={`w-10 h-10 rounded-xl border border-[#C5A16F]/20 bg-[#0F2338] text-gray-400 flex items-center justify-center opacity-50 ${className}`}
      >
        <span className="w-5 h-5" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? 'التحويل إلى الوضع الفاتح (Light Mode)' : 'التحويل إلى الوضع الداكن (Dark Mode)'}
      aria-label="Toggle Theme"
      className={`w-10 h-10 rounded-xl border transition-all shadow-md flex items-center justify-center group ${
        isDark
          ? 'border-[#C5A16F]/30 bg-[#0F2338] text-[#C5A16F] hover:border-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#0A192F]'
          : 'border-slate-300 bg-white text-amber-600 hover:bg-amber-500 hover:text-white hover:border-amber-500 shadow-slate-200'
      } ${className}`}
    >
      {isDark ? (
        /* Sun Icon for switching to Light Mode */
        <svg
          className="w-5 h-5 transition-transform group-hover:rotate-90 duration-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        /* Moon Icon for switching to Dark Mode */
        <svg
          className="w-5 h-5 transition-transform group-hover:-rotate-45 duration-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};
