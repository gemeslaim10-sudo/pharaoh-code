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
        className={`w-10 h-10 rounded-xl border border-white/10 bg-white/5 opacity-50 flex items-center justify-center ${className}`}
      >
        <span className="w-5 h-5" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? 'التحويل إلى الوضع الفاتح (Light Mode)' : 'التحويل إلى الوضع الداكن (Dark Mode)'}
      aria-label="Toggle Theme"
      className={`
        relative w-10 h-10 rounded-xl border flex items-center justify-center cursor-pointer select-none
        transition-all duration-300 active:scale-95 group/theme
        ${isDark
          ? 'bg-[#0A1A30]/80 border-[#C5A16F]/30 text-[#C5A16F] shadow-[0_2px_10px_rgba(0,0,0,0.3)] hover:bg-[#C5A16F] hover:border-[#F3E0B5] hover:text-[#040A15] hover:shadow-[0_0_20px_rgba(197,161,111,0.55)] hover:-translate-y-0.5'
          : 'bg-white border-slate-200 text-amber-600 shadow-sm hover:bg-gradient-to-br hover:from-amber-500 hover:to-amber-600 hover:border-amber-600 hover:text-white hover:shadow-[0_4px_16px_rgba(217,119,6,0.35)] hover:-translate-y-0.5'
        } ${className}
      `}
    >
      {/* Subtle pulse ring on hover */}
      <span className="absolute inset-0 rounded-xl ring-1 ring-transparent group-hover/theme:ring-white/20 transition-all duration-300" />

      {isDark ? (
        /* Sun Icon (Switch to Light) */
        <svg
          className="w-4 h-4 transition-transform duration-500 group-hover/theme:rotate-90 group-hover/theme:scale-110 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        /* Moon Icon (Switch to Dark) */
        <svg
          className="w-4 h-4 transition-transform duration-500 group-hover/theme:-rotate-45 group-hover/theme:scale-110 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};
