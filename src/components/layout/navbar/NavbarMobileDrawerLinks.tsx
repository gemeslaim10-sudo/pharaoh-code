'use client';

import Link from 'next/link';
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
  return (
    <div className="py-6 flex flex-col gap-2">
      {links.map((link, idx) => {
        const isActive = pathname === link.href;
        return (
          <motion.div key={link.href} variants={itemVariants}>
            <Link
              href={link.href}
              onClick={onClose}
              className={`flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 group ${
                isActive
                  ? 'bg-[#C5A16F] text-[#050B14] font-black shadow-[0_4px_20px_rgba(197,161,111,0.35)]'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
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
                  className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center relative shadow-sm transition-all duration-300 group-hover:scale-108 ${
                    isActive 
                      ? 'bg-[#050B14]/20 text-[#050B14]' 
                      : 'bg-[#C5A16F]/[0.08] border border-[#C5A16F]/15 text-[#C5A16F] group-hover:bg-[#C5A16F] group-hover:text-[#050B14]'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                  </svg>
                </motion.div>

                <span className="text-base font-bold">{link.label}</span>
              </div>

              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${direction === 'rtl' ? 'rotate-180' : ''} ${isActive ? 'translate-x-1' : 'opacity-40 group-hover:opacity-100 group-hover:translate-x-1'}`} 
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
