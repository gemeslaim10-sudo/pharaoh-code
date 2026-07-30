'use client';

import { useState, useEffect } from 'react';
import { getSocialLinks, updateSocialLinks } from '@/app/actions/dashboard/settings';
import { auth } from '@/lib/firebase/config';

export default function SettingsSocial() {
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [formData, setFormData] = useState({
        fb: '',
        li: '',
        tw: '',
        gh: ''
    });

    const loadData = async () => {
        try {
            const data = await getSocialLinks();
            if (data) {
                setFormData({
                    fb: data.fb || '',
                    li: data.li || '',
                    tw: data.tw || '',
                    gh: data.gh || ''
                });
            }
        } catch (error) {
            console.error("Failed to load social links:", error);
        } finally {
            setInitialLoad(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');
            const token = await user.getIdToken();
            
            await updateSocialLinks(token, formData);
            alert("تم تحديث وحفظ روابط السوشيال ميديا بنجاح! 🚀");
            await loadData();
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء حفظ الروابط.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id.replace('social-', '')]: e.target.value
        }));
    };

    if (initialLoad) return <div className="p-10 text-center text-pharaohGold">جاري تحميل قنوات الاتصال...</div>;

    return (
        <div id="sec-social" className="section-panel space-y-10 hidden">
            <form id="form-social" onSubmit={handleSubmit}
                className="bg-pharaohCard border border-white/5 rounded-3xl p-6 lg:p-10 shadow-2xl relative">
                <div
                    className="absolute top-0 right-10 transform -translate-y-1/2 bg-pharaohGold text-pharaohNavy font-black text-[10px] uppercase tracking-[3px] px-4 py-1.5 rounded-full shadow-lg">SOCIAL
                    CHANNELS ENGINE</div>
                <h3
                    className="text-lg font-bold text-white mb-6 flex items-center gap-3 text-pharaohGold">
                    <span className="w-2 h-2 bg-pharaohGold rounded-full"></span>
                    ربط القنوات الخارجية والشبكات
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2">رابط حساب فيسبوك</label>
                        <input type="url" id="social-fb" required value={formData.fb} onChange={handleChange}
                            className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition"
                            placeholder="https://facebook.com/..." />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2">رابط حساب لينكد إن</label>
                        <input type="url" id="social-li" required value={formData.li} onChange={handleChange}
                            className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition"
                            placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2">رابط حساب إكس / تويتر</label>
                        <input type="url" id="social-tw" required value={formData.tw} onChange={handleChange}
                            className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition"
                            placeholder="https://x.com/..." />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2">رابط مستودع جيت هاب</label>
                        <input type="url" id="social-gh" required value={formData.gh} onChange={handleChange}
                            className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition"
                            placeholder="https://github.com/..." />
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button type="submit" disabled={loading}
                        className="bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50">
                        {loading ? 'جاري الحفظ...' : 'تحديث وحفظ الروابط'}
                    </button>
                </div>
            </form>

            <div className="bg-[#112240]/40 border border-white/5 rounded-3xl p-6 lg:p-8">
                <h4 className="text-sm font-bold text-pharaohGold mb-4">📜 السجلات الحالية لقنوات الاتصال والمستودعات البرمجية</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-left md:text-right text-sm text-gray-400" dir="ltr">
                        <thead className="text-xs uppercase bg-[#0A192F] text-pharaohGold font-bold border-b border-white/10 text-right">
                            <tr>
                                <th className="px-6 py-4">فيسبوك (Facebook)</th>
                                <th className="px-6 py-4">لينكد إن (LinkedIn)</th>
                                <th className="px-6 py-4">إكس (X.com)</th>
                                <th className="px-6 py-4">جيت هاب (GitHub)</th>
                            </tr>
                        </thead>
                        <tbody className="text-right">
                            <tr className="border-b border-white/5 hover:bg-white/5 transition">
                                <td className="px-6 py-4 truncate max-w-[150px]">
                                    <a href={formData.fb} target="_blank" className="text-[#C5A16F] hover:underline">{formData.fb}</a>
                                </td>
                                <td className="px-6 py-4 truncate max-w-[150px]">
                                    <a href={formData.li} target="_blank" className="text-[#C5A16F] hover:underline">{formData.li}</a>
                                </td>
                                <td className="px-6 py-4 truncate max-w-[150px]">
                                    <a href={formData.tw} target="_blank" className="text-[#C5A16F] hover:underline">{formData.tw}</a>
                                </td>
                                <td className="px-6 py-4 truncate max-w-[150px]">
                                    <a href={formData.gh} target="_blank" className="text-[#C5A16F] hover:underline">{formData.gh}</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
