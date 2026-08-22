'use client';

import { useState } from 'react';
import { HeroThemeModeSection } from './hero/HeroThemeModeSection';
import { useHeroThemeSettings } from './hero/useHeroThemeSettings';
import { DashboardAccordionGroup } from '../layout/DashboardAccordionGroup';

export default function SettingsHeroTheme() {
  const {
    loading,
    initialLoad,
    config,
    setConfig,
    uploadingField,
    handleFileUpload,
    handleSubmit,
  } = useHeroThemeSettings();

  const [openDark, setOpenDark] = useState(true);
  const [openLight, setOpenLight] = useState(true);

  if (initialLoad) {
    return <div className="p-10 text-center text-pharaohGold">جاري تحميل إعدادات الهيرو والألوان...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Background info tip */}
      <div className="bg-[#0A192F] border border-pharaohGold/30 p-4 rounded-2xl flex items-center gap-4 text-xs text-gray-300 shadow-md">
        <div className="text-2xl">🎬</div>
        <div>
          <span className="font-bold text-pharaohGold block">فيديوهات الخلفية الافتراضية:</span>
          إذا تركْتَ حقول الفيديوهات فارغة، ستقوم المنصة باستخدام الفيديوهات الافتراضية السريعة تلقائياً.
        </div>
      </div>

      {/* Group 1: Dark Mode Hero */}
      <DashboardAccordionGroup
        group={{
          id: 'hero-dark',
          title: '🌙 تخصيص ميديا وألوان الهيرو في الوضع الداكن (Dark Mode)',
          description: 'تحديد خلفيات الفيديو أو الصور وقوالب التدرجات اللونية للثيم الليلي',
          icon: <span className="text-base">🌙</span>,
          badge: 'Dark',
          children: (
            <HeroThemeModeSection
              mode="dark"
              title="تخصيص ميديا وألوان الهيرو في الوضع الداكن"
              slide1Media={config.darkSlide1Media || config.darkSlide1Video || config.darkSlide1Image || ''}
              setSlide1Media={val => setConfig(prev => ({ ...prev, darkSlide1Media: val, darkSlide1Video: val, darkSlide1Image: val }))}
              slide2Media={config.darkSlide2Media || config.darkSlide2Video || config.darkSlide2Image || ''}
              setSlide2Media={val => setConfig(prev => ({ ...prev, darkSlide2Media: val, darkSlide2Video: val, darkSlide2Image: val }))}
              selectedPreset={config.darkPreset || 'royal_gold'}
              onSelectPreset={id => setConfig(prev => ({ ...prev, darkPreset: id }))}
              uploadingField={uploadingField}
              onFileUpload={handleFileUpload}
            />
          ),
        }}
        isOpen={openDark}
        onToggle={() => setOpenDark(!openDark)}
      />

      {/* Group 2: Light Mode Hero */}
      <DashboardAccordionGroup
        group={{
          id: 'hero-light',
          title: '☀️ تخصيص ميديا وألوان الهيرو في الوضع الفاتح (Light Mode)',
          description: 'تحديد خلفيات الفيديو أو الصور وقوالب التدرجات اللونية للثيم النهاري',
          icon: <span className="text-base">☀️</span>,
          badge: 'Light',
          children: (
            <HeroThemeModeSection
              mode="light"
              title="تخصيص ميديا وألوان الهيرو في الوضع الفاتح"
              slide1Media={config.lightSlide1Media || config.lightSlide1Video || config.lightSlide1Image || ''}
              setSlide1Media={val => setConfig(prev => ({ ...prev, lightSlide1Media: val, lightSlide1Video: val, lightSlide1Image: val }))}
              slide2Media={config.lightSlide2Media || config.lightSlide2Video || config.lightSlide2Image || ''}
              setSlide2Media={val => setConfig(prev => ({ ...prev, lightSlide2Media: val, lightSlide2Video: val, lightSlide2Image: val }))}
              selectedPreset={config.lightPreset || 'royal_gold'}
              onSelectPreset={id => setConfig(prev => ({ ...prev, lightPreset: id }))}
              uploadingField={uploadingField}
              onFileUpload={handleFileUpload}
            />
          ),
        }}
        isOpen={openLight}
        onToggle={() => setOpenLight(!openLight)}
      />

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'جاري الحفظ...' : 'حفظ وتطبيق إعدادات الهيرو والألوان'}
        </button>
      </div>
    </form>
  );
}
