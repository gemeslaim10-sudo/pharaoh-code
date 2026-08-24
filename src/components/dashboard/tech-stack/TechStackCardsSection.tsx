'use client';
import { useState } from 'react';
import { TechStackFormData } from '@/types/techStack';

const TECH_META = [
  { titleAr: 'الأنظمة الخلفية', titleEn: 'Backend Systems', icon: '💻' },
  { titleAr: 'تطبيقات الجوال', titleEn: 'Mobile Applications', icon: '📱' },
  { titleAr: 'قواعد البيانات والتخزين', titleEn: 'Databases & Storage', icon: '🗄️' },
  { titleAr: 'البنية السحابية', titleEn: 'Cloud Infrastructure', icon: '☁️' },
  { titleAr: 'واجهات وتجربة المستخدم', titleEn: 'Frontend & UI/UX', icon: '🎨' },
  { titleAr: 'الأمن السيبراني والحماية', titleEn: 'Cybersecurity', icon: '🛡️' },
];

interface TechStackCardsSectionProps {
  form: TechStackFormData;
  setForm: React.Dispatch<React.SetStateAction<TechStackFormData>>;
}

export function TechStackCardsSection({ form, setForm }: TechStackCardsSectionProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('tabs');

  const updateCard = (idx: number, updates: any) => {
    const cards = [...(form.cards || [])];
    cards[idx] = { ...cards[idx], ...updates };
    setForm({ ...form, cards });
  };

  const renderTechCard = (card: any, idx: number) => {
    const meta = TECH_META[idx] || { titleAr: `البطاقة ${idx + 1}`, titleEn: `Card ${idx + 1}`, icon: '⚡' };

    return (
      <div key={idx} className="bg-slate-50 dark:bg-[#0A192F] p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold flex items-center justify-center font-bold text-sm">
              #{idx + 1}
            </span>
            <div>
              <h3 className="text-xs md:text-sm font-bold text-slate-900 dark:text-white">
                {card?.title_ar || meta.titleAr}
              </h3>
              <span className="text-[10px] text-slate-500 dark:text-gray-400 font-mono" dir="ltr">
                {card?.title_en || meta.titleEn}
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
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">عنوان مجال التقنية (عربي)</label>
              <input
                type="text"
                placeholder={meta.titleAr}
                value={card?.title_ar || ''}
                onChange={(e) => updateCard(idx, { title_ar: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-pharaohGold placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">وصف التقنيات المستخدمة (عربي)</label>
              <textarea
                rows={3}
                placeholder="تفاصيل الأطر البرمجية والمكتبات المستخدمة..."
                value={card?.desc_ar || card?.description_ar || ''}
                onChange={(e) => updateCard(idx, { desc_ar: e.target.value, description_ar: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white resize-none outline-none focus:border-pharaohGold placeholder:text-slate-400 dark:placeholder:text-gray-600"
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
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Tech Category Title (English)</label>
              <input
                type="text"
                placeholder={meta.titleEn}
                value={card?.title_en || ''}
                onChange={(e) => updateCard(idx, { title_en: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-pharaohGold placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Tech Stack Description (English)</label>
              <textarea
                rows={3}
                placeholder="Frameworks, tools and technologies utilized..."
                value={card?.desc_en || card?.description_en || ''}
                onChange={(e) => updateCard(idx, { desc_en: e.target.value, description_en: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white resize-none outline-none focus:border-pharaohGold placeholder:text-slate-400 dark:placeholder:text-gray-600"
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
            <span>💻</span>
            <span>بطاقات التقنيات الست (6 Tech Cards)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">البطاقات التفصيلية لمجالات وتخصصات الترسانة البرمجية.</p>
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

      {/* Sub-Tabs Grid */}
      {viewMode === 'tabs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {[0, 1, 2, 3, 4, 5].map((idx) => {
              const card = form.cards?.[idx];
              const meta = TECH_META[idx] || { titleAr: `مجال ${idx + 1}`, icon: '⚡' };
              const isActive = activeIdx === idx;
              const title = card?.title_ar || meta.titleAr;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`p-3 rounded-2xl border text-right transition-all flex flex-col items-start justify-between gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/15 dark:bg-[#0A192F] border-amber-500 dark:border-pharaohGold text-slate-900 dark:text-white shadow-md'
                      : 'bg-slate-50 dark:bg-[#0A192F]/60 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:border-amber-500/40 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-base">{meta.icon}</span>
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-amber-600 dark:bg-pharaohGold' : 'bg-transparent'}`} />
                  </div>
                  <span className="text-[11px] font-bold truncate w-full text-right">{title}</span>
                </button>
              );
            })}
          </div>

          {renderTechCard(form.cards?.[activeIdx], activeIdx)}
        </div>
      )}

      {/* All Cards View */}
      {viewMode === 'all' && (
        <div className="space-y-4">
          {[0, 1, 2, 3, 4, 5].map((idx) => renderTechCard(form.cards?.[idx], idx))}
        </div>
      )}
    </div>
  );
}
