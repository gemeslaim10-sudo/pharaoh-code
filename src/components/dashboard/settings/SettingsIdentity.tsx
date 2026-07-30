'use client';

import { useState, useEffect } from 'react';
import { getIdentity, updateIdentity } from '@/app/actions/dashboard/settings';
import { uploadImage } from '@/app/actions/dashboard/upload';
import { auth } from '@/lib/firebase/config';

export default function SettingsIdentity() {
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        keywords: '',
        desc: '',
        favicon: ''
    });
    const [faviconFile, setFaviconFile] = useState<File | null>(null);
    const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getIdentity();
                if (data) {
                    setFormData({
                        name: data.name || '',
                        title: data.title || '',
                        keywords: data.keywords || '',
                        desc: data.desc || '',
                        favicon: data.favicon || ''
                    });
                }
            } catch (error) {
                console.error("Failed to load identity:", error);
            } finally {
                setInitialLoad(false);
            }
        };
        loadData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');
            const token = await user.getIdToken();
            
            let finalFaviconUrl = formData.favicon;
            
            if (faviconFile) {
                const uploadData = new FormData();
                uploadData.append('file', faviconFile);
                const uploadRes = await uploadImage(token, uploadData);
                if (!uploadRes.success) {
                    throw new Error(uploadRes.error);
                }
                finalFaviconUrl = uploadRes.url || '';
            }

            await updateIdentity(token, { ...formData, favicon: finalFaviconUrl });
            setFaviconFile(null);
            alert("تم تحديث وحفظ سجل الهوية الرقمية المعتمدة! 👑");
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء حفظ الهوية.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id.replace('site-', '')]: e.target.value
        }));
    };

    const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFaviconFile(file);
            setFaviconPreview(URL.createObjectURL(file));
        }
    };

    if (initialLoad) return <div className="p-10 text-center text-pharaohGold">جاري تحميل بيانات الهوية...</div>;

    return (
        <div id="sec-identity" className="section-panel space-y-10">
            <form id="form-identity" onSubmit={handleSubmit}
                className="bg-pharaohCard border border-white/5 rounded-3xl p-6 lg:p-10 shadow-2xl relative">
                <div
                    className="absolute top-0 right-10 transform -translate-y-1/2 bg-pharaohGold text-pharaohNavy font-black text-[10px] uppercase tracking-[3px] px-4 py-1.5 rounded-full shadow-lg">IDENTITY
                    ENGINE</div>
                <h3
                    className="text-lg font-bold text-white mb-6 flex items-center gap-3 text-pharaohGold">
                    <span className="w-2 h-2 bg-pharaohGold rounded-full"></span>
                    تحديث وحفظ بيانات الهوية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2">اسم المنصة</label>
                        <input type="text" id="site-name" required value={formData.name} onChange={handleChange}
                            className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2">عنوان الموقع الوصفي (SEO Title)</label>
                        <input type="text" id="site-title" required value={formData.title} onChange={handleChange}
                            className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-400 mb-2">الكلمات الدلالية المفتاحية (Keywords)</label>
                        <input type="text" id="site-keywords" value={formData.keywords} onChange={handleChange}
                            className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-400 mb-2">الوصف المتقدم (Meta Description)</label>
                        <textarea id="site-desc" rows={3} value={formData.desc} onChange={handleChange}
                            className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition resize-none"></textarea>
                    </div>

                    {/* Favicon Upload Section */}
                    <div className="md:col-span-2 bg-[#112240] border border-white/5 p-6 rounded-2xl">
                        <label className="block text-sm font-bold text-white mb-4">أيقونة الموقع (Favicon) <span className="text-pharaohGold text-xs">(المقاس الموصى به: 32x32 أو 64x64 بكسل)</span></label>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 shrink-0 bg-[#0A192F] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                                {(faviconPreview || formData.favicon) ? (
                                    <img src={faviconPreview || formData.favicon} alt="Favicon Preview" className="w-full h-full object-contain p-2" />
                                ) : (
                                    <span className="text-gray-500 text-xs">لا يوجد</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <input type="file" id="site-favicon" accept="image/png, image/jpeg, image/x-icon, image/svg+xml" onChange={handleFaviconChange} className="hidden" />
                                <label htmlFor="site-favicon" className="cursor-pointer inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-lg border border-white/10 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                    اختر صورة من جهازك
                                </label>
                                <p className="text-[11px] text-gray-400 mt-2">يفضل أن تكون الصورة مربعة بصيغة PNG أو ICO.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button type="submit" id="btn-save-identity" disabled={loading}
                        className="bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50">
                        {loading ? 'جاري الحفظ...' : 'حفظ وتحديث السجل'}
                    </button>
                </div>
            </form>

            <div className="bg-[#112240]/40 border border-white/5 rounded-3xl p-6 lg:p-8">
                <h4 className="text-sm font-bold text-pharaohGold mb-4">📜 السجلات المحفوظة الحالية لهوية المنصة</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm text-gray-400">
                        <thead className="text-xs uppercase bg-[#0A192F] text-pharaohGold font-bold border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4">اسم المنصة</th>
                                <th className="px-6 py-4">العنوان الوصفي</th>
                                <th className="px-6 py-4">الكلمات الدلالية</th>
                                <th className="px-6 py-4 text-center">التحكم والتعديل</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-white/5 hover:bg-white/5 transition">
                                <td className="px-6 py-4 font-bold text-white">{formData.name}</td>
                                <td className="px-6 py-4">{formData.title}</td>
                                <td className="px-6 py-4 truncate max-w-[200px]">{formData.keywords}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="text-xs text-pharaohGold bg-pharaohGold/10 px-3 py-1 rounded-full">السجل النشط 🟢</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
