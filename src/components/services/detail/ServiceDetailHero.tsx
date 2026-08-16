'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

interface Props {
    service: any;
}

export default function ServiceDetailHero({ service }: Props) {
    const { language, direction } = useTranslation();

    const title1 = getDynamicText(service, 'heroTitle1', language) || getDynamicText(service, 'title', language) || (language === 'ar' ? 'تفاصيل الخدمة' : 'Service Details');
    const title2 = getDynamicText(service, 'heroTitle2', language) || (language === 'ar' ? 'حلول برمجية سيادية متكاملة' : 'Integrated Sovereign Software Solutions');
    const subtitle = getDynamicText(service, 'heroSubtitle', language) || getDynamicText(service, 'description', language) || getDynamicText(service, 'desc', language) || (language === 'ar' ? 'خدمات برمجية وهندسية فاخرة مخصصة وفق أرقى معايير التقنية العالمية.' : 'Premium software engineering services tailored to global standards.');
    const btnText = getDynamicText(service, 'heroBtn', language) || (language === 'ar' ? 'طلب الخدمة الآن' : 'Request Service Now');
    const badgeText = getDynamicText(service, 'badge', language) || getDynamicText(service, 'type', language) || (language === 'ar' ? 'صرح البرمجيات السيادية' : 'Sovereign Tech Enterprise');

    return (
        <section 
            className="relative overflow-hidden bg-[#0A192F] bg-gradient-to-b from-[#060E1A] via-[#0A192F] to-[#081426] text-white" 
            style={{ 
                backgroundColor: '#0A192F',
                paddingTop: "125px", 
                paddingBottom: "45px" 
            }} 
            dir={direction}
        >
            {/* Ambient Navy & Gold Lighting Backdrops (Pure Background - No Text) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
                {/* Top Gold Ambient Glow */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C5A16F]/10 blur-[140px] rounded-full"></div>
                {/* Deep Royal Navy / Blue Ambient Sphere */}
                <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-0 -right-32 w-96 h-96 bg-[#C5A16F]/10 blur-[150px] rounded-full"></div>

                {/* Subtle Abstract Pharaoh Geometric Mesh (Pure Geometric - Zero Text) */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="service-hero-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C5A16F" strokeWidth="0.8" />
                            <circle cx="30" cy="30" r="1.5" fill="#C5A16F" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#service-hero-pattern)" />
                </svg>
            </div>

            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                {/* Sovereign Category Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#112240]/80 border border-[#C5A16F]/30 backdrop-blur-md mb-6 shadow-lg shadow-black/20">
                    <span className="w-2 h-2 rounded-full bg-[#C5A16F] animate-pulse"></span>
                    <span className="text-[#C5A16F] text-xs md:text-sm font-bold tracking-wider">
                        {badgeText}
                    </span>
                </div>

                {/* Main Hero Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight md:leading-[1.2] mb-6 tracking-tight">
                    {title1} <br />
                    <span className="text-[#C5A16F] drop-shadow-[0_2px_15px_rgba(197,161,111,0.25)]">
                        {title2}
                    </span>
                </h1>

                {/* Subtitle / Description Box */}
                {subtitle && (
                    <div className="inline-block bg-[#112240]/70 backdrop-blur-md text-gray-200 text-sm md:text-base font-medium px-6 py-4 mb-8 border border-white/10 rounded-2xl max-w-3xl leading-relaxed shadow-xl">
                        {subtitle}
                    </div>
                )}

                {/* Call to Actions */}
                <div className="flex flex-wrap justify-center items-center gap-4">
                    <a 
                        href="#start-project-form" 
                        className="bg-[#C5A16F] text-[#0A192F] font-extrabold text-sm md:text-base px-8 py-4 rounded-xl hover:bg-white hover:text-[#0A192F] transition-all duration-300 shadow-xl shadow-[#C5A16F]/20 hover:shadow-[#C5A16F]/40 hover:-translate-y-0.5 flex items-center gap-2"
                    >
                        <span>{btnText}</span>
                        <svg className={`w-4 h-4 transition-transform ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </a>
                    <a 
                        href="https://wa.me/201000000000" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-[#112240]/80 border border-white/15 text-white font-bold text-sm md:text-base px-8 py-4 rounded-xl hover:bg-white/10 hover:border-[#C5A16F]/40 transition-all duration-300 backdrop-blur-md flex items-center gap-2"
                    >
                        <span>💬</span>
                        <span>{language === 'ar' ? 'تواصل عبر واتساب فوراً' : 'Chat on WhatsApp Now'}</span>
                    </a>
                </div>

                {/* Quick Trust Highlights */}
                <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs md:text-sm text-gray-300 font-medium">
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-[#C5A16F]">✔</span>
                        <span>{language === 'ar' ? 'تنفيذ عالي الدقة والسرعة' : 'High Precision & Speed'}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-[#C5A16F]">🛡️</span>
                        <span>{language === 'ar' ? 'ضمان جودة ودعم مستمر' : 'Quality Guarantee & Support'}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-[#C5A16F]">⚡</span>
                        <span>{language === 'ar' ? 'هندسة أكواد سيادية مخصصة' : 'Custom Sovereign Codebase'}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
