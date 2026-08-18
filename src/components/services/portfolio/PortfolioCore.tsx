'use client';
import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function PortfolioCore({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  if (!data) return null;

  return (
    <section className="py-14 sm:py-16 bg-[#0A192F] relative overflow-hidden" dir={direction}>
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#C5A16F]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-8 sm:mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-5 h-[2px] bg-[#C5A16F]" />
            <span className="text-[#C5A16F] tracking-[0.3em] uppercase text-[10px] font-bold">
              {getDynamicText(data, 'subtitle', language) || 'HOW WE THINK'}
            </span>
            <div className="w-5 h-[2px] bg-[#C5A16F]" />
          </div>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {getDynamicText(data, 'titlePart1', language) || t('creative.titlePart1')}
            {' '}
            <span className="text-[#C5A16F]">
              {getDynamicText(data, 'titlePart2', language) || t('creative.titlePart2')}
            </span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent mt-3 rounded-full" />
        </div>

        {/* Items grid - Compact & Balanced */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {data.items?.map((item: SectionItem, index: number) => {
            const itemTitle = getDynamicText(item, 'title', language);
            const itemDesc = getDynamicText(item, 'description', language) || getDynamicText(item, 'desc', language);

            return (
              <div
                key={index}
                className={`group relative p-5 sm:p-6 rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
                  isLight
                    ? 'bg-white border-slate-200/90 shadow-sm hover:border-[#C5A16F] hover:shadow-[0_12px_28px_-6px_rgba(197,161,111,0.2)]'
                    : 'bg-gradient-to-b from-[#0F1E38] to-[#0A182E] border-white/10 hover:border-[#C5A16F]/50 shadow-md hover:shadow-[0_12px_28px_-6px_rgba(197,161,111,0.22)]'
                }`}
              >
                {/* Top glowing beam */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Number watermark */}
                <div className="absolute top-3 end-4 text-3xl font-black text-[#C5A16F]/10 group-hover:text-[#C5A16F]/20 transition-colors select-none pointer-events-none font-mono">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="mb-4 text-[#C5A16F] w-9 h-9 flex items-center justify-center bg-[#C5A16F]/10 rounded-lg group-hover:bg-[#C5A16F] transition-colors duration-200 relative z-10">
                  <div className="group-hover:text-[#0A192F] transition-colors w-4.5 h-4.5 [&_svg]:w-4.5 [&_svg]:h-4.5" dangerouslySetInnerHTML={{ __html: item.iconSvg }} />
                </div>

                <h3 className={`text-base font-bold mb-2 transition-colors relative z-10 ${
                  isLight ? 'text-slate-900 group-hover:text-[#8A5800]' : 'text-white group-hover:text-[#C5A16F]'
                }`}>
                  {itemTitle}
                </h3>
                <p className={`text-xs leading-relaxed relative z-10 ${
                  isLight ? 'text-slate-600' : 'text-gray-400'
                }`}>
                  {itemDesc}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#C5A16F] to-transparent w-0 group-hover:w-full transition-all duration-500 rounded-br-xl" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
