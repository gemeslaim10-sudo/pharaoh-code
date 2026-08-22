'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { NavbarMobileUserSection } from './NavbarMobileUserSection';

interface NavbarMobileDrawerFooterProps {
  onClose: () => void;
}

export function NavbarMobileDrawerFooter({ onClose }: NavbarMobileDrawerFooterProps) {
  const { user, isAdmin, logout } = useAuth();
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="flex flex-col gap-3">
      {/* Start Project CTA */}
      <motion.div
        animate={{ y: [0, -2.5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link
          href="/start-project"
          onClick={onClose}
          className="
            relative overflow-hidden group/cta
            w-full py-4 rounded-2xl
            bg-gradient-to-r from-[#D4AF37] via-[#C5A16F] to-[#A88448]
            text-[#030B15] font-black text-[15px]
            flex items-center justify-center gap-2.5
            shadow-[0_8px_28px_rgba(197,161,111,0.4),0_3px_10px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.45)]
            border border-[#F3E0B5]/20
          "
        >
          {/* Shimmer */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 ease-in-out" />
          {/* Star icon */}
          <svg className="w-4.5 h-4.5 shrink-0 relative z-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
          </svg>
          <span className="relative z-10">{t('nav.startProject')}</span>
          <svg
            className={`w-4 h-4 shrink-0 relative z-10 ${direction === 'rtl' ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </motion.div>

      {/* User Status / Auth Section */}
      <NavbarMobileUserSection
        user={user}
        isAdmin={isAdmin}
        isLight={isLight}
        onClose={onClose}
        logout={logout}
        t={t}
      />

      {/* Direct WhatsApp Quick Connect */}
      <a
        href="https://wa.me/201000000000"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        className={`
          w-full py-2.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all duration-300
          ${isLight
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100 hover:border-emerald-300'
            : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50'
          }
        `}
      >
        <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span>{language === 'ar' ? 'محادثة سريعة عبر واتساب' : 'Quick WhatsApp Chat'}</span>
      </a>

      {/* Bottom tagline */}
      <p className={`text-center text-[11px] tracking-wide mt-0.5 ${isLight ? 'text-slate-400' : 'text-white/25'}`}>
        © {new Date().getFullYear()} Pharaoh Code · Sovereign House
      </p>
    </div>
  );
}
