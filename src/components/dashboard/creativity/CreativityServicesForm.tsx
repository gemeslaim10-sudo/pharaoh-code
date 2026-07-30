'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { addCreativityItem } from '@/app/actions/dashboard/creativity';

interface Props {
    onSuccess: () => void;
}

export default function CreativityServicesForm({ onSuccess }: Props) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [titleEn, setTitleEn] = useState('');
    const [btnText, setBtnText] = useState('');
    const [icon, setIcon] = useState('');
    const [desc, setDesc] = useState('');
    const [descEn, setDescEn] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');
            const token = await user.getIdToken();
            
            await addCreativityItem(token, 'services', {
                title,
                title_ar: title,
                title_en: titleEn,
                btnText,
                icon,
                desc,
                desc_ar: desc,
                desc_en: descEn,
                description: desc,
                description_ar: desc,
                description_en: descEn
            });
            
            setTitle('');
            setTitleEn('');
            setBtnText('');
            setIcon('');
            setDesc('');
            setDescEn('');
            onSuccess();
        } catch (error) {
            console.error(error);
            alert('حدث خطأ أثناء إضافة الخدمة.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="db-form-content bg-pharaohCard border border-white/5 rounded-3xl p-6 lg:p-10 shadow-2xl relative">
            <div className="absolute top-0 left-10 transform -translate-y-1/2 bg-pharaohGold text-pharaohNavy font-black text-[10px] uppercase tracking-[3px] px-4 py-1.5 rounded-full shadow-lg">ROYAL DIGITAL SERVICES</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">مسمى الخدمة الرقمية (بالعربية)</label>
                    <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition" placeholder="مثال: هندسة النظم السحابية الفرعونية" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">مسمى الخدمة (بالإنجليزية - Title EN)</label>
                    <input type="text" value={titleEn} onChange={e => setTitleEn(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition" placeholder="e.g. Cloud Systems Engineering" dir="ltr" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">نص زر الإجراء والاتصال</label>
                    <input type="text" required value={btnText} onChange={e => setBtnText(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition" placeholder="مثال: اعتلاء السحابة الرقمية" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">كود أيقونة الخدمة (SVG)</label>
                    <input type="text" required value={icon} onChange={e => setIcon(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition font-mono text-left" placeholder="<svg />...</svg>" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">وصف الخدمة (بالعربية)</label>
                    <textarea rows={4} required value={desc} onChange={e => setDesc(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition resize-none" placeholder="اكتب هنا الامتيازات الشاملة التي توفرها هذه الخدمة الملكية للعملاء..."></textarea>
                </div>
                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">وصف الخدمة (بالإنجليزية - Description EN)</label>
                    <textarea rows={4} value={descEn} onChange={e => setDescEn(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition resize-none" placeholder="Write service description in English..." dir="ltr"></textarea>
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button type="submit" disabled={loading} className="bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl shadow-pharaohGold/10 hover:opacity-90 transition disabled:opacity-50">
                    {loading ? 'جاري التنصيب...' : 'تنصيب الخدمة الملكية'}
                </button>
            </div>
        </form>
    );
}
