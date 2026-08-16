'use client';
import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function PortfolioCore({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  if (!data) return null;

  return (
    <section className="py-20 bg-[#0A192F] relative overflow-hidden" dir={direction}>
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] bg-gradient-to-r from-transparent via-[#C5A16F]/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-[2px] bg-[#C5A16F]" />
            <span className="text-[#C5A16F] tracking-[0.4em] uppercase text-[11px] font-bold">
              {getDynamicText(data, 'subtitle', language) || 'HOW WE THINK'}
            </span>
            <div className="w-6 h-[2px] bg-[#C5A16F]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white text-center">
            {getDynamicText(data, 'titlePart1', language) || t('creative.titlePart1')}
            {' '}
            <span className="text-[#C5A16F]">
              {getDynamicText(data, 'titlePart2', language) || t('creative.titlePart2')}
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent mt-5 rounded-full" />
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.items?.map((item: SectionItem, index: number) => {
            const itemTitle = getDynamicText(item, 'title', language);
            const itemDesc = getDynamicText(item, 'description', language) || getDynamicText(item, 'desc', language);

            return (
              <div
                key={index}
                className="group relative p-8 bg-[#112240] rounded-2xl border border-white/5 hover:border-[#C5A16F]/40 overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-[0_20px_60px_-15px_rgba(197,161,111,0.2)]"
              >
                {/* Top glowing beam */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A16F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Number watermark */}
                <div className="absolute top-4 right-5 text-5xl font-black text-[#C5A16F]/8 group-hover:text-[#C5A16F]/15 transition-colors select-none pointer-events-none">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="mb-6 text-[#C5A16F] w-12 h-12 flex items-center justify-center bg-[#C5A16F]/10 rounded-xl group-hover:bg-[#C5A16F] transition-colors duration-300 relative z-10">
                  <div className="group-hover:text-[#0A192F] transition-colors w-6 h-6 [&_svg]:w-6 [&_svg]:h-6" dangerouslySetInnerHTML={{ __html: item.iconSvg }} />
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#C5A16F] transition-colors relative z-10">{itemTitle}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{itemDesc}</p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#C5A16F] to-transparent w-0 group-hover:w-full transition-all duration-700 rounded-br-2xl" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
