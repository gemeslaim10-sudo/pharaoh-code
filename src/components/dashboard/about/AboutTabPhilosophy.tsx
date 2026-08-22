'use client';
import { useState } from 'react';
import { AboutFormData } from './aboutDashboardTypes';

interface AboutTabPhilosophyProps {
  form: AboutFormData;
  setForm: React.Dispatch<React.SetStateAction<AboutFormData>>;
}

const PHIL_META = [
  { defaultTitleAr: 'التحليل العميق', defaultTitleEn: 'Deep Analysis', icon: '🏛️' },
  { defaultTitleAr: 'كود لا يصدأ', defaultTitleEn: 'Stainless Code', icon: '💎' },
  { defaultTitleAr: 'السيادة التقنية', defaultTitleEn: 'Technical Dominance', icon: '👑' },
];

export function AboutTabPhilosophy({ form, setForm }: AboutTabPhilosophyProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('tabs');

  const updatePhilItem = (idx: number, field: string, value: string) => {
    const items = [...(form.philosophy.items || [])];
    const current = items[idx] || { title_ar: '', title_en: '', description_ar: '', description_en: '' };
    items[idx] = { ...current, [field]: value };
    setForm(prev => ({ ...prev, philosophy: { ...prev.philosophy, items } }));
  };

  const renderPhilCard = (item: any, idx: number) => {
    const meta = PHIL_META[idx] || { defaultTitleAr: `البطاقة ${idx + 1}`, defaultTitleEn: `Card ${idx + 1}`, icon: '📌' };

    return (
      <div key={idx} className="bg-slate-50 dark:bg-[#0A192F] p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold flex items-center justify-center font-bold text-sm">
              #{idx + 1}
            </span>
            <div>
              <h4 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
                {item.title_ar || meta.defaultTitleAr}
              </h4>
              <span className="text-[10px] text-slate-500 dark:text-gray-400 font-mono" dir="ltr">
                {item.title_en || meta.defaultTitleEn}
              </span>
            </div>
          </div>
          <span className="text-lg">{meta.icon}</span>
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
                value={item.title_ar || ''}
                onChange={(e) => updatePhilItem(idx, 'title_ar', e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-pharaohGold placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">الوصف (عربي)</label>
              <textarea
                rows={3}
                placeholder="نبدأ بدراسة فكرتك كأنها أساس لمعبد..."
                value={item.description_ar || ''}
                onChange={(e) => updatePhilItem(idx, 'description_ar', e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white outline-none focus:border-pharaohGold resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
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
                value={item.title_en || ''}
                onChange={(e) => updatePhilItem(idx, 'title_en', e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-pharaohGold placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Description (English)</label>
              <textarea
                rows={3}
                placeholder="We study your idea as a temple foundation..."
                value={item.description_en || ''}
                onChange={(e) => updatePhilItem(idx, 'description_en', e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white outline-none focus:border-pharaohGold resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-2">
            <span>🏛️</span>
            <span>فلسفة التشييد الرقمي (Philosophy)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">الركائز الفكرية والهندسية الثلاث التي تميز طريقة عمل الفريق.</p>
        </div>

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

      {/* Subtitles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">العنوان الفرعي (عربي)</label>
          <input
            type="text"
            placeholder="كيف نفكر"
            value={form.philosophy.subtitle_ar || ''}
            onChange={(e) => setForm(prev => ({ ...prev, philosophy: { ...prev.philosophy, subtitle_ar: e.target.value } }))}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Subtitle (English)</label>
          <input
            type="text"
            placeholder="HOW WE THINK"
            value={form.philosophy.subtitle_en || ''}
            onChange={(e) => setForm(prev => ({ ...prev, philosophy: { ...prev.philosophy, subtitle_en: e.target.value } }))}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>

      {/* 3 Philosophy Cards Tabs */}
      {viewMode === 'tabs' && (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-3 gap-2">
            {(form.philosophy.items || [{}, {}, {}]).slice(0, 3).map((item, idx) => {
              const meta = PHIL_META[idx] || { defaultTitleAr: `البطاقة ${idx + 1}`, icon: '📌' };
              const isActive = activeIdx === idx;
              const title = item.title_ar || meta.defaultTitleAr;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/15 dark:bg-[#0A192F] border-amber-500 dark:border-pharaohGold text-slate-900 dark:text-white shadow-md'
                      : 'bg-slate-50 dark:bg-[#0A192F]/60 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:border-amber-500/40 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base shrink-0">{meta.icon}</span>
                    <span className="text-xs font-bold truncate">{title}</span>
                  </div>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-amber-600 dark:bg-pharaohGold' : 'bg-transparent'}`} />
                </button>
              );
            })}
          </div>

          {(form.philosophy.items || [{}, {}, {}])[activeIdx] && renderPhilCard((form.philosophy.items || [{}, {}, {}])[activeIdx], activeIdx)}
        </div>
      )}

      {/* All View */}
      {viewMode === 'all' && (
        <div className="space-y-4 pt-2">
          {form.philosophy.items?.map((item, idx) => renderPhilCard(item, idx))}
        </div>
      )}
    </div>
  );
}
