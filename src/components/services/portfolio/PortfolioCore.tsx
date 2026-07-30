'use client';
import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function PortfolioCore({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  if (!data) return null;

  return (
    <section className="py-24 bg-pharaohNavy relative" dir={direction}>
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center mb-20">
                <span className="text-pharaohGold tracking-[0.5em] uppercase text-sm mb-4">
                    {getDynamicText(data, 'subtitle', language) || "HOW WE THINK"}
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-white text-center">
                    {getDynamicText(data, 'titlePart1', language) || t('creative.titlePart1')} <span className="text-pharaohGold">{getDynamicText(data, 'titlePart2', language) || t('creative.titlePart2')}</span>
                </h2>
                <div className="w-24 h-1 bg-pharaohGold mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
                {data.items?.map((item: SectionItem, index: number) => {
                    const itemTitle = getDynamicText(item, 'title', language) || item.title;
                    const itemDesc = getDynamicText(item, 'description', language) || getDynamicText(item, 'desc', language) || item.description;

                    return (
                        <div key={index} className={`p-12 ${index === 2 ? 'bg-white/5' : index === 1 ? 'bg-white/[0.07] border-r border-white/10' : 'bg-white/5 border-r border-white/10'} hover:bg-pharaohGold group transition-all duration-700`}>
                            <div className="mb-10 text-pharaohGold group-hover:text-pharaohNavy transition-colors">
                                <div dangerouslySetInnerHTML={{ __html: item.iconSvg }} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pharaohNavy transition-colors">{itemTitle}</h3>
                            <p className="text-gray-400 group-hover:text-pharaohNavy/80 transition-colors leading-relaxed">
                                {itemDesc}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
  );
}
