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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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
      <nav 
        className={`fixed w-full z-[100] transition-all duration-300 ${
          scrolled 
            ? 'bg-[#050B14]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl h-14 sm:h-16' 
            : 'bg-[#060D1A]/80 backdrop-blur-md border-b border-white/5 h-14 sm:h-16'
        }`} 
        dir={navDirection}
      >
        <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 h-full flex justify-between items-center">
          <div className="flex items-center gap-4 lg:gap-6">
            <NavbarBrand siteName={siteName} activeLogo={activeLogo} />
            <NavbarDesktopLinks links={NAV_LINKS} pathname={pathname} />
          </div>

          <NavbarActions onOpenProfile={() => setIsProfileOpen(true)} />

          {/* Mobile Right Bar: Theme, Language, Contact Us, Login/Dashboard, and Compact Menu Toggle */}
          <div className="lg:hidden flex items-center gap-1 sm:gap-1.5">
            {/* 1. Theme Toggle Icon */}
            <ThemeSwitcher className="!w-7 !h-7 sm:!w-8 sm:!h-8 !rounded-lg" />

            {/* 2. Language Switcher Icon */}
            <LanguageSwitcher iconOnly={true} className="!h-7 sm:!h-8 !px-1.5 sm:!px-2 !rounded-lg" />

            {/* 3. Contact Us Quick Icon */}
            <Link
              href="/contact"
              title={t("nav.contact") || "تواصل معنا"}
              aria-label="Contact Us"
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                pathname === '/contact'
                  ? 'bg-[#C5A16F] text-[#050B14] border-[#C5A16F] shadow-[0_0_10px_rgba(197,161,111,0.4)]'
                  : isLight
                    ? 'bg-white text-slate-700 border-slate-300 hover:border-[#C5A16F] hover:text-[#8A5800]'
                    : 'bg-[#0D182E]/80 text-[#C5A16F] border-white/10 hover:border-[#C5A16F]/40'
              }`}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>

            {/* 4. Login / User Profile Modal Trigger Icon */}
            {user ? (
              <button
                onClick={() => setIsProfileOpen(true)}
                type="button"
                title={user.displayName || (language === 'ar' ? 'الملف الشخصي' : 'Profile')}
                aria-label="Profile"
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center overflow-hidden transition-all cursor-pointer shrink-0 ${
                  isLight
                    ? 'border-[#C5A16F]/50 bg-white hover:border-[#C5A16F]'
                    : 'border-[#C5A16F]/50 bg-[#0D182E]/80 hover:border-[#C5A16F]'
                }`}
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span className="text-[10px] font-black text-[#C5A16F]">
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
              </button>
            ) : (
              <Link
                href="/login"
                title={t("nav.login") || "تسجيل الدخول"}
                aria-label="Login"
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                  pathname === '/login'
                    ? 'bg-[#C5A16F] text-[#050B14] border-[#C5A16F] shadow-[0_0_10px_rgba(197,161,111,0.4)]'
                    : isLight
                      ? 'bg-white text-slate-700 border-slate-300 hover:border-[#C5A16F] hover:text-[#8A5800]'
                      : 'bg-[#0D182E]/80 text-[#C5A16F] border-white/10 hover:border-[#C5A16F]/40'
                }`}
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}

            {/* 5. Compact Hamburger Menu Toggle Button */}
            <motion.button 
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(!isOpen)} 
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className={`w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-lg flex flex-col items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 border cursor-pointer shrink-0 ${
                isOpen 
                  ? 'bg-[#C5A16F] text-[#050B14] border-[#C5A16F] shadow-[0_0_12px_rgba(197,161,111,0.3)]' 
                  : isLight
                    ? 'bg-white text-slate-800 border-slate-300 hover:border-[#C5A16F]'
                    : 'bg-[#0D182E]/80 text-[#C5A16F] border-white/10 hover:border-[#C5A16F]/30'
              }`}
            >
              <span className={`w-3.5 sm:w-4 h-[1.5px] bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[3.5px] sm:translate-y-[4.5px]' : ''}`} />
              <span className={`w-3.5 sm:w-4 h-[1.5px] bg-current transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`w-3.5 sm:w-4 h-[1.5px] bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[3.5px] sm:-translate-y-[4.5px]' : ''}`} />
            </motion.button>
          </div>
        </div>
      </nav>

      <NavbarMobileDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        siteName={siteName}
        activeLogo={activeLogo}
        links={NAV_LINKS}
        pathname={pathname}
      />

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        activeLogo={activeLogo}
        siteName={siteName}
      />
    </>
  );
}
