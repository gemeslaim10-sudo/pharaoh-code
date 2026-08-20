'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

interface MobileBottomNavProps {
  whatsappNumber?: string;
  logoUrl?: string;
  logoLightUrl?: string;
}

interface NavItemData {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
  isActive: boolean;
  isWhatsApp?: boolean;
  icon: (active: boolean, isLight: boolean) => React.ReactNode;
}

export default function MobileBottomNav({
  whatsappNumber = '+201000000000',
  logoUrl,
  logoLightUrl,
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const { language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  // Theme-aware dynamic logo selection with reciprocal fallback
  const activeLogo = isLight ? (logoLightUrl || logoUrl || '') : (logoUrl || logoLightUrl || '');

  const cleanWhatsappNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const homeItem: NavItemData = {
    id: 'home',
    label: language === 'ar' ? 'الرئيسية' : 'Home',
    href: '/',
    isActive: pathname === '/',
    icon: (active: boolean) => (
      <svg className="w-5 h-5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? '2.3' : '1.8'}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  };

  const servicesItem: NavItemData = {
    id: 'services',
    label: language === 'ar' ? 'خدماتنا' : 'Services',
    href: '/services',
    isActive: pathname.startsWith('/services'),
    icon: (active: boolean) => (
      <svg className="w-5 h-5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? '2.3' : '1.8'}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  };

  const portfolioItem: NavItemData = {
    id: 'portfolio',
    label: language === 'ar' ? 'أعمالنا' : 'Portfolio',
    href: '/portfolio',
    isActive: pathname.startsWith('/portfolio'),
    icon: (active: boolean) => (
      <svg className="w-5 h-5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? '2.3' : '1.8'}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  };

  const whatsappItem: NavItemData = {
    id: 'whatsapp',
    label: language === 'ar' ? 'واتساب' : 'WhatsApp',
    href: `https://wa.me/${cleanWhatsappNumber}`,
    isExternal: true,
    isActive: false,
    isWhatsApp: true,
    icon: () => (
      <div className="relative flex items-center justify-center">
        <svg className="w-5 h-5 text-[#25D366] transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_6px_rgba(37,211,102,0.5)]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
        </span>
      </div>
    ),
  };

  return (
    <div
      dir={direction}
      className="md:hidden fixed bottom-0 inset-x-0 z-[80] select-none pointer-events-auto pb-[env(safe-area-inset-bottom,0px)]"
    >
      {/* Dock Bar Container */}
      <nav
        aria-label="Mobile Navigation"
        className={`relative flex items-center justify-around px-2 h-16 transition-colors duration-300 border-t ${
          isLight
            ? 'bg-white/95 backdrop-blur-2xl border-slate-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]'
            : 'bg-[#070F1E]/95 backdrop-blur-2xl border-[#C5A16F]/20 shadow-[0_-10px_35px_rgba(0,0,0,0.7)]'
        }`}
      >
        {/* Top subtle golden shimmer line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A16F]/60 to-transparent pointer-events-none" />

        {/* 1. First Item: Home */}
        <NavItem item={homeItem} isLight={isLight} />

        {/* 2. Second Item: Services */}
        <NavItem item={servicesItem} isLight={isLight} />

        {/* 3. Center Elevated Dynamic Logo Button */}
        <div className="relative -top-5 flex flex-col items-center justify-center shrink-0">
          <Link
            href="/"
            aria-label="Home"
            className="group relative flex items-center justify-center focus:outline-none"
          >
            {/* Ambient Pulsing Glow behind Center Button */}
            <div className={`absolute -inset-1.5 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none ${
              isLight
                ? 'bg-gradient-to-tr from-[#8A5800]/30 via-[#C5A16F]/40 to-[#8A5800]/30'
                : 'bg-gradient-to-tr from-[#C5A16F]/40 via-[#DFB77D]/50 to-[#9E7D47]/40'
            }`} />

            {/* Elevated Button Body */}
            <motion.div
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.08 }}
              className={`w-14 h-14 rounded-full flex items-center justify-center border-2 shadow-2xl transition-all duration-300 relative z-10 overflow-hidden ${
                isLight
                  ? 'bg-white border-[#C5A16F]/50 shadow-[0_8px_25px_rgba(138,88,0,0.2)] p-2'
                  : 'bg-[#0A192F] border-[#C5A16F]/60 shadow-[0_8px_25px_rgba(197,161,111,0.35)] p-2'
              }`}
            >
              {activeLogo ? (
                <img 
                  src={activeLogo} 
                  alt="Logo" 
                  className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110 select-none" 
                />
              ) : (
                <span className="text-xl font-serif font-black leading-none select-none text-[#C5A16F]">
                  👑
                </span>
              )}
            </motion.div>
          </Link>
          <span className={`text-[9px] font-black tracking-wider uppercase mt-1 transition-colors ${
            isLight ? 'text-slate-800' : 'text-[#C5A16F]'
          }`}>
            {language === 'ar' ? 'الرئيسية' : 'Home'}
          </span>
        </div>

        {/* 4. Fourth Item: Portfolio (Real Page: /portfolio) */}
        <NavItem item={portfolioItem} isLight={isLight} />

        {/* 5. Fifth Item: WhatsApp Quick Action with Premium Hover */}
        <NavItem item={whatsappItem} isLight={isLight} />
      </nav>
    </div>
  );
}

interface NavItemProps {
  item: NavItemData;
  isLight: boolean;
}

function NavItem({ item, isLight }: NavItemProps) {
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
