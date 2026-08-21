'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

interface NavbarActionsProps {
  onOpenProfile?: () => void;
}

export function NavbarActions({ onOpenProfile }: NavbarActionsProps) {
  const { user, isAdmin, logout } = useAuth();
  const { t, language } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const userDisplayName = user?.displayName || user?.email?.split('@')[0] || '';
  const userInitial = userDisplayName.charAt(0).toUpperCase() || 'U';

  return (
    <div className="hidden lg:flex items-center gap-2.5 shrink-0 select-none">
      {/* 1. Theme Switcher */}
      <ThemeSwitcher />

      {/* 2. Language Switcher */}
      <LanguageSwitcher iconOnly={true} />

      {/* Vertical divider */}
      <div className={`w-px h-6 mx-1 ${isLight ? 'bg-slate-300' : 'bg-white/15'}`} />

      {/* 3. Start Project Sovereign Master Button */}
      <Link
        href="/start-project"
        className="
          relative overflow-hidden group/cta
          flex items-center gap-2.5
          px-5 py-2.5 rounded-xl
          bg-gradient-to-r from-[#F3E0B5] via-[#D4AF37] to-[#C5A16F]
          text-[#040A15] font-black text-sm tracking-wide
          border border-white/40
          shadow-[0_4px_20px_rgba(197,161,111,0.45),inset_0_1px_1px_rgba(255,255,255,0.7)]
          hover:shadow-[0_8px_30px_rgba(197,161,111,0.65),inset_0_1px_1px_rgba(255,255,255,0.9)]
          hover:scale-[1.03] hover:-translate-y-0.5
          active:scale-[0.97] active:translate-y-0
          transition-all duration-300
          shrink-0
        "
      >
        {/* Shimmer sweep */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-800 ease-in-out pointer-events-none" />

        {/* ✦ Star spark icon */}
        <svg className="w-4 h-4 shrink-0 relative z-10 transition-transform duration-300 group-hover/cta:rotate-180" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
        </svg>

        <span className="relative z-10 whitespace-nowrap">{t("nav.startProject")}</span>

        <svg className="w-3.5 h-3.5 shrink-0 relative z-10 transition-transform duration-300 group-hover/cta:translate-x-1 rtl:group-hover/cta:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>

      {/* ── Logged-in or Guest States ── */}
      {user ? (
        <div className="flex items-center gap-2">
          {/* Admin Dashboard */}
          {isAdmin && (
            <Link
              href="/dashboard"
              title={t("nav.dashboard") || "لوحة التحكم"}
              aria-label="Dashboard"
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-sm group hover:scale-105 active:scale-95 shrink-0 ${
                isLight
                  ? 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-600 hover:text-white hover:border-amber-600 shadow-amber-200/50'
                  : 'bg-[#0A1A30]/80 border-[#C5A16F]/35 text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#040A15] hover:border-[#C5A16F] hover:shadow-[0_0_20px_rgba(197,161,111,0.4)]'
              }`}
            >
              <svg className="w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </Link>
          )}

          {/* User Profile Capsule */}
          <button
            onClick={onOpenProfile}
            type="button"
            title={language === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}
            aria-label="Profile"
            className={`h-10 px-3 rounded-xl border flex items-center gap-2.5 transition-all duration-300 cursor-pointer group active:scale-95 shrink-0 ${
              isLight
                ? 'bg-white border-slate-200 text-slate-800 hover:border-[#C5A16F] hover:bg-amber-50/60 shadow-sm'
                : 'bg-[#0A1A30]/80 border-white/10 text-gray-200 hover:border-[#C5A16F]/60 hover:bg-white/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.3)]'
            }`}
          >
            <div className="w-6.5 h-6.5 rounded-full overflow-hidden border border-[#C5A16F]/60 shrink-0 bg-[#0F2338] flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              {user.photoURL ? (
                <img src={user.photoURL} alt={userDisplayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <span className="text-xs font-black text-[#C5A16F] select-none">{userInitial}</span>
              )}
            </div>
            <span className="text-xs font-bold max-w-[100px] truncate select-none group-hover:text-[#C5A16F] transition-colors">
              {userDisplayName}
            </span>
          </button>

          {/* Logout Button */}
          <button
            onClick={logout}
            title={t("nav.logout") || "تسجيل الخروج"}
            aria-label="Logout"
            className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 border border-red-500/25 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 flex items-center justify-center group cursor-pointer active:scale-95 shrink-0"
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      ) : (
        /* Guest Login Button */
        <Link
          href="/login"
          title={t("nav.login") || "تسجيل الدخول"}
          aria-label="Login"
          className={`h-10 px-4 rounded-xl border font-bold text-xs tracking-wide transition-all duration-300 flex items-center gap-2 group shrink-0 active:scale-95 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-800 hover:border-[#C5A16F] hover:text-[#8A5800] hover:bg-amber-50 shadow-sm hover:shadow-[0_4px_16px_rgba(197,161,111,0.2)]'
              : 'bg-[#0A1A30]/80 border-[#C5A16F]/30 text-gray-200 hover:border-[#C5A16F] hover:text-[#C5A16F] hover:bg-[#C5A16F]/10 hover:shadow-[0_0_20px_rgba(197,161,111,0.25)]'
          }`}
        >
          <svg className="w-4 h-4 text-[#C5A16F] transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>{t("nav.login") || "تسجيل الدخول"}</span>
        </Link>
      )}
    </div>
  );
}
