'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HomeHeroButtonsProps {
  discoverText: string;
  contactText: string;
}

export function HomeHeroButtons({ discoverText, contactText }: HomeHeroButtonsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5">
      {/* Primary Levitating Floating Gold Button */}
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.06, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        {/* Pulsing Ambient Gold Aura */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#C5A16F]/40 via-[#DFB77D]/60 to-[#C5A16F]/40 blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none" />

        <Link 
          href="/services" 
          className="relative overflow-hidden btn-pharaoh-gold px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-black text-sm sm:text-base shadow-2xl flex items-center gap-2.5 text-[#070F1E] transition-all duration-300"
        >
          {/* Shimmer Light Sweep on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

          <span className="relative z-10 tracking-wide">{discoverText}</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </motion.div>

      {/* Secondary Glassmorphic Floating Button */}
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
        whileHover={{ scale: 1.06, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <Link 
          href="/contact" 
          className="relative overflow-hidden px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center gap-2.5 border border-white/20 text-white hover:border-[#C5A16F] hover:text-[#C5A16F] bg-[#070F1E]/60 backdrop-blur-xl hover:bg-[#070F1E]/90 shadow-xl"
        >
          {/* Shimmer Light Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C5A16F]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

          <span className="relative z-10 tracking-wide">{contactText}</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}
