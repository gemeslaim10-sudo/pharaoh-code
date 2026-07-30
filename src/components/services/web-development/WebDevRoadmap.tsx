export default function WebDevRoadmap() {
    return (
        <section id="roadmap"
            className="py-20 bg-[#09162a] border-t border-b border-white/5 relative">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">
                    <h3
                        className="text-3xl font-black text-white mb-4 tracking-tighter">منهجية
                        وسير العمل البرمجي لدينا</h3>
                    <p
                        className="text-gray-400 text-sm md:text-base font-medium max-w-xl mx-auto">
                        خطواتنا الصارمة والمنظمة والاحترافية منذ لحظة اعتماد
                        التعاقد وحتى انطلاق موقع شركتك الحي واستلامه بنجاح.
                    </p>
                </div>

                <div className="relative">

                    <div
                        className="hidden lg:block absolute top-10 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#C5A16F]/30 to-transparent z-0"></div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">

                        <div
                            className="flex flex-col items-center lg:items-start text-center lg:text-right group cursor-pointer">
                            <div
                                className="w-20 h-20 bg-[#112240] border-2 border-white/5 group-hover:border-[#C5A16F] rounded-full flex items-center justify-center mb-6 shadow-xl relative transform transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
                                <span
                                    className="text-[#C5A16F] font-black text-2xl tracking-tight">01</span>
                            </div>
                            <h5
                                className="font-bold text-white text-lg mb-3 group-hover:text-[#C5A16F] transition-colors duration-300">الاستشارة
                                والتحليل والتدقيق</h5>
                            <p
                                className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                                ندرس الهوية المؤسسية الحالية لشركتك، ونقوم
                                بتحليل طبيعة وسلوك عملائك والمنافسين المباشرين
                                لإنشاء بنية معلومات صحيحة وسليمة للموقع.
                            </p>
                        </div>

                        <div
                            className="flex flex-col items-center lg:items-start text-center lg:text-right group cursor-pointer">
                            <div
                                className="w-20 h-20 bg-[#112240] border-2 border-white/5 group-hover:border-[#C5A16F] rounded-full flex items-center justify-center mb-6 shadow-xl relative transform transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
                                <span
                                    className="text-[#C5A16F] font-black text-2xl tracking-tight">02</span>
                            </div>
                            <h5
                                className="font-bold text-white text-lg mb-3 group-hover:text-[#C5A16F] transition-colors duration-300">هندسة
                                واجهات الـ UI/UX</h5>
                            <p
                                className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                                نبتكر نماذج ورسوم بصرية حصرية لشكل الموقع، طريقة
                                عرض الخدمات، وتناسق الألوان بما يطابق هويتك
                                البصرية وتتم مراجعتها وتعديلها معك حتى الاعتماد.
                            </p>
                        </div>

                        <div
                            className="flex flex-col items-center lg:items-start text-center lg:text-right group cursor-pointer">
                            <div
                                className="w-20 h-20 bg-[#112240] border-2 border-white/5 group-hover:border-[#C5A16F] rounded-full flex items-center justify-center mb-6 shadow-xl relative transform transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
                                <span
                                    className="text-[#C5A16F] font-black text-2xl tracking-tight">03</span>
                            </div>
                            <h5
                                className="font-bold text-white text-lg mb-3 group-hover:text-[#C5A16F] transition-colors duration-300">البرمجة
                                والتكويد النظيف</h5>
                            <p
                                className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                                تحويل الرسوم والتصاميم المعتمدة إلى أكواد برمجية
                                حقيقية خفيفة وفائقة السرعة، مع دمج أنظمة لوحة
                                التحكم (CMS) وضبط قواعد السيو والأمان الكامل.
                            </p>
                        </div>

                        <div
                            className="flex flex-col items-center lg:items-start text-center lg:text-right group cursor-pointer">
                            <div
                                className="w-20 h-20 bg-[#112240] border-2 border-white/5 group-hover:border-[#C5A16F] rounded-full flex items-center justify-center mb-6 shadow-xl relative transform transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
                                <span
                                    className="text-[#C5A16F] font-black text-2xl tracking-tight">04</span>
                            </div>
                            <h5
                                className="font-bold text-white text-lg mb-3 group-hover:text-[#C5A16F] transition-colors duration-300">الفحص
                                النهائي والإطلاق الحي</h5>
                            <p
                                className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm">
                                تتم مراجعة واختبار سرعة واستقرار الموقع بالكامل
                                تحت ضغط الزوار الوهمي، والتأكد من خلوه تماماً من
                                الثغرات البرمجية قبل رفعه رسمياً على السيرفر
                                السحابي.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
