'use client';

import { HeroThemeModeSection } from './hero/HeroThemeModeSection';
import { useHeroThemeSettings } from './hero/useHeroThemeSettings';

export default function SettingsHeroTheme() {
  const {
    loading,
    initialLoad,
    config,
    setConfig,
    uploadingField,
    handleFileUpload,
    handleSubmit
  } = useHeroThemeSettings();

  if (initialLoad) {
    return <div className="p-10 text-center text-pharaohGold">جاري تحميل إعدادات الهيرو والألوان...</div>;
  }

  return (
    <div id="sec-hero-theme" className="section-panel hidden space-y-10">
      <form onSubmit={handleSubmit} className="bg-pharaohCard border border-white/5 rounded-3xl p-6 lg:p-10 shadow-2xl relative space-y-10">
        <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-pharaohGold text-pharaohNavy font-black text-[10px] uppercase tracking-[3px] px-4 py-1.5 rounded-full shadow-lg">
          HERO MEDIA & COLORS
        </div>

        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-3 text-pharaohGold mb-2">
            <span className="w-2.5 h-2.5 bg-pharaohGold rounded-full" />
            إدارة فيديوهات وألوان قسم الهيرو (Hero Section Customizer)
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed">
            قم بتحديد الفيديوهات وقوالب الألوان المخصصة لقسم الهيرو بشكل مستقل في الوضع الداكن والوضع الفاتح.
          </p>
        </div>

        <div className="bg-[#0A192F] border border-pharaohGold/30 p-4 rounded-2xl flex items-center gap-4 text-xs text-gray-300">
          <div className="text-2xl">🎬</div>
          <div>
            <span className="font-bold text-pharaohGold block">فيديوهات الخلفية الافتراضية:</span>
            إذا تركْتَ حقول الفيديوهات فارغة، ستقوم المنصة باستخدام الفيديوهات الافتراضية السريعة تلقائياً.
          </div>
        </div>

        {/* Dark Mode Hero Section */}
        <HeroThemeModeSection
          mode="dark"
          title="🌙 تخصيص ميديا (صورة أو فيديو) وألوان الهيرو في الوضع الداكن (Dark Mode Hero)"
          slide1Media={config.darkSlide1Media || config.darkSlide1Video || config.darkSlide1Image || ''}
          setSlide1Media={val => setConfig(prev => ({ ...prev, darkSlide1Media: val, darkSlide1Video: val, darkSlide1Image: val }))}
          slide2Media={config.darkSlide2Media || config.darkSlide2Video || config.darkSlide2Image || ''}
          setSlide2Media={val => setConfig(prev => ({ ...prev, darkSlide2Media: val, darkSlide2Video: val, darkSlide2Image: val }))}
          selectedPreset={config.darkPreset || 'royal_gold'}
          onSelectPreset={id => setConfig(prev => ({ ...prev, darkPreset: id }))}
          uploadingField={uploadingField}
          onFileUpload={handleFileUpload}
        />

        {/* Light Mode Hero Section */}
        <HeroThemeModeSection
          mode="light"
          title="☀️ تخصيص ميديا (صورة أو فيديو) وألوان الهيرو في الوضع الفاتح (Light Mode Hero)"
          slide1Media={config.lightSlide1Media || config.lightSlide1Video || config.lightSlide1Image || ''}
          setSlide1Media={val => setConfig(prev => ({ ...prev, lightSlide1Media: val, lightSlide1Video: val, lightSlide1Image: val }))}
          slide2Media={config.lightSlide2Media || config.lightSlide2Video || config.lightSlide2Image || ''}
          setSlide2Media={val => setConfig(prev => ({ ...prev, lightSlide2Media: val, lightSlide2Video: val, lightSlide2Image: val }))}
          selectedPreset={config.lightPreset || 'royal_gold'}
          onSelectPreset={id => setConfig(prev => ({ ...prev, lightPreset: id }))}
          uploadingField={uploadingField}
          onFileUpload={handleFileUpload}
        />

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'جاري الحفظ...' : 'حفظ وتطبيق إعدادات الهيرو والألوان'}
          </button>
        </div>
      </form>
    </div>
  );
}
