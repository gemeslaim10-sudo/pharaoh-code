'use client';
import Link from 'next/link';

export interface NavLinkItem {
  href: string;
  label: string;
  icon: string;
}

interface NavbarDesktopLinksProps {
  links: NavLinkItem[];
  pathname: string;
}

export function NavbarDesktopLinks({ links, pathname }: NavbarDesktopLinksProps) {
  return (
    <div className="hidden lg:flex items-center gap-1 text-white/90 font-medium text-sm bg-gradient-to-r from-white/[0.04] via-white/[0.07] to-white/[0.04] border border-white/10 p-1.5 rounded-2xl backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_25px_rgba(0,0,0,0.4)]">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link 
            key={link.href} 
            href={link.href} 
            className={`group relative px-4 py-2 rounded-xl transition-all duration-300 flex items-center justify-center ${
              isActive 
                ? 'text-[#C5A16F] font-bold bg-[#C5A16F]/15 shadow-[inset_0_0_15px_rgba(197,161,111,0.15)]' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {/* Hover Gold Glow Background */}
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#C5A16F]/0 via-[#C5A16F]/10 to-[#C5A16F]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <span className="relative z-10 tracking-wide transition-transform duration-300 group-hover:-translate-y-0.5">
              {link.label}
            </span>

            {/* Active & Hover Bottom Neon Line */}
            <span 
              className={`absolute bottom-1 inset-x-3 h-[2px] rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-[#C5A16F] via-[#F3E0B5] to-[#C5A16F] shadow-[0_0_10px_#C5A16F] opacity-100 scale-x-100' 
                  : 'bg-[#C5A16F] opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
              }`} 
            />
          </Link>
        );
      })}
    </div>
  );
}
