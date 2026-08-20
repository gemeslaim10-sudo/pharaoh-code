'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    <div className="hidden lg:flex items-center gap-0.5 text-white/90 font-medium text-xs bg-gradient-to-r from-white/[0.04] via-white/[0.07] to-white/[0.04] border border-white/10 p-1 rounded-xl backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_20px_rgba(0,0,0,0.3)] relative">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link 
            key={link.href} 
            href={link.href} 
            className={`group relative px-3 py-1.5 rounded-lg transition-colors duration-300 flex items-center justify-center select-none text-xs ${
              isActive 
                ? 'text-[#C5A16F] font-bold' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeNavIndicator"
                className="absolute inset-0 bg-[#C5A16F]/15 border border-[#C5A16F]/30 rounded-lg shadow-[inset_0_0_12px_rgba(197,161,111,0.2)]"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}

            <span className="relative z-10 tracking-wide transition-transform duration-300 group-hover:-translate-y-0.5">
              {link.label}
            </span>

            {isActive && (
              <motion.span 
                layoutId="activeNavBottomLine"
                className="absolute bottom-0.5 inset-x-2.5 h-[1.5px] rounded-full bg-gradient-to-r from-[#C5A16F] via-[#F3E0B5] to-[#C5A16F] shadow-[0_0_8px_#C5A16F]"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
