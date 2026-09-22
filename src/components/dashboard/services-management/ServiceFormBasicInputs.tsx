'use client';

import { IconField } from '@/components/dashboard/common/IconField';
import { MediaUploadField } from '@/components/dashboard/common/MediaUploadField';

interface ServiceFormBasicInputsProps {
    title: string;
    setTitle: (val: string) => void;
    titleEn: string;
    setTitleEn: (val: string) => void;
    type: string;
    setType: (val: string) => void;
    typeCustom: string;
    setTypeCustom: (val: string) => void;
    typeEn: string;
    setTypeEn: (val: string) => void;
    price: string;
    setPrice: (val: string) => void;
    badge: string;
    setBadge: (val: string) => void;
    badgeEn: string;
    setBadgeEn: (val: string) => void;
    imageUrl: string;
    setImageUrl: (val: string) => void;
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
    typeEn,
    setTypeEn,
    price,
    setPrice,
    badge,
    setBadge,
    badgeEn,
    setBadgeEn,
    imageUrl,
    setImageUrl,
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

                {/* English equivalents for the Arabic-only selects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="ltr">
                    <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10">
                        <label className="block text-slate-700 dark:text-gray-300 text-xs font-bold mb-2">
                            تصنيف ونوع النظام بالإنجليزية (Category EN)
                        </label>
                        <input
                            type="text"
                            id="adv-srv-type-en"
                            maxLength={50}
                            value={typeEn}
                            onChange={e => setTypeEn(e.target.value)}
                            placeholder="e.g. Full Admin Dashboard"
                            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600 text-xs"
                        />
                        <p className="text-[10px] text-slate-500 dark:text-gray-500 mt-1">Optional — shown on the services page in English mode.</p>
                    </div>

                    <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10">
                        <label className="block text-slate-700 dark:text-gray-300 text-xs font-bold mb-2">
                            وسم التميز بالإنجليزية (Badge EN)
                        </label>
                        <input
                            type="text"
                            id="adv-srv-badge-en"
                            maxLength={50}
                            value={badgeEn}
                            onChange={e => setBadgeEn(e.target.value)}
                            placeholder="e.g. Most Requested"
                            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600 text-xs"
                        />
                        <p className="text-[10px] text-slate-500 dark:text-gray-500 mt-1">Optional — leave empty to reuse the Arabic badge.</p>
                    </div>
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
                        <MediaUploadField
                            label="صورة الخدمة (تظهر في خلفية هيرو صفحة تفاصيل الخدمة)"
                            value={imageUrl}
                            onChange={setImageUrl}
                            accept="image"
                            hint="يفضل 800x450 بكسل — JPG, PNG, WebP, AVIF حتى 8 ميجابايت"
                            previewClassName="w-full h-32"
                        />
                    </div>

                    {/* Action Button Text */}
                    <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="block text-slate-700 dark:text-gray-300 text-xs font-bold">نص زر الخدمة في صفحة الأعمال (Portfolio)</label>
                            <span className="text-[10px] text-amber-800 dark:text-pharaohGold/70 font-mono">{btnText.length}/35</span>
                        </div>
                        <input
                            type="text"
                            id="adv-srv-btn-text"
                            maxLength={35}
                            value={btnText}
                            onChange={e => setBtnText(e.target.value)}
                            placeholder="مثال: اطلب النظام الآن"
                            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600 text-xs md:text-sm font-bold"
                        />
                        <p className="text-[10px] text-slate-500 dark:text-gray-500">اختياري — يظهر فقط في صفحة الأعمال (Portfolio). نص زر صفحة الخدمة يُضبط من تبويب الهيرو.</p>
                    </div>
                </div>

                {/* Service Icon */}
                <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-2">
                    <IconField
                        label="أيقونة الخدمة (تظهر في الرئيسية وصفحة الأعمال)"
                        value={svg}
                        onChange={setSvg}
                    />
                </div>
            </div>
        </div>
    );
}
