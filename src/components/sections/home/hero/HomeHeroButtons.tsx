'use client';
import Link from 'next/link';

interface HomeHeroButtonsProps {
  discoverText: string;
  contactText: string;
}

export function HomeHeroButtons({ discoverText, contactText }: HomeHeroButtonsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Link 
        href="/services" 
        className="btn-pharaoh-gold px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl font-extrabold text-sm sm:text-base shadow-xl hover:shadow-pharaohGold/40 transition-all flex items-center gap-2 group text-pharaohNavy"
      >
        <span>{discoverText}</span>
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
      <Link 
        href="/contact" 
        className="btn-pharaoh-glass px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 group border border-white/30 text-white hover:border-pharaohGold hover:text-pharaohGold bg-black/30 backdrop-blur-md"
      >
        <span>{contactText}</span>
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </Link>
    </div>
  );
}
