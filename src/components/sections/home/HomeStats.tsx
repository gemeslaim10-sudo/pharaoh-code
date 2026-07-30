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
  const { t, language } = useTranslation();

  const defaultItems = [
    {
        title: t("stats.teamLabel"),
        value: "25",
        iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#C5A16F] group-hover:text-[#0A192F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`
    },
    {
        title: t("stats.clientsLabel"),
        value: "80",
        iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#C5A16F] group-hover:text-[#0A192F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    },
    {
        title: t("stats.projectsLabel"),
        value: "150",
        iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#C5A16F] group-hover:text-[#0A192F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    },
    {
        title: t("stats.experienceLabel"),
        value: "8",
        prefix: "+",
        iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#C5A16F] group-hover:text-[#0A192F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08-.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    }
  ];

  const itemsToRender = (data?.items && data.items.length > 0 && data.items[0]?.iconSvg) ? data.items : defaultItems;

  return (
    <section id="stats" className="relative py-20 bg-[#0A192F] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {itemsToRender.map((item: SectionItem, index: number) => (
                    <div
                        key={index}
                        className="group relative pt-8 animate-fade-in"
                        style={{ animationDelay: `${index * 150}ms` }}
                    >
                        <div className="relative bg-[#112240] p-8 rounded-tr-[3rem] rounded-bl-[3rem] border-r-2 border-t-2 border-[#C5A16F]/20 group-hover:border-[#C5A16F] transition-all duration-500 text-center">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#0A192F] border-2 border-[#C5A16F]/30 rounded-2xl flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-1000">
                                <div className="w-12 h-12 bg-[#C5A16F]/10 rounded-xl flex items-center justify-center group-hover:bg-[#C5A16F] transition-colors duration-500">
                                    <div
                                        className="text-[#C5A16F] group-hover:text-[#0A192F] transition-colors duration-500"
                                        dangerouslySetInnerHTML={{ __html: stripSvgColors(item.iconSvg || '') }}
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                {item.prefix || item.suffix ? (
                                    <div className="flex items-center justify-center gap-1 mb-2">
                                        {item.prefix && <span className="text-[#C5A16F] text-2xl font-bold">{item.prefix}</span>}
                                        <span className="text-4xl md:text-5xl font-black text-white">
                                            <StatCounter targetValue={parseInt(item.value || '0', 10) || 0} />
                                        </span>
                                        {item.suffix && <span className="text-[#C5A16F] text-2xl font-bold">{item.suffix}</span>}
                                    </div>
                                ) : (
                                    <span className="text-4xl md:text-5xl font-black text-white block mb-2">
                                        <StatCounter targetValue={parseInt(item.value || '0', 10) || 0} />
                                    </span>
                                )}
                                <p className="text-[#C5A16F] font-bold text-sm tracking-widest">{getDynamicText(item, 'title', language) || item.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
