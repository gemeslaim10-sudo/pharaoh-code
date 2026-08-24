'use client';

import { StatsHeaderFields } from '@/components/dashboard/stats/StatsHeaderFields';
import { StatsCardsSection } from '@/components/dashboard/stats/StatsCardsSection';
import { useStatsForm } from '@/components/dashboard/stats/useStatsForm';

export default function DashboardStatsPage() {
  const { loading, saving, message, form, setForm, handleSave } = useStatsForm();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-amber-800 dark:text-pharaohGold text-base sm:text-lg font-bold flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-amber-800 dark:border-pharaohGold border-t-transparent rounded-full animate-spin" />
          جاري تحميل بيانات قسم الإحصائيات...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="text-2xl">📈</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              إدارة قسم الإحصائيات (إنجازات صنعت فارقاً حقيقياً)
            </h1>
          </div>
          <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm">
            التحكم الكامل في نصوص وأرقام وبطاقات الإحصائيات باللغتين العربية والإنجليزية لتعزيز ثقة العملاء في الصفحة الرئيسية.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-amber-500/20 dark:bg-pharaohGold text-amber-950 dark:text-[#0A192F] border border-amber-500/40 dark:border-pharaohGold px-8 py-3.5 rounded-2xl font-black hover:bg-amber-500 hover:text-white dark:hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shrink-0"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>جاري الحفظ...</span>
            </>
          ) : (
            <>
              <span>✓</span>
              <span>حفظ ونشر التعديلات</span>
            </>
          )}
        </button>
      </div>

      {message && (
        <div 
          className={`p-4 rounded-2xl text-sm font-bold flex items-center gap-3 shadow-xs ${
            message.type === 'success' 
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400'
          }`}
        >
          <span className="text-base">{message.type === 'success' ? '✓' : '⚠️'}</span>
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <StatsHeaderFields form={form} setForm={setForm} />
        <StatsCardsSection form={form} setForm={setForm} />

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-amber-500/20 dark:bg-pharaohGold text-amber-950 dark:text-[#0A192F] border border-amber-500/40 dark:border-pharaohGold px-10 py-4 rounded-2xl font-black text-sm hover:bg-amber-500 hover:text-white dark:hover:bg-white transition-all shadow-xl disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'جاري الحفظ والرفع...' : 'حفظ التغيرات ونشر التحديثات'}
          </button>
        </div>
      </form>
    </div>
  );
}
