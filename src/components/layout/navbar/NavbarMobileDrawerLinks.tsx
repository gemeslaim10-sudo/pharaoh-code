'use client';

import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { NavLinkItem } from '@/types/nav';
import { motion } from 'framer-motion';

interface NavbarMobileDrawerLinksProps {
  links: NavLinkItem[];
  pathname: string;
  direction: 'rtl' | 'ltr';
  onClose: () => void;
  itemVariants: {
    closed: { opacity: number; x: number };
    open: { opacity: number; x: number; transition: { duration: number } };
  };
}

export function NavbarMobileDrawerLinks({
  links,
  pathname,
  direction,
  onClose,
  itemVariants,
}: NavbarMobileDrawerLinksProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <nav className="py-4 flex flex-col gap-1">
      {links.map((link, idx) => {
        const isActive = pathname === link.href;
        return (
          <motion.div key={link.href} variants={itemVariants}>
            <Link
              href={link.href}
              onClick={onClose}
              className={`
                flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden
                ${isActive
                  ? isLight
                    ? 'bg-gradient-to-r from-[#C5A16F] via-[#D4AF37] to-[#C5A16F] text-[#040A14] font-black shadow-[0_6px_22px_rgba(197,161,111,0.35)]'
                    : 'bg-gradient-to-r from-[#C5A16F] via-[#D4AF37] to-[#C5A16F] text-[#040A14] font-black shadow-[0_6px_22px_rgba(197,161,111,0.4)]'
                  : isLight
                    ? 'text-slate-700 hover:text-[#7A4F00] hover:bg-amber-50/80 font-semibold border border-transparent hover:border-[#C5A16F]/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.06] font-semibold border border-transparent hover:border-white/[0.08]'
                }
              `}
            >
              {/* Active side bar */}
              {isActive && (
                <span className={`absolute inset-y-0 w-[3px] rounded-full bg-[#040A14]/30 ${direction === 'rtl' ? 'right-0' : 'left-0'}`} />
              )}

              <div className="flex items-center gap-3.5">
                {/* Icon box */}
                <motion.div
                  animate={{ y: [0, -2.5, 0] }}
                  transition={{ duration: 4 + idx * 0.3, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.18 }}
                  className={`
                    w-9 h-9 rounded-xl flex items-center justify-center relative shadow-sm shrink-0
                    transition-all duration-300
                    ${isActive
                      ? 'bg-[#040A14]/18 text-[#040A14]'
                      : isLight
                        ? 'bg-amber-50 border border-amber-200 text-[#8A5800] group-hover:bg-[#8A5800] group-hover:text-white group-hover:border-[#8A5800] group-hover:shadow-[0_4px_10px_rgba(138,88,0,0.25)]'
                        : 'bg-[#0C1828] border border-[#C5A16F]/22 text-[#C5A16F] group-hover:bg-[#C5A16F] group-hover:text-[#040A14] group-hover:border-[#C5A16F] group-hover:shadow-[0_4px_12px_rgba(197,161,111,0.3)]'
                    }
                  `}
                >
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                  </svg>
                </motion.div>

                <span className="text-[15px] tracking-tight">{link.label}</span>
              </div>

              {/* Arrow */}
              <svg
                className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                  direction === 'rtl' ? 'rotate-180' : ''
                } ${
                  isActive
                    ? 'opacity-60 text-[#040A14] translate-x-0.5'
                    : isLight
                      ? 'text-slate-300 group-hover:text-[#8A5800] group-hover:translate-x-1 opacity-0 group-hover:opacity-100'
                      : 'text-gray-600 group-hover:text-[#C5A16F] group-hover:translate-x-1 opacity-0 group-hover:opacity-100'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
}
