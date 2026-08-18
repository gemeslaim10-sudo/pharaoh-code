'use client';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HomeHeroSlideProps {
  mediaSrc: string;
  isVideo: boolean;
  theme: string;
  title: ReactNode;
  subtitle: string;
  buttons: ReactNode;
}

export function HomeHeroSlide({
  mediaSrc,
  isVideo,
  theme,
  title,
  subtitle,
  buttons,
}: HomeHeroSlideProps) {
  return (
    <div className="swiper-slide bg-[#060E1A]">
      {isVideo ? (
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={mediaSrc} type="video/mp4" />
        </video>
      ) : (
        <img src={mediaSrc} className="absolute inset-0 w-full h-full object-cover" alt="Hero Background" />
      )}
      <div className={`absolute inset-0 ${
        theme === 'light'
          ? 'bg-gradient-to-t from-white/70 via-transparent to-transparent'
          : 'bg-gradient-to-t from-[#060E1A]/70 via-transparent to-transparent'
      }`} />
      <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-4xl content-up transition-opacity duration-700">
          <h1 className={`text-3xl sm:text-5xl md:text-6xl font-black mb-5 leading-tight tracking-tight ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            {title}
          </h1>

          {/* Floating Levitating Subtitle Paragraph */}
          <motion.p
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`text-sm sm:text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm select-none ${
              theme === 'light' 
                ? 'text-slate-700 drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]' 
                : 'text-slate-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]'
            }`}
          >
            {subtitle}
          </motion.p>

          {buttons}
        </div>
      </div>
    </div>
  );
}
