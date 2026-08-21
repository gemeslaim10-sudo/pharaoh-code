'use client';

import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
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
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className={`
      hidden lg:flex items-center gap-1 p-1.5 rounded-2xl
      font-semibold text-sm relative select-none
      ${isLight
        ? 'bg-slate-100/90 border border-slate-200/90 backdrop-blur-xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)]'
        : 'bg-white/[0.04] border border-white/[0.08] backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_8px_30px_rgba(0,0,0,0.5)]'
      }
    `}>
      {links.map((link) => {
        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              group relative px-4 py-2 rounded-xl transition-all duration-300 flex items-center justify-center text-[13.5px] whitespace-nowrap
              ${isActive
                ? isLight 
                  ? 'text-[#8A5800] font-black' 
                  : 'text-[#C5A16F] font-black'
                : isLight
                  ? 'text-slate-700 hover:text-slate-950 font-bold'
                  : 'text-gray-300 hover:text-white font-medium'
              }
            `}
          >
            {/* Active background pill */}
            {isActive && (
              <motion.div
                layoutId="activeNavPillDesktop"
                className={`absolute inset-0 rounded-xl ${
                  isLight
                    ? 'bg-white border border-[#C5A16F]/40 shadow-[0_2px_10px_rgba(197,161,111,0.2),inset_0_1px_0_rgba(255,255,255,0.9)]'
                    : 'bg-gradient-to-b from-[#C5A16F]/20 via-[#C5A16F]/10 to-transparent border border-[#C5A16F]/40 shadow-[0_0_16px_rgba(197,161,111,0.2),inset_0_1px_0_rgba(255,255,255,0.15)]'
                }`}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}

            {/* Hover highlight for non-active */}
            {!isActive && (
              <span className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                isLight ? 'bg-white/80' : 'bg-white/[0.06]'
              }`} />
            )}

            <span className="relative z-10 tracking-wide transition-transform duration-200 group-hover:-translate-y-0.5">
              {link.label}
            </span>

            {/* Active bottom luminous line */}
            {isActive && (
              <motion.span
                layoutId="activeNavLineDesktop"
                className={`absolute bottom-1 inset-x-3.5 h-[2px] rounded-full ${
                  isLight
                    ? 'bg-[#8A5800]'
                    : 'bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent shadow-[0_0_10px_#C5A16F]'
                }`}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
