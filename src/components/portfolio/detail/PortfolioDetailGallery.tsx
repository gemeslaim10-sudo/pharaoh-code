'use client';

import { useCallback, useEffect, useState } from 'react';
import { type DetailTheme } from './detailHelpers';

interface Props {
  images: string[];
  title: string;
  theme: DetailTheme;
  language: string;
}

/** Column count that fills every row for the common gallery sizes (no lonely last tile). */
function gridColsFor(count: number): string {
  if (count <= 1) return 'grid-cols-1';
  if (count === 2) return 'grid-cols-2';
  if (count === 3) return 'grid-cols-1 sm:grid-cols-3';
  if (count === 4) return 'grid-cols-2 lg:grid-cols-4';
  if (count % 3 === 0) return 'grid-cols-2 lg:grid-cols-3';
  return 'grid-cols-2 lg:grid-cols-4';
}

/** Grid of the project's designs/screens with a keyboard-friendly lightbox. */
export function PortfolioDetailGallery({ images, title, theme, language }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const isRtl = language === 'ar';

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((delta: number) => {
    setOpen(i => (i === null ? i : (i + delta + images.length) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(isRtl ? -1 : 1);
      if (e.key === 'ArrowLeft') step(isRtl ? 1 : -1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, step, isRtl]);

  return (
    <>
      <div className={`grid gap-4 ${gridColsFor(images.length)}`}>
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            className={`group relative block w-full overflow-hidden rounded-2xl border cursor-zoom-in ${
              images.length === 1 ? 'aspect-[16/9]' : 'aspect-[4/5]'
            } ${theme.isLight ? 'bg-white border-slate-200' : 'bg-[#0A1628] border-white/10'}`}
            aria-label={`${title} — ${i + 1}`}
          >
            <img
              src={src}
              alt={`${title} — ${i + 1}`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                images.length === 1 ? 'object-contain' : 'object-cover'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-3 end-3 w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" /></svg>
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[200] bg-[#030712]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <img
            src={images[open]}
            alt={`${title} — ${open + 1}`}
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl select-none"
            onClick={e => e.stopPropagation()}
          />

          <button type="button" onClick={close} aria-label="Close"
            className="absolute top-4 end-4 w-11 h-11 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-[#C5A16F] hover:text-[#0A192F] transition flex items-center justify-center cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {images.length > 1 && (
            <>
              <button type="button" aria-label="Previous"
                onClick={e => { e.stopPropagation(); step(-1); }}
                className="absolute start-3 sm:start-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-[#C5A16F] hover:text-[#0A192F] transition flex items-center justify-center cursor-pointer">
                <svg className={`w-5 h-5 ${isRtl ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
              </button>
              <button type="button" aria-label="Next"
                onClick={e => { e.stopPropagation(); step(1); }}
                className="absolute end-3 sm:end-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-[#C5A16F] hover:text-[#0A192F] transition flex items-center justify-center cursor-pointer">
                <svg className={`w-5 h-5 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
              </button>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold" dir="ltr">
                {open + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
