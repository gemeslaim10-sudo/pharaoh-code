'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [fading, setFading] = useState(false);

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
      <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2 pulse-animation">
        PHARAOH <span className="text-[#C5A16F]">CODE</span>
      </h1>

      <div className="text-[#C5A16F]/80 font-medium tracking-[0.2em] uppercase text-xs mb-6">
        Premium Software House
      </div>

      <div className="loader-bar w-48 h-0.5 bg-[#C5A16F]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#C5A16F] animate-loadingBar"></div>
      </div>
    </div>
  );
}
