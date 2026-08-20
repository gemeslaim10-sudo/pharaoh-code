'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '@/types/i18n';

interface TeamMemberImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  name: string;
  role: string;
  language: Language;
}

export default function TeamMemberImageModal({
  isOpen,
  onClose,
  imageUrl,
  name,
  role,
  language
}: TeamMemberImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{ height: '100dvh' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl cursor-zoom-out overflow-hidden"
        >
          {/* Prominent Floating Close (X) Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label={language === 'ar' ? 'إغلاق الصورة' : 'Close Image'}
            title={language === 'ar' ? 'إغلاق (Esc)' : 'Close (Esc)'}
            className="absolute top-3 end-3 sm:top-6 sm:end-6 z-[10000] w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/70 sm:bg-white/10 hover:bg-red-500/30 text-white hover:text-red-400 border border-white/20 hover:border-red-500/50 flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer group active:scale-95"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Image Frame */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[calc(100%-1.5rem)] max-w-md md:max-w-lg flex flex-col items-center cursor-default"
          >
            {/* Outer Gold Glow Halo */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-tr from-[#C5A16F]/30 via-[#DFB77D]/20 to-[#9E7D47]/30 blur-2xl pointer-events-none" />

            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#C5A16F]/40 bg-[#0B1528] shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-2 sm:p-3.5">
              {/* Image Container with Safe Aspect Fit */}
              <div
                className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#060D1A] flex items-center justify-center border border-white/10"
                style={{ maxHeight: 'calc(100dvh - 10rem)' }}
              >
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-auto object-contain select-none"
                  style={{ maxHeight: 'calc(100dvh - 10rem)' }}
                />
              </div>

              {/* Member Name and Role in Preview Footer */}
              <div className="pt-2.5 pb-1 px-1.5 sm:px-2 flex items-center justify-between gap-2 text-start">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base md:text-lg font-black text-white truncate">{name}</h3>
                  <p className="text-xs font-semibold text-pharaohGold truncate">{role}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[11px] font-bold text-gray-300 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 shrink-0 transition-colors"
                >
                  {language === 'ar' ? 'إغلاق ✕' : 'Close ✕'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
