'use client';

import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import StatCounter from './StatCounter';

function stripSvgColors(svg: string): string {
  if (!svg) return '';
  return svg
    .replace(/\s*(?:group-hover:|group-active:)?text-\[#[^\]]+\]/g, '')
    .replace(/\s*(?:group-hover:|group-active:)?stroke-\[#[^\]]+\]/g, '')
    .replace(/stroke="#[a-fA-F0-9]{3,6}"/g, 'stroke="currentColor"')
    .replace(/fill="#[a-fA-F0-9]{3,6}"/g, 'fill="currentColor"')
    .replace(/stroke:#[a-fA-F0-9]{3,6}/g, 'stroke:currentColor')
    .replace(/fill:#[a-fA-F0-9]{3,6}/g, 'fill:currentColor');
}

export default function HomeStats({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();

  const defaultItems = [
    {
      title: t("stats.teamLabel"),
      value: "25",
      prefix: "+",
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`
    },
    {
      title: t("stats.clientsLabel"),
      value: "80",
      prefix: "+",
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    },
    {
      title: t("stats.projectsLabel"),
      value: "150",
      prefix: "+",
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    },
    {
      title: t("stats.experienceLabel"),
      value: "8",
      prefix: "+",
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08-.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    }
  ];

  const itemsToRender = (data?.items && data.items.length > 0 && data.items[0]?.iconSvg) ? data.items : defaultItems;

  return (
    <section id="stats" className="relative py-14 sm:py-20 bg-[#060D1A] overflow-hidden text-white select-none" dir={direction}>
      {/* Dynamic ambient spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#C5A16F]/8 blur-[150px] rounded-full pointer-events-none" />

      {/* Cyber Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header with Monumental Title */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-2.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping" />
            <h2 className="text-[#C5A16F] font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
              {getDynamicText(data, 'subtitle', language) || t("stats.subtitle")}
            </h2>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-2.5 tracking-tight">
            {t("stats.titlePart1")}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
              {t("stats.titlePart2")}
            </span>
          </h3>

          <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-light max-w-2xl">
            {getDynamicText(data, 'description', language) || t("stats.description")}
          </p>
        </div>

        {/* High-End Stats Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {itemsToRender.map((item: SectionItem, index: number) => {
            const rawVal = item.value || '0';
            const numVal = parseInt(rawVal.replace(/[^0-9]/g, ''), 10) || 0;
            const prefix = item.prefix || (rawVal.startsWith('+') ? '+' : '');
            const suffix = item.suffix || (rawVal.endsWith('+') ? '+' : rawVal.endsWith('%') ? '%' : '');
            const title = getDynamicText(item, 'title', language) || item.title || '';

            return (
              <div
                key={index}
                className="group relative rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#0F1E38] via-[#0A162B] to-[#070F1E] border border-white/5 hover:border-[#C5A16F]/40 transition-all duration-400 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col items-center text-center overflow-hidden"
              >
                {/* Top Subtle Neon Edge Light */}
                <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 shadow-[0_0_10px_#C5A16F]" />

                {/* Floating Glowing Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#C5A16F]/30 flex items-center justify-center mb-4 transition-all duration-400 group-hover:scale-105 group-hover:bg-[#C5A16F] shadow-md">
                  <div
                    className="w-5.5 h-5.5 text-[#C5A16F] group-hover:text-[#060D1A] transition-colors duration-400 flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: stripSvgColors(item.iconSvg || '') }}
                  />
                </div>

                {/* Animated Stat Value */}
                <div className="flex items-baseline justify-center gap-0.5 mb-1.5">
                  {prefix && (
                    <span className="text-[#C5A16F] text-2xl sm:text-3xl font-bold font-mono">
                      {prefix}
                    </span>
                  )}
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#F3E0B5] transition-all">
                    <StatCounter targetValue={numVal} />
                  </span>
                  {suffix && (
                    <span className="text-[#C5A16F] text-2xl sm:text-3xl font-bold font-mono">
                      {suffix}
                    </span>
                  )}
                </div>

                {/* Metric Label */}
                <p className="text-gray-300 font-medium text-xs sm:text-sm tracking-wide transition-colors group-hover:text-white">
                  {title}
                </p>

                {/* Bottom decorative gold dash */}
                <div className="w-6 h-0.5 bg-[#C5A16F]/20 group-hover:w-12 group-hover:bg-[#C5A16F] rounded-full mt-4 transition-all duration-400" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
