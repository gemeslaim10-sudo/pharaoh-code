export default function WebDevOverview() {
    return (
        <section id="overview"
            className="py-20 border-t border-white/5 bg-[#09162a]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    <div className="lg:col-span-7" style={{'marginBottom': '25px'}}>
                        <span
                            className="text-[#C5A16F] font-bold tracking-widest text-xs uppercase  block">
                            BRAND AUTHORITY & TRUST</span>
                        <h3
                            className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">نظرة
                            عامة على الخدمة الفنية</h3>
                        <p
                            className="text-gray-400 text-sm md:text-base font-medium mb-6 leading-relaxed">
                            موقع شركتك ليس مجرد واجهة عابرة على شبكة الإنترنت،
                            بل هو المقر التجاري الإلكتروني الرسمي والأساسي الذي
                            يزوره عملاؤك وشركاؤك والمستثمرون للتحقق من قوتك
                            ومصداقيتك في السوق العالمي والمحلي. نحن نركز على
                            تحسين تجربة المستخدم الكاملة برؤية تسويقية
                            وتكنولوجية صارمة وغير مكررة.
                        </p>
                        <div
                            className="space-y-4 text-gray-400 text-sm md:text-base font-medium">
                            <div className="flex items-start gap-3">
                                <span
                                    className="text-[#C5A16F] font-bold mt-0.5">✔</span>
                                <p><strong className="text-white font-bold">صياغة
                                        بصرية سيادية:</strong> تصاميم مبهرة
                                    مخصصة تعكس فخامة وجذور علامتك التجارية بقوة
                                    وثقة.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span
                                    className="text-[#C5A16F] font-bold mt-0.5">✔</span>
                                <p><strong className="text-white font-bold">بنية
                                        تحتية سحابية:</strong> خوادم فائقة
                                    السرعة مع لوحات تحكم متطورة كلياً ومؤمنة ضد
                                    أي ثغرات.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span
                                    className="text-[#C5A16F] font-bold mt-0.5">✔</span>
                                <p><strong className="text-white font-bold">حلول
                                        برمجية مرنة:</strong> بناء الأكواد
                                    بطريقة قابلة للتوسع اللامتناهي وإضافة
                                    الأنظمة المستقبلية بسهولة.</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="lg:col-span-5 p-8 bg-[#112240] rounded-2xl border border-white/5 shadow-2xl relative">
                        <h4 className="text-white font-bold text-lg mb-4">💎
                            الاستثمار المقدر وحزم التسعير</h4>
                        <p
                            className="text-gray-400 text-xs md:text-sm font-medium mb-6 leading-relaxed">
                            حزم الاستثمار والتسعير لدينا لا تقتصر على بناء
                            وكتابة الأكواد فحسب؛ بل تشمل كقيمة مضافة حصرية
                            مجانية تماماً لتوجيه مشروعك نحو النجاح المطلق:
                        </p>
                        <div className="space-y-4 text-xs md:text-sm">
                            <div
                                className="p-4 bg-[#0A192F] rounded-xl border border-[#C5A16F]/20">
                                <div
                                    className="text-[#C5A16F] font-bold mb-1 flex items-center gap-2">✨
                                    استشارة مجانية متكاملة</div>
                                <div className="text-gray-400 leading-relaxed">جلسة
                                    استشارية مغلقة لتحليل متطلبات البيزنس الخاص
                                    بك، دراسة المنافسين، وتحديد نواقص الحضور
                                    الرقمي الحالي في مجالك لنتجاوزها.</div>
                            </div>
                            <div
                                className="p-4 bg-[#0A192F] rounded-xl border border-[#C5A16F]/20">
                                <div
                                    className="text-[#C5A16F] font-bold mb-1 flex items-center gap-2">🗺️
                                    خارطة طريق كاملة للمشروع (Project
                                    Roadmap)</div>
                                <div className="text-gray-400 leading-relaxed">مستند
                                    وجدول استراتيجي وزمني يوضح كل المراحل
                                    والمواعيد الفنية المحددة بدقة متناهية من
                                    التحليل وحتى الإطلاق الرسمي.</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
