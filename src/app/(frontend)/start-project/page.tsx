'use client';

import { useState } from 'react';
import { submitProjectRequest } from '@/app/actions/frontend';

export default function StartProjectPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await submitProjectRequest(formData);

    if (result.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      window.alert(result.error || 'حدث خطأ أثناء إرسال الطلب.');
    }
    
    setLoading(false);
  };

  return (
    <>
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-[#0A192F] to-[#0D1B2A]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                <div className="lg:col-span-4 space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-pharaohGold font-bold tracking-[0.3em] uppercase text-xs">Contact Information</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">تواصل مع <br /><span className="text-pharaohGold">صرح فرعون</span></h3>
                        <p className="text-gray-400 text-lg">نحن هنا لنبني لك مستقبلك الرقمي. اترك تفاصيل مشروعك وسنتواصل معك فوراً.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-5 p-6 bg-deepBlue/40 border border-white/5 rounded-3xl group hover:border-pharaohGold/30 transition-all">
                            <div className="w-12 h-12 bg-pharaohGold/10 rounded-2xl flex items-center justify-center text-pharaohGold">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            </div>
                            <div>
                                <h4 className="text-white font-bold">اتصل بنا</h4>
                                <p className="text-gray-400 text-sm" dir="ltr">+20 123 456 7890</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 p-6 bg-deepBlue/40 border border-white/5 rounded-3xl group hover:border-pharaohGold/30 transition-all text-right">
                            <div className="w-12 h-12 bg-pharaohGold/10 rounded-2xl flex items-center justify-center text-pharaohGold">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                            </div>
                            <div>
                                <h4 className="text-white font-bold">مقر الشركة</h4>
                                <p className="text-gray-400 text-sm">القاهرة، التجمع الخامس</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 bg-deepBlue p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl relative">
                    <div className="absolute top-0 right-10 w-20 h-1 bg-pharaohGold"></div>
                    
                    {success ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">تم إرسال طلبك بنجاح!</h3>
                            <p className="text-gray-400">سنتواصل معك في أقرب وقت لمناقشة التفاصيل.</p>
                        </div>
                    ) : (
                        <form id="contactForm" className="space-y-8 text-right" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-gray-400 text-xs font-bold mr-2 uppercase tracking-widest">اسمك الكريم</label>
                                    <input type="text" name="name" placeholder="مثال: أحمد فرعون" required className="w-full bg-pharaohNavy border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pharaohGold outline-none transition-all input-glow placeholder:text-gray-700" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-400 text-xs font-bold mr-2 uppercase tracking-widest">رقم الواتساب</label>
                                    <input type="tel" name="phone" placeholder="01xxxxxxxxx" required className="w-full bg-pharaohNavy border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pharaohGold outline-none transition-all input-glow text-left placeholder:text-gray-700" dir="ltr" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-400 text-xs font-bold mr-2 uppercase tracking-widest">نوع الخدمة المطلوبة</label>
                                <select name="service" className="w-full bg-pharaohNavy border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pharaohGold outline-none transition-all appearance-none cursor-pointer">
                                    <option value="تطبيق موبايل">تطبيق موبايل (iOS / Android)</option>
                                    <option value="موقع إلكتروني">موقع إلكتروني احترافي</option>
                                    <option value="نظام ERP">نظام إداري ERP</option>
                                    <option value="تصميم UI/UX">تصميم هوية بصرية UI/UX</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-400 text-xs font-bold mr-2 uppercase tracking-widest">تفاصيل فكرتك</label>
                                <textarea name="details" rows={5} placeholder="اشرح لنا ملامح مشروعك..." className="w-full bg-pharaohNavy border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-pharaohGold outline-none transition-all resize-none input-glow placeholder:text-gray-700"></textarea>
                            </div>
                            <button type="submit" disabled={loading} className={`w-full ${loading ? 'bg-gray-500' : 'bg-pharaohGold hover:bg-white'} text-pharaohNavy font-black text-xl py-5 rounded-2xl flex items-center justify-center gap-4 transition-all transform active:scale-95 shadow-xl shadow-pharaohGold/10`}>
                                <span>{loading ? 'جاري الإرسال...' : 'إرسال البيانات للصرح'}</span>
                                {!loading && (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    </>
  );
}
