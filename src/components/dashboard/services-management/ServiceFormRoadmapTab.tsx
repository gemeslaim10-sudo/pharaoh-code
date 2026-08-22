'use client';
import { useState } from 'react';
import { RoadmapStepItem } from './serviceFormTypes';

interface ServiceFormRoadmapTabProps {
  roadmapSteps: RoadmapStepItem[];
  setRoadmapSteps: (steps: RoadmapStepItem[]) => void;
}

const STEP_LABELS = [
  { defaultTitleAr: 'المرحلة الأولى: التحليل والتخطيط', defaultTitleEn: 'Phase 1: Planning', icon: '🔍' },
  { defaultTitleAr: 'المرحلة الثانية: التصميم والنماذج', defaultTitleEn: 'Phase 2: UI/UX Design', icon: '🎨' },
  { defaultTitleAr: 'المرحلة الثالثة: التطوير والبرمجة', defaultTitleEn: 'Phase 3: Development', icon: '💻' },
  { defaultTitleAr: 'المرحلة الرابعة: الاختبار والإطلاق', defaultTitleEn: 'Phase 4: Launch & QA', icon: '🚀' },
];

export function ServiceFormRoadmapTab({
  roadmapSteps,
  setRoadmapSteps,
}: ServiceFormRoadmapTabProps) {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('tabs');

  const updateStep = (idx: number, field: keyof RoadmapStepItem, value: string) => {
    const next = [...roadmapSteps];
    next[idx] = { ...next[idx], [field]: value };
    setRoadmapSteps(next);
  };

  const renderStepCard = (step: RoadmapStepItem, idx: number) => {
    const meta = STEP_LABELS[idx] || { defaultTitleAr: `المرحلة ${idx + 1}`, defaultTitleEn: `Phase ${idx + 1}`, icon: '📌' };

    return (
      <div key={idx} className="bg-white dark:bg-[#112240] p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
        {/* Step Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold flex items-center justify-center font-black text-sm">
              {step.number || `0${idx + 1}`}
            </span>
            <div>
              <h6 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
                {step.title_ar || meta.defaultTitleAr}
              </h6>
              <span className="text-[10px] text-slate-500 dark:text-gray-400 font-mono block" dir="ltr">
                {step.title_en || meta.defaultTitleEn}
              </span>
            </div>
          </div>
          <span className="text-base">{meta.icon}</span>
        </div>

        {/* Multilingual Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Arabic Column */}
          <div className="bg-slate-50 dark:bg-[#0A192F] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
              <span className="text-xs font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-1.5">
                <span>🇸🇦</span>
                <span>المحتوى بالعربية</span>
              </span>
              <span className="text-[10px] text-slate-400">RTL</span>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">عنوان الخطوة (عربي)</label>
              <input
                type="text"
                maxLength={60}
                placeholder="مثال: مرحلة التحليل والنمذجة"
                value={step.title_ar || ''}
                onChange={e => updateStep(idx, 'title_ar', e.target.value)}
                className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">شرح تفصيلي للخطوة (عربي)</label>
              <textarea
                rows={3}
                maxLength={160}
                placeholder="شرح مختصر لما يتم تنفيذه وتسليمه في هذه المرحلة..."
                value={step.desc_ar || ''}
                onChange={e => updateStep(idx, 'desc_ar', e.target.value)}
                className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* English Column */}
          <div className="bg-slate-50 dark:bg-[#0A192F] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-3" dir="ltr">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <span>🇬🇧</span>
                <span>English Content</span>
              </span>
              <span className="text-[10px] text-slate-400">LTR</span>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Step Title (English)</label>
              <input
                type="text"
                maxLength={60}
                placeholder="e.g. Planning & Analysis Phase"
                value={step.title_en || ''}
                onChange={e => updateStep(idx, 'title_en', e.target.value)}
                className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Step Description (English)</label>
              <textarea
                rows={3}
                maxLength={160}
                placeholder="Concise overview of phase execution and deliverables..."
                value={step.desc_en || ''}
                onChange={e => updateStep(idx, 'desc_en', e.target.value)}
                className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 dark:bg-[#0A192F] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h5 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-amber-800 dark:text-pharaohGold text-lg">🗺️</span>
            <span>خطوات ومراحل العمل الأربعة (4 Roadmap Steps)</span>
          </h5>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">مخطط تسلسل العمل الزمني الذي يشاهده العميل في صفحة تفاصيل الخدمة.</p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-[#112240] p-1 rounded-xl border border-slate-300 dark:border-white/10 self-start sm:self-auto shrink-0">
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

      {/* Interactive Step Navigator */}
      {viewMode === 'tabs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {roadmapSteps?.map((step, idx) => {
              const meta = STEP_LABELS[idx] || { defaultTitleAr: `المرحلة ${idx + 1}`, icon: '📌' };
              const isActive = activeStepIdx === idx;
              const title = step.title_ar || meta.defaultTitleAr;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveStepIdx(idx)}
                  className={`p-3 rounded-2xl border text-right transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/15 dark:bg-[#112240] border-amber-500 dark:border-pharaohGold text-slate-900 dark:text-white shadow-md'
                      : 'bg-white dark:bg-[#112240]/60 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:border-amber-500/40 hover:text-slate-900 dark:hover:text-white'
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

          {roadmapSteps[activeStepIdx] && renderStepCard(roadmapSteps[activeStepIdx], activeStepIdx)}
        </div>
      )}

      {/* All Steps View */}
      {viewMode === 'all' && (
        <div className="space-y-4">
          {roadmapSteps?.map((step, idx) => renderStepCard(step, idx))}
        </div>
      )}
    </div>
  );
}
