export default function DashboardSettingsHeader() {
    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">تهيئة
                        <span className="text-pharaohGold">النظام الملكي</span></h2>
                    <p className="text-gray-400 text-sm py-4">قم بإدارة وتحديث تفاصيل النظام، وسجلات كل قسم مع إمكانية المراجعة والتعديل الفوري.</p>
                </div>
            </div>
            <div className="flex gap-2 overflow-x-auto" style={{ marginTop: "25px" }}>
                <button
                    className="section-tab-btn active bg-[#112240] text-white px-5 py-3 rounded-xl font-bold text-xs border border-pharaohGold whitespace-nowrap"
                    data-target="#sec-identity">01. الهوية الرقمية</button>
                <button
                    className="section-tab-btn text-gray-400 border border-transparent px-5 py-3 rounded-xl font-bold text-xs whitespace-nowrap hover:text-white"
                    data-target="#sec-hero-theme">02. تخصيص الهيرو والألوان</button>
                <button
                    className="section-tab-btn text-gray-400 border border-transparent px-5 py-3 rounded-xl font-bold text-xs whitespace-nowrap hover:text-white"
                    data-target="#sec-security">03. الحساب والأمان</button>
                <button
                    className="section-tab-btn text-gray-400 border border-transparent px-5 py-3 rounded-xl font-bold text-xs whitespace-nowrap hover:text-white"
                    data-target="#sec-social">04. السوشيال ميديا</button>
                <button
                    className="section-tab-btn text-gray-400 border border-transparent px-5 py-3 rounded-xl font-bold text-xs whitespace-nowrap hover:text-white"
                    data-target="#sec-status">05. بث المنصة</button>
            </div>
        </>
    );
}
