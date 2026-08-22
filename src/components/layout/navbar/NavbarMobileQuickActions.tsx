'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface NavbarMobileQuickActionsProps {
  user: {
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
  } | null;
  isLight: boolean;
  pathname: string;
  language: string;
  isOpen: boolean;
  t: (key: string) => string;
  onOpenProfile: () => void;
  onToggleMenu: () => void;
}

export function NavbarMobileQuickActions({
  user,
  isLight,
  pathname,
  language,
  isOpen,
  t,
  onOpenProfile,
  onToggleMenu,
}: NavbarMobileQuickActionsProps) {
  return (
    <div className="lg:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
      {/* Theme Switcher Button */}
      <ThemeSwitcher />

      {/* Language Switcher Button */}
      <LanguageSwitcher iconOnly={true} />

      {/* Quick Contact Icon Button */}
      <Link
        href="/contact"
        title={t('nav.contact') || 'تواصل معنا'}
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
          onClick={onOpenProfile}
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
          title={t('nav.login') || 'تسجيل الدخول'}
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
        onClick={onToggleMenu}
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
  );
}
