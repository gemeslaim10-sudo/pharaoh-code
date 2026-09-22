'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { addCreativityItem, updateCreativityItem } from '@/app/actions/dashboard/creativity';
import { IconField } from '@/components/dashboard/common/IconField';

interface Props {
    onSuccess: () => void;
    editingItem?: any | null;
    onCancelEdit?: () => void;
}

const inputCls = "w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition";
const labelCls = "block text-xs font-bold text-amber-800 dark:text-pharaohGold uppercase tracking-wider mb-2";

export default function CreativityThinkForm({ onSuccess, editingItem = null, onCancelEdit }: Props) {
    const isEditing = Boolean(editingItem?.id);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [titleEn, setTitleEn] = useState('');
    const [icon, setIcon] = useState('');
    const [desc, setDesc] = useState('');
    const [descEn, setDescEn] = useState('');

    useEffect(() => {
        if (!editingItem) return;
        setTitle(editingItem.title_ar || editingItem.title || '');
        setTitleEn(editingItem.title_en || '');
        setIcon(editingItem.icon || '');
        setDesc(editingItem.desc_ar || editingItem.desc || editingItem.description || '');
        setDescEn(editingItem.desc_en || editingItem.description_en || '');
    }, [editingItem]);

    const resetForm = () => {
        setTitle(''); setTitleEn(''); setIcon(''); setDesc(''); setDescEn('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!icon) {
            alert('يرجى رفع أيقونة الفلسفة من جهازك أولاً');
            return;
        }
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');
            const token = await user.getIdToken();

            const payload = {
                title,
                title_ar: title,
                title_en: titleEn,
                icon,
                desc,
                desc_ar: desc,
                desc_en: descEn,
                description: desc,
                description_ar: desc,
                description_en: descEn
            };

            if (editingItem?.id) {
                await updateCreativityItem(token, 'philosophy', editingItem.id, payload);
            } else {
                await addCreativityItem(token, 'philosophy', payload);
            }

            resetForm();
            onSuccess();
        } catch (error) {
            console.error(error);
            alert(isEditing ? 'حدث خطأ أثناء تعديل الفلسفة.' : 'حدث خطأ أثناء إضافة الفلسفة.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="db-form-content bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/5 rounded-3xl p-6 lg:p-10 shadow-md dark:shadow-2xl relative">
            <div className="absolute top-0 left-10 transform -translate-y-1/2 bg-pharaohGold text-[#0A192F] font-black text-[10px] uppercase tracking-[3px] px-4 py-1.5 rounded-full shadow-lg">
                {isEditing ? 'EDIT PHILOSOPHY' : 'PHILOSOPHY AND CORE VALUE'}
            </div>

            {isEditing && (
                <div className="mb-6 bg-amber-500/10 border border-amber-500/30 dark:border-pharaohGold/30 text-amber-900 dark:text-pharaohGold text-xs font-bold px-4 py-3 rounded-xl">
                    أنت تعدّل: <span className="font-black">{editingItem?.title_ar || editingItem?.title}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className={labelCls}>عنوان الفلسفة (بالعربية)</label>
                    <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className={inputCls} placeholder="مثال: الشفرة النظيفة الفخمة" />
                </div>
                <div>
                    <label className={labelCls}>عنوان الفلسفة (بالإنجليزية - Title EN)</label>
                    <input type="text" value={titleEn} onChange={e => setTitleEn(e.target.value)} className={inputCls} placeholder="e.g. Luxurious Clean Code" dir="ltr" />
                </div>

                <div className="md:col-span-2">
                    <IconField label="أيقونة الفلسفة (ارفع SVG أو PNG من الجهاز)" value={icon} onChange={setIcon} required />
                </div>

                <div>
                    <label className={labelCls}>مضمون الفلسفة (بالعربية)</label>
                    <textarea rows={4} required value={desc} onChange={e => setDesc(e.target.value)} className={`${inputCls} resize-none`} placeholder="اشرح طريقتكم في تحقيق هذه الميزة البرمجية وكيف تبنونها..."></textarea>
                </div>
                <div>
                    <label className={labelCls}>مضمون الفلسفة (بالإنجليزية - Description EN)</label>
                    <textarea rows={4} value={descEn} onChange={e => setDescEn(e.target.value)} className={`${inputCls} resize-none`} placeholder="Explain your method to build this software feature in English..." dir="ltr"></textarea>
                </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
                {isEditing && onCancelEdit && (
                    <button type="button" onClick={() => { resetForm(); onCancelEdit(); }} className="border border-slate-300 dark:border-white/20 text-slate-700 dark:text-gray-300 font-bold text-xs px-6 py-4 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition cursor-pointer">
                        إلغاء التعديل
                    </button>
                )}
                <button type="submit" disabled={loading} className="bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl shadow-pharaohGold/10 hover:opacity-90 transition disabled:opacity-50 cursor-pointer">
                    {loading ? 'جاري الحفظ...' : (isEditing ? 'حفظ تعديلات الفلسفة' : 'تنصيب الفلسفة الرقمية')}
                </button>
            </div>
        </form>
    );
}
