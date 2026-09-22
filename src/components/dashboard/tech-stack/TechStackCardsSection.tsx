'use client';
import { useState } from 'react';
import { type TechStackFormData, type TechCardItem } from '@/types/techStack';
import { IconField } from '@/components/dashboard/common/IconField';

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
  addCard: () => void;
  removeCard: (idx: number) => void;
}

export function TechStackCardsSection({ form, setForm, addCard, removeCard }: TechStackCardsSectionProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('tabs');

  const cards = form.cards || [];

  const updateCard = (idx: number, updates: Partial<TechCardItem>) => {
    const next = [...(form.cards || [])];
    next[idx] = { ...next[idx], ...updates };
    setForm({ ...form, cards: next });
  };

  const handleAddCard = () => {
    addCard();
    setActiveIdx(cards.length);
  };

  const handleRemoveCard = (idx: number) => {
    if (cards.length <= 1) {
      alert('يجب الإبقاء على بطاقة تقنية واحدة على الأقل');
      return;
    }
    removeCard(idx);
    setActiveIdx(prev => (prev >= cards.length - 1 ? Math.max(0, cards.length - 2) : prev));
  };

  const renderTechCard = (card: TechCardItem | undefined, idx: number) => {
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
          <div className="flex items-center gap-3">
            <span className="text-lg">{meta.icon}</span>
            {cards.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveCard(idx)}
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
            label="أيقونة البطاقة (تظهر في قسم التقنيات بصفحة الخدمات)"
            value={card?.icon || ''}
            onChange={(value) => updateCard(idx, { icon: value })}
          />
          <p className="text-[10px] text-slate-500 dark:text-gray-500 mt-2">اتركها فارغة لاستخدام الأيقونة الافتراضية المدمجة.</p>
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
            <span>بطاقات التقنيات ({cards.length} Tech Cards)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">البطاقات التفصيلية لمجالات وتخصصات الترسانة البرمجية. يمكنك إضافة أو حذف أي عدد من البطاقات.</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
        <button
          type="button"
          onClick={handleAddCard}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 dark:bg-pharaohGold/20 text-amber-900 dark:text-pharaohGold border border-amber-500/30 dark:border-pharaohGold/30 hover:bg-amber-500/25 dark:hover:bg-pharaohGold/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <span>➕</span>
          <span>إضافة بطاقة</span>
        </button>

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

      {/* Sub-Tabs Grid */}
      {viewMode === 'tabs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {cards.map((card, idx) => {
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

          {renderTechCard(cards[Math.min(activeIdx, cards.length - 1)], Math.min(activeIdx, cards.length - 1))}
        </div>
      )}

      {/* All Cards View */}
      {viewMode === 'all' && (
        <div className="space-y-4">
          {cards.map((card, idx) => renderTechCard(card, idx))}
        </div>
      )}
    </div>
  );
}
