'use client';

import { ServicesPageHeaderFields } from '@/components/dashboard/tech-stack/ServicesPageHeaderFields';
import { TechStackHeaderFields } from '@/components/dashboard/tech-stack/TechStackHeaderFields';
import { TechStackCardsSection } from '@/components/dashboard/tech-stack/TechStackCardsSection';
import { useTechStackForm } from '@/components/dashboard/tech-stack/useTechStackForm';

export default function DashboardTechStackPage() {
  const { loading, saving, message, form, setForm, header, setHeaderField, addCard, removeCard, handleSave } = useTechStackForm();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-pharaohGold text-lg font-bold flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-pharaohGold border-t-transparent rounded-full animate-spin" />
          جاري تحميل بيانات صفحة الخدمات...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-pharaohGold/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">صفحة الخدمات: الرأس وقسم التقنيات</h1>
          <p className="text-slate-600 dark:text-gray-400 text-sm mt-1">تعديل رأس صفحة الخدمات وبطاقات قسم التقنيات بالعربية والإنجليزية مع الحفاظ على القيم الافتراضية</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-pharaohGold text-[#0A192F] px-8 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-[#0A192F] border-t-transparent rounded-full animate-spin" />
              جاري الحفظ...
            </>
          ) : 'حفظ التغيرات'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
          <span>{message.type === 'success' ? '✓' : '⚠️'}</span>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <ServicesPageHeaderFields header={header} setHeaderField={setHeaderField} />
        <TechStackHeaderFields form={form} setForm={setForm} />
        <TechStackCardsSection form={form} setForm={setForm} addCard={addCard} removeCard={removeCard} />

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-pharaohGold text-[#0A192F] px-10 py-4 rounded-xl font-black text-sm hover:bg-white transition-all shadow-xl disabled:opacity-50"
          >
            {saving ? 'جاري الحفظ والرفع...' : 'حفظ التغيرات ونشر التحديثات'}
          </button>
        </div>
      </form>
    </div>
  );
}
