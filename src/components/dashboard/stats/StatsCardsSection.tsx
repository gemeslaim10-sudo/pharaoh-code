'use client';

import { useState } from 'react';
import { StatsSectionData, StatItemData } from '@/app/actions/dashboard/stats';

interface StatsCardsSectionProps {
  form: StatsSectionData;
  setForm: React.Dispatch<React.SetStateAction<StatsSectionData>>;
}

const PRESET_ICONS = [
  {
    name: 'فريق العمل (Team)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`
  },
  {
    name: 'العملاء (Clients)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
  },
  {
    name: 'المشاريع المنجزة (Projects)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
  },
  {
    name: 'سنوات الخبرة (Experience)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08-.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
  },
  {
    name: 'النمو والسرعة (Rocket)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`
  },
  {
    name: 'الأمان والجودة (Shield)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>`
  },
  {
    name: 'الكود والبرمجة (Code)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`
  },
  {
    name: 'الجوائز والريادة (Award)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>`
  }
];

export function StatsCardsSection({ form, setForm }: StatsCardsSectionProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const items = form.items || [];

  const updateItem = (idx: number, field: keyof StatItemData, value: string) => {
    const newItems = [...items];
    newItems[idx] = { ...newItems[idx], [field]: value };
    setForm(prev => ({ ...prev, items: newItems }));
  };

  const renderCardEditor = (item: StatItemData, idx: number) => {
    const rawVal = item.value || '0';
    const prefix = item.prefix || '';
    const suffix = item.suffix || '';

    return (
      <div key={idx} className="bg-slate-50 dark:bg-[#0A192F] p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6">
        {/* Header with Live Mini-Preview */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/15 dark:bg-pharaohGold/20 text-amber-800 dark:text-pharaohGold flex items-center justify-center font-black text-sm">
              0{idx + 1}
            </span>
            <div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">
                {item.title_ar || `البطاقة #${idx + 1}`}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-gray-400 font-mono" dir="ltr">
                {item.title_en || `Stat Card ${idx + 1}`}
              </p>
            </div>
          </div>

          {/* Mini Preview Box */}
          <div className="flex items-center gap-3 bg-white dark:bg-[#112240] px-4 py-2 rounded-xl border border-amber-500/20 shadow-xs">
            <div 
              className="w-6 h-6 text-amber-800 dark:text-pharaohGold flex items-center justify-center shrink-0"
              dangerouslySetInnerHTML={{ __html: item.iconSvg || '' }}
            />
            <div className="text-right">
              <span className="text-sm font-black font-mono text-amber-800 dark:text-pharaohGold">
                {prefix}{rawVal}{suffix}
              </span>
              <span className="text-[10px] block font-bold text-slate-600 dark:text-gray-300">
                {item.title_ar || 'التسمية'}
              </span>
            </div>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
              البادئة (Prefix e.g. +)
            </label>
            <input
              type="text"
              maxLength={5}
              placeholder="+"
              value={item.prefix || ''}
              onChange={e => updateItem(idx, 'prefix', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
              القيمة الرقمية (Stat Value)
            </label>
            <input
              type="text"
              maxLength={15}
              placeholder="مثال: 150"
              value={item.value || ''}
              onChange={e => updateItem(idx, 'value', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-mono font-bold focus:border-pharaohGold outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
              اللاحقة (Suffix e.g. % أو +)
            </label>
            <input
              type="text"
              maxLength={5}
              placeholder="%"
              value={item.suffix || ''}
              onChange={e => updateItem(idx, 'suffix', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none"
            />
          </div>
        </div>

        {/* Multilingual Labels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
              تسمية الإحصائية (عربي)
            </label>
            <input
              type="text"
              maxLength={60}
              placeholder="مثال: مشروع منجز"
              value={item.title_ar || ''}
              onChange={e => updateItem(idx, 'title_ar', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div dir="ltr">
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1 text-left">
              Stat Label (English)
            </label>
            <input
              type="text"
              maxLength={60}
              placeholder="e.g. Completed Projects"
              value={item.title_en || ''}
              onChange={e => updateItem(idx, 'title_en', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* Icon Selection & Raw SVG Editor */}
        <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🎨</span>
              <span>أيقونة البطاقة (Icon Selection)</span>
            </span>
            <span className="text-[11px] text-slate-500 dark:text-gray-400">
              اختر أيقونة جاهزة أو الصق كود SVG
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESET_ICONS.map((preset, pIdx) => {
              const isSelected = item.iconSvg === preset.svg;
              return (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => updateItem(idx, 'iconSvg', preset.svg)}
                  className={`p-2.5 rounded-xl border text-right text-xs transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 dark:bg-pharaohGold/25 border-amber-500 dark:border-pharaohGold text-amber-900 dark:text-pharaohGold font-bold shadow-xs'
                      : 'bg-slate-50 dark:bg-[#0A192F] border-slate-200 dark:border-white/5 text-slate-700 dark:text-gray-300 hover:border-amber-400'
                  }`}
                >
                  <div
                    className="w-5 h-5 shrink-0 text-amber-800 dark:text-pharaohGold"
                    dangerouslySetInnerHTML={{ __html: preset.svg }}
                  />
                  <span className="truncate text-[11px]">{preset.name}</span>
                </button>
              );
            })}
          </div>

          {/* Custom SVG Textarea */}
          <div className="pt-2">
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
              كود الـ SVG المخصص (Custom SVG Code)
            </label>
            <textarea
              rows={2}
              value={item.iconSvg || ''}
              onChange={e => updateItem(idx, 'iconSvg', e.target.value)}
              placeholder='<svg ...>...</svg>'
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-2.5 text-[11px] font-mono text-slate-900 dark:text-white resize-none focus:border-pharaohGold outline-none"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
      <div className="border-b border-slate-200 dark:border-white/10 pb-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2.5">
          <span className="text-amber-800 dark:text-pharaohGold text-xl">📊</span>
          <span>بطاقات الإحصائيات الأربعة (4 Stat Metrics Cards)</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
          تعديل الأرقام، الرموز، العناوين باللغتين، والأيقونات للبطاقات الأربعة الرئيسية المعروضة في الصفحة الرئيسية.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {items.map((it, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between gap-2 cursor-pointer ${
                isActive
                  ? 'bg-amber-500/15 dark:bg-[#0A192F] border-amber-500 dark:border-pharaohGold text-slate-900 dark:text-white shadow-md'
                  : 'bg-slate-50 dark:bg-[#0A192F]/60 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:border-amber-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-6 h-6 rounded-lg bg-amber-500/15 dark:bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold flex items-center justify-center font-bold text-xs shrink-0">
                  0{idx + 1}
                </span>
                <span className="text-xs font-bold truncate">
                  {it.title_ar || `البطاقة ${idx + 1}`}
                </span>
              </div>
              <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-amber-600 dark:bg-pharaohGold' : 'bg-transparent'}`} />
            </button>
          );
        })}
      </div>

      {/* Active Editor */}
      {items[activeIdx] && renderCardEditor(items[activeIdx], activeIdx)}
    </div>
  );
}
