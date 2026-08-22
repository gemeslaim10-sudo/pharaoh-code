'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { NavbarBrand } from './navbar/NavbarBrand';
import { NavbarDesktopLinks } from './navbar/NavbarDesktopLinks';
import { NavbarActions } from './navbar/NavbarActions';
import { NavbarMobileDrawer } from './navbar/NavbarMobileDrawer';
import { NavbarMobileQuickActions } from './navbar/NavbarMobileQuickActions';
import { UserProfileModal } from './profile/UserProfileModal';
import { getNavLinks } from './navbar/navbarLinks';

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
  const navLinks = getNavLinks(t);

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
            <NavbarDesktopLinks links={navLinks} pathname={pathname} />
          </div>

          {/* 2. Desktop Actions Suite */}
          <NavbarActions onOpenProfile={() => setIsProfileOpen(true)} />

          {/* 3. Mobile Header Quick Access Bar */}
          <NavbarMobileQuickActions
            user={user}
            isLight={isLight}
            pathname={pathname}
            language={language}
            isOpen={isOpen}
            t={t}
            onOpenProfile={() => setIsProfileOpen(true)}
            onToggleMenu={() => setIsOpen(!isOpen)}
          />
        </div>
      </header>

      {/* Mobile Side Drawer Menu */}
      <NavbarMobileDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        siteName={siteName}
        activeLogo={activeLogo}
        links={navLinks}
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
