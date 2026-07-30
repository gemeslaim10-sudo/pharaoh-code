'use client';

import { SectionData, SectionItem } from '@/types';
import Link from 'next/link';
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

export default function HomeServices({ data }: { data?: SectionData }) {
  const { t, language } = useTranslation();
  const itemsToRender = data?.items || [];

  return (
    <section id="services" className="relative py-24 bg-[#0A192F] overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#C5A16F]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-16">
                <h2 className="text-[#C5A16F] font-bold tracking-[0.2em] uppercase text-sm mb-4">
                    {t("services.subtitle")}
                </h2>
                <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                    {t("services.titlePart1")} <span className="text-[#C5A16F] italic">{t("services.titlePart2")}</span>
                </h3>
                <div className="w-20 h-1.5 bg-[#C5A16F] mt-6 rounded-full shadow-[0_0_15px_rgba(197,161,111,0.3)]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {itemsToRender.map((item: SectionItem, index: number) => {
                    const titleText = getDynamicText(item, 'title', language) || item.title || t("services.exploreBtn");
                    const descText = getDynamicText(item, 'description', language) || item.description || '';

                    const cardContent = (
                        <>
                            <div className="w-16 h-16 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#C5A16F] transition-colors duration-500">
                                <div 
                                    className="text-[#C5A16F] group-hover:text-[#0A192F] transition-colors duration-500 flex items-center justify-center"
                                    dangerouslySetInnerHTML={{ __html: stripSvgColors(item.iconSvg || '') }} 
                                />
                            </div>
                            <h4 className="text-white text-xl font-bold mb-4">{titleText}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">{descText}</p>
                            <div className="w-10 h-1 bg-[#C5A16F]/30 group-hover:w-full transition-all duration-500"></div>
                        </>
                    );

                    if (item.detailPageUrl) {
                        return (
                            <Link key={index} href={item.detailPageUrl} className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/40 transition-all duration-500 hover:-translate-y-3 shadow-xl cursor-pointer block">
                                {cardContent}
                            </Link>
                        );
                    }

                    return (
                        <div key={index} className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/40 transition-all duration-500 hover:-translate-y-3 shadow-xl">
                            {cardContent}
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
  );
}

