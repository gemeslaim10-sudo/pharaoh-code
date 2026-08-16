'use client';
import { AboutFormData } from './aboutDashboardTypes';

interface AboutHeroFeaturesProps {
  form: AboutFormData;
  setForm: React.Dispatch<React.SetStateAction<AboutFormData>>;
}

export function AboutHeroFeatures({ form, setForm }: AboutHeroFeaturesProps) {
  const updateFeature = (idx: number, field: string, value: string) => {
    const feats = [...(form.hero.features || [])];
    const current = feats[idx] || { title_ar: '', title_en: '', description_ar: '', description_en: '' };
    feats[idx] = { ...current, [field]: value };
    setForm(prev => ({ ...prev, hero: { ...prev.hero, features: feats } }));
  };

  return (
    <div className="border-t border-white/10 pt-6">
      <h3 className="text-lg font-bold text-white mb-4">مميزات الهيرو (Features)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feature 1 */}
        <div className="bg-[#0A192F] p-4 rounded-xl border border-white/10 space-y-4">
          <h4 className="text-sm font-bold text-pharaohGold">الميزة الأولى (Feature 1)</h4>
          <div>
            <label className="block text-xs text-gray-400 mb-1">العنوان (عربي)</label>
            <input
              type="text"
              placeholder="دقة فرعونية"
              value={form.hero.features?.[0]?.title_ar || ''}
              onChange={(e) => updateFeature(0, 'title_ar', e.target.value)}
              className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Title (English)</label>
            <input
              type="text"
              placeholder="Pharaonic Precision"
              value={form.hero.features?.[0]?.title_en || ''}
              onChange={(e) => updateFeature(0, 'title_en', e.target.value)}
              className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">الوصف (عربي)</label>
            <input
              type="text"
              placeholder="اهتمام بكل بكسل في الكود"
              value={form.hero.features?.[0]?.description_ar || ''}
              onChange={(e) => updateFeature(0, 'description_ar', e.target.value)}
              className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Description (English)</label>
            <input
              type="text"
              placeholder="Attention to every pixel in code."
              value={form.hero.features?.[0]?.description_en || ''}
              onChange={(e) => updateFeature(0, 'description_en', e.target.value)}
              className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
              dir="ltr"
            />
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-[#0A192F] p-4 rounded-xl border border-white/10 space-y-4">
          <h4 className="text-sm font-bold text-pharaohGold">الميزة الثانية (Feature 2)</h4>
          <div>
            <label className="block text-xs text-gray-400 mb-1">العنوان (عربي)</label>
            <input
              type="text"
              placeholder="سرعة خارقة"
              value={form.hero.features?.[1]?.title_ar || ''}
              onChange={(e) => updateFeature(1, 'title_ar', e.target.value)}
              className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Title (English)</label>
            <input
              type="text"
              placeholder="Blazing Speed"
              value={form.hero.features?.[1]?.title_en || ''}
              onChange={(e) => updateFeature(1, 'title_en', e.target.value)}
              className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">الوصف (عربي)</label>
            <input
              type="text"
              placeholder="أداء لا يعرف البطء أو التعليق"
              value={form.hero.features?.[1]?.description_ar || ''}
              onChange={(e) => updateFeature(1, 'description_ar', e.target.value)}
              className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Description (English)</label>
            <input
              type="text"
              placeholder="Performance without lag or slowdown."
              value={form.hero.features?.[1]?.description_en || ''}
              onChange={(e) => updateFeature(1, 'description_en', e.target.value)}
              className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
              dir="ltr"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
