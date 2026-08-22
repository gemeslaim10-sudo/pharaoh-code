'use client';

import { motion } from 'framer-motion';

interface TeamMemberDetailAvatarProps {
  avatarUrl: string;
  name: string;
  activeLogo?: string | undefined;
  isLight: boolean;
  language: string;
  onOpenImage: () => void;
}

export function TeamMemberDetailAvatar({
  avatarUrl,
  name,
  activeLogo,
  isLight,
  language,
  onOpenImage,
}: TeamMemberDetailAvatarProps) {
  return (
    <motion.div 
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
      onClick={onOpenImage}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenImage(); }}
      title={language === 'ar' ? 'انقر لتكبير الصورة' : 'Click to zoom image'}
      className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 shrink-0 group/detail-avatar cursor-pointer select-none"
    >
      {/* Animated Glow Halo */}
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#C5A16F]/50 via-[#DFB77D]/30 to-[#9E7D47]/50 blur-lg opacity-60 group-hover/detail-avatar:opacity-100 transition-all duration-700 pointer-events-none" />
      
      <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-tr from-[#C5A16F] via-[#DFB77D] to-[#9E7D47] group-hover/detail-avatar:scale-105 transition-all duration-500 shadow-xl">
        <div className={`w-full h-full rounded-full p-1 overflow-hidden relative ${
          isLight ? 'bg-white' : 'bg-[#060D1A]'
        }`}>
          <img 
            src={avatarUrl} 
            alt={name} 
            className="w-full h-full object-cover rounded-full transition-all duration-700 transform group-hover/detail-avatar:scale-110 group-hover/detail-avatar:brightness-105" 
          />

          {/* Zoom Overlay on Hover */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] rounded-full opacity-0 group-hover/detail-avatar:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
            <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center shadow-lg transform group-hover/detail-avatar:scale-110 transition-transform">
              <svg className="w-5 h-5 text-pharaohGold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Platform Logo Badge */}
      <div className={`absolute bottom-1 end-1 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center shadow-lg group-hover/detail-avatar:scale-115 group-hover/detail-avatar:rotate-12 transition-all duration-300 p-1.5 overflow-hidden ${
        isLight 
          ? 'bg-white border-[#C5A16F] shadow-amber-900/10' 
          : 'bg-[#070F1E] border-[#C5A16F] shadow-black/40'
      }`}>
        {activeLogo ? (
          <img src={activeLogo} alt="Logo" className="w-full h-full object-contain select-none" />
        ) : (
          <svg className="w-4 h-4 text-[#C5A16F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </div>
    </motion.div>
  );
}
