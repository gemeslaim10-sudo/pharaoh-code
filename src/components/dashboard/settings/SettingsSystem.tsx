'use client';

import { useState, useEffect } from 'react';
import { getSystemStatus, updateSystemStatus } from '@/app/actions/dashboard/settings';
import { auth } from '@/lib/firebase/config';
import { DashboardAccordionGroup } from '../layout/DashboardAccordionGroup';

export default function SettingsSystem() {
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [statusData, setStatusData] = useState({
    mode: 'off',
    message: 'نحن نقوم بتحديث منصتنا حالياً، سنعود قريباً.',
  });
  const [openForm, setOpenForm] = useState(true);
  const [openTable, setOpenTable] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getSystemStatus();
        setStatusData({
          mode: data.mode || 'off',
          message: data.message || 'نحن نقوم بتحديث منصتنا حالياً، سنعود قريباً.',
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

  if (initialLoad) return <div className="p-10 text-center text-pharaohGold">جاري تحميل حالة النظام...</div>;

  return (
    <div className="space-y-6">
      {/* Group 1: Maintenance Mode Configuration */}
      <DashboardAccordionGroup
        group={{
          id: 'system-mode',
          title: 'التحكم بنشر وإغلاق البث العام للموقع (Maintenance Mode)',
          description: 'تفعيل أو تعطيل بوابة الصيانة وتحديد نص الرسالة المعروضة للزوار',
          icon: <span className="text-base">{statusData.mode === 'off' ? '🟢' : '🔴'}</span>,
          badge: statusData.mode === 'off' ? 'بث حي' : 'صيانة',
          children: (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-2xl gap-4 shadow-xs">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">الوضع المعتمد حالياً لمنصتكم البصرية:</h4>
                  <p className="text-xs text-slate-500 dark:text-gray-400">اختيار تفعيل الصيانة يمنع الزوار تلقائياً من استعراض معرض الأعمال والمشاريع.</p>
                </div>
                <div>
                  <select
                    id="maintenance-mode"
                    value={statusData.mode}
                    onChange={(e) => setStatusData({ ...statusData, mode: e.target.value })}
                    className="bg-white dark:bg-[#112240] border border-amber-500/40 dark:border-pharaohGold/40 rounded-xl px-4 py-2.5 text-xs text-amber-800 dark:text-pharaohGold font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="off">🟢 البث حي ونشط للجميع (Live Mode)</option>
                    <option value="on">🔴 تفعيل بوابة الصيانة المغلقة (Maintenance Mode)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-gray-400 mb-2">نص رسالة الإغلاق المعروضة للجمهور</label>
                <textarea
                  id="maintenance-msg"
                  rows={3}
                  required
                  value={statusData.message}
                  onChange={(e) => setStatusData({ ...statusData, message: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-pharaohGold transition resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                />
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-red-500 to-amber-600 text-white font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'جاري الحفظ...' : 'تحديث حالة البث'}
                </button>
              </div>
            </form>
          ),
        }}
        isOpen={openForm}
        onToggle={() => setOpenForm(!openForm)}
      />

      {/* Group 2: System Status Preview */}
      <DashboardAccordionGroup
        group={{
          id: 'system-table',
          title: 'السجل المعتمد لحالة البث وأنظمة الصيانة',
          description: 'استعراض الحالة الحالية للبث المنشورة على الخادم',
          icon: <span className="text-base">🖥️</span>,
          badge: 'حالة الخادم',
          children: (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm text-slate-600 dark:text-gray-400">
                <thead className="text-xs uppercase bg-slate-100 dark:bg-[#0A192F] text-amber-800 dark:text-pharaohGold font-bold border-b border-slate-200 dark:border-white/10">
                  <tr>
                    <th className="px-6 py-4">حالة البث الحالية للموقع</th>
                    <th className="px-6 py-4">نص رسالة الصيانة</th>
                    <th className="px-6 py-4 text-center">التحكم والتعديل</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition">
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                      {statusData.mode === 'off' ? '🟢 نشط (Live)' : '🔴 مغلق (Maintenance)'}
                    </td>
                    <td className="px-6 py-4 truncate max-w-[250px]">{statusData.message}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-xs text-amber-800 dark:text-pharaohGold bg-amber-500/10 dark:bg-pharaohGold/10 px-3 py-1 rounded-full border border-amber-500/20 dark:border-pharaohGold/20 font-bold">الحالة الحالية النشطة</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        }}
        isOpen={openTable}
        onToggle={() => setOpenTable(!openTable)}
      />
    </div>
  );
}
