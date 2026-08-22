'use client';
import { useState } from 'react';
import { FeatureItem } from './serviceFormTypes';

interface ServiceFormOverviewTabProps {
  overviewTitleAr: string;
  setOverviewTitleAr: (val: string) => void;
  overviewTitleEn: string;
  setOverviewTitleEn: (val: string) => void;
  overviewDescAr: string;
  setOverviewDescAr: (val: string) => void;
  overviewDescEn: string;
  setOverviewDescEn: (val: string) => void;
  features: FeatureItem[];
  setFeatures: (features: FeatureItem[]) => void;
}

export function ServiceFormOverviewTab({
  overviewTitleAr,
  setOverviewTitleAr,
  overviewTitleEn,
  setOverviewTitleEn,
  overviewDescAr,
  setOverviewDescAr,
  overviewDescEn,
  setOverviewDescEn,
  features,
  setFeatures,
}: ServiceFormOverviewTabProps) {
  const [activeFeatureIdx, setActiveFeatureIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('tabs');

  const updateFeature = (idx: number, field: keyof FeatureItem, value: string) => {
    const newF = [...features];
    newF[idx] = { ...newF[idx], [field]: value };
    setFeatures(newF);
  };

  const renderFeatureCard = (feat: FeatureItem, idx: number) => (
    <div key={idx} className="bg-white dark:bg-[#112240] p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-xl bg-amber-500/10 dark:bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold flex items-center justify-center font-bold text-xs">
            #{idx + 1}
          </span>
          <h6 className="text-xs font-bold text-slate-900 dark:text-white">
            {feat.title_ar || `الميزة رقم ${idx + 1}`}
          </h6>
        </div>
        <span className="text-[10px] text-slate-500 dark:text-gray-400 font-mono" dir="ltr">
          {feat.title_en || `Feature ${idx + 1}`}
        </span>
      </div>

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
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">عنوان الميزة (عربي)</label>
            <input
              type="text"
              maxLength={60}
              placeholder="مثال: هندسة أكواد مخصصة عالية الأداء"
              value={feat.title_ar || ''}
              onChange={e => updateFeature(idx, 'title_ar', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">شرح الميزة (عربي)</label>
            <textarea
              rows={3}
              maxLength={160}
              placeholder="شرح تفصيلي لما تحققه هذه الميزة للعميل..."
              value={feat.desc_ar || ''}
              onChange={e => updateFeature(idx, 'desc_ar', e.target.value)}
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
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Feature Title (English)</label>
            <input
              type="text"
              maxLength={60}
              placeholder="e.g. Custom High-Performance Engineering"
              value={feat.title_en || ''}
              onChange={e => updateFeature(idx, 'title_en', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Feature Description (English)</label>
            <textarea
              rows={3}
              maxLength={160}
              placeholder="Detailed explanation of the feature benefit..."
              value={feat.desc_en || ''}
              onChange={e => updateFeature(idx, 'desc_en', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Panel 1: Overview Header & Description */}
      <div className="bg-slate-50 dark:bg-[#0A192F] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-5 shadow-sm">
        <div className="border-b border-slate-200 dark:border-white/10 pb-3">
          <h5 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-amber-800 dark:text-pharaohGold text-lg">📋</span>
            <span>نظرة عامة على الخدمة (Service Overview)</span>
          </h5>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">العنوان والشرح العام الفني الذي يظهر في مقدمة صفحة تفاصيل الخدمة.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Arabic Overview */}
          <div className="bg-white dark:bg-[#112240] p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
              <span className="text-xs font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-1.5">
                <span>🇸🇦</span>
                <span>النظرة العامة بالعربية</span>
              </span>
              <span className="text-[10px] text-slate-400">RTL</span>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">عنوان القسم العلوي (عربي)</label>
              <input
                type="text"
                maxLength={60}
                placeholder="مثال: نظرة عامة على هندسة الخدمة"
                value={overviewTitleAr}
                onChange={e => setOverviewTitleAr(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">فقرة الشرح للنظرة العامة (عربي)</label>
              <textarea
                rows={3}
                maxLength={250}
                placeholder="نحن لا نعتمد على حلول جاهزة؛ بل نعتمد على هندسة أكواد مخصصة مصممة للنمو والتوسع السريع..."
                value={overviewDescAr}
                onChange={e => setOverviewDescAr(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white resize-none focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* English Overview */}
          <div className="bg-white dark:bg-[#112240] p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3" dir="ltr">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <span>🇬🇧</span>
                <span>English Overview</span>
              </span>
              <span className="text-[10px] text-slate-400">LTR</span>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Overview Section Title (English)</label>
              <input
                type="text"
                maxLength={60}
                placeholder="e.g. Technical Service Overview"
                value={overviewTitleEn}
                onChange={e => setOverviewTitleEn(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Overview Description (English)</label>
              <textarea
                rows={3}
                maxLength={250}
                placeholder="We engineer custom, high-performance software code built for extreme scalability..."
                value={overviewDescEn}
                onChange={e => setOverviewDescEn(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white resize-none focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Panel 2: 3 Key Features */}
      <div className="bg-slate-50 dark:bg-[#0A192F] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <h5 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-amber-800 dark:text-pharaohGold text-lg">⭐</span>
              <span>المميزات الرئيسية الثلاث (3 Key Features)</span>
            </h5>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">البنود الثلاثة الجوهرية المميزة للخدمة في الواجهة.</p>
          </div>

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

        {viewMode === 'tabs' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {features?.map((feat, idx) => {
                const isActive = activeFeatureIdx === idx;
                const title = feat.title_ar || `الميزة ${idx + 1}`;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveFeatureIdx(idx)}
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
                    <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-amber-600 dark:bg-pharaohGold' : 'bg-transparent'}`} />
                  </button>
                );
              })}
            </div>

            {features[activeFeatureIdx] && renderFeatureCard(features[activeFeatureIdx], activeFeatureIdx)}
          </div>
        )}

        {viewMode === 'all' && (
          <div className="space-y-4">
            {features?.map((feat, idx) => renderFeatureCard(feat, idx))}
          </div>
        )}
      </div>
    </div>
  );
}
