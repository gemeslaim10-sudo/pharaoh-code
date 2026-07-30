"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Wait 1.5 seconds, then start fading out
    const timer1 = setTimeout(() => {
      setFade(true);
    }, 1500);

    // After fade out transition (0.8s), completely remove from DOM
    const timer2 = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "auto";
    }, 1500 + 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      id="preloader"
      className={`fixed inset-0 bg-[#0A192F] z-[9999] flex flex-col items-center justify-center transition-opacity duration-800 ${
        fade ? "opacity-0" : "opacity-100"
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
