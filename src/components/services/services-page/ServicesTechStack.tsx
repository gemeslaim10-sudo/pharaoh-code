'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function ServicesTechStack({ data }: { data?: any }) {
  const { t, language, direction } = useTranslation();

  const subtitle = getDynamicText(data, 'subtitle', language) || t('techStack.subtitle');
  const title1 = getDynamicText(data, 'title1', language) || t('techStack.title1');
  const title2 = getDynamicText(data, 'title2', language) || t('techStack.title2');
  const desc = getDynamicText(data, 'description', language) || t('techStack.desc');
  const cleanArch = getDynamicText(data, 'cleanArch', language) || t('techStack.cleanArch');
  const aesEncrypt = getDynamicText(data, 'aesEncrypt', language) || t('techStack.aesEncrypt');

  const cards = data?.cards || [];

  const backendTitle = getDynamicText(cards[0], 'title', language) || t('techStack.backendTitle');
  const backendDesc = getDynamicText(cards[0], 'desc', language) || getDynamicText(cards[0], 'description', language) || t('techStack.backendDesc');

  const mobileTitle = getDynamicText(cards[1], 'title', language) || t('techStack.mobileTitle');
  const mobileDesc = getDynamicText(cards[1], 'desc', language) || getDynamicText(cards[1], 'description', language) || t('techStack.mobileDesc');

  const dbTitle = getDynamicText(cards[2], 'title', language) || t('techStack.dbTitle');
  const dbDesc = getDynamicText(cards[2], 'desc', language) || getDynamicText(cards[2], 'description', language) || t('techStack.dbDesc');

  const cloudTitle = getDynamicText(cards[3], 'title', language) || t('techStack.cloudTitle');
  const cloudDesc = getDynamicText(cards[3], 'desc', language) || getDynamicText(cards[3], 'description', language) || t('techStack.cloudDesc');

  const uiTitle = getDynamicText(cards[4], 'title', language) || t('techStack.uiTitle');
  const uiDesc = getDynamicText(cards[4], 'desc', language) || getDynamicText(cards[4], 'description', language) || t('techStack.uiDesc');

  const securityTitle = getDynamicText(cards[5], 'title', language) || t('techStack.securityTitle');
  const securityDesc = getDynamicText(cards[5], 'desc', language) || getDynamicText(cards[5], 'description', language) || t('techStack.securityDesc');

  return (
    <section className="py-24 bg-[#0A192F] relative border-t border-white/5" dir={direction}>
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
                <div className="lg:w-1/3 space-y-6">
                    <h2 className="text-[#C5A16F] font-bold tracking-widest text-xs uppercase">{subtitle}</h2>
                    <h3 className="text-4xl font-black text-white leading-tight">{title1} <br /> {title2}</h3>
                    <p className="text-gray-400 leading-relaxed">
                        {desc}
                    </p>
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-3 text-sm text-white/70">
                            <svg className="w-5 h-5 text-[#C5A16F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            {cleanArch}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/70">
                            <svg className="w-5 h-5 text-[#C5A16F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            {aesEncrypt}
                        </div>
                    </div>
                </div>

                <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                    <div className="p-8 bg-[#112240]/30 border border-white/5 rounded-2xl hover:bg-[#112240]/50 transition-all">
                        <div className="text-[#C5A16F] mb-4">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                            </svg>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">{backendTitle}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{backendDesc}</p>
                    </div>

                    <div className="p-8 bg-[#112240]/30 border border-white/5 rounded-2xl hover:bg-[#112240]/50 transition-all">
                        <div className="text-[#C5A16F] mb-4">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">{mobileTitle}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{mobileDesc}</p>
                    </div>

                    <div className="p-8 bg-[#112240]/30 border border-white/5 rounded-2xl hover:bg-[#112240]/50 transition-all">
                        <div className="text-[#C5A16F] mb-4">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                            </svg>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">{dbTitle}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{dbDesc}</p>
                    </div>

                    <div className="p-8 bg-[#112240]/30 border border-white/5 rounded-2xl hover:bg-[#112240]/50 transition-all">
                        <div className="text-[#C5A16F] mb-4">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">{cloudTitle}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{cloudDesc}</p>
                    </div>

                    <div className="p-8 bg-[#112240]/30 border border-white/5 rounded-2xl hover:bg-[#112240]/50 transition-all">
                        <div className="text-[#C5A16F] mb-4">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">{uiTitle}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{uiDesc}</p>
                    </div>

                    <div className="p-8 bg-[#112240]/30 border border-white/5 rounded-2xl hover:bg-[#112240]/50 transition-all">
                        <div className="text-[#C5A16F] mb-4">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">{securityTitle}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{securityDesc}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
