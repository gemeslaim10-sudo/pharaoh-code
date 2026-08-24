'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { NavItemData } from '@/types/nav';

interface MobileBottomNavItemProps {
  item: NavItemData;
  isLight: boolean;
}

export function MobileBottomNavItem({ item, isLight }: MobileBottomNavItemProps) {
  const isWhatsApp = item.isWhatsApp;

  const content = (
    <motion.div
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.05 }}
      className={`group flex flex-col items-center justify-center w-14 py-1 px-1 rounded-xl relative transition-all duration-200 cursor-pointer ${
        isWhatsApp
          ? isLight
            ? 'hover:bg-emerald-50/80 text-emerald-700 hover:text-emerald-800'
            : 'hover:bg-[#25D366]/10 text-emerald-400 hover:text-[#25D366]'
          : item.isActive
            ? isLight
              ? 'text-[#8A5800]'
              : 'text-[#C5A16F]'
            : isLight
              ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/60'
              : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
      }`}
    >
      {/* Icon */}
      <div className="relative mb-1">
        {item.icon(item.isActive, isLight)}
      </div>

      {/* Label */}
      <span className={`text-[10px] tracking-tight whitespace-nowrap leading-none transition-colors duration-200 ${
        isWhatsApp
          ? 'font-bold text-[#25D366]'
          : item.isActive 
            ? 'font-black' 
            : 'font-bold'
      }`}>
        {item.label}
      </span>

      {/* Active Glowing Dot Indicator for site pages */}
      {item.isActive && (
        <motion.div
          layoutId="mobileActiveDot"
          className={`w-1.5 h-1.5 rounded-full mt-1 ${
            isLight
              ? 'bg-[#8A5800] shadow-[0_0_8px_rgba(138,88,0,0.8)]'
              : 'bg-[#C5A16F] shadow-[0_0_8px_rgba(197,161,111,0.9)]'
          }`}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </motion.div>
  );

  if (item.isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={item.label}
        className="focus:outline-none"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} aria-label={item.label} className="focus:outline-none">
      {content}
    </Link>
  );
}
