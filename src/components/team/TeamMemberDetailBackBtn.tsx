'use client';

import Link from 'next/link';

interface TeamMemberDetailBackBtnProps {
  isLight: boolean;
  language: string;
  backText: string;
}

export function TeamMemberDetailBackBtn({ isLight, language, backText }: TeamMemberDetailBackBtnProps) {
  return (
    <Link
      href="/team"
      title={backText}
      aria-label={backText}
      className={`absolute top-3.5 end-3.5 sm:top-6 sm:end-6 z-30 w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all duration-300 group cursor-pointer shadow-sm ${
        isLight
          ? 'bg-white/90 text-slate-700 border-slate-200 hover:border-[#C5A16F] hover:text-[#8A5800] hover:bg-slate-50 hover:shadow-md'
          : 'bg-[#060D1A]/80 text-[#C5A16F] border-white/10 hover:border-pharaohGold/40 hover:bg-pharaohGold hover:text-[#060D1A] hover:shadow-[0_0_15px_rgba(197,161,111,0.3)]'
      }`}
    >
      <svg
        className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 ${
          language === 'ar'
            ? 'group-hover:translate-x-0.5'
            : 'group-hover:-translate-x-0.5'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d={language === 'ar' ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
        />
      </svg>
    </Link>
  );
}
