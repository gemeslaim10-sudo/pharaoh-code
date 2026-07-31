'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

interface Props {
    service: any;
}

export default function ServiceDetailHero({ service }: Props) {
    const { language, direction } = useTranslation();

    const title1 = getDynamicText(service, 'heroTitle1', language) || getDynamicText(service, 'title', language) || (language === 'ar' ? 'تفاصيل الخدمة' : 'Service Details');
    const title2 = getDynamicText(service, 'heroTitle2', language) || (language === 'ar' ? 'حلول احترافية متكاملة' : 'Professional Integrated Solutions');
    const subtitle = getDynamicText(service, 'heroSubtitle', language) || getDynamicText(service, 'description', language) || getDynamicText(service, 'desc', language) || '';
    const btnText = getDynamicText(service, 'heroBtn', language) || (language === 'ar' ? 'طلب الخدمة الآن' : 'Request Service Now');

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-pharaohNavy to-[#081426]" style={{ paddingTop: "110px", paddingBottom: "35px" }} dir={direction}>
            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tighter">
                    {title1} <br />
                    <span className="text-[#C5A16F]">{title2}</span>
                </h1>

                {subtitle && (
                    <div className="inline-block bg-[#C5A16F]/10 text-[#C5A16F] text-sm md:text-base font-bold px-6 py-3 mb-8 border border-[#C5A16F]/20 rounded-2xl max-w-3xl leading-relaxed">
                        {subtitle}
                    </div>
                )}

                <div className="flex flex-wrap justify-center gap-4">
                    <a href="#start-project-form" className="bg-[#C5A16F] text-[#0A192F] font-bold text-sm px-8 py-4 rounded-xl hover:bg-white transition-all shadow-xl shadow-[#C5A16F]/10">
                        {btnText}
                    </a>
                    <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 text-white font-bold text-sm px-8 py-4 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                        💬 {language === 'ar' ? 'تواصل عبر واتساب فوراً' : 'Chat on WhatsApp Now'}
                    </a>
                </div>
            </div>
        </section>
    );
}
