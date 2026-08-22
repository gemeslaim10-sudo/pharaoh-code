'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { UserProfileModalAvatar } from './UserProfileModalAvatar';
import { UserProfileModalDetails } from './UserProfileModalDetails';
import { UserProfileModalActions } from './UserProfileModalActions';

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
            <UserProfileModalAvatar
              user={user}
              displayName={displayName}
              userInitial={userInitial}
              email={email}
              isAdmin={isAdmin}
              isLight={isLight}
              language={language}
            />

            {/* Account Details Box */}
            <UserProfileModalDetails
              memberSince={memberSince}
              isLight={isLight}
              language={language}
            />

            {/* Action Buttons */}
            <UserProfileModalActions
              isAdmin={isAdmin}
              isLight={isLight}
              language={language}
              onClose={onClose}
              handleLogout={handleLogout}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
