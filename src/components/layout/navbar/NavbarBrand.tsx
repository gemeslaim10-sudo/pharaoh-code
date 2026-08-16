'use client';
import Link from 'next/link';

interface NavbarBrandProps {
  siteName?: string;
  activeLogo?: string;
}

export function NavbarBrand({ siteName = 'PHARAOH CODE', activeLogo }: NavbarBrandProps) {
  const nameParts = siteName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');

  return (
    <Link 
      href="/" 
      className="relative text-white font-black text-lg sm:text-xl tracking-tighter uppercase flex items-center shrink-0 group py-1"
    >
      {/* Radiant Ambient Gold Aura on Logo Hover */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#C5A16F]/0 via-[#C5A16F]/25 to-blue-500/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none scale-90 group-hover:scale-110" />

      {activeLogo ? (
        <div className="relative overflow-hidden rounded-xl p-1">
          <img 
            src={activeLogo} 
            alt={siteName} 
            className="h-10 sm:h-12 lg:h-14 max-w-[200px] sm:max-w-[240px] w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(197,161,111,0.5)]" 
          />
          {/* Subtle Light Sweep Reflection on Logo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none skew-x-12" />
        </div>
      ) : (
        <div className="relative flex items-center gap-1.5 transition-all duration-300 group-hover:scale-105">
          <span className="text-[#C5A16F] text-2xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 drop-shadow-[0_0_10px_#C5A16F]">
            𓂀
          </span>
          <span className="group-hover:text-white transition-colors duration-300 tracking-tight">
            {firstWord}
          </span>
          {restWords && (
            <span className="text-[#C5A16F] transition-all duration-300 group-hover:text-[#F3E0B5] group-hover:drop-shadow-[0_0_12px_rgba(197,161,111,0.6)]">
              {restWords}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
