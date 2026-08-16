'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function Navbar({ 
  siteName = "PHARAOH CODE", 
  logoUrl,
  logoLightUrl,
  reverseNavbarAr = true
}: { 
  siteName?: string; 
  logoUrl?: string;
  logoLightUrl?: string;
  reverseNavbarAr?: boolean;
}) {
  const { user, isAdmin, logout } = useAuth();
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to give an extra glassmorphism depth
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const nameParts = siteName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');

  const activeLogo = theme === 'light' 
    ? (logoLightUrl || '') 
    : (logoUrl || '');

  const navDirection = language === 'ar' && !reverseNavbarAr ? 'ltr' : direction;

  const NAV_LINKS = [
    { href: '/', label: t("nav.home"), icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/about', label: t("nav.about"), icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { href: '/services', label: t("nav.services"), icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { href: '/portfolio', label: t("nav.portfolio"), icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { href: '/team', label: t("nav.team"), icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { href: '/clients', label: t("nav.clients"), icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { href: '/contact', label: t("nav.contact"), icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full z-[100] transition-all duration-300 ${
          scrolled 
            ? 'bg-[#050B14]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl h-18 sm:h-20' 
            : 'bg-[#060D1A]/80 backdrop-blur-md border-b border-white/5 h-20'
        }`} 
        dir={navDirection}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
          
          {/* Brand Logo & Desktop Navigation */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link 
              href="/" 
              className="relative text-white font-black text-lg sm:text-xl tracking-tighter uppercase flex items-center shrink-0 group py-1"
            >
              {/* Radiant Ambient Gold Aura on Logo Hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#C5A16F]/0 via-[#C5A16F]/25 to-blue-500/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none scale-90 group-hover:scale-110" />

              {activeLogo ? (
                <div className="relative overflow-hidden rounded-xl p-1">
                  <img 
                    src={activeLogo} 
                    alt={siteName} 
                    className="h-10 sm:h-12 lg:h-14 max-w-[200px] sm:max-w-[240px] w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(197,161,111,0.5)]" 
                  />
                  {/* Subtle Light Sweep Reflection on Logo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none skew-x-12" />
                </div>
              ) : (
                <div className="relative flex items-center gap-1.5 transition-all duration-300 group-hover:scale-105">
                  <span className="text-[#C5A16F] text-2xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 drop-shadow-[0_0_10px_#C5A16F]">
                    𓂀
                  </span>
                  <span className="group-hover:text-white transition-colors duration-300 tracking-tight">
                    {firstWord}
                  </span>
                  {restWords && (
                    <span className="text-[#C5A16F] transition-all duration-300 group-hover:text-[#F3E0B5] group-hover:drop-shadow-[0_0_12px_rgba(197,161,111,0.6)]">
                      {restWords}
                    </span>
                  )}
                </div>
              )}
            </Link>

            {/* Desktop Capsule Links */}
            <div className="hidden lg:flex items-center gap-1 text-white/90 font-medium text-sm bg-gradient-to-r from-white/[0.04] via-white/[0.07] to-white/[0.04] border border-white/10 p-1.5 rounded-2xl backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_25px_rgba(0,0,0,0.4)]">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className={`group relative px-4 py-2 rounded-xl transition-all duration-300 flex items-center justify-center ${
                      isActive 
                        ? 'text-[#C5A16F] font-bold bg-[#C5A16F]/15 shadow-[inset_0_0_15px_rgba(197,161,111,0.15)]' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {/* Hover Gold Glow Background */}
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#C5A16F]/0 via-[#C5A16F]/10 to-[#C5A16F]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <span className="relative z-10 tracking-wide transition-transform duration-300 group-hover:-translate-y-0.5">
                      {link.label}
                    </span>

                    {/* Active & Hover Bottom Neon Line */}
                    <span 
                      className={`absolute bottom-1 inset-x-3 h-[2px] rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-[#C5A16F] via-[#F3E0B5] to-[#C5A16F] shadow-[0_0_10px_#C5A16F] opacity-100 scale-x-100' 
                          : 'bg-[#C5A16F] opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                      }`} 
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Desktop Right Utilities & Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeSwitcher />
            <LanguageSwitcher iconOnly={true} />

            <Link 
              href="/start-project" 
              className="btn-pharaoh-gold px-4 h-10 rounded-xl text-xs font-extrabold shadow-md hover:shadow-pharaohGold/30 transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>{t("nav.startProject")}</span>
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            
            {isAdmin && (
              <Link 
                href="/dashboard" 
                title={t("nav.dashboard") || "لوحة التحكم"}
                aria-label="Dashboard"
                className="w-10 h-10 rounded-xl bg-[#0F2338] text-[#C5A16F] border border-[#C5A16F]/30 hover:bg-[#C5A16F] hover:text-[#0A192F] hover:border-[#C5A16F] transition-all shadow-md flex items-center justify-center group"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </Link>
            )}

            {user ? (
              <button 
                onClick={logout} 
                title={t("nav.logout") || "تسجيل الخروج"}
                aria-label="Logout"
                className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-md flex items-center justify-center group cursor-pointer"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            ) : (
              <Link 
                href="/login" 
                title={t("nav.login") || "تسجيل الدخول"}
                aria-label="Login"
                className="w-10 h-10 rounded-xl bg-[#0F2338] text-white border border-white/20 hover:border-[#C5A16F] hover:text-[#C5A16F] transition-all shadow-md flex items-center justify-center group"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </Link>
            )}
          </div>

          {/* Mobile Right Bar: Quick Language + Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-2.5">
            <LanguageSwitcher iconOnly={true} className="!w-9 !h-9 !rounded-lg" />
            
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border ${
                isOpen 
                  ? 'bg-[#C5A16F] text-[#050B14] border-[#C5A16F] shadow-[0_0_20px_rgba(197,161,111,0.4)]' 
                  : 'bg-[#0D182E] text-[#C5A16F] border-white/10'
              }`}
            >
              <span className={`w-5 h-[2px] bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`w-5 h-[2px] bg-current transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`w-5 h-[2px] bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER / LUXURY SLIDE-OVER MENU */}
      <div 
        className={`fixed inset-0 z-[110] lg:hidden transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        dir={direction}
      >
        {/* Backdrop overlay */}
        <div 
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`} 
        />

        {/* Drawer container */}
        <div 
          className={`absolute top-0 bottom-0 ${direction === 'rtl' ? 'left-0' : 'right-0'} w-full sm:max-w-md bg-gradient-to-b from-[#0B1528] via-[#070F1E] to-[#040810] border-l border-white/10 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mobile-nav-drawer ${
            isOpen 
              ? 'translate-x-0' 
              : direction === 'rtl' ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          {/* Top Bar inside Drawer */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                {activeLogo ? (
                  <img src={activeLogo} alt={siteName} className="h-10 w-auto object-contain" />
                ) : (
                  <span className="text-white font-black text-xl tracking-tight">
                    {firstWord} {restWords && <span className="text-[#C5A16F]">{restWords}</span>}
                  </span>
                )}
              </Link>

              <div className="flex items-center gap-2.5">
                <ThemeSwitcher />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Links List */}
            <div className="py-6 flex flex-col gap-2">
              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{ transitionDelay: `${idx * 30}ms` }}
                    className={`flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-[#C5A16F] text-[#050B14] font-black shadow-[0_4px_20px_rgba(197,161,111,0.3)]'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-[#050B14]/20 text-[#050B14]' : 'bg-white/5 text-[#C5A16F]'}`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                        </svg>
                      </div>
                      <span className="text-base font-bold">{link.label}</span>
                    </div>

                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${direction === 'rtl' ? 'rotate-180' : ''} ${isActive ? 'translate-x-1' : 'opacity-40'}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Footer in Drawer */}
          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <Link
              href="/start-project"
              onClick={() => setIsOpen(false)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C5A16F] via-[#D4AF37] to-[#C5A16F] text-[#050B14] font-black text-center text-sm shadow-[0_10px_25px_rgba(197,161,111,0.3)] flex items-center justify-center gap-2 active:scale-98 transition-transform"
            >
              <span>{t("nav.startProject")}</span>
              <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <div className="grid grid-cols-2 gap-2">
              {isAdmin && (
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="py-3 rounded-xl bg-[#112240] border border-[#C5A16F]/40 text-[#C5A16F] font-bold text-xs text-center flex items-center justify-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                  </svg>
                  <span>{t("nav.dashboard")}</span>
                </Link>
              )}

              {user ? (
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs text-center col-span-2"
                >
                  {t("nav.logout")}
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className={`py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 ${!isAdmin ? 'col-span-2' : ''}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                  </svg>
                  <span>{t("nav.login")}</span>
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
