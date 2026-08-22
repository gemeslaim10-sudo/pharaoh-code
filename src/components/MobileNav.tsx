'use client';

import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { usePathname } from 'next/navigation';
import { MobileNavDrawerLinks } from './mobile-nav/MobileNavDrawerLinks';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { language, direction } = useTranslation();
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[108] bg-black/60 backdrop-blur-sm lg:hidden transition-all duration-400 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer panel */}
      <div
        dir={direction}
        className={`
          fixed inset-y-0 z-[110] lg:hidden
          w-[min(88vw,360px)]
          bg-gradient-to-b from-[#08162A] via-[#0A192F] to-[#050E1E]
          border-e border-[#C5A16F]/15
          shadow-[0_0_80px_-10px_rgba(197,161,111,0.2)]
          flex flex-col
          transition-transform duration-500 cubic-bezier-spring
          ${direction === 'rtl' ? 'right-0' : 'left-0'}
          ${isOpen
            ? 'translate-x-0'
            : direction === 'rtl' ? 'translate-x-full' : '-translate-x-full'
          }
        `}
      >
        {/* Ambient gradient top */}
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#C5A16F]/08 to-transparent pointer-events-none" />
        <div className="absolute top-1/3 -end-20 w-48 h-48 rounded-full bg-[#C5A16F]/04 blur-3xl pointer-events-none" />

        {/* ── HEADER ── */}
        <div className="relative flex items-center justify-between px-6 pt-8 pb-6 border-b border-white/[0.06]">
          {/* Logo */}
          <Link href="/" onClick={onClose} className="group flex items-center gap-2.5">
            <div className="
              w-9 h-9 rounded-xl flex items-center justify-center
              bg-gradient-to-br from-[#C5A16F]/20 to-[#9E7D47]/10
              border border-[#C5A16F]/30
              shadow-[0_0_14px_rgba(197,161,111,0.2)]
            ">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C5A16F]" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L22 20H2L12 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v5M12 17h.01" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-black text-[15px] tracking-tight">
                PHARAOH <span className="text-[#C5A16F]">CODE</span>
              </span>
              <span className="text-[#C5A16F]/45 text-[9px] tracking-[0.15em] uppercase mt-0.5">
                Software House
              </span>
            </div>
          </Link>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="
              w-9 h-9 rounded-xl flex items-center justify-center
              bg-white/[0.04] border border-white/[0.08]
              text-white/60 hover:text-white hover:bg-red-500/15 hover:border-red-400/30
              transition-all duration-300 group/close shrink-0
            "
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover/close:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── NAV LINKS ── */}
        <MobileNavDrawerLinks
          pathname={pathname}
          language={language}
          direction={direction}
          onClose={onClose}
        />

        {/* ── BOTTOM CTA ── */}
        <div className="px-4 pb-8 pt-4 border-t border-white/[0.06]">
          <Link
            href="/start-project"
            onClick={onClose}
            className="
              relative overflow-hidden group/cta
              flex items-center justify-center gap-2.5
              w-full py-4 rounded-2xl
              bg-gradient-to-r from-[#D4AF37] via-[#C5A16F] to-[#9E7D47]
              text-[#040810] font-black text-base
              shadow-[0_8px_28px_rgba(197,161,111,0.4),inset_0_1px_1px_rgba(255,255,255,0.5)]
              hover:shadow-[0_12px_36px_rgba(197,161,111,0.55)]
              hover:scale-[1.02] transition-all duration-300
            "
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700" />
            <svg className="w-4.5 h-4.5 shrink-0 relative z-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l2.928 8.856H23l-7.208 5.144 2.77 8.856L12 19.712l-6.562 5.144 2.77-8.856L1 10.856h8.072z" />
            </svg>
            <span className="relative z-10">
              {language === 'ar' ? 'ابدأ مشروعك الآن' : 'Start Your Project'}
            </span>
          </Link>

          <p className="text-center text-white/25 text-[11px] mt-4 tracking-wide">
            {language === 'ar' ? 'نحن هنا لنبني مستقبلك الرقمي' : 'We build your digital future'}
          </p>
        </div>
      </div>
    </>
  );
}
