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
        <div className="relative overflow-hidden rounded-lg p-0.5">
          <img 
            src={activeLogo} 
            alt={siteName} 
            className="h-7 sm:h-8 lg:h-9 max-w-[130px] sm:max-w-[160px] lg:max-w-[200px] w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-105" 
          />
          {/* Subtle Light Sweep Reflection on Logo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none skew-x-12" />
        </div>
      ) : (
        <div className="relative flex items-center gap-1.5 transition-all duration-300 group-hover:scale-105 text-sm sm:text-base">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#C5A16F] to-[#DFB77D] p-0.5 shadow-[0_0_10px_rgba(197,161,111,0.4)] flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-[#050B14]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z"/>
            </svg>
          </div>
          <span className="group-hover:text-white transition-colors duration-300 tracking-tight font-black">
            {firstWord}
          </span>
          {restWords && (
            <span className="text-[#C5A16F] transition-all duration-300 group-hover:text-[#F3E0B5] font-black">
              {restWords}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
