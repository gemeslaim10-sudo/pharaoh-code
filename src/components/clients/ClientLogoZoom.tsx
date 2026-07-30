'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ClientLogoZoomProps {
  src: string;
  alt: string;
}

export default function ClientLogoZoom({ src, alt }: ClientLogoZoomProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  // Handle ESC key press to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const modalContent = isOpen ? (
    <div 
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-300"
      onClick={() => setIsOpen(false)}
    >
      {/* Close button - Top right, highly visible with gold accents */}
      <button 
        onClick={() => setIsOpen(false)}
        className="absolute top-6 right-6 text-[#C5A16F] hover:text-white bg-[#0A192F] border-2 border-[#C5A16F] hover:border-white p-3 rounded-full transition-all duration-300 z-[100000] shadow-2xl flex items-center justify-center gap-1 hover:scale-105 active:scale-95"
        title="إغلاق (ESC)"
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span className="text-xs font-bold px-1 hidden sm:inline" dir="rtl">إغلاق</span>
      </button>

      {/* Image Container - constrained to prevent stretching */}
      <div 
        className="relative flex items-center justify-center max-w-[90vw] max-h-[80vh] overflow-hidden p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={src} 
          alt={alt} 
          className="max-w-full max-h-[80vh] w-auto h-auto object-contain select-none rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(197,161,111,0.2)]"
        />
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Thumbnail */}
      <div 
        onClick={() => setIsOpen(true)}
        className="w-48 h-36 rounded-tr-[2.5rem] rounded-bl-[2.5rem] overflow-hidden p-1 border-2 border-pharaohGold/40 shadow-2xl shrink-0 bg-[#0A192F] group cursor-pointer relative"
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover rounded-tr-[2.3rem] rounded-bl-[2.3rem] transition-all duration-500 transform group-hover:scale-105" 
          loading="lazy" 
        />
        {/* Subtle magnifying glass overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-tr-[2.3rem] rounded-bl-[2.3rem]">
          <svg className="w-8 h-8 text-pharaohGold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </div>
      </div>

      {/* Portal to Body */}
      {mounted && isOpen ? createPortal(modalContent, document.body) : null}
    </>
  );
}
