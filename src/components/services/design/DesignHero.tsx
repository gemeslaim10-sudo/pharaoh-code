'use client';

import { useTranslation } from '@/contexts/LanguageContext';

export default function DesignHero() {
    const { language, direction } = useTranslation();

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
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C5A16F]/10 blur-[140px] rounded-full"></div>
                <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-0 -right-32 w-96 h-96 bg-[#C5A16F]/10 blur-[150px] rounded-full"></div>

                <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="design-hero-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C5A16F" strokeWidth="0.8" />
                            <circle cx="30" cy="30" r="1.5" fill="#C5A16F" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#design-hero-pattern)" />
                </svg>
            </div>

            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#112240]/80 border border-[#C5A16F]/30 backdrop-blur-md mb-6 shadow-lg shadow-black/20">
                    <span className="w-2 h-2 rounded-full bg-[#C5A16F] animate-pulse"></span>
                    <span className="text-[#C5A16F] text-xs md:text-sm font-bold tracking-wider">
                        {language === 'ar' ? 'تصميم الهويات والعلامات التجارية' : 'Visual Identity & Branding'}
                    </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
                    {language === 'ar' ? 'هندسة وتصميم الهويات البصرية' : 'Engineering Visual Identities'} <br />
                    <span className="text-[#C5A16F] drop-shadow-[0_2px_15px_rgba(197,161,111,0.25)]">
                        {language === 'ar' ? 'بنيانك الإستراتيجي وصورتك السيادية' : 'Your Strategic Landmark & Sovereign Image'}
                    </span>
                </h1>

                <div className="inline-block bg-[#112240]/70 backdrop-blur-md text-gray-200 text-sm md:text-base font-medium px-6 py-4 mb-8 border border-white/10 rounded-2xl max-w-3xl leading-relaxed shadow-xl">
                    {language === 'ar' 
                        ? 'ملخص الخدمة: نبتكر ونصمم هويات بصرية وعلامات تجارية متكاملة وواجهات رقمية فائقة الفخامة تمنح مشروعك حضوراً سيادياً يعزز الولاء والثقة في الأسواق بأعلى معايير الابتكار البصري.'
                        : 'Service Summary: We innovate and design comprehensive brand identities and ultra-luxurious digital interfaces that grant your enterprise sovereign market presence.'}
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    <a href="#project-form" className="bg-[#C5A16F] text-[#0A192F] font-extrabold text-sm md:text-base px-8 py-4 rounded-xl hover:bg-white transition-all duration-300 shadow-xl shadow-[#C5A16F]/20 hover:-translate-y-0.5 flex items-center gap-2">
                        <span>{language === 'ar' ? 'ابدأ تصميم هويتك الفاخرة' : 'Start Designing Your Brand'}</span>
                    </a>
                    <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer" className="bg-[#112240]/80 border border-white/15 text-white font-bold text-sm md:text-base px-8 py-4 rounded-xl hover:bg-white/10 hover:border-[#C5A16F]/40 transition-all duration-300 backdrop-blur-md flex items-center gap-2">
                        <span>💬</span>
                        <span>{language === 'ar' ? 'تواصل عبر واتساب فوراً' : 'Chat on WhatsApp Now'}</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
