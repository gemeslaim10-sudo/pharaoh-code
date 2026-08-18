'use client';

interface PortfolioCardMediaProps {
  imageUrl: string;
  itemTitle: string;
  categoryLabel: string;
  liveUrl: string | null;
  appUrl: string | null;
  isLight: boolean;
  language: string;
}

export function PortfolioCardMedia({
  imageUrl,
  itemTitle,
  categoryLabel,
  liveUrl,
  appUrl,
  isLight,
  language,
}: PortfolioCardMediaProps) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
      <img
        src={imageUrl}
        alt={itemTitle}
        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
        loading="lazy"
      />

      {/* Ambient Dark Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/90 via-transparent to-black/30 pointer-events-none" />

      {/* Category Pill Badge with Glow */}
      <div className="absolute top-3 start-3 z-20">
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-black uppercase tracking-wider border shadow-md transition-transform duration-300 group-hover:scale-105 ${
          isLight
            ? 'bg-white/95 border-[#C5A16F]/40 text-[#8A5800]'
            : 'bg-[#050B14]/85 border-[#C5A16F]/40 text-[#C5A16F]'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping" />
          <span>{categoryLabel}</span>
        </div>
      </div>

      {/* Quick Action Overlay on Hover */}
      <div className="absolute inset-0 bg-[#050B14]/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2.5 z-20">
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={language === 'ar' ? 'معاينة الموقع' : 'Visit Live Site'}
            aria-label="Visit Live Site"
            className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-[#C5A16F] hover:text-[#050B14] hover:border-[#C5A16F] hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}

        {appUrl && (
          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={language === 'ar' ? 'تحميل التطبيق' : 'Download App'}
            aria-label="Download App"
            className="w-9 h-9 rounded-xl bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
