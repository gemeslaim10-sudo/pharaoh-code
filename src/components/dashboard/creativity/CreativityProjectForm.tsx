'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { addCreativityItem } from '@/app/actions/dashboard/creativity';

interface Props {
    onSuccess: () => void;
}

export default function CreativityProjectForm({ onSuccess }: Props) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('web');
    const [imageUrl, setImageUrl] = useState('');
    const [link, setLink] = useState('');
    const [desc, setDesc] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');
            const token = await user.getIdToken();
            
            await addCreativityItem(token, 'portfolio', {
                title,
                category,
                image: imageUrl,
                desc,
                link
            });
            
            setTitle('');
            setCategory('web');
            setImageUrl('');
            setLink('');
            setDesc('');
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
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">عنوان المشروع الملكي</label>
                        <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition" placeholder="مثال: منصة حورس للتجارة الإلكترونية" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">تصنيف العمل الرقمي</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition">
                            <option value="web">تطوير الويب (Web Development)</option>
                            <option value="app">تطبيقات الهواتف (App Development)</option>
                            <option value="motion">موشن جرافيك وتصميم (Graphics)</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">رابط غلاف المشروع (Image URL)</label>
                    <div className="border border-white/10 hover:border-pharaohGold/40 rounded-2xl p-6 text-center bg-[#0A192F]/50 transition relative flex flex-col justify-center items-center h-[142px]">
                        <input type="url" required value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition" placeholder="https://example.com/image.jpg" />
                        <p className="text-[10px] text-gray-500 mt-3">قم بإضافة رابط مباشر للصورة بدلاً من الرفع المباشر.</p>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">رابط المشروع الحي (Project Link)</label>
                    <div className="border border-white/10 hover:border-pharaohGold/40 rounded-2xl p-6 text-center bg-[#0A192F]/50 transition relative flex flex-col justify-center items-center h-[142px]">
                        <input type="url" value={link} onChange={e => setLink(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition" placeholder="https://my-project.com" />
                        <p className="text-[10px] text-gray-500 mt-3">رابط اختياري لزيارة المشروع الفعلي.</p>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">شرح تفصيلي للمشروع وسياق بنائه</label>
                    <textarea rows={4} required value={desc} onChange={e => setDesc(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition resize-none" placeholder="اكتب هنا التفاصيل المعمارية البرمجية للمشروع المنجز..."></textarea>
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
