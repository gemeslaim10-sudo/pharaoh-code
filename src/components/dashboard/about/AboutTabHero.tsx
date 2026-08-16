'use client';
import { AboutFormData } from './aboutDashboardTypes';
import { AboutHeroFeatures } from './AboutHeroFeatures';

interface AboutTabHeroProps {
  form: AboutFormData;
  setForm: React.Dispatch<React.SetStateAction<AboutFormData>>;
}

export function AboutTabHero({ form, setForm }: AboutTabHeroProps) {
  const updateHero = (field: string, value: string) => {
    setForm(prev => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };

  return (
    <div className="bg-[#112240] p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
      <h2 className="text-xl font-bold text-pharaohGold border-b border-white/10 pb-3">تعديل قسم الهيرو (Hero Section)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الفرعي (عربي)</label>
          <input
            type="text"
            placeholder="رؤيتنا وإرثنا"
            value={form.hero.subtitle_ar || ''}
            onChange={(e) => updateHero('subtitle_ar', e.target.value)}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">Subtitle (English)</label>
          <input
            type="text"
            placeholder="Legacy & Vision"
            value={form.hero.subtitle_en || ''}
            onChange={(e) => updateHero('subtitle_en', e.target.value)}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الرئيسي - الجزء الأول (عربي)</label>
          <input
            type="text"
            placeholder="حيث يلتقي ذكاء الكود"
            value={form.hero.titlePart1_ar || ''}
            onChange={(e) => updateHero('titlePart1_ar', e.target.value)}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">Title Part 1 (English)</label>
          <input
            type="text"
            placeholder="Where Code Mastery Meets"
            value={form.hero.titlePart1_en || ''}
            onChange={(e) => updateHero('titlePart1_en', e.target.value)}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الرئيسي - الجزء الذهبي (عربي)</label>
          <input
            type="text"
            placeholder="بعظمة الأجداد"
            value={form.hero.titlePart2_ar || ''}
            onChange={(e) => updateHero('titlePart2_ar', e.target.value)}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">Title Part 2 (English)</label>
          <input
            type="text"
            placeholder="Legacy Engineering"
            value={form.hero.titlePart2_en || ''}
            onChange={(e) => updateHero('titlePart2_en', e.target.value)}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">وصف الهيرو (عربي)</label>
          <textarea
            rows={4}
            placeholder="في Pharaoh Code، نحن لا نكتفي ببرمجة تطبيقات..."
            value={form.hero.description_ar || ''}
            onChange={(e) => updateHero('description_ar', e.target.value)}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none resize-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">Hero Description (English)</label>
          <textarea
            rows={4}
            placeholder="At Pharaoh Code, we don't just write apps..."
            value={form.hero.description_en || ''}
            onChange={(e) => updateHero('description_en', e.target.value)}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none resize-none"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">نص الزر (عربي)</label>
          <input
            type="text"
            placeholder="استكشف عالمنا"
            value={form.hero.buttonText_ar || ''}
            onChange={(e) => updateHero('buttonText_ar', e.target.value)}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">Button Text (English)</label>
          <input
            type="text"
            placeholder="Explore Our World"
            value={form.hero.buttonText_en || ''}
            onChange={(e) => updateHero('buttonText_en', e.target.value)}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
            dir="ltr"
          />
        </div>
      </div>

      <AboutHeroFeatures form={form} setForm={setForm} />
    </div>
  );
}
