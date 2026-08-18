'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function FloatingActions({ whatsappNumber = '+201000000000' }: { whatsappNumber?: string }) {
  const { language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isRtl = direction === 'rtl';

  return (
    <aside 
      aria-label="Floating Actions" 
      className={`fixed bottom-4 sm:bottom-6 ${isRtl ? 'left-3 sm:left-6' : 'right-3 sm:right-6'} z-[90] flex flex-col items-center gap-2.5 sm:gap-3 select-none pointer-events-auto`}
    >
      {/* Scroll To Top Button with Spring Scale */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-to-top"
            initial={{ opacity: 0, scale: 0.5, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 15 }}
            whileHover={{ scale: 1.12, y: -3 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border backdrop-blur-xl flex items-center justify-center transition-colors duration-300 group cursor-pointer ${
              isLight
                ? 'bg-white/95 text-[#9E7D47] hover:bg-[#C5A16F] hover:text-white border-[#C5A16F]/40 hover:border-[#C5A16F] shadow-[0_6px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(197,161,111,0.4)]'
                : 'bg-[#070F1E]/90 text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#070F1E] border-[#C5A16F]/40 hover:border-[#C5A16F] shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(197,161,111,0.5)]'
            }`}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Levitation WhatsApp / Quick Contact Action Button */}
      <motion.div
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative group will-change-transform"
      >
        {/* Pulsing Ambient Halo */}
        <div className={`absolute -inset-1 sm:-inset-1.5 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none ${
          isLight
            ? 'bg-gradient-to-r from-[#C5A16F]/30 via-[#25D366]/30 to-[#C5A16F]/30'
            : 'bg-gradient-to-r from-[#C5A16F]/40 via-[#25D366]/40 to-[#C5A16F]/40'
        }`} />

        <motion.a
          href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Contact on WhatsApp"
          className={`relative flex items-center gap-2 sm:gap-2.5 p-2 sm:px-4 sm:py-2.5 rounded-full border backdrop-blur-xl transition-all duration-300 ${
            isLight
              ? 'bg-white/95 text-slate-800 border-[#C5A16F]/50 shadow-[0_10px_25px_rgba(197,161,111,0.25),0_4px_12px_rgba(0,0,0,0.06)] hover:border-[#C5A16F]'
              : 'bg-gradient-to-r from-[#070F1E] via-[#0E1E38] to-[#070F1E] text-white border-[#C5A16F]/60 shadow-[0_12px_30px_rgba(0,0,0,0.7),0_0_15px_rgba(197,161,111,0.25)] hover:border-[#C5A16F]'
          }`}
        >
          {/* Active Ping Beacon */}
          <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#25D366]" />
          </span>

          {/* Text label hidden on mobile, expanded on sm+ screens */}
          <span className={`text-xs font-black tracking-wide transition-colors whitespace-nowrap hidden sm:inline-block ${
            isLight
              ? 'text-slate-900 group-hover:text-[#9E7D47]'
              : 'text-white group-hover:text-[#C5A16F]'
          }`}>
            {language === 'ar' ? 'ابدأ مشروعك' : 'Start Project'}
          </span>

          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md group-hover:rotate-12 transition-transform duration-300 shrink-0">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
        </motion.a>
      </motion.div>
    </aside>
  );
}
