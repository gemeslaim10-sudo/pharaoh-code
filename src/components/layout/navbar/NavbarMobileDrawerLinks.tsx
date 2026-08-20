'use client';

import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { NavLinkItem } from './NavbarDesktopLinks';
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
    <div className="py-5 flex flex-col gap-2">
      {links.map((link, idx) => {
        const isActive = pathname === link.href;
        return (
          <motion.div key={link.href} variants={itemVariants}>
            <Link
              href={link.href}
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? 'bg-gradient-to-r from-[#C5A16F] via-[#DFB77D] to-[#C5A16F] text-[#0A192F] font-black shadow-[0_6px_20px_rgba(197,161,111,0.35)]'
                  : isLight
                    ? 'text-slate-800 hover:text-[#8A5800] hover:bg-amber-500/10 font-bold'
                    : 'text-gray-200 hover:text-white hover:bg-white/5 font-bold'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <motion.div 
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.2,
                  }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center relative shadow-sm transition-all duration-300 group-hover:scale-108 ${
                    isActive 
                      ? 'bg-[#0A192F]/20 text-[#0A192F]' 
                      : isLight
                        ? 'bg-amber-100/80 border border-amber-300 text-[#8A5800] shadow-sm group-hover:bg-[#8A5800] group-hover:text-white group-hover:border-[#8A5800]'
                        : 'bg-[#0D182E] border border-[#C5A16F]/30 text-[#C5A16F] group-hover:bg-[#C5A16F] group-hover:text-[#0A192F]'
                  }`}
                >
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4">
                    <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                  </svg>
                </motion.div>

                <span className="text-sm sm:text-base font-bold tracking-tight">{link.label}</span>
              </div>

              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${
                  direction === 'rtl' ? 'rotate-180' : ''
                } ${
                  isActive 
                    ? 'translate-x-1 text-[#0A192F]' 
                    : isLight
                      ? 'text-slate-400 group-hover:text-[#8A5800] group-hover:translate-x-1'
                      : 'text-gray-400 group-hover:text-[#C5A16F] group-hover:translate-x-1'
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
    </div>
  );
}

