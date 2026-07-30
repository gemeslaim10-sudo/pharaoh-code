export default function SystemMobileNav() {
    return (
        <div id="mobile-nav" className="fixed inset-0 z-[110] bg-pharaohNavy mobile-menu lg:hidden">
            <div className="p-6 flex justify-between items-center border-b border-white/10">
                <div className="flex items-center gap-2">
                    <span className="text-white font-black text-2xl tracking-tighter uppercase">PHARAOH <span className="text-pharaohGold">CODE</span></span>
                </div>
                <button id="close-menu" className="text-pharaohGold hover:rotate-90 transition-all duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <div className="flex flex-col p-8 gap-8 text-white text-xl font-bold">
                <a href="index.html" className="m-link hover:text-pharaohGold transition-colors">الرئيسية</a>
                <a href="about.html" className="m-link hover:text-pharaohGold transition-colors">من نحن</a>
                <a href="services.html" className="m-link hover:text-pharaohGold transition-colors">الخدمات</a>
                <a href="portfolio.html" className="m-link hover:text-pharaohGold transition-colors">الأعمال</a>
                <a href="contact.html" className="m-link hover:text-pharaohGold transition-colors">تواصل معنا</a>
                <a href="#project-form" className="mt-4 bg-pharaohGold text-pharaohNavy px-6 py-4 rounded-xl font-black text-center shadow-[0_10px_20px_rgba(197,161,111,0.2)] hover:bg-white transition-all">ابدأ مشروعك</a>
            </div>
        </div>
    );
}
