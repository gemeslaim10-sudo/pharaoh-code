'use client';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export function NavbarActions() {
  const { user, isAdmin, logout } = useAuth();
  const { t } = useTranslation();

  return (
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
  );
}
