'use client';

import { useState, useEffect } from 'react';
import { getSystemStatus, updateSystemStatus } from '@/app/actions/dashboard/settings';
import { auth } from '@/lib/firebase/config';

export default function SettingsSystem() {
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [statusData, setStatusData] = useState({
        mode: 'off',
        message: 'نحن نقوم بتحديث منصتنا حالياً، سنعود قريباً.'
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getSystemStatus();
                setStatusData({
                    mode: data.mode || 'off',
                    message: data.message || 'نحن نقوم بتحديث منصتنا حالياً، سنعود قريباً.'
                });
            } catch (error) {
                console.error("Failed to load system status:", error);
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
            
            await updateSystemStatus(token, statusData);
            alert("تم تحديث حالة البث بنجاح!");
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء حفظ الإعدادات.");
        } finally {
            setLoading(false);
        }
    };

    if (initialLoad) return <div id="sec-status" className="section-panel space-y-10 hidden p-10 text-center text-pharaohGold">جاري تحميل حالة النظام...</div>;

    return (
        <div id="sec-status" className="section-panel space-y-10 hidden">
            <form id="form-system" onSubmit={handleSubmit}
                className="bg-pharaohCard border border-white/5 rounded-3xl p-6 lg:p-10 shadow-2xl relative">
                <div
                    className="absolute top-0 right-10 transform -translate-y-1/2 bg-pharaohGold text-pharaohNavy font-black text-[10px] uppercase tracking-[3px] px-4 py-1.5 rounded-full shadow-lg">SYSTEM
                    BROADCAST</div>
                <h3
                    className="text-lg font-bold text-white mb-6 flex items-center gap-3 text-pharaohGold">
                    <span className="w-2 h-2 bg-pharaohGold rounded-full"></span>
                    التحكم بنشر وإغلاق البث العام للموقع
                </h3>
                <div className="grid grid-cols-1 gap-6">
                    <div
                        className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-[#0A192F] border border-white/10 rounded-2xl gap-4">
                        <div>
                            <h4 className="text-sm font-bold text-white mb-1">الوضع المعتمد حالياً لمنصتكم البصرية:</h4>
                            <p className="text-xs text-gray-400">اختيار تفعيل الصيانة يمنع الزوار تلقائياً من استعراض معرض الأعمال والمشاريع.</p>
                        </div>
                        <div>
                            <select id="maintenance-mode"
                                value={statusData.mode}
                                onChange={(e) => setStatusData({ ...statusData, mode: e.target.value })}
                                className="bg-[#112240] border border-pharaohGold/40 rounded-xl px-4 py-2.5 text-xs text-pharaohGold font-bold focus:outline-none cursor-pointer">
                                <option value="off">🟢 البث حي ونشط للجميع (Live Mode)</option>
                                <option value="on">🔴 تفعيل بوابة الصيانة المغلقة (Maintenance Mode)</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-2">نص رسالة الإغلاق المعروضة للجمهور</label>
                        <textarea id="maintenance-msg" rows={3} required
                                value={statusData.message}
                                onChange={(e) => setStatusData({ ...statusData, message: e.target.value })}
                                className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition resize-none"></textarea>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button type="submit" id="btn-save-system" disabled={loading}
                        className="bg-gradient-to-r from-red-500 to-amber-600 text-white font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50">
                        {loading ? 'جاري الحفظ...' : 'تحديث حالة البث'}
                    </button>
                </div>
            </form>

            <div className="bg-[#112240]/40 border border-white/5 rounded-3xl p-6 lg:p-8">
                <h4 className="text-sm font-bold text-pharaohGold mb-4">📜 السجل المعتمد لحالة البث وأنظمة الصيانة والتحكم</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm text-gray-400">
                        <thead className="text-xs uppercase bg-[#0A192F] text-pharaohGold font-bold border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4">حالة البث الحالية للموقع</th>
                                <th className="px-6 py-4">نص رسالة الصيانة</th>
                                <th className="px-6 py-4 text-center">التحكم والتعديل</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-white/5 hover:bg-white/5 transition">
                                <td className="px-6 py-4 font-bold text-white">
                                    {statusData.mode === 'off' ? '🟢 نشط (Live)' : '🔴 مغلق (Maintenance)'}
                                </td>
                                <td className="px-6 py-4 truncate max-w-[200px]">{statusData.message}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="text-xs text-pharaohGold bg-pharaohGold/10 px-3 py-1 rounded-full">الحالة الحالية النشطة</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
