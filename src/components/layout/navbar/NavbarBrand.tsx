'use client';

import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

interface NavbarBrandProps {
  siteName?: string;
  activeLogo?: string;
}

export function NavbarBrand({ siteName = 'PHARAOH CODE', activeLogo }: NavbarBrandProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const nameParts = siteName.split(' ');
  const firstWord = nameParts[0] || 'PHARAOH';
  const restWords = nameParts.slice(1).join(' ') || 'CODE';

  return (
    <Link
      href="/"
      aria-label={siteName}
      className="relative flex items-center shrink-0 group py-1.5 focus:outline-none select-none"
    >
      {/* Radiant ambient aura on hover */}
      <div className="absolute -inset-3 bg-gradient-to-r from-[#C5A16F]/0 via-[#C5A16F]/30 to-blue-500/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none scale-75 group-hover:scale-110" />

      {activeLogo ? (
        /* Real Logo Image with luxury sheen reflection */
        <div className="relative overflow-hidden rounded-xl p-1">
          <img
            src={activeLogo}
            alt={siteName}
            className="h-9 sm:h-10 lg:h-11 max-w-[150px] sm:max-w-[180px] lg:max-w-[220px] w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
          />
          {/* Shimmer light reflection sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none skew-x-12" />
        </div>
      ) : (
        /* Royal Pharaoh Brand Badge */
        <div className="relative flex items-center gap-3 transition-transform duration-300 group-hover:scale-[1.02]">
          {/* Majestic Pyramid Emblem */}
          <div className={`
            relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0
            transition-all duration-500 border
            ${isLight
              ? 'bg-gradient-to-br from-amber-50 to-amber-100/90 border-[#C5A16F]/40 shadow-[0_4px_16px_rgba(197,161,111,0.25)] group-hover:shadow-[0_6px_24px_rgba(197,161,111,0.45)] group-hover:border-[#C5A16F]'
              : 'bg-gradient-to-br from-[#12233F] via-[#0A182E] to-[#050E1F] border-[#C5A16F]/35 shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:border-[#C5A16F]/80 group-hover:shadow-[0_0_25px_rgba(197,161,111,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]'
            }
          `}>
            {/* Pulsing halo ring */}
            <span className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#C5A16F]/40 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

            {/* Hieroglyphic Pyramid SVG */}
            <svg
              viewBox="0 0 24 24"
              className={`w-5 h-5 sm:w-5.5 sm:h-5.5 transition-all duration-500 ${
                isLight
                  ? 'text-[#8A5800] group-hover:text-[#A86B00]'
                  : 'text-[#C5A16F] group-hover:text-[#F3E0B5] drop-shadow-[0_0_8px_rgba(197,161,111,0.6)]'
              }`}
              fill="currentColor"
            >
              <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z" />
            </svg>
          </div>

          {/* Typography */}
          <div className="flex flex-col leading-none">
            <div className={`font-black text-base sm:text-lg lg:text-xl tracking-tight leading-none uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <span>{firstWord} </span>
              <span className={`
                ${isLight 
                  ? 'text-[#8A5800]' 
                  : 'bg-gradient-to-r from-[#F3E0B5] via-[#D4AF37] to-[#C5A16F] bg-clip-text text-transparent'
                }
              `}>
                {restWords}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)] animate-pulse" />
              <span className={`text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-bold ${isLight ? 'text-slate-500' : 'text-[#C5A16F]/70'}`}>
                Software House
              </span>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
