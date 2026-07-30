export default function TermsDetailsList() {
  return (
    <section className="pb-24 relative overflow-hidden text-right" dir="rtl">
        <div
            className="absolute inset-x-0 top-1/4 flex items-center justify-center pointer-events-none select-none opacity-[0.012] z-0">
            <span
                className="text-[12vw] font-black tracking-[0.15em] text-pharaohGold">PHARAOH</span>
        </div>
        <div
            className="absolute inset-x-0 bottom-1/4 flex items-center justify-center pointer-events-none select-none opacity-[0.012] z-0">
            <span
                className="text-[12vw] font-black tracking-[0.15em] text-pharaohGold">CODE</span>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10"
            style={{ marginTop: '40px' }}>

            <div
                className="p-8 rounded-[2rem] bg-[#112240]/40 border border-white/5 backdrop-blur-sm mb-12">
                <p className="text-base leading-relaxed text-gray-300">
                    مرحباً بك في منصة <span
                        className="text-white font-bold mx-1">Pharaoh Code</span>
                    للبرمجيات. تُنظم هذه الصفحة القواعد، الشروط، والأحكام
                    القانونية والتقنية الحاكمة لاستخدامك لموقعنا الإلكتروني
                    وتعاملك معنا كبيت برمجيات متكامل. بدخولك وتعاملك مع
                    منصتنا أو طلب أي من خدماتنا الرقمية، فإنك توافق بشكل
                    كامل ودون قيد أو شرط على الالتزام بجميع البنود المذكورة
                    أدناه.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div
                    className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/30 transition-all duration-500 shadow-xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-5">
                            <div
                                className="w-12 h-12 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] font-black border border-[#C5A16F]/20 group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-500 text-lg">٠١</div>
                            <h3 className="text-white text-xl font-bold">نطاق
                                الخدمات والتعاقدات</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            تلتزم <span
                                className="text-pharaohGold font-bold mx-1">Pharaoh
                                Code</span> بتنفيذ وتطوير المشاريع البرمجية
                            والمواقع والتطبيقات وفقاً لوثيقة المتطلبات
                            الفنية (Scope of Work) المتفق عليها والموقعة مع
                            العميل مسبقاً. أي تعديلات أو إضافات برمجية خارج
                            هذا النطاق أثناء أو بعد مرحلة التطوير تخضع
                            لتقييم فني منفصل ورسوم مالية إضافية تُحددها
                            إدارة المشروعات.
                        </p>
                    </div>
                </div>

                <div
                    className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/30 transition-all duration-500 shadow-xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-5">
                            <div
                                className="w-12 h-12 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] font-black border border-[#C5A16F]/20 group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-500 text-lg">٠٢</div>
                            <h3 className="text-white text-xl font-bold">حقوق
                                الملكية الفكرية البرمجية</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            جميع المحتويات والأدوات الرقمية والعلامات
                            التجارية الموجودة على موقعنا هي ملك لـ <span
                                className="text-pharaohGold font-bold mx-1">Pharaoh
                                Code</span>. أما بالنسبة للمشروعات المطورة،
                            يحصل العميل على كامل حقوق الملكية الفكرية
                            والشيفرات المصدرية (Source Code) الخاصة بمشروعه
                            فور سداد كامل المستحقات المالية المتفق عليها،
                            ولا يحق للشركة إعادة بيع نفس الكود المخصص لأي
                            طرف آخر.
                        </p>
                    </div>
                </div>

                <div
                    className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/30 transition-all duration-500 shadow-xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-5">
                            <div
                                className="w-12 h-12 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] font-black border border-[#C5A16F]/20 group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-500 text-lg">٠٣</div>
                            <h3 className="text-white text-xl font-bold">الآلية
                                المالية وجدولة الدفعات</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            يتم العمل على أي مشروع برمي استناداً لجدولة
                            دفعات واضحة يتم تفصيلها في العقد الأساسي (مثال:
                            دفعة مقدمة لبدء العمل، دفعة عند تسليم الواجهات،
                            ودفعة نهائية عند الإطلاق الفعلي). في حال تأخر
                            العميل عن سداد الدفعة المستحقة في موعدها المتفق
                            عليه، يحق لـ <span
                                className="text-pharaohGold font-bold mx-1">Pharaoh
                                Code</span> تعليق العمل بالمشروع مؤقتاً حتى
                            تسوية المستحقات.
                        </p>
                    </div>
                </div>

                <div
                    className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/30 transition-all duration-500 shadow-xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-5">
                            <div
                                className="w-12 h-12 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] font-black border border-[#C5A16F]/20 group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-500 text-lg">٠٤</div>
                            <h3 className="text-white text-xl font-bold">الخوادم
                                (Servers) والاستضافة</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            إذا تم توفير الاستضافة عبر طرف ثالث من قِبل
                            العميل، فإن <span
                                className="text-pharaohGold font-bold mx-1">Pharaoh
                                Code</span> لا تتحمل أي مسؤولية عن توقف
                            الخوادم، بطء الاستجابة، أو فقدان البيانات الناتج
                            عن مشاكل من مزود الاستضافة. بينما نضمن استقرار
                            الأنظمة بالكامل إذا أُسندت إدارة الخوادم والبنية
                            التحتية لمهندسينا كخدمة سحابية مستقلة.
                        </p>
                    </div>
                </div>

                <div
                    className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/30 transition-all duration-500 shadow-xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-5">
                            <div
                                className="w-12 h-12 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] font-black border border-[#C5A16F]/20 group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-500 text-lg">٠٥</div>
                            <h3 className="text-white text-xl font-bold">الدعم
                                الفني والضمان البرمجي</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            تقدم <span
                                className="text-pharaohGold font-bold mx-1">Pharaoh
                                Code</span> فترة ضمان مجانية متفق عليها فور
                            تسليم وإطلاق المشروع، وتشمل هذه الفترة إصلاح أي
                            ثغرات أو أخطاء برمجية (Bugs) تظهر في الأكواد
                            الأساسية المكتوبة من قِبلنا. لا يشمل الضمان
                            إصلاح المشاكل الناتجة عن سوء استخدام لوحات
                            التحكم أو عبث أي مطور خارجي بأكواد النظام.
                        </p>
                    </div>
                </div>

                <div
                    className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/30 transition-all duration-500 shadow-xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-5">
                            <div
                                className="w-12 h-12 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] font-black border border-[#C5A16F]/20 group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-500 text-lg">٠٦</div>
                            <h3 className="text-white text-xl font-bold">تعديل
                                الشروط والقوانين الحاكمة</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            تحتفظ إدارة <span
                                className="text-pharaohGold font-bold mx-1">Pharaoh
                                Code</span> بالحق في تعديل أو تحديث بنود
                            الشروط والأحكام هذه في أي وقت لضمان تماشيها مع
                            التطورات القانونية وصناعة البرمجيات العالمية.
                            تخضع كافة الاتفاقيات والنزاعات القانونية -لا قدر
                            الله- للقوانين والتشريعات المحلية والمحاكم
                            الاقتصادية المختصة.
                        </p>
                    </div>
                </div>

            </div>

            <div className="text-center pt-16 border-t border-white/5 mt-16">
                <p className="text-sm text-gray-500">تعتبر موافقتك على بدء
                    المشروع بمثابة توقيع رقمي صريح والتزام كامل بهذه
                    الشروط.</p>
                <a href="/contact"
                    className="inline-block mt-4 text-[#C5A16F] font-bold hover:text-white transition-colors">هل
                    لديك أي استفسار قانوني؟ تواصل مع مستشارينا الفنيين الآن
                    ←</a>
            </div>

        </div>
    </section>
  );
}
