'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getCategories, addCategory, updateCategory, deleteCategory } from '@/app/actions/dashboard/categories';

export default function DashboardCategoriesPage() {
    const { user } = useAuth();
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // New Category Form state
    const [nameAr, setNameAr] = useState('');
    const [nameEn, setNameEn] = useState('');
    const [slug, setSlug] = useState('');

    const loadData = async () => {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !nameAr.trim()) return;
        setSubmitting(true);
        setMessage(null);

        try {
            const token = await user.getIdToken();
            const res = await addCategory(token, {
                name_ar: nameAr,
                name_en: nameEn || nameAr,
                slug: slug || undefined
            });

            if (res.success) {
                setMessage({ type: 'success', text: 'تمت إضافة التصنيف بنجاح!' });
                setNameAr('');
                setNameEn('');
                setSlug('');
                await loadData();
            } else {
                setMessage({ type: 'error', text: res.error || 'حدث خطأ أثناء الإضافة.' });
            }
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'حدث خطأ غير متوقع.' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !editingCategory) return;
        setSubmitting(true);
        setMessage(null);

        try {
            const token = await user.getIdToken();
            const res = await updateCategory(token, editingCategory.id, {
                name_ar: editingCategory.name_ar,
                name_en: editingCategory.name_en,
                slug: editingCategory.slug
            });

            if (res.success) {
                setMessage({ type: 'success', text: 'تم تحديث التصنيف بنجاح!' });
                setEditingCategory(null);
                await loadData();
            } else {
                setMessage({ type: 'error', text: res.error || 'حدث خطأ أثناء التحديث.' });
            }
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'حدث خطأ غير متوقع.' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`هل أنت متأكد من حذف تصنيف "${name}"؟`)) return;
        if (!user) return;

        try {
            const token = await user.getIdToken();
            const res = await deleteCategory(token, id);
            if (res.success) {
                setMessage({ type: 'success', text: 'تم حذف التصنيف بنجاح!' });
                await loadData();
            } else {
                setMessage({ type: 'error', text: res.error || 'حدث خطأ أثناء الحذف.' });
            }
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'حدث خطأ غير متوقع.' });
        }
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-pharaohGold/10 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-white">إدارة تصنيفات العمل الرقمي</h1>
                    <p className="text-gray-400 text-sm mt-1">إضافة، تعديل، وحذف تصنيفات المشاريع والأعمال الرقمية المتاحة للاختيار المتعدد</p>
                </div>
            </div>

            {message && (
                <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
                    <span>{message.type === 'success' ? '✓' : '⚠️'}</span>
                    {message.text}
                </div>
            )}

            {/* Form Add New Category */}
            <div className="bg-[#112240] p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
                <h2 className="text-xl font-bold text-pharaohGold border-b border-white/10 pb-3">إضافة تصنيف عمل جديد</h2>
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2">اسم التصنيف (بالعربية)</label>
                        <input
                            type="text"
                            required
                            placeholder="مثال: تطبيقات الويب والهواتف"
                            value={nameAr}
                            onChange={(e) => setNameAr(e.target.value)}
                            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2">Name (English)</label>
                        <input
                            type="text"
                            placeholder="e.g. Web & Mobile Apps"
                            value={nameEn}
                            onChange={(e) => setNameEn(e.target.value)}
                            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                            dir="ltr"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-300 mb-2">معرف التصنيف / Slug (اختياري)</label>
                        <input
                            type="text"
                            placeholder="e.g. web-apps"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                            dir="ltr"
                        />
                    </div>
                    <div className="md:col-span-3 flex justify-end">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-pharaohGold text-[#0A192F] px-8 py-3.5 rounded-xl font-black text-sm hover:bg-white transition-all shadow-lg disabled:opacity-50"
                        >
                            {submitting ? 'جاري الإضافة...' : '+ إضافة التصنيف'}
                        </button>
                    </div>
                </form>
            </div>

            {/* List Categories */}
            <div className="bg-[#112240] p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
                <h2 className="text-xl font-bold text-pharaohGold border-b border-white/10 pb-3">التصنيفات الحالية ({categories.length})</h2>

                {loading ? (
                    <div className="text-center py-8 text-gray-400">جاري تحميل التصنيفات...</div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">لا توجد تصنيفات معرفة.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((cat) => (
                            <div key={cat.id || cat.slug} className="bg-[#0A192F] border border-white/10 p-5 rounded-xl flex flex-col justify-between space-y-3">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-white text-base">{cat.name_ar}</h3>
                                        <span className="text-[10px] bg-pharaohGold/10 text-pharaohGold px-2.5 py-1 rounded-md font-mono">{cat.slug || cat.id}</span>
                                    </div>
                                    {cat.name_en && (
                                        <p className="text-xs text-gray-400 mt-1" dir="ltr">{cat.name_en}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
                                    <button
                                        onClick={() => setEditingCategory(cat)}
                                        className="text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg transition"
                                    >
                                        تعديل
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat.id, cat.name_ar)}
                                        className="text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition"
                                    >
                                        حذف
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal Edit Category */}
            {editingCategory && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#112240] border border-pharaohGold/30 p-6 md:p-8 rounded-2xl max-w-md w-full space-y-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-pharaohGold border-b border-white/10 pb-3">تعديل التصنيف</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-1">اسم التصنيف (بالعربية)</label>
                                <input
                                    type="text"
                                    required
                                    value={editingCategory.name_ar || ''}
                                    onChange={(e) => setEditingCategory({ ...editingCategory, name_ar: e.target.value })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-pharaohGold outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-1">Name (English)</label>
                                <input
                                    type="text"
                                    value={editingCategory.name_en || ''}
                                    onChange={(e) => setEditingCategory({ ...editingCategory, name_en: e.target.value })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-pharaohGold outline-none"
                                    dir="ltr"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-1">المعرف (Slug)</label>
                                <input
                                    type="text"
                                    value={editingCategory.slug || ''}
                                    onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-pharaohGold outline-none"
                                    dir="ltr"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setEditingCategory(null)}
                                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-400 hover:text-white bg-white/5"
                                >
                                    إلغاء
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-pharaohGold text-[#0A192F] px-6 py-2.5 rounded-xl text-xs font-black hover:bg-white transition"
                                >
                                    {submitting ? 'جاري الحفظ...' : 'حفظ التعديل'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
