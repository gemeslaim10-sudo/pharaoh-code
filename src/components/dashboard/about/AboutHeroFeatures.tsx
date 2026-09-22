'use client';
import { useState } from 'react';
import { type AboutFormData, type AboutHeroFeature, EMPTY_ABOUT_HERO_FEATURE } from './aboutDashboardTypes';
import { IconField } from '@/components/dashboard/common/IconField';

const MAX_FEATURES = 4;

interface AboutHeroFeaturesProps {
  form: AboutFormData;
  setForm: React.Dispatch<React.SetStateAction<AboutFormData>>;
}

const FEATURE_META = [
  { defaultTitleAr: 'دقة فرعونية', defaultTitleEn: 'Pharaonic Precision', icon: '🎯' },
  { defaultTitleAr: 'سرعة خارقة', defaultTitleEn: 'Blazing Speed', icon: '⚡' },
  { defaultTitleAr: 'أمان وموثوقية', defaultTitleEn: 'Rock-Solid Security', icon: '🛡️' },
  { defaultTitleAr: 'توسع مستمر', defaultTitleEn: 'Extreme Scalability', icon: '📈' },
];

export function AboutHeroFeatures({ form, setForm }: AboutHeroFeaturesProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('tabs');

  const features = form.hero.features || [];

  const updateFeature = (idx: number, field: keyof AboutHeroFeature, value: string) => {
    const feats = [...(form.hero.features || [])];
    const current = feats[idx] || { ...EMPTY_ABOUT_HERO_FEATURE };
    feats[idx] = { ...current, [field]: value };
    setForm(prev => ({ ...prev, hero: { ...prev.hero, features: feats } }));
  };

  const addFeature = () => {
    if (features.length >= MAX_FEATURES) {
      alert(`الحد الأقصى ${MAX_FEATURES} مميزات في الهيرو`);
      return;
    }
    setForm(prev => ({ ...prev, hero: { ...prev.hero, features: [...(prev.hero.features || []), { ...EMPTY_ABOUT_HERO_FEATURE }] } }));
    setActiveIdx(features.length);
  };

  const removeFeature = (idx: number) => {
    if (features.length <= 1) {
      alert('يجب الإبقاء على ميزة واحدة على الأقل');
      return;
    }
    setForm(prev => ({ ...prev, hero: { ...prev.hero, features: (prev.hero.features || []).filter((_, i) => i !== idx) } }));
    setActiveIdx(prev => (prev >= features.length - 1 ? Math.max(0, features.length - 2) : prev));
  };

  const renderFeatureCard = (feat: AboutHeroFeature | undefined, idx: number) => {
    const meta = FEATURE_META[idx] || { defaultTitleAr: `الميزة ${idx + 1}`, defaultTitleEn: `Feature ${idx + 1}`, icon: '✨' };

    return (
      <div key={idx} className="bg-slate-50 dark:bg-[#0A192F] p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold flex items-center justify-center font-bold text-sm">
              0{idx + 1}
            </span>
            <div>
              <h4 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
                {feat?.title_ar || meta.defaultTitleAr}
              </h4>
              <span className="text-[10px] text-slate-500 dark:text-gray-400 font-mono" dir="ltr">
                {feat?.title_en || meta.defaultTitleEn}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg">{meta.icon}</span>
            {features.length > 1 && (
              <button
                type="button"
                onClick={() => removeFeature(idx)}
                className="text-xs font-bold text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>🗑️</span>
                <span>حذف</span>
              </button>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10">
          <IconField
            label="أيقونة الميزة"
            value={feat?.iconSvg || ''}
            onChange={(value) => updateFeature(idx, 'iconSvg', value)}
          />
          <p className="text-[10px] text-slate-500 dark:text-gray-500 mt-2">اتركها فارغة لاستخدام أيقونة الصح الافتراضية.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Arabic Column */}
          <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
              <span className="text-xs font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-1.5">
                <span>🇸🇦</span>
                <span>المحتوى بالعربية</span>
              </span>
              <span className="text-[10px] text-slate-400">RTL</span>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">العنوان (عربي)</label>
              <input
                type="text"
                placeholder={meta.defaultTitleAr}
                value={feat?.title_ar || ''}
                onChange={(e) => updateFeature(idx, 'title_ar', e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-pharaohGold placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">الوصف (عربي)</label>
              <input
                type="text"
                placeholder="اهتمام بكل تفصيل في الكود وتجربة المستخدم"
                value={feat?.description_ar || ''}
                onChange={(e) => updateFeature(idx, 'description_ar', e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-pharaohGold placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* English Column */}
          <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-3" dir="ltr">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <span>🇬🇧</span>
                <span>English Content</span>
              </span>
              <span className="text-[10px] text-slate-400">LTR</span>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Title (English)</label>
              <input
                type="text"
                placeholder={meta.defaultTitleEn}
                value={feat?.title_en || ''}
                onChange={(e) => updateFeature(idx, 'title_en', e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-pharaohGold placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Description (English)</label>
              <input
                type="text"
                placeholder="Meticulous attention to code & user experience"
                value={feat?.description_en || ''}
                onChange={(e) => updateFeature(idx, 'description_en', e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-pharaohGold placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="border-t border-slate-200 dark:border-white/10 pt-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>✨</span>
            <span>مميزات الهيرو (Hero Features)</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">البطاقات السريعة التي تظهر أسفل هيرو صفحة من نحن (من 1 إلى {MAX_FEATURES}).</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
        {features.length < MAX_FEATURES && (
          <button
            type="button"
            onClick={addFeature}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 dark:bg-pharaohGold/20 text-amber-900 dark:text-pharaohGold border border-amber-500/30 dark:border-pharaohGold/30 hover:bg-amber-500/25 dark:hover:bg-pharaohGold/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>➕</span>
            <span>إضافة ميزة</span>
          </button>
        )}

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#0A192F] p-1 rounded-xl border border-slate-200 dark:border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('tabs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'tabs'
                ? 'bg-amber-800 dark:bg-pharaohGold text-white dark:text-[#0A192F] shadow-sm'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            عرض بالتبويبات
          </button>
          <button
            type="button"
            onClick={() => setViewMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'all'
                ? 'bg-amber-800 dark:bg-pharaohGold text-white dark:text-[#0A192F] shadow-sm'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            عرض الكل
          </button>
        </div>
        </div>
      </div>

      {viewMode === 'tabs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {features.map((feat, idx) => {
              const meta = FEATURE_META[idx] || { defaultTitleAr: `الميزة ${idx + 1}`, icon: '✨' };
              const isActive = activeIdx === idx;
              const title = feat?.title_ar || meta.defaultTitleAr;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`p-3 rounded-2xl border text-right transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/15 dark:bg-[#0A192F] border-amber-500 dark:border-pharaohGold text-slate-900 dark:text-white shadow-md'
                      : 'bg-slate-50 dark:bg-[#0A192F]/60 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:border-amber-500/40 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/15 dark:bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold flex items-center justify-center font-bold text-xs shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-bold truncate">{title}</span>
                  </div>
                  <span className="text-sm shrink-0">{meta.icon}</span>
                </button>
              );
            })}
          </div>

          {renderFeatureCard(features[Math.min(activeIdx, features.length - 1)], Math.min(activeIdx, features.length - 1))}
        </div>
      )}

      {viewMode === 'all' && (
        <div className="space-y-4">
          {features.map((feat, idx) => renderFeatureCard(feat, idx))}
        </div>
      )}
    </div>
  );
}
