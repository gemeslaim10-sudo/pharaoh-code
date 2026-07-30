export default function WebDevHero() {
    return (
        <section
            className="relative overflow-hidden bg-gradient-to-b from-pharaohNavy to-[#081426]"
            style={{'paddingTop': '90px', 'paddingBottom': '25px'}}>
            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">

                <h1
                    className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tighter">
                    بناء التواجد الرقمي الرسمي <br />
                    <span className="text-[#C5A16F]">موقع الويب هو صرح مؤسستك</span>
                </h1>
                <span
                    className="inline-block bg-[#C5A16F]/10 text-[#C5A16F] text-gray-400 text-sm font-bold px-4 py-2  mb-6 border border-[#C5A16F]/20"  style={{'borderRadius': '10px'}}>
                    ملخص الخدمة: نبتكر ونصمم مواقع ويب فاخرة واستراتيجية للشركات
                    تحول حضورك
                    الرقمي إلى واجهة رسمية تبني الموثوقية المطلقة وتجلب العملاء
                    المستهدفين، مع هندسة أكواد مخصصة تتصدر محركات البحث العالمية
                    بالكامل.
                </span>

                <div className="flex flex-wrap justify-center gap-4">
                    <a href="#project-form"
                        className="bg-[#C5A16F] text-[#0A192F] font-bold text-sm px-8 py-4 rounded-xl hover:bg-white transition-all shadow-xl shadow-[#C5A16F]/10">
                        ابدأ مشروعك الاستراتيجي
                    </a>
                    <a href="https://wa.me/your_number" target="_blank"
                        className="bg-white/5 border border-white/10 text-white font-bold text-sm px-8 py-4 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                        💬 تواصل عبر واتساب فوراً
                    </a>
                </div>
            </div>
        </section>
    );
}
