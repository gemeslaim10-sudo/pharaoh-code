'use client';

import Link from 'next/link';

interface HomePortfolioHeaderProps {
  subtitle: string;
  titlePart1: string;
  titlePart2: string;
  desc: string;
  direction: 'rtl' | 'ltr';
  viewAllText: string;
}

export function HomePortfolioHeader({
  subtitle,
  titlePart1,
  titlePart2,
  desc,
  direction,
  viewAllText,
}: HomePortfolioHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-4 sm:mb-5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping shrink-0" />
          <h2 className="text-[#C5A16F] font-bold tracking-[0.15em] uppercase text-[11px] sm:text-xs leading-normal">
            {subtitle}
          </h2>
        </div>
        
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-normal leading-[1.3] pt-0.5">
          {titlePart1}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
            {titlePart2}
          </span>
        </h3>

        <p className="text-gray-400 mt-2 text-xs sm:text-sm md:text-base leading-relaxed font-light">
          {desc}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/portfolio"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-white/5 hover:bg-[#C5A16F] text-gray-200 hover:text-[#050B14] font-bold text-xs border border-white/10 hover:border-[#C5A16F] transition-all duration-300 group shadow-md"
        >
          <span>{viewAllText}</span>
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
