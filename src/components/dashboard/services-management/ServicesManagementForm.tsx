'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase/config';
import { addService, updateService } from '@/app/actions/dashboard';
import { uploadImage } from '@/app/actions/dashboard/upload';
import { getAvailablePages } from '@/app/actions/dashboard/pages';

interface Props {
    editingService: any;
    setEditingService: (service: any) => void;
    onSuccess: () => void;
}

export default function ServicesManagementForm({ editingService, setEditingService, onSuccess }: Props) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [titleEn, setTitleEn] = useState('');
    const [type, setType] = useState('لوحة تحكم شاملة');
    const [typeCustom, setTypeCustom] = useState('');
    const [price, setPrice] = useState('');
    const [badge, setBadge] = useState('');
    const [btnText, setBtnText] = useState('');
    const [svg, setSvg] = useState('');
    const [desc, setDesc] = useState('');
    const [descEn, setDescEn] = useState('');
    const [detailPageUrl, setDetailPageUrl] = useState('');
    
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [availablePages, setAvailablePages] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        getAvailablePages().then(setAvailablePages);
    }, []);

    useEffect(() => {
        if (editingService) {
            setTitle(editingService.title || editingService.title_ar || '');
            setTitleEn(editingService.title_en || '');
            const defaultTypes = ["لوحة تحكم شاملة", "سيستم ونظام مخصص", "صفحة هبوط تسويقية"];
            if (editingService.type && !defaultTypes.includes(editingService.type)) {
                setType('custom_option');
                setTypeCustom(editingService.type);
            } else {
                setType(editingService.type || 'لوحة تحكم شاملة');
                setTypeCustom('');
            }
            setPrice(editingService.price || '');
            setBadge(editingService.badge || '');
            setBtnText(editingService.btnText || '');
            setSvg(editingService.icon || '');
            setDesc(editingService.desc || editingService.desc_ar || '');
            setDescEn(editingService.desc_en || '');
            setDetailPageUrl(editingService.detailPageUrl || '');
            setImageUrl(editingService.image || '');
            setImageFile(null);
        } else {
            setTitle('');
            setTitleEn('');
            setType('لوحة تحكم شاملة');
            setTypeCustom('');
            setPrice('');
            setBadge('');
            setBtnText('');
            setSvg('');
            setDesc('');
            setDescEn('');
            setDetailPageUrl('');
            setImageUrl('');
            setImageFile(null);
        }
    }, [editingService]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');
            const token = await user.getIdToken();

            let finalImageUrl = imageUrl;
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);
                const uploadRes = await uploadImage(token, formData);
                if (uploadRes.success && uploadRes.url) {
                    finalImageUrl = uploadRes.url;
                } else {
                    throw new Error(uploadRes.error || 'فشل رفع الصورة');
                }
            }

            const serviceData = {
                title,
                title_ar: title,
                title_en: titleEn,
                type: type === 'custom_option' ? typeCustom : type,
                price,
                badge,
                btnText,
                icon: svg,
                desc,
                desc_ar: desc,
                desc_en: descEn,
                detailPageUrl,
                image: finalImageUrl
            };

            if (editingService) {
                await updateService(token, editingService.id, serviceData);
                alert('تم تعديل الخدمة بنجاح 𓂀');
            } else {
                await addService(token, serviceData);
                alert('تمت إضافة الخدمة بنجاح 𓂀');
            }

            // Reset form
            setTitle('');
            setTitleEn('');
            setType('لوحة تحكم شاملة');
            setTypeCustom('');
            setPrice('');
            setBadge('');
            setBtnText('');
            setSvg('');
            setDesc('');
            setDescEn('');
            setDetailPageUrl('');
            setImageUrl('');
            setImageFile(null);
            setEditingService(null);
            onSuccess();
        } catch (error: any) {
            console.error(error);
            alert(error.message || 'حدث خطأ أثناء حفظ الخدمة.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto bg-[#112240] p-8 md:p-12 rounded-[2.5rem] border border-white/5 hover:border-pharaohGold/20 shadow-2xl transition-all duration-500 mb-20">

            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-6 bg-pharaohGold rounded-full"></div>
                    <h4 id="form-mode-title" className="text-xl font-bold text-white">
                        {editingService ? "تعديل بند خدمة مضاف 𓂀" : "تنصيب بند خدمة جديد 𓂀"}
                    </h4>
                </div>
                <button 
                    type="button" 
                    id="cancel-edit-btn" 
                    onClick={() => setEditingService(null)}
                    className={`${editingService ? "block" : "hidden"} text-xs text-red-400 hover:text-red-500 border border-red-500/20 px-3 py-1 rounded-lg bg-red-500/5 transition`}
                >
                    إلغاء التعديل
                </button>
            </div>

            <form id="pharaoh-adv-service-form" className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" id="editing-service-id" value={editingService?.id || ""} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2.5 font-medium">اسم الخدمة (بالعربية)</label>
                        <input type="text" id="adv-srv-title-ar" required value={title} onChange={e => setTitle(e.target.value)} placeholder="مثال: تطوير أنظمة الشركات البرمجية" className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600" />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2.5 font-medium">اسم الخدمة (بالإنجليزية - Title EN)</label>
                        <input type="text" id="adv-srv-title-en" value={titleEn} onChange={e => setTitleEn(e.target.value)} placeholder="e.g. Software Systems Development" className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600" dir="ltr" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2.5 font-medium">تصنيف ونوع النظام</label>
                        <select id="adv-srv-type" value={type} onChange={e => setType(e.target.value)} className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition cursor-pointer">
                            <option value="لوحة تحكم شاملة">لوحة تحكم شاملة (Dashboard)</option>
                            <option value="سيستم ونظام مخصص">سيستم ونظام مخصص (Custom System)</option>
                            <option value="صفحة هبوط تسويقية">صفحة هبوط تسويقية (Landing Page)</option>
                            <option value="custom_option">✍️ كتابة نوع مخصص يدوي...</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2.5 font-medium">صفحة تفاصيل الخدمة (اختياري)</label>
                        <select id="adv-srv-detail-page" value={detailPageUrl} onChange={e => setDetailPageUrl(e.target.value)} className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition cursor-pointer">
                            <option value="">بدون صفحة تفاصيل (الزرار يروح "ابدأ مشروعك")</option>
                            {availablePages.map(page => (
                                <option key={page.value} value={page.value}>{page.label} ({page.value})</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div id="custom-type-container" className={`${type === 'custom_option' ? 'block' : 'hidden'} animate-field-fade bg-pharaohNavy/30 p-4 rounded-xl border border-pharaohGold/20`}>
                    <label className="block text-pharaohGold text-xs mb-2 font-medium">قم بكتابة نوع النظام المخصص الجديد 𓂀</label>
                    <input type="text" id="adv-srv-type-custom" value={typeCustom} onChange={e => setTypeCustom(e.target.value)} placeholder="مثال: تطبيق متجر إلكتروني متعدد التجار" className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2.5 font-medium">سعر الخدمة (يبدأ من...)</label>
                        <input type="text" id="adv-srv-price" value={price} onChange={e => setPrice(e.target.value)} placeholder="مثال: $499 أو حسب الاتفاق" className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600" />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2.5 font-medium">شعار ووسم التميز (Badge)</label>
                        <select id="adv-srv-badge" value={badge} onChange={e => setBadge(e.target.value)} className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition cursor-pointer">
                            <option value="">بدون وسم تعريفي</option>
                            <option value="الأكثر طلباً 🔥">الأكثر طلباً 🔥</option>
                            <option value="خصم لفترة محدودة ⚡">خصم لفترة محدودة ⚡</option>
                            <option value="خدمة جديدة فريدة ✨">خدمة جديدة فريدة ✨</option>
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
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-pharaohGold transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2.5 font-medium">نص زر الإجراء (Button Text)</label>
                        <input type="text" id="adv-srv-btn-text" required value={btnText} onChange={e => setBtnText(e.target.value)} placeholder="مثال: اطلب النظام الآن" className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600" />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-2.5 font-medium">كود الأيقونة البرمجية المتجاوبة (<span className="text-pharaohGold">Inline SVG Code</span>)</label>
                    <textarea id="adv-srv-svg" rows={3} value={svg} onChange={e => setSvg(e.target.value)} placeholder="إذا لم ترفع صورة، الصق كود الـ <svg> هنا مباشرة ليعمل كأيقونة ذهبية بديلة..." className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-xs text-white focus:border-pharaohGold outline-none transition font-mono placeholder:text-gray-600" dir="ltr"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-400 text-sm mb-2.5 font-medium">الوصف العربي للخدمة</label>
                        <textarea id="adv-srv-desc" rows={4} required value={desc} onChange={e => setDesc(e.target.value)} placeholder="اكتب وصفاً جذاباً باللغة العربية..." className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600"></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm mb-2.5 font-medium">الوصف بالإنجليزية (Description EN)</label>
                        <textarea id="adv-srv-desc-en" rows={4} value={descEn} onChange={e => setDescEn(e.target.value)} placeholder="Write attractive description in English..." className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600" dir="ltr"></textarea>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" disabled={loading} id="submit-form-btn" className="w-full bg-pharaohGold text-pharaohNavy font-black px-8 py-4 rounded-xl hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-[0_10px_20px_rgba(197,161,111,0.15)] disabled:opacity-50">
                        {loading ? "جاري التثبيت في الصرح..." : (editingService ? "حفظ التعديلات في الصرح 𓂀" : "تثبيت العرض والخدمة في الصرح 𓂀")}
                    </button>
                </div>
            </form>

        </div>
    );
}
