'use client';

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Navbar({ siteName = "PHARAOH CODE" }: { siteName?: string }) {
  const { user, isAdmin, logout } = useAuth();
  const { t } = useTranslation();
  const nameParts = siteName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');

  return (
    <>
      <nav className="fixed w-full z-[100] bg-pharaohNavy/80 backdrop-blur-lg border-b border-white/5 h-20" dir="ltr">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-white font-black text-xl sm:block tracking-tighter uppercase">
              {firstWord} {restWords && <span className="text-pharaohGold">{restWords}</span>}
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-7 text-white/90 font-medium text-sm">
            <Link href="/" className="hover:text-pharaohGold transition">{t("nav.home")}</Link>
            <Link href="/about" className="hover:text-pharaohGold transition">{t("nav.about")}</Link>
            <Link href="/services" className="hover:text-pharaohGold transition">{t("nav.services")}</Link>
            <Link href="/portfolio" className="hover:text-pharaohGold transition">{t("nav.portfolio")}</Link>
            <Link href="/team" className="hover:text-pharaohGold transition">{t("nav.team")}</Link>
            <Link href="/clients" className="hover:text-pharaohGold transition">{t("nav.clients")}</Link>
            <Link href="/contact" className="hover:text-pharaohGold transition">{t("nav.contact")}</Link>
            
            <LanguageSwitcher />

            <Link href="/start-project" className="bg-pharaohGold text-pharaohNavy px-6 py-2 rounded-lg font-bold hover:bg-white transition-all">
              {t("nav.startProject")}
            </Link>
            
            {isAdmin && (
              <Link href="/dashboard" className="bg-[#112240] text-white border border-[#C5A16F]/30 px-4 py-2 rounded-lg font-bold hover:bg-[#C5A16F] hover:text-[#0A192F] transition-all flex items-center gap-2 mr-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                {t("nav.dashboard")}
              </Link>
            )}

            {user ? (
               <button onClick={logout} className="text-red-400 hover:text-red-300 transition text-sm mr-2 font-bold">{t("nav.logout")}</button>
            ) : (
               <Link href="/login" className="border-2 border-white/20 text-white hover:border-[#C5A16F] hover:text-[#C5A16F] px-4 py-2 rounded-lg font-bold transition-all text-sm mr-2">
                 {t("nav.login")}
               </Link>
            )}
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <LanguageSwitcher />
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
            <span className="text-white font-black text-2xl tracking-tighter uppercase">
              {firstWord} {restWords && <span className="text-pharaohGold">{restWords}</span>}
            </span>
          </div>

          <button id="close-menu" className="text-pharaohGold hover:rotate-90 transition-all duration-300">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
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
