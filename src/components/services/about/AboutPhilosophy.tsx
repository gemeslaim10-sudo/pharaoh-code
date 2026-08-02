'use client';
import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function AboutPhilosophy({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  if (!data) return null;

  return (
    <section className="relative py-24 bg-[#0A192F] overflow-hidden" dir={direction}>
        <div className="absolute top-10 right-10 opacity-10 text-6xl rotate-12 floating-icon text-[#C5A16F]">𓀀</div>
        <div className="absolute bottom-10 left-10 opacity-10 text-6xl -rotate-12 floating-icon text-[#C5A16F]">𓋹</div>
        <div className="absolute top-1/2 left-20 opacity-5 text-8xl font-black text-white select-none">CODE</div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <h3 className="text-[#C5A16F] font-bold tracking-widest text-xs uppercase mb-2">
                    {getDynamicText(data, 'subtitle', language) || t('about.philosophySubtitle')}
                </h3>
                <h2 className="text-4xl font-black text-white">
                    {getDynamicText(data, 'titlePart1', language) || t('about.philosophyTitle1')} <span className="text-[#C5A16F]">{getDynamicText(data, 'titlePart2', language) || t('about.philosophyTitle2')}</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {data.items?.map((item: SectionItem, index: number) => {
                    const numStr = String(index + 1).padStart(2, '0');
                    const itemTitle = getDynamicText(item, 'title', language);
                    const itemDesc = getDynamicText(item, 'description', language) || getDynamicText(item, 'desc', language);

                    return (
                        <div key={index} className="relative p-8 bg-[#112240] rounded-2xl border-b-4 border-[#C5A16F] group hover:-translate-y-2 transition-all duration-500">
                            <div className={`text-[#C5A16F] text-5xl font-black opacity-20 absolute top-4 ${direction === 'rtl' ? 'left-4' : 'right-4'} group-hover:opacity-100 transition-opacity pointer-events-none z-0`}>
                                {numStr}
                            </div>
                            <h4 className="text-white text-2xl font-black mb-4 relative z-10">{itemTitle}</h4>
                            <p className="text-gray-400 relative z-10">{itemDesc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
  );
}
