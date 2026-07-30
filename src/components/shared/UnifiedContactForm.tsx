'use client';

import React, { useState } from 'react';
import { submitContactMessage } from '@/app/actions/frontend';
import { useTranslation } from '@/contexts/LanguageContext';

interface UnifiedContactFormProps {
    badgeText?: string;
    title?: string;
    subtitle?: string;
    buttonText?: string;
}

export default function UnifiedContactForm({
    badgeText,
    title,
    subtitle,
    buttonText
}: UnifiedContactFormProps) {
    const { language, direction } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const defaultBadge = badgeText !== undefined ? badgeText : (language === 'ar' ? "🚀 تواصل مباشر مع الخبراء" : "🚀 Direct Contact with Experts");
    const defaultTitle = title !== undefined ? title : (language === 'ar' ? "ابدأ مشروعك الفاخر معنا الآن" : "Start Your Project With Us Now");
    const defaultSubtitle = subtitle !== undefined ? subtitle : (language === 'ar' ? "احصل فوراً على الاستشارة المجانية الشاملة + مستند الهيكل الفني للمشروع." : "Get a free technical consultation and project architectural document.");
    const defaultBtnText = buttonText || (language === 'ar' ? "إطلاق الطلب الآن" : "Submit Request Now");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const result = await submitContactMessage(formData);

        if (result.success) {
            setSuccess(true);
            (e.target as HTMLFormElement).reset();
        } else {
            window.alert(result.error || (language === 'ar' ? 'حدث خطأ أثناء إرسال الرسالة.' : 'An error occurred while sending message.'));
        }
        
        setLoading(false);
    };

    if (success) {
        return (
            <div className="w-full relative z-10" dir={direction}>
                <div className="bg-[#112240] p-10 rounded-[3.5rem] border border-[#C5A16F]/20 shadow-2xl relative text-center py-20 h-full flex flex-col justify-center">
                    <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">{language === 'ar' ? "تم استلام رسالتك!" : "Message Received!"}</h3>
                    <p className="text-gray-400">{language === 'ar' ? "شكراً لتواصلك معنا، سنقوم بالرد عليك في أقرب وقت." : "Thank you for reaching out, we will respond shortly."}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full relative z-10" dir={direction}>
            {(defaultBadge || defaultTitle || defaultSubtitle) && (
                <div className="text-center mb-12">
                    {defaultBadge && <h2 className="text-[#C5A16F] font-bold tracking-[0.3em] uppercase text-xs mb-4">{defaultBadge}</h2>}
                    {defaultTitle && <h3 className="text-3xl md:text-5xl font-black text-white mb-4">{defaultTitle}</h3>}
                    {defaultSubtitle && <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">{defaultSubtitle}</p>}
                </div>
            )}

            <form className="bg-[#112240] p-10 rounded-[3.5rem] border border-white/5 shadow-2xl relative" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="relative group">
                        <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 block">{language === 'ar' ? "الاسم الكامل / المفوض *" : "Full Name *"}</label>
                        <input type="text" name="name" required placeholder={language === 'ar' ? "مثال: أحمد محمد" : "e.g. Ahmed Mohamed"} className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all placeholder:text-gray-600" />
                    </div>
                    <div className="relative group">
                        <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 block">{language === 'ar' ? "البريد الإلكتروني *" : "Email Address *"}</label>
                        <input type="email" name="email" required placeholder="email@domain.com" className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all placeholder:text-gray-600" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="relative group">
                        <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 block">{language === 'ar' ? "رقم الواتساب *" : "WhatsApp Phone *"}</label>
                        <input type="tel" name="phone" required placeholder="+2010xxxxxxxx" className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all placeholder:text-gray-600" dir="ltr" />
                    </div>
                    <div className="relative group">
                        <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 block">{language === 'ar' ? "ما هو هدفك؟ *" : "What is your goal? *"}</label>
                        <select name="goal" required className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#C5A16F] outline-none transition-all appearance-none cursor-pointer">
                            <option value="تطوير تطبيق جوال">{language === 'ar' ? "تطوير تطبيق جوال" : "Mobile App Development"}</option>
                            <option value="بناء موقع ويب احترافي">{language === 'ar' ? "بناء موقع ويب احترافي / متجر" : "Web Development / E-Commerce"}</option>
                            <option value="نظام لإدارة الشركات">{language === 'ar' ? "نظام لإدارة الشركات (ERP / CRM)" : "Enterprise System (ERP / CRM)"}</option>
                            <option value="تصميم واجهات UI/UX">{language === 'ar' ? "تصميم واجهات UI/UX وهوية" : "UI/UX & Branding Design"}</option>
                            <option value="أمن سيبراني واستضافة">{language === 'ar' ? "أمن سيبراني واستضافة سحابية" : "Cybersecurity & Cloud Hosting"}</option>
                            <option value="استفسار عام">{language === 'ar' ? "استفسار عام / أخرى" : "General Inquiry / Other"}</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="relative group md:col-span-2">
                        <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 block">{language === 'ar' ? "الميزانية التقديرية (EGP) *" : "Estimated Budget *"}</label>
                        <select name="budget" required className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#C5A16F] outline-none transition-all appearance-none cursor-pointer">
                            <option value="من 20,000 إلى 50,000">{language === 'ar' ? "من 20,000 إلى 50,000 ج.م" : "20,000 - 50,000 EGP"}</option>
                            <option value="من 50,000 إلى 100,000">{language === 'ar' ? "من 50,000 إلى 100,000 ج.م" : "50,000 - 100,000 EGP"}</option>
                            <option value="من 100,000 إلى 250,000">{language === 'ar' ? "من 100,000 إلى 250,000 ج.م" : "100,000 - 250,000 EGP"}</option>
                            <option value="أكثر من 250,000">{language === 'ar' ? "أكثر من 250,000 ج.م (مشاريع ضخمة)" : "+250,000 EGP (Enterprise Projects)"}</option>
                        </select>
                    </div>
                </div>

                <div className="mb-10">
                    <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 block">{language === 'ar' ? "احكِ لنا عن طموحك أو تفاصيل مشروعك *" : "Tell us about your project details *"}</label>
                    <textarea name="details" rows={4} required placeholder={language === 'ar' ? "يرجى كتابة لمحة عن فكرتك..." : "Write a brief about your project..."} className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all placeholder:text-gray-600 resize-none"></textarea>
                </div>

                <button type="submit" disabled={loading} className={`w-full group ${loading ? 'bg-gray-500' : 'bg-[#C5A16F] hover:bg-white'} text-[#0A192F] font-black text-xl py-6 rounded-2xl flex items-center justify-center gap-4 transition-all transform active:scale-95 shadow-2xl`}>
                    <span>{loading ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') : defaultBtnText}</span>
                </button>
            </form>
        </div>
    );
}
