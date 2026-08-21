'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { NavbarBrand } from './navbar/NavbarBrand';
import { NavbarDesktopLinks, NavLinkItem } from './navbar/NavbarDesktopLinks';
import { NavbarActions } from './navbar/NavbarActions';
import { NavbarMobileDrawer } from './navbar/NavbarMobileDrawer';
import { UserProfileModal } from './profile/UserProfileModal';
import { motion } from 'framer-motion';

interface NavbarProps {
  siteName?: string;
  logoUrl?: string;
  logoLightUrl?: string;
  reverseNavbarAr?: boolean;
}

export default function Navbar({
  siteName = 'PHARAOH CODE',
  logoUrl,
  logoLightUrl,
  reverseNavbarAr = true,
}: NavbarProps) {
  const { user } = useAuth();
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const pathname = usePathname();
  const isLight = theme === 'light';

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const activeLogo = theme === 'light' ? (logoLightUrl || logoUrl || '') : (logoUrl || logoLightUrl || '');
  const navDirection = language === 'ar' && !reverseNavbarAr ? 'ltr' : direction;

  const NAV_LINKS: NavLinkItem[] = [
    { href: '/', label: t('nav.home'), icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/about', label: t('nav.about'), icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { href: '/services', label: t('nav.services'), icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { href: '/portfolio', label: t('nav.portfolio'), icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { href: '/team', label: t('nav.team'), icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { href: '/clients', label: t('nav.clients'), icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { href: '/contact', label: t('nav.contact'), icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  return (
    <>
      {/* Top dual-layer radiant laser beam */}
      <div className="fixed top-0 left-0 right-0 z-[102] h-[2px] bg-gradient-to-r from-transparent via-[#F3E0B5] via-[#C5A16F] via-[#A88448] to-transparent shadow-[0_0_12px_rgba(197,161,111,0.8)] pointer-events-none" />

      <header
        dir={navDirection}
        className={`
          fixed w-full z-[100] transition-all duration-500 select-none
          ${scrolled
            ? isLight
              ? 'bg-white/95 backdrop-blur-2xl border-b border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] h-[72px]'
              : 'bg-[#030914]/92 backdrop-blur-2xl border-b border-[#C5A16F]/20 shadow-[0_8px_35px_rgba(0,0,0,0.85),0_1px_0_rgba(197,161,111,0.12)] h-[72px]'
            : isLight
              ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 h-[84px]'
              : 'bg-[#040C1B]/75 backdrop-blur-xl border-b border-white/[0.07] h-[84px]'
          }
        `}
      >
        {/* Dynamic ambient background glow */}
        {!isLight && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 start-1/4 w-96 h-20 bg-[#C5A16F]/06 blur-3xl rounded-full" />
            <div className="absolute top-0 end-1/4 w-96 h-20 bg-blue-500/05 blur-3xl rounded-full" />
          </div>
        )}

        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-full flex justify-between items-center gap-4 relative z-10">
          
          {/* 1. Brand Logo & Center Desktop Links */}
          <div className="flex items-center gap-6 lg:gap-8 min-w-0">
            <NavbarBrand siteName={siteName} activeLogo={activeLogo} />
            <NavbarDesktopLinks links={NAV_LINKS} pathname={pathname} />
          </div>

          {/* 2. Desktop Actions Suite */}
          <NavbarActions onOpenProfile={() => setIsProfileOpen(true)} />

          {/* 3. Mobile Header Quick Access Bar */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Theme Switcher Button */}
            <ThemeSwitcher />

            {/* Language Switcher Button */}
            <LanguageSwitcher iconOnly={true} />

            {/* Quick Contact Icon Button */}
            <Link
              href="/contact"
              title={t("nav.contact") || "تواصل معنا"}
              aria-label="Contact Us"
              className={`
                relative w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 active:scale-95 group/quick-contact
                ${pathname === '/contact'
                  ? 'bg-[#C5A16F] text-[#040A15] border-[#C5A16F] shadow-[0_0_20px_rgba(197,161,111,0.6)]'
                  : isLight
                    ? 'bg-white text-slate-700 border-slate-200 hover:border-amber-500 hover:text-amber-700 hover:bg-amber-50 shadow-sm'
                    : 'bg-[#0A1A30]/80 text-[#C5A16F] border-[#C5A16F]/30 hover:border-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#040A15] shadow-[0_2px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(197,161,111,0.5)]'
                }
              `}
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/quick-contact:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>

            {/* Quick Login / Profile Modal Trigger */}
            {user ? (
              <button
                onClick={() => setIsProfileOpen(true)}
                type="button"
                title={user.displayName || (language === 'ar' ? 'الملف الشخصي' : 'Profile')}
                aria-label="Profile"
                className={`
                  w-10 h-10 rounded-xl border flex items-center justify-center overflow-hidden transition-all duration-300 cursor-pointer shrink-0 active:scale-95
                  ${isLight
                    ? 'border-amber-300 bg-white hover:border-[#C5A16F] shadow-sm'
                    : 'border-[#C5A16F]/40 bg-[#0A1A30]/80 hover:border-[#C5A16F] shadow-[0_2px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(197,161,111,0.4)]'
                  }
                `}
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span className="text-xs font-black text-[#C5A16F]">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
              </button>
            ) : (
              <Link
                href="/login"
                title={t("nav.login") || "تسجيل الدخول"}
                aria-label="Login"
                className={`
                  relative w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 active:scale-95 group/quick-login
                  ${pathname === '/login'
                    ? 'bg-[#C5A16F] text-[#040A15] border-[#C5A16F] shadow-[0_0_20px_rgba(197,161,111,0.6)]'
                    : isLight
                      ? 'bg-white text-slate-700 border-slate-200 hover:border-amber-500 hover:text-amber-700 hover:bg-amber-50 shadow-sm'
                      : 'bg-[#0A1A30]/80 text-[#C5A16F] border-[#C5A16F]/30 hover:border-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#040A15] shadow-[0_2px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(197,161,111,0.5)]'
                  }
                `}
              >
                <svg className="w-4 h-4 transition-transform duration-300 group-hover/quick-login:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}

            {/* Hamburger Animated Morphing Toggle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className={`
                w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-[5.5px] transition-all duration-300 border cursor-pointer shrink-0
                ${isOpen
                  ? 'bg-gradient-to-br from-[#F3E0B5] via-[#D4AF37] to-[#C5A16F] border-[#F3E0B5] text-[#040A15] shadow-[0_0_25px_rgba(197,161,111,0.6)]'
                  : isLight
                    ? 'bg-white border-slate-200 text-slate-800 hover:border-amber-500 hover:bg-amber-50 shadow-sm'
                    : 'bg-[#0A1A30]/80 border-[#C5A16F]/30 text-[#C5A16F] hover:border-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#040A15] shadow-[0_2px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(197,161,111,0.5)]'
                }
              `}
            >
              <span className={`h-[2.2px] rounded-full transition-all duration-300 ${isOpen ? 'w-4.5 bg-[#040A15] rotate-45 translate-y-[3.5px]' : `w-4.5 ${isLight ? 'bg-slate-800' : 'bg-current'}`}`} />
              <span className={`h-[2.2px] rounded-full transition-all duration-300 ${isOpen ? 'w-0 opacity-0' : `w-3 ${isLight ? 'bg-slate-800' : 'bg-current'}`}`} />
              <span className={`h-[2.2px] rounded-full transition-all duration-300 ${isOpen ? 'w-4.5 bg-[#040A15] -rotate-45 -translate-y-[4px]' : `w-4.5 ${isLight ? 'bg-slate-800' : 'bg-current'}`}`} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Side Drawer Menu */}
      <NavbarMobileDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        siteName={siteName}
        activeLogo={activeLogo}
        links={NAV_LINKS}
        pathname={pathname}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        activeLogo={activeLogo}
        siteName={siteName}
      />
    </>
  );
}
