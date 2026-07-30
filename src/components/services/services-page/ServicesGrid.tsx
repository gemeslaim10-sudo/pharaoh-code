'use client';

import { SectionData, SectionItem } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function ServicesGrid({ data }: { data: SectionData }) {
  const { language } = useLanguage();

  if (!data) return null;

  return (
    <section className="py-24 bg-[#0A192F] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-5 text-8xl font-black select-none uppercase">
                    {data.backgroundText || "Empire"}
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-4">
                    {getDynamicText(data, 'titlePart1', language)} <span className="text-[#C5A16F]">{getDynamicText(data, 'titlePart2', language) || (language === 'ar' ? "خدماتنا" : "Our Services")}</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    {getDynamicText(data, 'description', language) || (language === 'ar' ? "من بناء الأساسات حتى القمة، نحن نوفر لك كل ما يحتاجه مشروعك للسيادة الرقمية." : "From foundation to apex, we provide everything your business needs for digital dominance.")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {data.items?.map((item: SectionItem, index: number) => (
                    <div key={index} className="group bg-[#0f172a] rounded-[2.5rem] overflow-hidden border border-white/5 transition-all duration-500 hover:border-[#C5A16F]/40 shadow-2xl">
                        <div className="relative h-60 overflow-hidden">
                            <img src={(item.imageUrl || item.image)} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={getDynamicText(item, 'title', language)} />
                            
                            {item.badgeTopRight && (
                                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold">
                                    {getDynamicText(item, 'badgeTopRight', language)}
                                </div>
                            )}
                            
                            {item.badgeTopLeft && (
                                <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-[10px] font-black transform -rotate-12">
                                    {getDynamicText(item, 'badgeTopLeft', language)}
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
                        </div>
                        <div className="p-8 text-center">
                            <h3 className="text-2xl font-black mb-3">{getDynamicText(item, 'title', language)}</h3>
                            <p className="text-gray-400 text-sm mb-6 h-12">{getDynamicText(item, 'description', language)}</p>
                            
                            <div className="flex justify-between items-center mb-6 pt-4 border-t border-white/5">
                                <span className="text-xs text-gray-500">{getDynamicText(item, 'metaKey', language)}</span>
                                <span className="text-[#C5A16F] font-bold">{getDynamicText(item, 'metaValue', language)}</span>
                            </div>
                            
                            <a href={item.linkUrl || "#"} className="block w-full py-4 border border-[#C5A16F]/20 rounded-2xl font-bold hover:bg-[#C5A16F] hover:text-[#0A192F] transition-all">
                                {getDynamicText(item, 'linkText', language) || (language === 'ar' ? "استكشف الخدمة" : "Explore Service")}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
