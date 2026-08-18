'use client';

import React, { useState } from 'react';
import { submitContactMessage } from '@/app/actions/frontend';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

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
    const { theme } = useTheme();
    const isLight = theme === 'light';
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
                <div className={`p-8 sm:p-12 rounded-2xl sm:rounded-3xl border shadow-2xl relative text-center py-16 flex flex-col justify-center ${
                    isLight 
                        ? 'bg-white border-slate-200/90 shadow-slate-200/50' 
                        : 'bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050C18] border-[#C5A16F]/30'
                }`}>
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className={`text-2xl font-black mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {language === 'ar' ? "تم استلام طلبك بنجاح!" : "Request Received Successfully!"}
                    </h3>
                    <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                        {language === 'ar' ? "شكراً لتواصلك معنا، سيقوم مهندسونا بالتواصل معك فوراً." : "Thank you for reaching out, our engineering team will contact you shortly."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full relative z-10" dir={direction}>
            {(defaultBadge || defaultTitle || defaultSubtitle) && (
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                    {defaultBadge && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-2.5 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping" />
                            <h2 className="text-[#C5A16F] font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
                                {defaultBadge}
                            </h2>
                        </div>
                    )}
                    {defaultTitle && (
                        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-black mb-2.5 leading-tight tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            {defaultTitle}
                        </h3>
                    )}
                    {defaultSubtitle && (
                        <p className={`text-xs sm:text-sm md:text-base leading-relaxed font-light ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                            {defaultSubtitle}
                        </p>
                    )}
                </div>
            )}

            <form 
                className={`w-full p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border shadow-xl relative transition-all duration-300 ${
                    isLight 
                        ? 'bg-white border-slate-200/90 shadow-slate-200/60' 
                        : 'bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050C18] border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.5)]'
                }`} 
                onSubmit={handleSubmit}
            >
                {/* Top ambient glow flare */}
                <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-80" />

                {/* Grid Row 1: 3 Columns on Large Screens (Name, Email, WhatsApp Phone) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-4 sm:mb-5">
                    <div className="relative group">
                        <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
                            {language === 'ar' ? "الاسم الكامل / المفوض *" : "Full Name *"}
                        </label>
                        <input 
                            type="text" 
                            name="name" 
                            required 
                            placeholder={language === 'ar' ? "مثال: أحمد محمد" : "e.g. Ahmed Mohamed"} 
                            className={`w-full rounded-xl px-4 py-3 sm:py-3.5 text-sm outline-none transition-all border ${
                                isLight 
                                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#C5A16F] focus:bg-white focus:ring-1 focus:ring-[#C5A16F]' 
                                    : 'bg-[#0A192F] border-white/10 text-white placeholder:text-gray-500 focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F]'
                            }`} 
                        />
                    </div>

                    <div className="relative group">
                        <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
                            {language === 'ar' ? "البريد الإلكتروني *" : "Email Address *"}
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            required 
                            placeholder="email@domain.com" 
                            className={`w-full rounded-xl px-4 py-3 sm:py-3.5 text-sm outline-none transition-all border ${
                                isLight 
                                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#C5A16F] focus:bg-white focus:ring-1 focus:ring-[#C5A16F]' 
                                    : 'bg-[#0A192F] border-white/10 text-white placeholder:text-gray-500 focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F]'
                            }`} 
                        />
                    </div>

                    <div className="relative group sm:col-span-2 lg:col-span-1">
                        <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
                            {language === 'ar' ? "رقم الواتساب *" : "WhatsApp Phone *"}
                        </label>
                        <input 
                            type="tel" 
                            name="phone" 
                            required 
                            placeholder="+2010xxxxxxxx" 
                            dir="ltr"
                            className={`w-full rounded-xl px-4 py-3 sm:py-3.5 text-sm outline-none transition-all border ${
                                isLight 
                                    ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#C5A16F] focus:bg-white focus:ring-1 focus:ring-[#C5A16F]' 
                                    : 'bg-[#0A192F] border-white/10 text-white placeholder:text-gray-500 focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F]'
                            }`} 
                        />
                    </div>
                </div>

                {/* Grid Row 2: 2 Columns (Goal, Budget) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                    <div className="relative group">
                        <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
                            {language === 'ar' ? "ما هو هدفك / نوع الخدمة؟ *" : "What is your goal / service? *"}
                        </label>
                        <div className="relative">
                            <select 
                                name="goal" 
                                required 
                                className={`w-full rounded-xl px-4 py-3 sm:py-3.5 text-sm outline-none transition-all border appearance-none cursor-pointer ${
                                    isLight 
                                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#C5A16F] focus:bg-white' 
                                        : 'bg-[#0A192F] border-white/10 text-white focus:border-[#C5A16F]'
                                }`}
                            >
                                <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="تطوير تطبيق جوال">{language === 'ar' ? "تطوير تطبيق جوال (iOS & Android)" : "Mobile App Development (iOS & Android)"}</option>
                                <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="بناء موقع ويب احترافي">{language === 'ar' ? "بناء موقع ويب احترافي / منصة إلكترونية" : "Web Development / Digital Platform"}</option>
                                <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="نظام لإدارة الشركات">{language === 'ar' ? "نظام لإدارة الشركات (ERP / CRM)" : "Enterprise System (ERP / CRM)"}</option>
                                <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="تصميم واجهات UI/UX">{language === 'ar' ? "تصميم واجهات UI/UX وهوية بصرية" : "UI/UX & Branding Design"}</option>
                                <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="أمن سيبراني واستضافة">{language === 'ar' ? "أمن سيبراني واستضافة سحابية" : "Cybersecurity & Cloud Hosting"}</option>
                                <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="استفسار عام">{language === 'ar' ? "استفسار عام / أخرى" : "General Inquiry / Other"}</option>
                            </select>
                            <div className="absolute top-1/2 end-4 -translate-y-1/2 pointer-events-none text-[#C5A16F]">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
                            {language === 'ar' ? "الميزانية التقديرية (EGP) *" : "Estimated Budget *"}</label>
                        <div className="relative">
                            <select 
                                name="budget" 
                                required 
                                className={`w-full rounded-xl px-4 py-3 sm:py-3.5 text-sm outline-none transition-all border appearance-none cursor-pointer ${
                                    isLight 
                                        ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#C5A16F] focus:bg-white' 
                                        : 'bg-[#0A192F] border-white/10 text-white focus:border-[#C5A16F]'
                                }`}
                            >
                                <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="من 20,000 إلى 50,000">{language === 'ar' ? "من 20,000 إلى 50,000 ج.م" : "20,000 - 50,000 EGP"}</option>
                                <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="من 50,000 إلى 100,000">{language === 'ar' ? "من 50,000 إلى 100,000 ج.م" : "50,000 - 100,000 EGP"}</option>
                                <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="من 100,000 إلى 250,000">{language === 'ar' ? "من 100,000 إلى 250,000 ج.م" : "100,000 - 250,000 EGP"}</option>
                                <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="أكثر من 250,000">{language === 'ar' ? "أكثر من 250,000 ج.م (مشاريع كبرى)" : "+250,000 EGP (Enterprise Projects)"}</option>
                            </select>
                            <div className="absolute top-1/2 end-4 -translate-y-1/2 pointer-events-none text-[#C5A16F]">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Details Textarea */}
                <div className="mb-6">
                    <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
                        {language === 'ar' ? "احكِ لنا عن طموحك أو تفاصيل مشروعك *" : "Tell us about your project details *"}
                    </label>
                    <textarea 
                        name="details" 
                        rows={3} 
                        required 
                        placeholder={language === 'ar' ? "يرجى كتابة لمحة عن فكرتك وأهم المتطلبات..." : "Write a brief summary of your project idea and requirements..."} 
                        className={`w-full rounded-xl px-4 py-3 sm:py-3.5 text-sm outline-none transition-all border resize-none ${
                            isLight 
                                ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#C5A16F] focus:bg-white focus:ring-1 focus:ring-[#C5A16F]' 
                                : 'bg-[#0A192F] border-white/10 text-white placeholder:text-gray-500 focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F]'
                        }`}
                    />
                </div>

                {/* Action Submit Button */}
                <div className="relative group">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#C5A16F]/30 via-[#DFB77D]/50 to-[#C5A16F]/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <motion.button 
                        type="submit" 
                        disabled={loading} 
                        whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className={`w-full relative overflow-hidden py-3.5 sm:py-4 px-6 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-300 shadow-xl cursor-pointer ${
                            loading 
                                ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-[#C5A16F] via-[#DFB77D] to-[#C5A16F] hover:from-[#DFB77D] hover:to-[#C5A16F] text-[#070F1E] shadow-[#C5A16F]/25 hover:shadow-[#C5A16F]/40'
                        }`}
                    >
                        {/* Shimmer light sweep */}
                        {!loading && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                        )}

                        <span className="relative z-10">{loading ? (language === 'ar' ? 'جاري إرسال الطلب...' : 'Submitting Request...') : defaultBtnText}</span>
                        {!loading && (
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        )}
                    </motion.button>
                </div>
            </form>
        </div>
    );
}
