'use client';

import React, { useState } from 'react';
import { submitContactMessage } from '@/app/actions/frontend';

interface UnifiedContactFormProps {
    badgeText?: string;
    title?: string;
    subtitle?: string;
    buttonText?: string;
}

export default function UnifiedContactForm({
    badgeText = "🚀 تواصل مباشر مع الخبراء",
    title = "ابدأ مشروعك الفاخر معنا الآن",
    subtitle = "احصل فوراً وبشكل تلقائي بمجرد ملء الاستمارة على الاستشارة المجانية الشاملة + مستند الهيكل الفني للمشروع.",
    buttonText = "إطلاق الطلب الآن"
}: UnifiedContactFormProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

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
            window.alert(result.error || 'حدث خطأ أثناء إرسال الرسالة.');
        }
        
        setLoading(false);
    };

    if (success) {
        return (
            <div className="w-full relative z-10">
                <div className="bg-[#112240] p-10 rounded-[3.5rem] border border-[#C5A16F]/20 shadow-2xl relative text-center py-20 h-full flex flex-col justify-center">
                    <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">تم استلام رسالتك!</h3>
                    <p className="text-gray-400">شكراً لتواصلك معنا، سنقوم بالرد عليك في أقرب وقت.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full relative z-10">
            {(badgeText || title || subtitle) && (
                <div className="text-center mb-12">
                    {badgeText && <h2 className="text-[#C5A16F] font-bold tracking-[0.3em] uppercase text-xs mb-4">{badgeText}</h2>}
                    {title && <h3 className="text-3xl md:text-5xl font-black text-white mb-4">{title}</h3>}
                    {subtitle && <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">{subtitle}</p>}
                </div>
            )}

            <form className="bg-[#112240] p-10 rounded-[3.5rem] border border-white/5 shadow-2xl relative text-right" onSubmit={handleSubmit} dir="rtl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="relative group">
                        <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mr-4 mb-2 block">الاسم الكريم / المفوض *</label>
                        <input type="text" name="name" required placeholder="مثال: أحمد محمد" className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all placeholder:text-gray-600" />
                    </div>
                    <div className="relative group">
                        <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mr-4 mb-2 block">البريد الإلكتروني *</label>
                        <input type="email" name="email" required placeholder="email@domain.com" className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all placeholder:text-gray-600" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="relative group">
                        <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mr-4 mb-2 block">رقم الواتساب *</label>
                        <input type="tel" name="phone" required placeholder="+2010xxxxxxxx" className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all placeholder:text-gray-600" />
                    </div>
                    <div className="relative group">
                        <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mr-4 mb-2 block">ما هو هدفك؟ *</label>
                        <select name="goal" required className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#C5A16F] outline-none transition-all appearance-none cursor-pointer">
                            <option value="تطوير تطبيق جوال">تطوير تطبيق جوال</option>
                            <option value="بناء موقع ويب احترافي">بناء موقع ويب احترافي / متجر</option>
                            <option value="نظام لإدارة الشركات">نظام لإدارة الشركات (ERP / CRM)</option>
                            <option value="تصميم واجهات UI/UX">تصميم واجهات UI/UX وهوية</option>
                            <option value="أمن سيبراني واستضافة">أمن سيبراني واستضافة سحابية</option>
                            <option value="استفسار عام">استفسار عام / أخرى</option>
                        </select>
                        <div className="absolute bottom-5 left-6 text-[#C5A16F] pointer-events-none">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="relative group md:col-span-2">
                        <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mr-4 mb-2 block">الميزانية التقديرية (جنيه مصري) *</label>
                        <select name="budget" required className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#C5A16F] outline-none transition-all appearance-none cursor-pointer">
                            <option value="من 20,000 إلى 50,000">من 20,000 إلى 50,000 ج.م</option>
                            <option value="من 50,000 إلى 100,000">من 50,000 إلى 100,000 ج.م</option>
                            <option value="من 100,000 إلى 250,000">من 100,000 إلى 250,000 ج.م</option>
                            <option value="أكثر من 250,000">أكثر من 250,000 ج.م (مشاريع ضخمة)</option>
                        </select>
                        <div className="absolute bottom-5 left-6 text-[#C5A16F] pointer-events-none">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mr-4 mb-4 block">كيف عرفت بصرحنا؟</label>
                    <div className="flex flex-wrap gap-4">
                        <label className="flex-1 min-w-[120px] cursor-pointer group">
                            <input type="radio" name="source" value="فيسبوك" className="hidden peer" defaultChecked />
                            <div className="bg-[#0A192F] border border-white/10 py-3 rounded-xl text-center text-sm text-gray-500 peer-checked:bg-[#C5A16F]/10 peer-checked:border-[#C5A16F] peer-checked:text-[#C5A16F] transition-all group-hover:border-white/20">فيسبوك</div>
                        </label>
                        <label className="flex-1 min-w-[120px] cursor-pointer group">
                            <input type="radio" name="source" value="لينكد إن" className="hidden peer" />
                            <div className="bg-[#0A192F] border border-white/10 py-3 rounded-xl text-center text-sm text-gray-500 peer-checked:bg-[#C5A16F]/10 peer-checked:border-[#C5A16F] peer-checked:text-[#C5A16F] transition-all group-hover:border-white/20">لينكد إن</div>
                        </label>
                        <label className="flex-1 min-w-[120px] cursor-pointer group">
                            <input type="radio" name="source" value="توصية" className="hidden peer" />
                            <div className="bg-[#0A192F] border border-white/10 py-3 rounded-xl text-center text-sm text-gray-500 peer-checked:bg-[#C5A16F]/10 peer-checked:border-[#C5A16F] peer-checked:text-[#C5A16F] transition-all group-hover:border-white/20">توصية / أخرى</div>
                        </label>
                    </div>
                </div>

                <div className="mb-10">
                    <label className="text-gray-400 text-xs font-bold uppercase tracking-widest mr-4 mb-2 block">احكِ لنا عن طموحك أو تفاصيل مشروعك *</label>
                    <textarea name="details" rows={4} required placeholder="يرجى كتابة لمحة عن فكرتك أو تفاصيل استفسارك..." className="w-full bg-[#0A192F] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all placeholder:text-gray-600 resize-none"></textarea>
                </div>

                <button type="submit" disabled={loading} className={`w-full group ${loading ? 'bg-gray-500' : 'bg-[#C5A16F] hover:bg-white'} text-[#0A192F] font-black text-xl py-6 rounded-2xl flex items-center justify-center gap-4 transition-all transform active:scale-95 shadow-2xl`}>
                    <span>{loading ? 'جاري الإرسال...' : buttonText}</span>
                    {!loading && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-[-10px] transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    )}
                </button>
            </form>
        </div>
    );
}
