'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavbarMobileUserSectionProps {
  user: {
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
  } | null;
  isAdmin: boolean;
  isLight: boolean;
  onClose: () => void;
  logout: () => void;
  t: (key: string) => string;
}

export function NavbarMobileUserSection({
  user,
  isAdmin,
  isLight,
  onClose,
  logout,
  t,
}: NavbarMobileUserSectionProps) {
  if (!user) {
    return (
      <motion.div whileTap={{ scale: 0.96 }}>
        <Link
          href="/login"
          onClick={onClose}
          className={`w-full py-3.5 rounded-xl border font-bold text-[13px] text-center flex items-center justify-center gap-2 transition-all duration-300 ${
            isLight
              ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-[#C5A16F]/40 hover:text-[#8A5800]'
              : 'bg-white/[0.04] border-white/[0.09] text-gray-300 hover:text-white hover:border-[#C5A16F]/35 hover:bg-white/[0.07]'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>{t('nav.login') || 'تسجيل الدخول'}</span>
        </Link>
      </motion.div>
    );
  }

  const userDisplayName = user.displayName || user.email?.split('@')[0] || '';
  const userInitial = userDisplayName.charAt(0).toUpperCase() || 'U';

  return (
    <div className="flex flex-col gap-2">
      {/* User Capsule */}
      <div className={`p-3 rounded-2xl border flex items-center justify-between gap-2 ${
        isLight
          ? 'bg-slate-50 border-slate-200'
          : 'bg-white/[0.04] border-white/[0.07]'
      }`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#C5A16F]/40 shrink-0 bg-[#0F2338] flex items-center justify-center">
            {user.photoURL ? (
              <img src={user.photoURL} alt={userDisplayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <span className="text-sm font-black text-[#C5A16F]">{userInitial}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className={`text-[13px] font-bold truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {userDisplayName}
            </p>
            <p className={`text-[11px] truncate ${isLight ? 'text-slate-400' : 'text-gray-500'}`}>
              {user.email}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => { logout(); onClose(); }}
          title={t('nav.logout') || 'تسجيل الخروج'}
          aria-label="Logout"
          className="w-8 h-8 rounded-xl bg-red-500/12 border border-red-500/25 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>

      {/* Admin Dashboard */}
      {isAdmin && (
        <motion.div whileTap={{ scale: 0.96 }}>
          <Link
            href="/dashboard"
            onClick={onClose}
            className={`w-full py-3 rounded-xl border font-bold text-[13px] text-center flex items-center justify-center gap-2 transition-all duration-300 ${
              isLight
                ? 'bg-amber-50 border-[#C5A16F]/35 text-[#8A5800] hover:bg-[#C5A16F] hover:text-[#040A14] hover:border-[#C5A16F]'
                : 'bg-[#C5A16F]/10 border-[#C5A16F]/30 text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#040A14] hover:border-[#C5A16F]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>{t('nav.dashboard') || 'لوحة التحكم'}</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
