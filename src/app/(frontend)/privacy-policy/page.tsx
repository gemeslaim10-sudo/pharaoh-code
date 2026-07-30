export const metadata = {
  title: 'سياسة الخصوصية وسرية المعلومات',
  description: 'سياسة الخصوصية وسرية المعلومات لمنصة Pharaoh Code'
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative pt-40 pb-12 overflow-hidden text-right">
            <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02] z-0 overflow-hidden">
                <span
                    className="text-[16vw] font-black tracking-widest text-white">PHARAOH</span>
            </div>

            <div
                className="absolute top-1/4 -right-20 w-96 h-96 bg-[#C5A16F]/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <h2
                    className="text-[#C5A16F] font-bold tracking-[0.2em] uppercase text-xs mb-3">Pharaoh
                    Code Privacy & Security Core</h2>
                <h1
                    className="text-4xl md:text-5xl font-black text-white leading-tight">
                    سياسة الخصوصية <span className="text-[#C5A16F] italic">وسرية
                        المعلومات</span>
                </h1>
                <div
                    className="w-20 h-1.5 bg-[#C5A16F] mt-6 rounded-full shadow-[0_0_15px_rgba(197,161,111,0.3)]"></div>
            </div>
        </section>

        <section className="pb-24 relative overflow-hidden text-right" dir="rtl">
            <div
                className="absolute inset-x-0 top-1/3 flex items-center justify-center pointer-events-none select-none opacity-[0.012] z-0">
                <span
                    className="text-[12vw] font-black tracking-[0.15em] text-pharaohGold">PHARAOH</span>
            </div>
            <div
                className="absolute inset-x-0 bottom-1/3 flex items-center justify-center pointer-events-none select-none opacity-[0.012] z-0">
                <span
                    className="text-[12vw] font-black tracking-[0.15em] text-pharaohGold">CODE</span>
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10" style={{ marginTop: '40px' }}>

                <div
                    className="p-8 rounded-[2rem] bg-[#112240]/40 border border-white/5 backdrop-blur-sm mb-12">
                    <p className="text-base leading-relaxed text-gray-300">
                        تعتبر وثيقة الخصوصية وسرية المعلومات هذه بمثابة اتفاقية
                        ملزمة ومنظمة لكافة الممارسات الرقمية التي تتم داخل صرح
                        <span className="text-white font-bold mx-1">Pharaoh Code</span>
                        للبرمجيات. إن ثقة عملائنا هي حجر الأساس الذي شُيدت عليه
                        مشاريعنا؛ لذا، نلتزم بحماية الأصول الفكرية، والبيانات
                        الفنية، وملفات الأنظمة الخاصة بكم بأعلى درجات المسئولية
                        والشفافية التقنية الممكنة.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div
                        className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/30 transition-all duration-500 shadow-xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-5">
                                <div
                                    className="w-12 h-12 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] font-black border border-[#C5A16F]/20 group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-500 text-lg">٠١</div>
                                <h3 className="text-white text-xl font-bold">نوعية
                                    البيانات التي نجمعها</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                تقتصر البيانات التي نطلبها في <span
                                    className="text-pharaohGold font-bold mx-1">Pharaoh
                                    Code</span> على البيانات الفنية والتعاقدية
                                الأساسية، والتي تشمل: معلومات الاتصال المؤسسية
                                (الاسم، البريد الإلكتروني، أرقام الهواتف)،
                                والبيانات المتعلقة بالبنية التحتية للمشروع مثل
                                متطلبات الاستضافة (Hosting Requirements)،
                                المخططات الهيكلية (Wireframes)، وتفاصيل تدفقات
                                البيانات (Data Flow Diagrams) لضمان دقة التنفيذ
                                البرمجي.
                            </p>
                        </div>
                    </div>

                    <div
                        className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/30 transition-all duration-500 shadow-xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-5">
                                <div
                                    className="w-12 h-12 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] font-black border border-[#C5A16F]/20 group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-500 text-lg">٠٢</div>
                                <h3 className="text-white text-xl font-bold">تأمين
                                    البيئات البرمجية (Environments)</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                نحن نطبق في <span
                                    className="text-pharaohGold font-bold mx-1">Pharaoh
                                    Code</span> تدابير أمنية صارمة أثناء مرحلة
                                التطوير (Development Phase) ومرحلة الإنتاج
                                (Production Phase). يتم حماية لوحات التحكم
                                والملفات الحساسة عبر جدران حماية برمجية متطورة،
                                مع تشفير كلمات المرور والمفاتيح البرمجية (API
                                Keys) باستخدام تقنيات تشفير معقدة تمنع كلياً أي
                                وصول خارجي غير مصرح به.
                            </p>
                        </div>
                    </div>

                    <div
                        className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/30 transition-all duration-500 shadow-xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-5">
                                <div
                                    className="w-12 h-12 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] font-black border border-[#C5A16F]/20 group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-500 text-lg">٠٣</div>
                                <h3 className="text-white text-xl font-bold">سرية
                                    الشيفرة المصدرية (Source Code)</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                إن الشيفرات البرمجية والأكواد المصدرية التي يتم
                                تطويرها لبناء تطبيقاتكم ومواقعكم هي ملكية فكرية
                                مطلقة وحصرية لكم فور إتمام التعاقد. تلتزم <span
                                    className="text-pharaohGold font-bold mx-1">Pharaoh
                                    Code</span> التزاماً أبدياً بعدم إعادة
                                استخدام هذه الأكواد المخصصة لصالح أي مشروع آخر
                                أو الإفشاء عن بنيتها البرمجية الأساسية لأي منافس
                                تجاري.
                            </p>
                        </div>
                    </div>

                    <div
                        className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/30 transition-all duration-500 shadow-xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-5">
                                <div
                                    className="w-12 h-12 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] font-black border border-[#C5A16F]/20 group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-500 text-lg">٠٤</div>
                                <h3 className="text-white text-xl font-bold">اتفاقية
                                    سرية الموظفين والمهندسين</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                يخضع جميع المهندسين، المبرمجين، ومحللي النظم في
                                فريق <span
                                    className="text-pharaohGold font-bold mx-1">Pharaoh
                                    Code</span> لاتفاقيات داخلية صارمة وموثقة
                                قانوناً لعدم إفشاء الأسرار (Non-Disclosure
                                Agreements). يمنع أي موظف من مشاركة، نقل، أو
                                تخزين أي بيانات أو أكواد تخص مشروعات عملائنا على
                                أجهزة أو خوادم شخصية خارج النطاق السحابي الآمن
                                والخاص بالشركة.
                            </p>
                        </div>
                    </div>

                    <div
                        className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/30 transition-all duration-500 shadow-xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-5">
                                <div
                                    className="w-12 h-12 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] font-black border border-[#C5A16F]/20 group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-500 text-lg">٠٥</div>
                                <h3 className="text-white text-xl font-bold">ملفات
                                    تعريف الارتباط والتحليلات الفنية</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                نستخدم في موقعنا تكنولوجيات تتبع آمنة وملفات
                                تعريف الارتباط (Cookies) بهدف تحليل الأداء
                                الرقمي للمنصة وتحسين السلوك التفاعلي للمستخدم.
                                تساعدنا هذه البيانات الإحصائية (مثل نوع المتصفح
                                ومعدل البقاء في الصفحة) في تطوير بوابتنا
                                الإلكترونية بشكل مستمر دون ربط هذه البيانات بأي
                                هوية شخصية أو تجارية لزوارنا.
                            </p>
                        </div>
                    </div>

                    <div
                        className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/30 transition-all duration-500 shadow-xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-5">
                                <div
                                    className="w-12 h-12 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] font-black border border-[#C5A16F]/20 group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-500 text-lg">٠٦</div>
                                <h3 className="text-white text-xl font-bold">حظر
                                    مشاركة البيانات مع جهات خارجية</h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                تتعهد <span
                                    className="text-pharaohGold font-bold mx-1">Pharaoh
                                    Code</span> بشكل قاطع بعدم بيع، تأجير، أو
                                مشاركة بيانات عملائها أو شركائها التكنولوجيين مع
                                أي جهات خارجية أو شبكات إعلانية لأغراض ترويجية.
                                لا يتم الكشف عن أي معلومات إلا في حالات الامتثال
                                القانوني المطلق للجهات القضائية الحكومية المختصة
                                وبموجب وثائق رسمية.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="text-center pt-16 border-t border-white/5 mt-16">
                    <p className="text-sm text-gray-500">تم صياغة وتحديث هذه السياسة
                        رسمياً لتتوافق مع معايير حماية البيانات العالمية لعام
                        2026.</p>
                    <a href="/contact"
                        className="inline-block mt-4 text-[#C5A16F] font-bold hover:text-white transition-colors">تواصل
                        مع قطاع الأمان والامتثال البرمجي لـ Pharaoh Code ←</a>
                </div>

            </div>
        </section>
    </>
  );
}
