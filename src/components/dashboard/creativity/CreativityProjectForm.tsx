'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { addCreativityItem } from '@/app/actions/dashboard/creativity';
import { getCategories } from '@/app/actions/dashboard/categories';

interface Props {
    onSuccess: () => void;
}

export default function CreativityProjectForm({ onSuccess }: Props) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [titleEn, setTitleEn] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>(['web']);
    const [availableCategories, setAvailableCategories] = useState<any[]>([]);
    const [imageUrl, setImageUrl] = useState('');
    const [link, setLink] = useState('');
    const [appLink, setAppLink] = useState('');
    const [desc, setDesc] = useState('');
    const [descEn, setDescEn] = useState('');

    useEffect(() => {
        async function fetchCats() {
            const cats = await getCategories();
            setAvailableCategories(cats);
        }
        fetchCats();
    }, []);

    const isAppCategory = selectedCategories.some(cat => 
        cat.toLowerCase().includes('app') || 
        cat.includes('تطبيق') || 
        cat.toLowerCase().includes('mobile')
    );

    const toggleCategory = (slug: string) => {
        if (selectedCategories.includes(slug)) {
            if (selectedCategories.length > 1) {
                setSelectedCategories(selectedCategories.filter(c => c !== slug));
            }
        } else {
            setSelectedCategories([...selectedCategories, slug]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');
            const token = await user.getIdToken();
            
            const categoryString = selectedCategories.join(',');

            await addCreativityItem(token, 'portfolio', {
                title,
                title_ar: title,
                title_en: titleEn,
                category: categoryString || 'web',
                categories: selectedCategories,
                image: imageUrl,
                desc,
                desc_ar: desc,
                desc_en: descEn,
                description: desc,
                description_ar: desc,
                description_en: descEn,
                link,
                appLink: isAppCategory ? appLink : ''
            });
            
            setTitle('');
            setTitleEn('');
            setSelectedCategories(['web']);
            setImageUrl('');
            setLink('');
            setAppLink('');
            setDesc('');
            setDescEn('');
            onSuccess();
        } catch (error) {
            console.error(error);
            alert('حدث خطأ أثناء إضافة المشروع.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="db-form-content bg-pharaohCard border border-white/5 rounded-3xl p-6 lg:p-10 shadow-2xl relative">
            <div className="absolute top-0 left-10 transform -translate-y-1/2 bg-pharaohGold text-pharaohNavy font-black text-[10px] uppercase tracking-[3px] px-4 py-1.5 rounded-full shadow-lg">PORTFOLIO DEPLOYMENT</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">عنوان المشروع (بالعربية)</label>
                    <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition" placeholder="مثال: منصة حورس للتجارة الإلكترونية" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">عنوان المشروع (بالإنجليزية - Title EN)</label>
                    <input type="text" value={titleEn} onChange={e => setTitleEn(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition" placeholder="e.g. Horus E-Commerce Platform" dir="ltr" />
                </div>

                <div className="md:col-span-2 bg-[#0A192F] p-5 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider">تصنيف العمل الرقمي (يمكنك اختيار أكثر من تصنيف)</label>
                        <span className="text-[11px] text-gray-400">محدد: {selectedCategories.length} تصنيف</span>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-2">
                        {availableCategories.map((cat: any) => {
                            const catSlug = cat.slug || cat.id;
                            const isSelected = selectedCategories.includes(catSlug);
                            return (
                                <button
                                    key={catSlug}
                                    type="button"
                                    onClick={() => toggleCategory(catSlug)}
                                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                                        isSelected
                                            ? 'bg-pharaohGold text-[#0A192F] border-pharaohGold shadow-lg shadow-pharaohGold/20 scale-105'
                                            : 'bg-[#112240] text-gray-300 border-white/10 hover:border-pharaohGold/40'
                                    }`}
                                >
                                    <span>{isSelected ? '✓' : '+'}</span>
                                    <span>{cat.name_ar || cat.name_en || catSlug}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Conditional Field: App Link for Mobile Apps */}
                {isAppCategory && (
                    <div className="md:col-span-2 bg-[#0A192F]/80 p-5 rounded-2xl border border-pharaohGold/30 space-y-2">
                        <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider">رابط التطبيق (App Link - Google Play / App Store / APK)</label>
                        <input
                            type="url"
                            value={appLink}
                            onChange={e => setAppLink(e.target.value)}
                            className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition"
                            placeholder="https://play.google.com/store/apps/details?id=com.example.app"
                            dir="ltr"
                        />
                        <p className="text-[11px] text-gray-400">يظهر هذا الحقل عند اختيار تصنيف تطبيقات الهواتف الموبايل.</p>
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">رابط غلاف المشروع (Image URL)</label>
                    <input type="url" required value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition" placeholder="https://example.com/image.jpg" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">رابط المشروع الحي (Project Link - اختياري)</label>
                    <input type="url" value={link} onChange={e => setLink(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition" placeholder="https://my-project.com" dir="ltr" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">شرح المشروع (بالعربية)</label>
                    <textarea rows={3} required value={desc} onChange={e => setDesc(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition resize-none" placeholder="اكتب هنا التفاصيل المعمارية البرمجية للمشروع المنجز..."></textarea>
                </div>
                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">شرح المشروع (بالإنجليزية - Description EN)</label>
                    <textarea rows={3} value={descEn} onChange={e => setDescEn(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition resize-none" placeholder="Write software architectural details in English..." dir="ltr"></textarea>
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button type="submit" disabled={loading} className="bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl shadow-pharaohGold/10 hover:opacity-90 transition disabled:opacity-50">
                    {loading ? 'جاري التنصيب...' : 'تنصيب المشروع في المعرض'}
                </button>
            </div>
        </form>
    );
}
