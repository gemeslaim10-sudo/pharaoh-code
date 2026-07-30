export default function SystemRoadmap() {
    return (
        <section id="roadmap" className="py-20 bg-[#09162a] border-t border-b border-white/5 relative">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">
                    <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">منهجية وسير العمل الهندسي للأنظمة</h3>
                    <p className="text-gray-400 text-sm md:text-base font-medium max-w-xl mx-auto">
                        خطواتنا المنظمة والاحترافية والدقيقة الصارمة لضمان تسليم نظامك البرمجي بأعلى جودة وخلوه التام من العيوب التشغيلية.
                    </p>
                </div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-10 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#C5A16F]/30 to-transparent z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">

                        <div className="flex flex-col items-center lg:items-start text-center lg:text-right group cursor-pointer">
                            <div className="w-20 h-20 bg-[#112240] border-2 border-white/5 group-hover:border-[#C5A16F] rounded-full flex items-center justify-center mb-6 shadow-xl relative transform transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
                                <span className="text-[#C5A16F] font-black text-2xl tracking-tight">01</span>
                            </div>
                            <h5 className="font-bold text-white text-lg mb-3 group-hover:text-[#C5A16F] transition-colors duration-300">هندسة المتطلبات والتحليل</h5>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                                نجتمع مع رؤساء الأقسام بمؤسستك لنرسم خريطة الدورة المستندية ونحدد موديولات النظام وقواعد البيانات المطلوبة بدقة.
                            </p>
                        </div>

                        <div className="flex flex-col items-center lg:items-start text-center lg:text-right group cursor-pointer">
                            <div className="w-20 h-20 bg-[#112240] border-2 border-white/5 group-hover:border-[#C5A16F] rounded-full flex items-center justify-center mb-6 shadow-xl relative transform transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
                                <span className="text-[#C5A16F] font-black text-2xl tracking-tight">02</span>
                            </div>
                            <h5 className="font-bold text-white text-lg mb-3 group-hover:text-[#C5A16F] transition-colors duration-300">هندسة واجهات الداشبورد (UI)</h5>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                                نصمم واجهات تحكم إدارية (Dashboards) تفاعلية ومريحة للموظفين لضمان سلاسة إدخال البيانات واستعراض التقارير.
                            </p>
                        </div>

                        <div className="flex flex-col items-center lg:items-start text-center lg:text-right group cursor-pointer">
                            <div className="w-20 h-20 bg-[#112240] border-2 border-white/5 group-hover:border-[#C5A16F] rounded-full flex items-center justify-center mb-6 shadow-xl relative transform transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
                                <span className="text-[#C5A16F] font-black text-2xl tracking-tight">03</span>
                            </div>
                            <h5 className="font-bold text-white text-lg mb-3 group-hover:text-[#C5A16F] transition-colors duration-300">التكويد وبناء الخوارزميات</h5>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                                يقوم مهندسو البرمجيات بكتابة الأكواد البرمجية الخلفية (Backend)، وبناء العلاقات البرمجية المحاسبية المعقدة بداخل النظام بأعلى معايير الحماية.
                            </p>
                        </div>

                        <div className="flex flex-col items-center lg:items-start text-center lg:text-right group cursor-pointer">
                            <div className="w-20 h-20 bg-[#112240] border-2 border-white/5 group-hover:border-[#C5A16F] rounded-full flex items-center justify-center mb-6 shadow-xl relative transform transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
                                <span className="text-[#C5A16F] font-black text-2xl tracking-tight">04</span>
                            </div>
                            <h5 className="font-bold text-white text-lg mb-3 group-hover:text-[#C5A16F] transition-colors duration-300">الفحص، التدريب، والتدشين</h5>
                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                                نختبر النظام ونقوم برفع البيانات واختبار العمليات الحسابية، ثم نقوم بتدريب موظفيك وتدشين النظام رسمياً على خوادمك السحابية الآمنة.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
