export default function MobileAppsOverview() {
    return (
        <section id="overview" className="py-20 border-t border-white/5 bg-[#09162a]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    <div className="lg:col-span-7" style={{ marginBottom: "25px" }}>
                        <span className="text-[#C5A16F] font-bold tracking-widest text-xs uppercase block">MOBILE AUTHORITY & EXPERIENCE</span>
                        <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">نظرة عامة على الخدمة الفنية</h3>
                        <p className="text-gray-400 text-sm md:text-base font-medium mb-6 leading-relaxed">
                            تطبيق الجوال يمثل الركيزة الأساسية للحفاظ على ولاء عملائك ومضاعفة وصولك التجاري المباشر. نحن لا نستخدم قوالب مستهلكة؛ بل نعتمد على هندسة أكواد مخصصة وحصرية توفر كفاءة تشغيل فائقة وسرعة استجابة فورية على شاشات الهواتف الذكية لضمان تفوقك المستدام.
                        </p>
                        <div className="space-y-4 text-gray-400 text-sm md:text-base font-medium">
                            <div className="flex items-start gap-3">
                                <span className="text-[#C5A16F] font-bold mt-0.5">✔</span>
                                <p><strong className="text-white font-bold">واجهات مستخدم (UI/UX) حصرية:</strong> تصاميم تفاعلية بالكامل مبهرة ومريحة تعزز معدلات التحويل والولاء لمؤسستك.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#C5A16F] font-bold mt-0.5">✔</span>
                                <p><strong className="text-white font-bold">أداء متماسك وخفيف:</strong> بناء أكواد فائقة النعومة والاستقرار تضمن أقل استهلاك لذاكرة الهاتف والبطارية.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#C5A16F] font-bold mt-0.5">✔</span>
                                <p><strong className="text-white font-bold">لوحة تحكم وإشعارات ذكية:</strong> إدارة تطبيقك بالكامل وإرسال الإشعارات الفورية (Push Notifications) لعملائك بضغطة زر واحدة.</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 p-8 bg-[#112240] rounded-2xl border border-white/5 shadow-2xl relative">
                        <h4 className="text-white font-bold text-lg mb-4">💎 الاستثمار المقدر وحزم التسعير</h4>
                        <p className="text-gray-400 text-xs md:text-sm font-medium mb-6 leading-relaxed">
                            بناء تطبيقك مع Pharaoh Code يشمل قيمًا مضافة حصرية مجانية بالكامل موجهة لدعم نجاح وازدهار مشروعك في السوق:
                        </p>
                        <div className="space-y-4 text-xs md:text-sm">
                            <div className="p-4 bg-[#0A192F] rounded-xl border border-[#C5A16F]/20">
                                <div className="text-[#C5A16F] font-bold mb-1 flex items-center gap-2">✨ جلسة تحليل وتخطيط الفكرة</div>
                                <div className="text-gray-400 leading-relaxed">جلسة استشارية مغلقة لتحليل وتخطيط فكرة تطبيقك، رسم خريطة تدفق المستخدم، ودراسة الخصائص والوظائف الأكثر ملائمة للميزانية والأهداف.</div>
                            </div>
                            <div className="p-4 bg-[#0A192F] rounded-xl border border-[#C5A16F]/20">
                                <div className="text-[#C5A16F] font-bold mb-1 flex items-center gap-2">🗺️ هيكل كامل ومستند تقني (Technical SRS)</div>
                                <div className="text-gray-400 leading-relaxed">مستند برمجي متكامل يحتوي على تفاصيل خطة بناء قواعد البيانات، وتدفق الصفحات والميزات بدقة متناهية قبل البدء الفعلي بالتكويد.</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
