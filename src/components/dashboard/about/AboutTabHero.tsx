'use client';
import { type AboutFormData } from './aboutDashboardTypes';
import { AboutHeroFeatures } from './AboutHeroFeatures';
import { MediaUploadField } from '@/components/dashboard/common/MediaUploadField';

interface AboutTabHeroProps {
  form: AboutFormData;
  setForm: React.Dispatch<React.SetStateAction<AboutFormData>>;
}

export function AboutTabHero({ form, setForm }: AboutTabHeroProps) {
  const updateHero = (field: string, value: string) => {
    setForm(prev => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };

  return (
    <div className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
      <h2 className="text-xl font-bold text-amber-800 dark:text-pharaohGold border-b border-slate-200 dark:border-white/10 pb-3">تعديل قسم الهيرو (Hero Section)</h2>

      {/* Hero image */}
      <div className="bg-slate-50 dark:bg-[#0A192F] p-5 rounded-2xl border border-slate-200 dark:border-white/10">
        <MediaUploadField
          label="صورة الهيرو في صفحة من نحن"
          value={form.hero.imageUrl || ''}
          onChange={(url) => updateHero('imageUrl', url)}
          accept="image"
          previewClassName="w-full h-40"
          hint="صورة رأسية يفضل 1000x1200 بكسل — JPG, PNG, WebP, AVIF حتى 8 ميجابايت"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">العنوان الفرعي (عربي)</label>
          <input
            type="text"
            placeholder="رؤيتنا وإرثنا"
            value={form.hero.subtitle_ar || ''}
            onChange={(e) => updateHero('subtitle_ar', e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Subtitle (English)</label>
          <input
            type="text"
            placeholder="Legacy & Vision"
            value={form.hero.subtitle_en || ''}
            onChange={(e) => updateHero('subtitle_en', e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">العنوان الرئيسي - الجزء الأول (عربي)</label>
          <input
            type="text"
            placeholder="حيث يلتقي ذكاء الكود"
            value={form.hero.titlePart1_ar || ''}
            onChange={(e) => updateHero('titlePart1_ar', e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Title Part 1 (English)</label>
          <input
            type="text"
            placeholder="Where Code Mastery Meets"
            value={form.hero.titlePart1_en || ''}
            onChange={(e) => updateHero('titlePart1_en', e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">العنوان الرئيسي - الجزء الذهبي (عربي)</label>
          <input
            type="text"
            placeholder="بعظمة الأجداد"
            value={form.hero.titlePart2_ar || ''}
            onChange={(e) => updateHero('titlePart2_ar', e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Title Part 2 (English)</label>
          <input
            type="text"
            placeholder="Legacy Engineering"
            value={form.hero.titlePart2_en || ''}
            onChange={(e) => updateHero('titlePart2_en', e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">وصف الهيرو (عربي)</label>
          <textarea
            rows={4}
            placeholder="في Pharaoh Code، نحن لا نكتفي ببرمجة تطبيقات..."
            value={form.hero.description_ar || ''}
            onChange={(e) => updateHero('description_ar', e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Hero Description (English)</label>
          <textarea
            rows={4}
            placeholder="At Pharaoh Code, we don't just write apps..."
            value={form.hero.description_en || ''}
            onChange={(e) => updateHero('description_en', e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">نص الزر (عربي)</label>
          <input
            type="text"
            placeholder="استكشف عالمنا"
            value={form.hero.buttonText_ar || ''}
            onChange={(e) => updateHero('buttonText_ar', e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Button Text (English)</label>
          <input
            type="text"
            placeholder="Explore Our World"
            value={form.hero.buttonText_en || ''}
            onChange={(e) => updateHero('buttonText_en', e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">شارة سنة التأسيس فوق الصورة (عربي)</label>
          <input
            type="text"
            placeholder="منذ 2020"
            value={form.hero.establishedText_ar || ''}
            onChange={(e) => updateHero('establishedText_ar', e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Established Badge (English)</label>
          <input
            type="text"
            placeholder="Since 2020"
            value={form.hero.establishedText_en || ''}
            onChange={(e) => updateHero('establishedText_en', e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">رابط زر الهيرو (Button Link)</label>
        <input
          type="text"
          placeholder="/portfolio"
          value={form.hero.buttonLink || ''}
          onChange={(e) => updateHero('buttonLink', e.target.value)}
          className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          dir="ltr"
        />
        <p className="text-[11px] text-slate-500 dark:text-gray-500 mt-1">مسار داخلي مثل /portfolio أو رابط خارجي كامل. الافتراضي: /portfolio</p>
      </div>

      <AboutHeroFeatures form={form} setForm={setForm} />
    </div>
  );
}
