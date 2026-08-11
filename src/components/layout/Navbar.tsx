'use client';

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function Navbar({ 
  siteName = "PHARAOH CODE", 
  logoUrl,
  reverseNavbarAr = true
}: { 
  siteName?: string; 
  logoUrl?: string;
  reverseNavbarAr?: boolean;
}) {
  const { user, isAdmin, logout } = useAuth();
  const { t, language, direction } = useTranslation();
  const nameParts = siteName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');

  // Compute actual navigation direction based on admin setting for Arabic
  const navDirection = language === 'ar' && !reverseNavbarAr ? 'ltr' : direction;

  return (
    <>
      <nav className="fixed w-full z-[100] bg-pharaohNavy/80 backdrop-blur-lg border-b border-white/5 h-20" dir={navDirection}>
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          {/* Logo + Dedicated Main Navigation Links Section */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link href="/" className="text-white font-black text-xl sm:block tracking-tighter uppercase flex items-center shrink-0">
              {logoUrl ? (
                <img src={logoUrl} alt={siteName} className="h-12 lg:h-14 max-w-[240px] w-auto object-contain drop-shadow-md py-1 transition-all" />
              ) : (
                <>
                  {firstWord} {restWords && <span className="text-pharaohGold">{restWords}</span>}
                </>
              )}
            </Link>

            {/* Main Links Capsule next to Logo */}
            <div className="hidden lg:flex items-center gap-6 text-white/90 font-medium text-sm bg-white/5 border border-white/10 px-5 py-2 rounded-2xl backdrop-blur-md">
              <Link href="/" className="hover:text-pharaohGold transition-colors">{t("nav.home")}</Link>
              <Link href="/about" className="hover:text-pharaohGold transition-colors">{t("nav.about")}</Link>
              <Link href="/services" className="hover:text-pharaohGold transition-colors">{t("nav.services")}</Link>
              <Link href="/portfolio" className="hover:text-pharaohGold transition-colors">{t("nav.portfolio")}</Link>
              <Link href="/team" className="hover:text-pharaohGold transition-colors">{t("nav.team")}</Link>
              <Link href="/clients" className="hover:text-pharaohGold transition-colors">{t("nav.clients")}</Link>
              <Link href="/contact" className="hover:text-pharaohGold transition-colors">{t("nav.contact")}</Link>
            </div>
          </div>

          {/* Action Buttons & Utilities Section */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeSwitcher />
            <LanguageSwitcher iconOnly={true} />

            <Link href="/start-project" className="btn-pharaoh-gold px-4 h-10 rounded-xl text-xs font-extrabold shadow-md hover:shadow-pharaohGold/30 transition-all flex items-center gap-1.5 shrink-0">
              <span>{t("nav.startProject")}</span>
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
            
            {isAdmin && (
              <Link 
                href="/dashboard" 
                title={t("nav.dashboard") || "لوحة التحكم"}
                aria-label="Dashboard"
                className="w-10 h-10 rounded-xl bg-[#0F2338] text-[#C5A16F] border border-[#C5A16F]/30 hover:bg-[#C5A16F] hover:text-[#0A192F] hover:border-[#C5A16F] transition-all shadow-md flex items-center justify-center group"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              </Link>
            )}

            {user ? (
              <button 
                onClick={logout} 
                title={t("nav.logout") || "تسجيل الخروج"}
                aria-label="Logout"
                className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-md flex items-center justify-center group"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
              </Link>
            )}
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher iconOnly={true} />
            <button id="open-menu" className="text-pharaohGold">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div id="mobile-nav" className="fixed inset-0 z-[110] bg-pharaohNavy mobile-menu lg:hidden">
        <div className="p-6 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-white font-black text-2xl tracking-tighter uppercase flex items-center">
              {logoUrl ? (
                <img src={logoUrl} alt={siteName} className="h-12 w-auto object-contain drop-shadow-md" />
              ) : (
                <>
                  {firstWord} {restWords && <span className="text-pharaohGold">{restWords}</span>}
                </>
              )}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <button id="close-menu" className="text-pharaohGold hover:rotate-90 transition-all duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col p-8 gap-8 text-white text-xl font-bold">
          <Link href="/" className="m-link hover:text-pharaohGold transition-colors">{t("nav.home")}</Link>
          <Link href="/about" className="m-link hover:text-pharaohGold transition-colors">{t("nav.about")}</Link>
          <Link href="/services" className="m-link hover:text-pharaohGold transition-colors">{t("nav.services")}</Link>
          <Link href="/portfolio" className="m-link hover:text-pharaohGold transition-colors">{t("nav.portfolio")}</Link>
          <Link href="/team" className="m-link hover:text-pharaohGold transition-colors">{t("nav.team")}</Link>
          <Link href="/clients" className="m-link hover:text-pharaohGold transition-colors">{t("nav.clients")}</Link>
          <Link href="/contact" className="m-link hover:text-pharaohGold transition-colors">{t("nav.contact")}</Link>

          {isAdmin && (
            <Link href="/dashboard" className="m-link bg-[#112240] border border-[#C5A16F] text-white px-6 py-4 rounded-xl text-center hover:bg-[#C5A16F] hover:text-[#0A192F] transition-colors">
              {t("nav.dashboard")}
            </Link>
          )}

          {user ? (
            <button onClick={() => { logout(); document.getElementById('mobile-nav')?.classList.remove('active'); }} className="text-red-400 text-center hover:text-red-300 transition-colors">{t("nav.logout")}</button>
          ) : (
            <Link href="/start-project" className="m-link mt-4 bg-pharaohGold text-pharaohNavy px-6 py-4 rounded-xl font-black text-center shadow-[0_10px_20px_rgba(197,161,111,0.2)] hover:bg-white transition-all">
              {t("nav.startProject")}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
