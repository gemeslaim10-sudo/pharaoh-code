'use client';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

interface NavbarMobileDrawerFooterProps {
  onClose: () => void;
}

export function NavbarMobileDrawerFooter({ onClose }: NavbarMobileDrawerFooterProps) {
  const { user, isAdmin, logout } = useAuth();
  const { t, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const userDisplayName = user?.displayName || user?.email?.split('@')[0] || '';
  const userInitial = userDisplayName.charAt(0).toUpperCase() || 'U';

  return (
    <div className={`pt-5 border-t flex flex-col gap-3 ${
      isLight ? 'border-slate-200' : 'border-white/10'
    }`}>
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href="/start-project"
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C5A16F] via-[#D4AF37] to-[#C5A16F] text-[#050B14] font-black text-center text-sm shadow-[0_10px_25px_rgba(197,161,111,0.3)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{t("nav.startProject")}</span>
          <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </motion.div>

      {/* User Status / Actions */}
      {user ? (
        <div className="flex flex-col gap-2">
          {/* User Profile Capsule + Logout Button */}
          <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 shadow-sm ${
            isLight
              ? 'bg-slate-100 border-slate-200'
              : 'bg-white/5 border-white/10'
          }`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C5A16F]/40 shrink-0 bg-[#0F2338] flex items-center justify-center">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={userDisplayName} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-xs font-black text-[#C5A16F]">
                    {userInitial}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {userDisplayName}
                </p>
                <p className={`text-[10px] truncate ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
                  {user.email}
                </p>
              </div>
            </div>

            {/* Red Logout Icon Button */}
            <button
              onClick={() => { logout(); onClose(); }}
              title={t("nav.logout") || "تسجيل الخروج"}
              aria-label="Logout"
              className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>

          {/* Admin Dashboard link if user is admin */}
          {isAdmin && (
            <motion.div whileTap={{ scale: 0.96 }}>
              <Link
                href="/dashboard"
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-[#C5A16F]/10 border border-[#C5A16F]/40 text-[#8A5800] dark:text-[#C5A16F] font-bold text-xs text-center flex items-center justify-center gap-1.5 hover:bg-[#C5A16F] hover:text-[#050B14] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>{t("nav.dashboard") || "لوحة التحكم"}</span>
              </Link>
            </motion.div>
          )}
        </div>
      ) : (
        /* Guest User Login Button */
        <motion.div whileTap={{ scale: 0.96 }}>
          <Link
            href="/login"
            onClick={onClose}
            className={`w-full py-3 rounded-xl border font-bold text-xs text-center flex items-center justify-center gap-2 transition-colors shadow-sm ${
              isLight
                ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-white hover:border-[#8A5800]'
                : 'bg-white/5 border-white/15 text-gray-200 hover:text-white hover:border-[#C5A16F]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>{t("nav.login") || "تسجيل الدخول"}</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
