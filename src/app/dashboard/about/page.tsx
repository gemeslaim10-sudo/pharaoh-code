'use client';

import { useAboutDashboardForm } from '@/components/dashboard/about/useAboutDashboardForm';
import { AboutTabHero } from '@/components/dashboard/about/AboutTabHero';
import { AboutTabVisionMission } from '@/components/dashboard/about/AboutTabVisionMission';
import { AboutTabPhilosophy } from '@/components/dashboard/about/AboutTabPhilosophy';
import { AboutTabFaq } from '@/components/dashboard/about/AboutTabFaq';

export default function DashboardAboutPage() {
  const {
    loading, saving, activeTab, setActiveTab, message, form, setForm, handleSave
  } = useAboutDashboardForm();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-pharaohGold text-lg font-bold flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-pharaohGold border-t-transparent rounded-full animate-spin" />
          جاري تحميل بيانات صفحة من نحن...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-pharaohGold/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">إدارة محتوى صفحة (من نحن)</h1>
          <p className="text-gray-400 text-sm mt-1">تعديل النصوص العربية والإنجليزية لصفحة About Us مع الحفاظ على القيم الافتراضية</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-pharaohGold text-[#0A192F] px-8 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
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

      {/* Tabs Header */}
      <div className="flex border-b border-white/10 gap-2 overflow-x-auto custom-scrollbar pb-1">
        {[
          { id: 'hero', label: 'القسم الرئيسي (Hero)' },
          { id: 'vision', label: 'الرؤية والرسالة (Vision & Mission)' },
          { id: 'philosophy', label: 'فلسفة التشييد (Philosophy)' },
          { id: 'faq', label: 'الأسئلة الشائعة (FAQ)' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'bg-pharaohGold text-pharaohNavy shadow-md' : 'text-gray-400 hover:text-white bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {activeTab === 'hero' && <AboutTabHero form={form} setForm={setForm} />}
        {activeTab === 'vision' && <AboutTabVisionMission form={form} setForm={setForm} />}
        {activeTab === 'philosophy' && <AboutTabPhilosophy form={form} setForm={setForm} />}
        {activeTab === 'faq' && <AboutTabFaq form={form} setForm={setForm} />}

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
