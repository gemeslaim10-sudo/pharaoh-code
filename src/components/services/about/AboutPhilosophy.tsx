'use client';
import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

const PHILOSOPHY_ICONS = [
  <svg key="0" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>,
  <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>,
  <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>,
];

export default function AboutPhilosophy({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  if (!data) return null;

  return (
    <section className="relative py-24 bg-[#050D1A] overflow-hidden" dir={direction}>
      {/* Rich background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(197,161,111,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.04) 0%, transparent 50%)' }} />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A16F]/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-10 h-[2px] bg-gradient-to-r from-transparent to-[#C5A16F]" />
            <span className="text-[#C5A16F] font-bold tracking-[0.4em] uppercase text-[11px] bg-[#C5A16F]/8 px-4 py-1.5 rounded-full border border-[#C5A16F]/20">
              {getDynamicText(data, 'subtitle', language) || t('about.philosophySubtitle')}
            </span>
            <div className="w-10 h-[2px] bg-gradient-to-l from-transparent to-[#C5A16F]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            {getDynamicText(data, 'titlePart1', language) || t('about.philosophyTitle1')}
            <br />
            <span className="bg-gradient-to-r from-[#C5A16F] via-[#E8C97E] to-[#C5A16F] bg-clip-text text-transparent">
              {getDynamicText(data, 'titlePart2', language) || t('about.philosophyTitle2')}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent mx-auto mt-6 rounded-full" />
        </div>

        {/* Cards: First one large + two small */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data.items?.map((item: SectionItem, index: number) => {
            const itemTitle = getDynamicText(item, 'title', language);
            const itemDesc = getDynamicText(item, 'description', language) || getDynamicText(item, 'desc', language);
            const icon = (item.iconSvg && item.iconSvg.includes('<svg'))
              ? <div dangerouslySetInnerHTML={{ __html: item.iconSvg }} className="w-8 h-8 [&_svg]:w-8 [&_svg]:h-8" />
              : PHILOSOPHY_ICONS[index % 3];

            return (
              <div
                key={index}
                className="relative group bg-gradient-to-b from-[#0F1E38] to-[#081222] rounded-3xl border border-white/8 hover:border-[#C5A16F]/50 transition-all duration-600 overflow-hidden shadow-2xl cursor-default"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
              >
                {/* Top glowing beam */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Hover glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A16F]/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none" />

                {/* Shimmer */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.025] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                <div className="relative z-10 p-8 flex flex-col h-full">
                  {/* Icon with animated ring */}
                  <div className="relative mb-7 self-start">
                    <div className="w-16 h-16 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-400 shadow-[0_0_0_0_rgba(197,161,111,0)] group-hover:shadow-[0_0_0_8px_rgba(197,161,111,0.12)] relative z-10">
                      {icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-white mb-4 group-hover:text-[#C5A16F] transition-colors duration-300 leading-tight">
                    {itemTitle}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    {itemDesc}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-6 pt-5 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[#C5A16F]/50 group-hover:text-[#C5A16F] transition-colors duration-400">
                      <div className="w-4 h-[1px] bg-current" />
                      <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-2 group-hover:translate-x-0">
                        {language === 'ar' ? 'اكتشف المزيد' : 'Learn More'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
