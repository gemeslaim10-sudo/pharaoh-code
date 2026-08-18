'use client';

interface ContactFormHeaderProps {
  defaultBadge?: string;
  defaultTitle?: string;
  defaultSubtitle?: string;
  isLight: boolean;
}

export function ContactFormHeader({
  defaultBadge,
  defaultTitle,
  defaultSubtitle,
  isLight,
}: ContactFormHeaderProps) {
  if (!defaultBadge && !defaultTitle && !defaultSubtitle) return null;

  return (
    <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
      {defaultBadge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-2.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping" />
          <h2 className="text-[#C5A16F] font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
            {defaultBadge}
          </h2>
        </div>
      )}
      {defaultTitle && (
        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-2.5 leading-tight tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
          {defaultTitle}
        </h3>
      )}
      {defaultSubtitle && (
        <p className={`text-xs sm:text-sm md:text-base leading-relaxed font-light ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
          {defaultSubtitle}
        </p>
      )}
    </div>
  );
}
