'use client';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/LanguageContext';

interface NavbarMobileDrawerFooterProps {
  onClose: () => void;
}

export function NavbarMobileDrawerFooter({ onClose }: NavbarMobileDrawerFooterProps) {
  const { user, isAdmin, logout } = useAuth();
  const { t, direction } = useTranslation();

  return (
    <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
      <Link
        href="/start-project"
        onClick={onClose}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C5A16F] via-[#D4AF37] to-[#C5A16F] text-[#050B14] font-black text-center text-sm shadow-[0_10px_25px_rgba(197,161,111,0.3)] flex items-center justify-center gap-2 active:scale-98 transition-transform"
      >
        <span>{t("nav.startProject")}</span>
        <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>

      <div className="grid grid-cols-2 gap-2">
        {isAdmin && (
          <Link
            href="/dashboard"
            onClick={onClose}
            className="py-3 rounded-xl bg-[#112240] border border-[#C5A16F]/40 text-[#C5A16F] font-bold text-xs text-center flex items-center justify-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
            </svg>
            <span>{t("nav.dashboard")}</span>
          </Link>
        )}

        {user ? (
          <button
            onClick={() => { logout(); onClose(); }}
            className="py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs text-center col-span-2"
          >
            {t("nav.logout")}
          </button>
        ) : (
          <Link
            href="/login"
            onClick={onClose}
            className={`py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 ${!isAdmin ? 'col-span-2' : ''}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14" />
            </svg>
            <span>{t("nav.login")}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
