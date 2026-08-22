'use client';

import Link from 'next/link';

export function NavbarBrandLogo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5 shrink-0 select-none">
      {/* Pharaoh emblem */}
      <div className="
        relative w-9 h-9 rounded-xl flex items-center justify-center shrink-0
        bg-gradient-to-br from-[#C5A16F]/20 to-[#9E7D47]/10
        border border-[#C5A16F]/25
        shadow-[0_0_12px_rgba(197,161,111,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]
        group-hover:shadow-[0_0_24px_rgba(197,161,111,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]
        group-hover:border-[#C5A16F]/60
        transition-all duration-500
      ">
        {/* Triangle / pyramid hieroglyph */}
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C5A16F] group-hover:text-[#E8C98A] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L22 20H2L12 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v5M12 17h.01" />
        </svg>
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-xl ring-1 ring-[#C5A16F]/0 group-hover:ring-[#C5A16F]/30 group-hover:scale-110 transition-all duration-500" />
      </div>

      <div className="flex flex-col leading-none">
        <span className="text-white font-black text-[15px] tracking-tight leading-none">
          PHARAOH <span className="text-[#C5A16F]">CODE</span>
        </span>
        <span className="text-[#C5A16F]/50 text-[9px] font-medium tracking-[0.18em] uppercase mt-0.5 hidden sm:block">
          Software House
        </span>
      </div>
    </Link>
  );
}
