export default function SystemOverview() {
    return (
        <section id="overview" className="py-20 border-t border-white/5 bg-[#09162a]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    <div className="lg:col-span-7" style={{ marginBottom: "25px" }}>
                        <span className="text-[#C5A16F] font-bold tracking-widest text-xs uppercase block">ENTERPRISE SYSTEM AUTHORITY</span>
                        <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">نظرة عامة على الخدمة الفنية</h3>
                        <p className="text-gray-400 text-sm md:text-base font-medium mb-6 leading-relaxed">
                            السيستم الإداري الناجح هو المحرك الخفي لنمو وتوسع الشركات الفاخرة. في Pharaoh Code، نحن لا نبيع برمجيات معلبة أو قوالب مكررة؛ بل نصمم البنية التحتية البرمجية لنظامك من الصفر لتتوافق مع دورتك المستندية والتشغيلية الفعلية، مع توفير أقصى حماية لبياناتك الاستراتيجية.
                        </p>
                        <div className="space-y-4 text-gray-400 text-sm md:text-base font-medium">
                            <div className="flex items-start gap-3">
                                <span className="text-[#C5A16F] font-bold mt-0.5">✔</span>
                                <p><strong className="text-white font-bold">موديولات متكاملة ومترابطة:</strong> ربط تلقائي بين أقسام الحسابات، المبيعات، المشتريات، والمخازن دون تكرار أو تضارب في القيود.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#C5A16F] font-bold mt-0.5">✔</span>
                                <p><strong className="text-white font-bold">صلاحيات وتشفير سيبراني صارم:</strong> توزيع دقيق لأدوار الموظفين لضمان خصوصية البيانات المالية ومنع أي تسريب أو تلاعب داخلي.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-[#C5A16F] font-bold mt-0.5">✔</span>
                                <p><strong className="text-white font-bold">تقارير داشبورد (Realtime):</strong> لوحة تحكم ذكية تمنح الإدارة العليا تقارير فورية ورسوماً بيانية دقيقة عن الأرباح، الخسائر، وحركة المخزون.</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 p-8 bg-[#112240] rounded-2xl border border-white/5 shadow-2xl relative">
                        <h4 className="text-white font-bold text-lg mb-4">💎 الاستثمار المقدر وحزم التسعير</h4>
                        <p className="text-gray-400 text-xs md:text-sm font-medium mb-6 leading-relaxed">
                            تطوير نظامك الإداري مع Pharaoh Code يتضمن مميزات استشارية وهندسية مجانية مصاحبة للتعاقد لضمان الأتمتة السليمة:
                        </p>
                        <div className="space-y-4 text-xs md:text-sm">
                            <div className="p-4 bg-[#0A192F] rounded-xl border border-[#C5A16F]/20">
                                <div className="text-[#C5A16F] font-bold mb-1 flex items-center gap-2">✨ هندسة الدورة المستندية وتحليل الفكرة</div>
                                <div className="text-gray-400 leading-relaxed">جلسات عمل مكثفة مع فريقك المالي والإداري لدراسة هيكل الشركة، وتحديد التدفق البرمجي الأفضل للعمليات والوظائف بداخل النظام.</div>
                            </div>
                            <div className="p-4 bg-[#0A192F] rounded-xl border border-[#C5A16F]/20">
                                <div className="text-[#C5A16F] font-bold mb-1 flex items-center gap-2">🗺️ مستند المخطط الهندسي (System SRS)</div>
                                <div className="text-gray-400 leading-relaxed">وثيقة تقنية كاملة تشرح بناء قواعد البيانات، وهندسة الـ Database Architecture، وتدفق التقارير بوضوح تام قبل بدء الأكواد.</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
