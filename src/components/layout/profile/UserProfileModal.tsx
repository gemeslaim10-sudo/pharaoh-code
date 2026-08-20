'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLogo?: string;
  siteName?: string;
}

export function UserProfileModal({
  isOpen,
  onClose,
  activeLogo,
  siteName = 'PHARAOH CODE',
}: UserProfileModalProps) {
  const { user, isAdmin, logout } = useAuth();
  const { language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (!user) return null;

  const displayName = user.displayName || user.email?.split('@')[0] || (language === 'ar' ? 'مستخدم متميز' : 'Valued User');
  const userInitial = displayName.charAt(0).toUpperCase() || 'U';
  const email = user.email || '';
  const memberSince = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : (language === 'ar' ? 'عضو نشط' : 'Active Member');

  const handleLogout = async () => {
    onClose();
    await logout();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 select-none">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            dir={direction}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border overflow-hidden z-10 ${
              isLight
                ? 'bg-white/95 backdrop-blur-2xl border-slate-200 text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.15)]'
                : 'bg-[#0A192F]/95 backdrop-blur-2xl border-[#C5A16F]/30 text-white shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(197,161,111,0.15)]'
            }`}
          >
            {/* Ambient Radial Lighting in Modal */}
            <div className={`absolute top-0 right-1/2 translate-x-1/2 w-64 h-32 blur-3xl pointer-events-none rounded-full ${
              isLight ? 'bg-amber-400/10' : 'bg-[#C5A16F]/15'
            }`} />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className={`absolute top-4 ${direction === 'rtl' ? 'left-4' : 'right-4'} z-20 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 hover:rotate-90 cursor-pointer ${
                isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Top Brand Logo Banner */}
            <div className="flex flex-col items-center justify-center mb-6">
              {activeLogo ? (
                <img 
                  src={activeLogo} 
                  alt={siteName} 
                  className="h-8 max-w-[150px] w-auto object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105" 
                />
              ) : (
                <div className="flex items-center gap-1 text-[#C5A16F] font-black text-sm tracking-wider uppercase">
                  <span>👑</span>
                  <span>{siteName}</span>
                </div>
              )}
            </div>

            {/* Centered Avatar Section */}
            <div className="flex flex-col items-center text-center">
              <div className="relative group/avatar mb-4">
                {/* Pulsing Aura */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#C5A16F] via-[#DFB77D] to-[#9E7D47] blur-md opacity-40 group-hover/avatar:opacity-80 transition-opacity duration-500 pointer-events-none" />

                {/* Double Gold Ring Frame */}
                <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full p-[2.5px] bg-gradient-to-tr from-[#C5A16F] via-[#DFB77D] to-[#9E7D47] shadow-xl">
                  <div className={`w-full h-full rounded-full p-1 overflow-hidden flex items-center justify-center ${
                    isLight ? 'bg-white' : 'bg-[#0F2338]'
                  }`}>
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={displayName}
                        className="w-full h-full object-cover rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-3xl font-serif font-black text-[#C5A16F] select-none">
                        {userInitial}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status Indicator Badge */}
                <span className="absolute bottom-1 end-1 w-4.5 h-4.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0A192F] shadow-md" title="Active" />
              </div>

              {/* Centered User Display Name (RTL & LTR friendly) */}
              <h3 className={`text-xl sm:text-2xl font-black tracking-tight text-center max-w-full truncate ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                {displayName}
              </h3>

              {/* Centered Email with verified badge */}
              <div className={`flex items-center justify-center gap-1.5 text-xs font-semibold mt-1 max-w-full truncate ${
                isLight ? 'text-slate-600' : 'text-gray-300'
              }`}>
                <svg className="w-3.5 h-3.5 text-[#C5A16F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate dir-ltr">{email}</span>
              </div>

              {/* Role Capsule Tag */}
              <div className="mt-3">
                {isAdmin ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-[#C5A16F]/20 via-[#DFB77D]/25 to-[#C5A16F]/20 text-[#8A5800] dark:text-[#C5A16F] border border-[#C5A16F]/40 shadow-sm">
                    <span>👑</span>
                    <span>{language === 'ar' ? 'مدير النظام (Admin)' : 'Administrator'}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20">
                    <span>✦</span>
                    <span>{language === 'ar' ? 'عضو مميز' : 'Member'}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Account Details Box */}
            <div className={`mt-6 p-4 rounded-2xl border text-xs grid grid-cols-2 gap-3 text-center ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-white/[0.03] border-white/10'
            }`}>
              <div>
                <span className={`block text-[10px] font-bold uppercase mb-0.5 ${
                  isLight ? 'text-slate-600' : 'text-gray-400'
                }`}>
                  {language === 'ar' ? 'تاريخ الانضمام' : 'Member Since'}
                </span>
                <span className={`font-bold ${isLight ? 'text-slate-800' : 'text-gray-200'}`}>
                  {memberSince}
                </span>
              </div>

              <div>
                <span className={`block text-[10px] font-bold uppercase mb-0.5 ${
                  isLight ? 'text-slate-600' : 'text-gray-400'
                }`}>
                  {language === 'ar' ? 'حالة الحساب' : 'Account Status'}
                </span>
                <span className="font-bold text-emerald-500 flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {language === 'ar' ? 'نشط وموثق' : 'Verified'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2.5">
              {/* If Admin -> Quick Link to Dashboard */}
              {isAdmin && (
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md bg-gradient-to-r from-[#C5A16F] via-[#DFB77D] to-[#C5A16F] text-[#0A192F] hover:shadow-[0_0_20px_rgba(197,161,111,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>{language === 'ar' ? 'الانتقال إلى لوحة التحكم' : 'Go to Dashboard'}</span>
                </Link>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 border cursor-pointer ${
                  isLight
                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600'
                    : 'bg-red-500/10 text-red-400 border-red-500/25 hover:bg-red-500 hover:text-white hover:border-red-500'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>{language === 'ar' ? 'تسجيل الخروج من الحساب' : 'Sign Out of Account'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
