'use client';

import Link from 'next/link';

interface UserProfileModalActionsProps {
  isAdmin: boolean;
  isLight: boolean;
  language: string;
  onClose: () => void;
  handleLogout: () => void;
}

export function UserProfileModalActions({
  isAdmin,
  isLight,
  language,
  onClose,
  handleLogout,
}: UserProfileModalActionsProps) {
  return (
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
  );
}
