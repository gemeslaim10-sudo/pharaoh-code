'use client';

interface ServiceFormBasicInputsProps {
    title: string;
    setTitle: (val: string) => void;
    titleEn: string;
    setTitleEn: (val: string) => void;
    type: string;
    setType: (val: string) => void;
    typeCustom: string;
    setTypeCustom: (val: string) => void;
    price: string;
    setPrice: (val: string) => void;
    badge: string;
    setBadge: (val: string) => void;
    imageFile: File | null;
    imageUrl: string;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    btnText: string;
    setBtnText: (val: string) => void;
    svg: string;
    setSvg: (val: string) => void;
}

export default function ServiceFormBasicInputs({
    title,
    setTitle,
    titleEn,
    setTitleEn,
    type,
    setType,
    typeCustom,
    setTypeCustom,
    price,
    setPrice,
    badge,
    setBadge,
    imageFile,
    imageUrl,
    handleFileChange,
    btnText,
    setBtnText,
    svg,
    setSvg
}: ServiceFormBasicInputsProps) {
    return (
        <div className="space-y-6">
            {/* Panel 1: Service Titles (Arabic & English) */}
            <div className="bg-slate-50 dark:bg-[#0A192F] p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
                <div className="border-b border-slate-200 dark:border-white/10 pb-3">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="text-amber-800 dark:text-pharaohGold">🏷️</span>
                        <span>اسم وعنوان الخدمة الأساسي (Service Titles)</span>
                    </h5>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Arabic Title */}
                    <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-1">
                                <span>🇸🇦</span>
                                <span>اسم الخدمة بالعربية</span>
                            </span>
                            <span className="text-[10px] text-amber-800 dark:text-pharaohGold/70 font-mono">{title.length}/70</span>
                        </div>
                        <input
                            type="text"
                            id="adv-srv-title-ar"
                            required
                            maxLength={70}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="مثال: تطوير أنظمة الشركات البرمجية"
                            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600 text-xs md:text-sm"
                        />
                    </div>

                    {/* English Title */}
                    <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-2" dir="ltr">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                <span>🇬🇧</span>
                                <span>Service Title (EN)</span>
                            </span>
                            <span className="text-[10px] text-blue-600 dark:text-blue-400/70 font-mono">{titleEn.length}/70</span>
                        </div>
                        <input
                            type="text"
                            id="adv-srv-title-en"
                            maxLength={70}
                            value={titleEn}
                            onChange={e => setTitleEn(e.target.value)}
                            placeholder="e.g. Enterprise Software Development"
                            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600 text-xs md:text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Panel 2: Classification, Pricing & Badges */}
            <div className="bg-slate-50 dark:bg-[#0A192F] p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
                <div className="border-b border-slate-200 dark:border-white/10 pb-3">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="text-amber-800 dark:text-pharaohGold">⚙️</span>
                        <span>تصنيف الخدمة، السعر الافتتاحي، والوسم (Category & Pricing)</span>
                    </h5>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Category Select */}
                    <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10">
                        <label className="block text-slate-700 dark:text-gray-300 text-xs font-bold mb-2">تصنيف ونوع النظام</label>
                        <select
                            id="adv-srv-type"
                            value={type}
                            onChange={e => setType(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition cursor-pointer text-xs"
                        >
                            <option value="لوحة تحكم شاملة">لوحة تحكم شاملة (Dashboard)</option>
                            <option value="سيستم ونظام مخصص">سيستم ونظام مخصص (Custom System)</option>
                            <option value="صفحة هبوط تسويقية">صفحة هبوط تسويقية (Landing Page)</option>
                            <option value="custom_option">كتابة نوع مخصص يدوي...</option>
                        </select>
                    </div>

                    {/* Base Price */}
                    <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-slate-700 dark:text-gray-300 text-xs font-bold">سعر الخدمة (يبدأ من...)</label>
                            <span className="text-[10px] text-amber-800 dark:text-pharaohGold/70 font-mono">{price.length}/35</span>
                        </div>
                        <input
                            type="text"
                            id="adv-srv-price"
                            maxLength={35}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            placeholder="مثال: $499 أو حسب الاتفاق"
                            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600 text-xs font-bold"
                        />
                    </div>

                    {/* Badge */}
                    <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10">
                        <label className="block text-slate-700 dark:text-gray-300 text-xs font-bold mb-2">شعار ووسم التميز (Badge)</label>
                        <select
                            id="adv-srv-badge"
                            value={badge}
                            onChange={e => setBadge(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition cursor-pointer text-xs"
                        >
                            <option value="">بدون وسم تعريفي</option>
                            <option value="الأكثر طلباً">الأكثر طلباً</option>
                            <option value="خصم لفترة محدودة">خصم لفترة محدودة</option>
                            <option value="خدمة جديدة فريدة">خدمة جديدة فريدة</option>
                        </select>
                    </div>
                </div>

                {/* Custom Category Input if selected */}
                <div id="custom-type-container" className={`${type === 'custom_option' ? 'block' : 'hidden'} animate-field-fade bg-amber-500/5 dark:bg-[#112240] p-4 rounded-xl border border-amber-500/30 dark:border-pharaohGold/20`}>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-amber-800 dark:text-pharaohGold text-xs font-bold">قم بكتابة نوع النظام المخصص الجديد</label>
                        <span className="text-[10px] text-amber-800 dark:text-pharaohGold/70 font-mono">{typeCustom.length}/50</span>
                    </div>
                    <input
                        type="text"
                        id="adv-srv-type-custom"
                        maxLength={50}
                        value={typeCustom}
                        onChange={e => setTypeCustom(e.target.value)}
                        placeholder="مثال: تطبيق متجر إلكتروني متعدد التجار"
                        className="w-full bg-white dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600 text-xs"
                    />
                </div>
            </div>

            {/* Panel 3: Media, Action Button & SVG Code */}
            <div className="bg-slate-50 dark:bg-[#0A192F] p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
                <div className="border-b border-slate-200 dark:border-white/10 pb-3">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="text-amber-800 dark:text-pharaohGold">🎨</span>
                        <span>صورة الغلاف، نص زر الطلب، والأيقونة البرمجية (Media & Actions)</span>
                    </h5>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Cover Upload */}
                    <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-2">
                        <label className="block text-slate-700 dark:text-gray-300 text-xs font-bold">
                            صورة كرت الخدمة التوضيحية <span className="text-amber-800 dark:text-pharaohGold text-[11px]">(800x450 بكسل)</span>
                        </label>
                        <div className="relative w-full h-[52px] bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-between px-4 cursor-pointer group hover:border-amber-500/50 dark:hover:border-pharaohGold/40 transition">
                            <input type="file" id="adv-srv-file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                            <span className="text-xs text-slate-600 dark:text-gray-400 group-hover:text-amber-800 dark:group-hover:text-white transition truncate" id="adv-upload-text">
                                {imageFile ? imageFile.name : (imageUrl ? "تم رفع صورة بالفعل (اضغط للتغيير)" : "اختر صورة أو غلاف الخدمة...")}
                            </span>
                            <svg className="w-5 h-5 text-slate-500 dark:text-gray-400 group-hover:text-amber-800 dark:group-hover:text-pharaohGold transition shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                    </div>

                    {/* Action Button Text */}
                    <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="block text-slate-700 dark:text-gray-300 text-xs font-bold">نص زر الإجراء والطلب (Button Text)</label>
                            <span className="text-[10px] text-amber-800 dark:text-pharaohGold/70 font-mono">{btnText.length}/35</span>
                        </div>
                        <input
                            type="text"
                            id="adv-srv-btn-text"
                            required
                            maxLength={35}
                            value={btnText}
                            onChange={e => setBtnText(e.target.value)}
                            placeholder="مثال: اطلب النظام الآن"
                            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600 text-xs md:text-sm font-bold"
                        />
                    </div>
                </div>

                {/* Inline SVG Code */}
                <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-2">
                    <label className="block text-slate-700 dark:text-gray-300 text-xs font-bold">
                        كود الأيقونة البرمجية المتجاوبة (<span className="text-amber-800 dark:text-pharaohGold font-mono">Inline SVG Code</span>)
                    </label>
                    <textarea
                        id="adv-srv-svg"
                        rows={3}
                        value={svg}
                        onChange={e => setSvg(e.target.value)}
                        placeholder="إذا لم ترفع صورة، الصق كود الـ <svg> هنا مباشرة ليعمل كأيقونة ذهبية بديلة..."
                        className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition font-mono placeholder:text-slate-400 dark:placeholder:text-gray-600"
                        dir="ltr"
                    />
                </div>
            </div>
        </div>
    );
}
