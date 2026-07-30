'use client';

import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

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

export default function HomeCreative({ data }: { data?: SectionData }) {
  const { t, language } = useTranslation();

  const creativeItems = data?.items || [];

  return (
    <section id="about-creative" className="relative py-24 bg-[#0A192F] overflow-hidden">
        <div className="absolute top-20 right-10 text-[10rem] font-black text-[#C5A16F]/[0.02] pointer-events-none select-none">
            {data?.backgroundText || "CREATIVE"}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-24 border-b border-white/5 pb-12">
                <div>
                    <h2 className="text-[#C5A16F] font-bold tracking-[0.5em] uppercase text-xs mb-4">
                        {data?.subtitle || t("creative.subtitle")}
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-black text-white">
                        {t("creative.titlePart1")} <span className="text-[#C5A16F]">{t("creative.titlePart2")}</span>
                    </h3>
                </div>
                <p className="text-gray-400 max-w-md mt-6 md:mt-0 leading-relaxed">
                    {data?.description || t("creative.subtitle")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {creativeItems.map((item: SectionItem, index: number) => {
                    const rotateClass = index % 2 === 0 ? "group-hover:rotate-12" : "group-hover:-rotate-12";
                    const itemTitle = getDynamicText(item, 'title', language) || item.title || '';
                    const itemDesc = getDynamicText(item, 'description', language) || item.description || '';

                    return (
                        <div key={index} className="group relative pt-12 cursor-pointer">
                            {/* Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A16F]/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {/* Card */}
                            <div className="relative bg-[#112240] p-10 rounded-tr-[5rem] rounded-bl-[5rem] rounded-tl-2xl rounded-br-2xl border-r-4 border-t-4 border-[#C5A16F]/20 group-hover:border-[#C5A16F] transition-all duration-500 shadow-2xl">
                                {/* Icon box */}
                                <div className={`absolute -top-8 right-10 w-20 h-20 bg-[#0A192F] border-2 border-[#C5A16F] rounded-2xl flex items-center justify-center transform ${rotateClass} transition-transform duration-500 shadow-xl`}>
                                    <div className="w-14 h-14 bg-[#C5A16F]/10 rounded-xl flex items-center justify-center group-hover:bg-[#C5A16F] transition-colors duration-500">
                                        {/* Color is driven by parent's text color via currentColor */}
                                        <div
                                            className="text-[#C5A16F] group-hover:text-[#0A192F] transition-colors duration-500"
                                            dangerouslySetInnerHTML={{ __html: stripSvgColors(item.iconSvg || '') }}
                                        />
                                    </div>
                                </div>

                                <h4 className="text-white text-2xl font-black mt-8 mb-4">{itemTitle}</h4>
                                <p className="text-gray-400 leading-relaxed text-sm">{itemDesc}</p>

                                {/* LEARN MORE */}
                                <div className="mt-8 flex items-center gap-3 text-[#C5A16F] font-bold text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span>{item.actionText || "LEARN MORE"}</span>
                                    <div className="w-12 h-[1px] bg-[#C5A16F]"></div>
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
