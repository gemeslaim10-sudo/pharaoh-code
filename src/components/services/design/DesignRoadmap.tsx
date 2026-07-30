export default function DesignRoadmap() {
    return (
        <section id="roadmap" className="py-20 bg-[#09162a] border-t border-b border-white/5 relative">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">
                    <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">منهجية وسير العمل الفني للتصاميم</h3>
                    <p className="text-gray-400 text-sm md:text-base font-medium max-w-xl mx-auto">
                        خطواتنا الصارمة والمنظمة والاحترافية منذ لحظة عصف الأفكار والتحليل الإستراتيجي وحتى تسليم ملفات هويتك المعتمدة الفاخرة.
                    </p>
                </div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-10 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#C5A16F]/30 to-transparent z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">

                        <div className="flex flex-col items-center lg:items-start text-center lg:text-right group cursor-pointer">
                            <div className="w-20 h-20 bg-[#112240] border-2 border-white/5 group-hover:border-[#C5A16F] rounded-full flex items-center justify-center mb-6 shadow-xl relative transform transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
                                <span className="text-[#C5A16F] font-black text-2xl tracking-tight">01</span>
                            </div>
                            <h5 className="font-bold text-white text-lg mb-3 group-hover:text-[#C5A16F] transition-colors duration-300">البحث وتحليل الاستراتيجية</h5>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                                ندرس الفلسفة والنشاط التجاري لشركتك، ونحلل بدقة سلوك وهوية الكيانات المنافسة لاستخلاص نقاط التميز البصري الفريدة.
                            </p>
                        </div>

                        <div className="flex flex-col items-center lg:items-start text-center lg:text-right group cursor-pointer">
                            <div className="w-20 h-20 bg-[#112240] border-2 border-white/5 group-hover:border-[#C5A16F] rounded-full flex items-center justify-center mb-6 shadow-xl relative transform transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
                                <span className="text-[#C5A16F] font-black text-2xl tracking-tight">02</span>
                            </div>
                            <h5 className="font-bold text-white text-lg mb-3 group-hover:text-[#C5A16F] transition-colors duration-300">رسم المخططات والمفاهيم الأولية</h5>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                                نقوم بالعصف الذهني ورسم الأفكار والشعارات يدوياً (Sketching) لابتكار رمزيات ودلالات مبتكرة تعكس المعنى العميق لمؤسستك.
                            </p>
                        </div>

                        <div className="flex flex-col items-center lg:items-start text-center lg:text-right group cursor-pointer">
                            <div className="w-20 h-20 bg-[#112240] border-2 border-white/5 group-hover:border-[#C5A16F] rounded-full flex items-center justify-center mb-6 shadow-xl relative transform transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
                                <span className="text-[#C5A16F] font-black text-2xl tracking-tight">03</span>
                            </div>
                            <h5 className="font-bold text-white text-lg mb-3 group-hover:text-[#C5A16F] transition-colors duration-300">التصميم الهندسي والمطبوعات</h5>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                                نحول المخططات إلى تصاميم برمجية وهندسية دقيقة عبر البرامج الاحترافية، ونبني باقة المطبوعات والمظهر البصري المتناسق بالكامل.
                            </p>
                        </div>

                        <div className="flex flex-col items-center lg:items-start text-center lg:text-right group cursor-pointer">
                            <div className="w-20 h-20 bg-[#112240] border-2 border-white/5 group-hover:border-[#C5A16F] rounded-full flex items-center justify-center mb-6 shadow-xl relative transform transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
                                <span className="text-[#C5A16F] font-black text-2xl tracking-tight">04</span>
                            </div>
                            <h5 className="font-bold text-white text-lg mb-3 group-hover:text-[#C5A16F] transition-colors duration-300">بناء الدليل والتسليم النهائي</h5>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                                ننسق كتاب دليل العلامة (Brand Book) الشامل بالقواعد والمقاييس، ثم نسلمك الملفات المصدرية المفتوحة والجاهزة فوراً للطباعة والنشر المباشر.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
