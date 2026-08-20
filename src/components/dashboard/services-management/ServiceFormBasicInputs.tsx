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
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="flex justify-between items-center mb-2.5">
                        <label className="block text-gray-400 text-sm font-medium">اسم الخدمة (بالعربية)</label>
                        <span className="text-[10px] text-pharaohGold/70 font-mono">{title.length}/70</span>
                    </div>
                    <input type="text" id="adv-srv-title-ar" required maxLength={70} value={title} onChange={e => setTitle(e.target.value)} placeholder="مثال: تطوير أنظمة الشركات البرمجية" className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600 text-xs md:text-sm" />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2.5">
                        <label className="block text-gray-400 text-sm font-medium">اسم الخدمة (بالإنجليزية - Title EN)</label>
                        <span className="text-[10px] text-pharaohGold/70 font-mono">{titleEn.length}/70</span>
                    </div>
                    <input type="text" id="adv-srv-title-en" maxLength={70} value={titleEn} onChange={e => setTitleEn(e.target.value)} placeholder="e.g. Software Systems Development" className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600 text-xs md:text-sm" dir="ltr" />
                </div>
            </div>

            <div>
                <label className="block text-gray-400 text-sm mb-2.5 font-medium">تصنيف ونوع النظام</label>
                <select id="adv-srv-type" value={type} onChange={e => setType(e.target.value)} className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition cursor-pointer text-xs md:text-sm">
                    <option value="لوحة تحكم شاملة">لوحة تحكم شاملة (Dashboard)</option>
                    <option value="سيستم ونظام مخصص">سيستم ونظام مخصص (Custom System)</option>
                    <option value="صفحة هبوط تسويقية">صفحة هبوط تسويقية (Landing Page)</option>
                    <option value="custom_option">كتابة نوع مخصص يدوي...</option>
                </select>
            </div>

            <div id="custom-type-container" className={`${type === 'custom_option' ? 'block' : 'hidden'} animate-field-fade bg-pharaohNavy/30 p-4 rounded-xl border border-pharaohGold/20`}>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-pharaohGold text-xs font-medium">قم بكتابة نوع النظام المخصص الجديد</label>
                    <span className="text-[10px] text-pharaohGold/70 font-mono">{typeCustom.length}/50</span>
                </div>
                <input type="text" id="adv-srv-type-custom" maxLength={50} value={typeCustom} onChange={e => setTypeCustom(e.target.value)} placeholder="مثال: تطبيق متجر إلكتروني متعدد التجار" className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600 text-xs" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="flex justify-between items-center mb-2.5">
                        <label className="block text-gray-400 text-sm font-medium">سعر الخدمة (يبدأ من...)</label>
                        <span className="text-[10px] text-pharaohGold/70 font-mono">{price.length}/35</span>
                    </div>
                    <input type="text" id="adv-srv-price" maxLength={35} value={price} onChange={e => setPrice(e.target.value)} placeholder="مثال: $499 أو حسب الاتفاق" className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600 text-xs md:text-sm" />
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-2.5 font-medium">شعار ووسم التميز (Badge)</label>
                    <select id="adv-srv-badge" value={badge} onChange={e => setBadge(e.target.value)} className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition cursor-pointer text-xs md:text-sm">
                        <option value="">بدون وسم تعريفي</option>
                        <option value="الأكثر طلباً">الأكثر طلباً</option>
                        <option value="خصم لفترة محدودة">خصم لفترة محدودة</option>
                        <option value="خدمة جديدة فريدة">خدمة جديدة فريدة</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-400 text-sm mb-2.5 font-medium">صورة كرت الخدمة التوضيحية <span className="text-pharaohGold text-xs">(المقاس الموصى به: 800x450 بكسل)</span></label>
                    <div className="relative w-full h-[54px] bg-pharaohNavy border border-white/10 rounded-xl flex items-center justify-between px-4 cursor-pointer group hover:border-pharaohGold/40 transition">
                        <input type="file" id="adv-srv-file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <span className="text-xs text-gray-500 group-hover:text-white transition" id="adv-upload-text">
                            {imageFile ? imageFile.name : (imageUrl ? "تم رفع صورة بالفعل" : "اختر صورة أو غلاف الخدمة...")}
                        </span>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-pharaohGold transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2.5">
                        <label className="block text-gray-400 text-sm font-medium">نص زر الإجراء (Button Text)</label>
                        <span className="text-[10px] text-pharaohGold/70 font-mono">{btnText.length}/35</span>
                    </div>
                    <input type="text" id="adv-srv-btn-text" required maxLength={35} value={btnText} onChange={e => setBtnText(e.target.value)} placeholder="مثال: اطلب النظام الآن" className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600 text-xs md:text-sm" />
                </div>
            </div>

            <div>
                <label className="block text-gray-400 text-sm mb-2.5 font-medium">كود الأيقونة البرمجية المتجاوبة (<span className="text-pharaohGold">Inline SVG Code</span>)</label>
                <textarea id="adv-srv-svg" rows={3} value={svg} onChange={e => setSvg(e.target.value)} placeholder="إذا لم ترفع صورة، الصق كود الـ <svg> هنا مباشرة ليعمل كأيقونة ذهبية بديلة..." className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-xs text-white focus:border-pharaohGold outline-none transition font-mono placeholder:text-gray-600" dir="ltr"></textarea>
            </div>
        </>
    );
}
