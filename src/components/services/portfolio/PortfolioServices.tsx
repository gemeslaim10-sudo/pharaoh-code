'use client';
import { SectionData } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function PortfolioServices({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();
  const itemsToRender = data?.items || [];

  return (
    <section className="py-24 bg-pharaohNavy relative overflow-hidden" dir={direction}>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 border-2 border-pharaohGold rounded-full animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                    {getDynamicText(data, 'titlePart1', language) || t('services.titlePart1')} <span className="text-pharaohGold">{getDynamicText(data, 'titlePart2', language) || t('services.titlePart2')}</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto italic">
                    {getDynamicText(data, 'description', language) || t('services.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {itemsToRender.map((item: any, index: number) => {
                    const itemTitle = getDynamicText(item, 'title', language) || item.title;
                    const itemDesc = getDynamicText(item, 'description', language) || getDynamicText(item, 'desc', language) || item.description;
                    const actionText = getDynamicText(item, 'actionText', language) || item.actionText || item.btnText || item.label || t('services.exploreBtn');

                    return (
                        <div key={index} className="group relative p-1 bg-gradient-to-b from-pharaohGold/20 to-transparent rounded-[2rem] transition-all duration-500 hover:scale-105">
                            <div className="bg-pharaohNavy/90 backdrop-blur-xl p-10 rounded-[1.9rem] h-full border border-white/5 group-hover:border-pharaohGold/50 transition-all">
                                <div className="w-16 h-16 bg-pharaohGold/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-pharaohGold transition-colors duration-500">
                                    <div dangerouslySetInnerHTML={{ __html: item.iconSvg || item.icon }} className="w-8 h-8 text-pharaohGold group-hover:text-pharaohNavy transition-colors flex items-center justify-center" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{itemTitle}</h3>
                                <p className="text-gray-400 leading-relaxed">{itemDesc}</p>
                                <div className="mt-6 flex items-center text-pharaohGold font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    {actionText}
                                    <span className="ml-2">→</span>
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
