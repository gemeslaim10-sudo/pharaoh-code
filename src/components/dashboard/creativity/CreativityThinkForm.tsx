'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { addCreativityItem } from '@/app/actions/dashboard/creativity';

interface Props {
    onSuccess: () => void;
}

export default function CreativityThinkForm({ onSuccess }: Props) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');
    const [desc, setDesc] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');
            const token = await user.getIdToken();
            
            await addCreativityItem(token, 'philosophy', {
                title,
                icon,
                desc
            });
            
            setTitle('');
            setIcon('');
            setDesc('');
            onSuccess();
        } catch (error) {
            console.error(error);
            alert('حدث خطأ أثناء إضافة الفلسفة.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="db-form-content bg-pharaohCard border border-white/5 rounded-3xl p-6 lg:p-10 shadow-2xl relative">
            <div className="absolute top-0 left-10 transform -translate-y-1/2 bg-pharaohGold text-pharaohNavy font-black text-[10px] uppercase tracking-[3px] px-4 py-1.5 rounded-full shadow-lg">PHILOSOPHY AND CORE VALUE</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">عنوان الفلسفة الرشيدة</label>
                    <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition" placeholder="مثال: الشفرة النظيفة الفخمة" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">كود أيقونة الـ SVG البرمجية</label>
                    <input type="text" required value={icon} onChange={e => setIcon(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition font-mono text-left" placeholder="<svg />...</svg>" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">مضمون الفلسفة وجوهرها</label>
                    <textarea rows={4} required value={desc} onChange={e => setDesc(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition resize-none" placeholder="اشرح طريقتكم في تحقيق هذه الميزة البرمجية وكيف تبنونها..."></textarea>
                </div>
            </div>
            <div className="mt-8 flex justify-end">
                <button type="submit" disabled={loading} className="bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl shadow-pharaohGold/10 hover:opacity-90 transition disabled:opacity-50">
                    {loading ? 'جاري التحديث...' : 'تحديث الفلسفة الرقمية'}
                </button>
            </div>
        </form>
    );
}
