'use client';

import { SectionData } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function HomeTestimonials({ data }: { data?: SectionData }) {
  const { t, language } = useTranslation();
  const displayItems = data?.items || [];

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <section id="happy-clients" className="relative py-24 bg-[#0A192F] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-[#C5A16F] font-bold tracking-[0.4em] uppercase text-xs mb-4">
                    {data?.subtitle || t("testimonials.subtitle")}
                </h2>
                <h3 className="text-4xl md:text-6xl font-black text-white">
                    {t("testimonials.titlePart1")} <span className="text-[#C5A16F]">{t("testimonials.titlePart2")}</span>
                </h3>
                <div className="w-20 h-1.5 bg-[#C5A16F] mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayItems.map((item: any, index: number) => {
                    const itemName = getDynamicText(item, 'name', language) || item.name || '';
                    const itemRole = getDynamicText(item, 'role', language) || item.role || '';
                    const itemContent = getDynamicText(item, 'content', language) || getDynamicText(item, 'text', language) || item.content || item.text || '';

                    return (
                        <div key={index} className="group relative bg-[#112240] p-8 rounded-3xl border border-white/5 hover:border-[#C5A16F]/40 transition-all duration-500 hover:-translate-y-3">
                            <div className="flex items-center gap-4 mb-6">
                                {item.imageUrl || item.image ? (
                                    <img src={(item.imageUrl || item.image)} className="w-14 h-14 rounded-2xl object-cover" alt={itemName} />
                                ) : (
                                    <div className="w-14 h-14 bg-pharaohGold/10 rounded-2xl flex items-center justify-center font-bold text-pharaohGold border border-pharaohGold/20 text-xl shrink-0">
                                        {item.initials || "ع"}
                                    </div>
                                )}
                                <div>
                                    <h4 className="text-white font-bold">{itemName}</h4>
                                    <p className="text-[#C5A16F] text-sm">{itemRole}</p>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-[15.5px]">
                                "{itemContent}"
                            </p>
                            <div className="mt-8 flex text-[#C5A16F]">
                                {item.rating || "★★★★★"}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[15rem] font-black text-[#C5A16F]/[0.03] pointer-events-none select-none">
            {data?.backgroundText || "CLIENTS"}
        </div>
    </section>
  );
}
