'use client';
import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function AboutFAQ({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  if (!data) return null;

  return (
    <section id="faq" className="relative py-16 bg-[#0A192F] overflow-hidden" dir={direction}>
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 right-[5%] text-[#C5A16F]/10 text-9xl font-black select-none opacity-20">?</div>
            <div className="absolute bottom-20 left-[5%] text-[#C5A16F]/10 text-9xl font-black select-none opacity-20">?</div>
            <div className="absolute top-1/2 left-[10%] rotate-45 opacity-10">
                <svg className="w-20 h-20 text-[#C5A16F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            </div>
            <div className="absolute top-1/3 right-1/4 text-4xl text-[#C5A16F]/5">𓄿 𓅓 𓆄</div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
                <div className="inline-block px-4 py-1 border border-[#C5A16F]/30 rounded-full text-[#C5A16F] text-xs font-bold tracking-[0.3em] mb-4 uppercase">
                    {getDynamicText(data, 'subtitle', language) || t('about.knowledgeBase')}
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white">
                    {getDynamicText(data, 'titlePart1', language) || t('about.faqTitle1')} <br /> <span className="text-[#C5A16F]">{getDynamicText(data, 'titlePart2', language) || t('about.faqTitle2')}</span>
                </h2>
            </div>

            <div className="space-y-6">
                {data.faqs?.map((faq: SectionItem, index: number) => {
                    const numStr = String(index + 1).padStart(2, '0');
                    const questionText = getDynamicText(faq, 'question', language) || faq.question;
                    const answerText = getDynamicText(faq, 'answer', language) || faq.answer;

                    return (
                        <div key={index} className="group border border-white/5 bg-[#112240]/50 backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#C5A16F]/50 shadow-xl">
                            <details className="appearance-none group">
                                <summary className="flex items-center justify-between p-8 cursor-pointer list-none outline-none">
                                    <div className="flex items-center gap-6">
                                        <span className="text-[#C5A16F] font-black text-2xl opacity-30 group-hover:opacity-100 transition-opacity">
                                            {numStr}
                                        </span>
                                        <h3 className="text-white text-xl font-bold group-hover:text-[#C5A16F] transition-colors">
                                            {questionText}
                                        </h3>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border border-[#C5A16F]/30 flex items-center justify-center group-open:rotate-180 transition-transform duration-500">
                                        <svg className="w-4 h-4 text-[#C5A16F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </summary>
                                <div className="px-24 pb-8 text-gray-400 leading-relaxed text-lg">
                                    {answerText}
                                </div>
                            </details>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
  );
}
