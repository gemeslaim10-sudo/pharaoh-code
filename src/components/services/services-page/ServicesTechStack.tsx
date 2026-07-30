'use client';

export default function ServicesTechStack() {
  return (
    <section className="py-24 bg-[#0A192F] relative border-t border-white/5" dir="rtl">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
                <div className="lg:w-1/3 space-y-6">
                    <h2 className="text-[#C5A16F] font-bold tracking-widest text-xs uppercase">Engineered for Performance</h2>
                    <h3 className="text-4xl font-black text-white leading-tight">لماذا نختار <br /> تقنياتنا <span className="text-[#C5A16F]">بعناية؟</span></h3>
                    <p className="text-gray-400 leading-relaxed">
                        نحن لا نتبع &quot;التريندات&quot; العابرة. في **Pharaoh Code**، نختار التقنيات التي تضمن لعملائنا ثلاثة أركان أساسية: **الاستقرار تحت الضغط العالي، الأمان المطلق، وقابلية التوسع اللانهائي.**
                    </p>
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center gap-3 text-sm text-white/70">
                            <svg className="w-5 h-5 text-[#C5A16F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            الاعتماد على Clean Architecture
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/70">
                            <svg className="w-5 h-5 text-[#C5A16F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            تشفير البيانات بمعايير AES-256
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
                        <h4 className="text-white font-bold text-lg mb-2">الأنظمة الخلفية</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">Node.js, Python (Django), Go لضمان سرعة معالجة البيانات.</p>
                    </div>

                    <div className="p-8 bg-[#112240]/30 border border-white/5 rounded-2xl hover:bg-[#112240]/50 transition-all">
                        <div className="text-[#C5A16F] mb-4">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">تطبيقات الجوال</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">Flutter & React Native لتوفير أفضل تجربة Native للمستخدم.</p>
                    </div>

                    <div className="p-8 bg-[#112240]/30 border border-white/5 rounded-2xl hover:bg-[#112240]/50 transition-all">
                        <div className="text-[#C5A16F] mb-4">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                            </svg>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">قواعد البيانات</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">PostgreSQL & MongoDB لضمان سلامة وسرعة استدعاء المعلومات.</p>
                    </div>

                    <div className="p-8 bg-[#112240]/30 border border-white/5 rounded-2xl hover:bg-[#112240]/50 transition-all">
                        <div className="text-[#C5A16F] mb-4">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">السحابية (Cloud)</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">AWS & DigitalOcean لاستضافة تضمن استمرارية العمل بنسبة 99.9%.</p>
                    </div>

                    <div className="p-8 bg-[#112240]/30 border border-white/5 rounded-2xl hover:bg-[#112240]/50 transition-all">
                        <div className="text-[#C5A16F] mb-4">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">واجهات المستخدم</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">React.js & Next.js لبناء واجهات سريعة وصديقة لمحركات البحث.</p>
                    </div>

                    <div className="p-8 bg-[#112240]/30 border border-white/5 rounded-2xl hover:bg-[#112240]/50 transition-all">
                        <div className="text-[#C5A16F] mb-4">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h4 className="text-white font-bold text-lg mb-2">الأمن السيبراني</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">حماية من هجمات DDoS واختبارات اختراق دورية لكل مشروع.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
