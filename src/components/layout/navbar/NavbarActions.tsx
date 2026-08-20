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
    <div className="hidden lg:flex items-center gap-2">
      <ThemeSwitcher className="!w-8 !h-8 !rounded-lg" />
      <LanguageSwitcher iconOnly={true} className="!h-8 !rounded-lg" />

      <Link 
        href="/start-project" 
        className="btn-pharaoh-gold px-3 h-8 rounded-lg text-xs font-extrabold shadow-sm hover:shadow-pharaohGold/25 transition-all flex items-center gap-1 shrink-0"
      >
        <span>{t("nav.startProject")}</span>
        <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
      
      {/* If User is Logged In */}
      {user ? (
        <div className="flex items-center gap-1.5">
          {/* Admin Dashboard Quick Action as ICON ONLY without text */}
          {isAdmin && (
            <Link 
              href="/dashboard" 
              title={t("nav.dashboard") || "لوحة التحكم"}
              aria-label="Dashboard"
              className="w-8 h-8 rounded-lg bg-[#C5A16F]/10 text-[#C5A16F] border border-[#C5A16F]/30 hover:bg-[#C5A16F] hover:text-[#0A192F] hover:border-[#C5A16F] transition-all shadow-sm flex items-center justify-center group shrink-0"
            >
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </Link>
          )}

          {/* User Profile Capsule with Photo & Name (Click to open Profile Modal) */}
          <button 
            onClick={onOpenProfile}
            type="button"
            title={language === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}
            aria-label="Profile"
            className={`h-8 px-2 rounded-lg border flex items-center gap-1.5 shadow-sm transition-all cursor-pointer group hover:border-[#C5A16F] active:scale-95 ${
              isLight
                ? 'bg-slate-100/90 border-slate-200 text-slate-800 hover:bg-white'
                : 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10'
            }`}
          >
            {/* User Avatar Photo or Initial */}
            <div className="w-5.5 h-5.5 rounded-full overflow-hidden border border-[#C5A16F]/40 shrink-0 bg-[#0F2338] flex items-center justify-center group-hover:scale-105 transition-transform">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={userDisplayName} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-[10px] font-black text-[#C5A16F] select-none">
                  {userInitial}
                </span>
              )}
            </div>

            {/* User Name */}
            <span className="text-[11px] font-bold max-w-[90px] truncate select-none group-hover:text-[#C5A16F] transition-colors">
              {userDisplayName}
            </span>
          </button>

          {/* Small Red Logout Icon Button */}
          <button 
            onClick={logout} 
            title={t("nav.logout") || "تسجيل الخروج"}
            aria-label="Logout"
            className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 border border-red-500/25 hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center justify-center group cursor-pointer shrink-0"
          >
            <svg className="w-3.5 h-3.5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      ) : (
        /* If Guest User -> Clean Compact Login Button */
        <Link 
          href="/login" 
          title={t("nav.login") || "تسجيل الدخول"}
          aria-label="Login"
          className={`h-8 px-3 rounded-lg border font-bold text-xs transition-all shadow-sm flex items-center gap-1.5 group shrink-0 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-700 hover:border-[#C5A16F] hover:text-[#8A5800]'
              : 'bg-[#0F2338] border-white/15 text-gray-200 hover:border-[#C5A16F] hover:text-[#C5A16F]'
          }`}
        >
          <svg className="w-3.5 h-3.5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>{t("nav.login") || "تسجيل الدخول"}</span>
        </Link>
      )}
    </div>
  );
}
