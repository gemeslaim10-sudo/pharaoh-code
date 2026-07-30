'use client';

import UnifiedContactForm from '@/components/shared/UnifiedContactForm';

export default function StartProjectContent() {
    return (
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

                <div className="lg:col-span-8">
                    <UnifiedContactForm 
                        badgeText=""
                        title=""
                        subtitle=""
                        buttonText="إرسال البيانات للصرح"
                    />
                </div>
            </div>
        </section>
    );
}
