'use client';

import { useTranslation } from '@/contexts/LanguageContext';

export default function WebDevHero() {
    const { language } = useTranslation();

    return (
        <section
            className="relative overflow-hidden bg-gradient-to-b from-pharaohNavy to-[#081426]"
            style={{'paddingTop': '90px', 'paddingBottom': '25px'}}>
            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">

                <h1
                    className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tighter">
                    {language === 'ar' ? 'بناء التواجد الرقمي الرسمي' : 'Building Official Digital Presence'} <br />
                    <span className="text-[#C5A16F]">{language === 'ar' ? 'موقع الويب هو صرح مؤسستك' : 'Your Website is Your Enterprise Landmark'}</span>
                </h1>
                <span
                    className="inline-block bg-[#C5A16F]/10 text-[#C5A16F] text-gray-400 text-sm font-bold px-4 py-2  mb-6 border border-[#C5A16F]/20"  style={{'borderRadius': '10px'}}>
                    {language === 'ar' 
                        ? 'ملخص الخدمة: نبتكر ونصمم مواقع ويب فاخرة واستراتيجية للشركات تحول حضورك الرقمي إلى واجهة رسمية تبني الموثوقية المطلقة وتجلب العملاء المستهدفين، مع هندسة أكواد مخصصة تتصدر محركات البحث العالمية بالكامل.'
                        : 'Service Summary: We engineer high-end strategic corporate web applications that elevate your digital authority, drive high-intent leads, and top search engine rankings.'}
                </span>

                <div className="flex flex-wrap justify-center gap-4">
                    <a href="#project-form"
                        className="bg-[#C5A16F] text-[#0A192F] font-bold text-sm px-8 py-4 rounded-xl hover:bg-white transition-all shadow-xl shadow-[#C5A16F]/10">
                        {language === 'ar' ? 'ابدأ مشروعك الاستراتيجي' : 'Start Strategic Project'}
                    </a>
                    <a href="https://wa.me/your_number" target="_blank"
                        className="bg-white/5 border border-white/10 text-white font-bold text-sm px-8 py-4 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                        💬 {language === 'ar' ? 'تواصل عبر واتساب فوراً' : 'Chat on WhatsApp Now'}
                    </a>
                </div>
            </div>
        </section>
    );
}
