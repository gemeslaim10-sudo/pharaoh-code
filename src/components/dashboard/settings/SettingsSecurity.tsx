'use client';

import { useState, useEffect } from 'react';
import { getAdmins, addAdmin, removeAdmin } from '@/app/actions/dashboard/settings';
import { auth } from '@/lib/firebase/config';

export default function SettingsSecurity() {
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [admins, setAdmins] = useState<any[]>([]);
    const [email, setEmail] = useState('');

    const loadData = async () => {
        try {
            const data = await getAdmins();
            setAdmins(data);
        } catch (error) {
            console.error("Failed to load admins:", error);
        } finally {
            setInitialLoad(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');
            const token = await user.getIdToken();
            
            await addAdmin(token, email);
            setEmail('');
            await loadData();
            alert("تمت إضافة المشرف بنجاح!");
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء إضافة المشرف.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("هل أنت متأكد من سحب صلاحية الإشراف من هذا الحساب؟")) return;
        
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');
            const token = await user.getIdToken();
            
            await removeAdmin(token, id);
            await loadData();
            alert("تم إزالة الصلاحية بنجاح.");
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء الإزالة.");
        }
    };

    if (initialLoad) return <div className="p-10 text-center text-pharaohGold">جاري تحميل بيانات الحماية...</div>;

    return (
        <div id="sec-security" className="section-panel space-y-10 hidden">
            <form id="form-security" onSubmit={handleSubmit}
                className="bg-pharaohCard border border-white/5 rounded-3xl p-6 lg:p-10 shadow-2xl relative">
                <div
                    className="absolute top-0 right-10 transform -translate-y-1/2 bg-pharaohGold text-pharaohNavy font-black text-[10px] uppercase tracking-[3px] px-4 py-1.5 rounded-full shadow-lg">SECURITY
                    ENGINE</div>
                <h3
                    className="text-lg font-bold text-white mb-6 flex items-center gap-3 text-pharaohGold">
                    <span className="w-2 h-2 bg-pharaohGold rounded-full"></span>
                    إضافة مشرف جديد (Admin Access)
                </h3>
                
                <p className="text-gray-400 text-sm mb-6">
                    قم بإضافة البريد الإلكتروني للشخص الذي ترغب في منحه صلاحيات إدارة لوحة التحكم. يمكنه الدخول مباشرة بحسابه على جوجل دون الحاجة لإنشاء حساب جديد.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-400 mb-2">البريد الإلكتروني (Gmail)</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@gmail.com"
                            className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" />
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button type="submit" disabled={loading}
                        className="bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50 cursor-pointer">
                        {loading ? 'جاري الإضافة...' : 'إضافة مشرف'}
                    </button>
                </div>
            </form>

            <div className="bg-[#112240]/40 border border-white/5 rounded-3xl p-6 lg:p-8">
                <h4 className="text-sm font-bold text-pharaohGold mb-4">قائمة المشرفين المصرح لهم بالدخول</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm text-gray-400">
                        <thead className="text-xs uppercase bg-[#0A192F] text-pharaohGold font-bold border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4">البريد الإلكتروني</th>
                                <th className="px-6 py-4 text-center">التحكم والتعديل</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Master Admin */}
                            <tr className="border-b border-white/5 hover:bg-white/5 transition">
                                <td className="px-6 py-4 font-bold text-white">cubsacademy29@gmail.com</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center gap-1.5 text-xs text-pharaohGold bg-pharaohGold/10 px-3 py-1 rounded-full border border-pharaohGold/20">
                                        <svg className="w-3.5 h-3.5 text-pharaohGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <span>المالك الأساسي (Owner)</span>
                                    </span>
                                </td>
                            </tr>
                            
                            {/* Dynamic Admins */}
                            {admins.map((admin) => (
                                <tr key={admin.id} className="border-b border-white/5 hover:bg-white/5 transition">
                                    <td className="px-6 py-4 font-bold text-white">{admin.email}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => handleDelete(admin.id)}
                                            className="text-xs text-red-400 bg-red-400/10 px-3 py-1 rounded-full hover:bg-red-400 hover:text-white transition">
                                            إلغاء الصلاحية ❌
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
