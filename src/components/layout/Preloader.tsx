'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface PreloaderProps {
  siteName?: string;
  logoUrl?: string;
  logoLightUrl?: string;
}

export default function Preloader({
  siteName = 'PHARAOH CODE',
  logoUrl,
  logoLightUrl,
}: PreloaderProps) {
  const [mounted, setMounted] = useState(true);
  const [fading, setFading] = useState(false);
  const { theme } = useTheme();

  const activeLogo = theme === 'light' ? (logoLightUrl || logoUrl || '') : (logoUrl || logoLightUrl || '');
  const nameParts = siteName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 400);

    const removeTimer = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = 'auto';
    }, 800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      id="preloader"
      className={`fixed inset-0 bg-[#0A192F] z-[9999] flex flex-col items-center justify-center transition-opacity duration-400 pointer-events-none ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {activeLogo ? (
        <div className="relative mb-6">
          <img 
            src={activeLogo} 
            alt={siteName} 
            className="h-16 md:h-20 w-auto object-contain pulse-animation drop-shadow-[0_0_30px_rgba(197,161,111,0.4)]" 
          />
        </div>
      ) : (
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 pulse-animation">
          {firstWord} {restWords && <span className="text-[#C5A16F]">{restWords}</span>}
        </h1>
      )}

      <div className="loader-bar w-48 h-0.5 bg-[#C5A16F]/10 relative overflow-hidden mt-2">
        <div className="absolute inset-0 bg-[#C5A16F] animate-loadingBar"></div>
      </div>
    </div>
  );
}
