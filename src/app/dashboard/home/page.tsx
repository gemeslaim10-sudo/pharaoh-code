'use client';

import { useHomeContentForm, type HomeContentTabId } from '@/components/dashboard/home-content/useHomeContentForm';
import { HomeContentTabHero } from '@/components/dashboard/home-content/HomeContentTabHero';
import { HomeContentTabHeaders } from '@/components/dashboard/home-content/HomeContentTabHeaders';
import { HomeContentTabWorkflow } from '@/components/dashboard/home-content/HomeContentTabWorkflow';
import { HomeContentTabCreative } from '@/components/dashboard/home-content/HomeContentTabCreative';
import { DashboardSectionNavbar } from '@/components/dashboard/layout/DashboardSectionNavbar';
import { type DashboardSectionConfig } from '@/types/dashboardLayout';

export default function DashboardHomeContentPage() {
  const {
    loading,
    saving,
    activeTab,
    setActiveTab,
    message,
    form,
    setForm,
    handleSave,
  } = useHomeContentForm();

  const sections: DashboardSectionConfig[] = [
    { id: 'hero', label: 'الهيرو الرئيسي (Hero)', icon: <span>🏛️</span> },
    { id: 'headers', label: 'عناوين الأقسام (Section Headers)', icon: <span>🧱</span> },
    { id: 'workflow', label: 'خطوات المنهجية (Workflow Steps)', icon: <span>🧭</span> },
    { id: 'creative', label: 'شريط الفلسفة (Creative Banner)', icon: <span>🏷️</span> },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-pharaohGold text-lg font-bold flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-pharaohGold border-t-transparent rounded-full animate-spin" />
          جاري تحميل نصوص الصفحة الرئيسية...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 text-right" dir="rtl">
      {/* Header & Save Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-pharaohGold/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">إدارة نصوص الصفحة الرئيسية</h1>
          <p className="text-slate-600 dark:text-gray-400 text-sm mt-1">
            تعديل كل النصوص العربية والإنجليزية للصفحة الرئيسية (Home Page) — أي حقل فاضي بيرجع للنص الأصلي تلقائياً.
          </p>
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
        <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'
        }`}>
          <span>{message.type === 'success' ? '✓' : '⚠️'}</span>
          {message.text}
        </div>
      )}

      {/* Top Section Navbar */}
      <DashboardSectionNavbar
        sections={sections}
        activeSectionId={activeTab}
        onSelectSection={(id) => setActiveTab(id as HomeContentTabId)}
      />

      {/* Single Section Content Display */}
      <form onSubmit={handleSave} className="space-y-6">
        {activeTab === 'hero' && <HomeContentTabHero form={form} setForm={setForm} />}
        {activeTab === 'headers' && <HomeContentTabHeaders form={form} setForm={setForm} />}
        {activeTab === 'workflow' && <HomeContentTabWorkflow form={form} setForm={setForm} />}
        {activeTab === 'creative' && <HomeContentTabCreative form={form} setForm={setForm} />}

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-pharaohGold text-[#0A192F] px-10 py-4 rounded-xl font-black text-sm hover:bg-white transition-all shadow-xl disabled:opacity-50 cursor-pointer"
          >
            {saving ? 'جاري الحفظ والرفع...' : 'حفظ التغيرات ونشر التحديثات'}
          </button>
        </div>
      </form>
    </div>
  );
}
