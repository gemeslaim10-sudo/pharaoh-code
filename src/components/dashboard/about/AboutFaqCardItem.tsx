'use client';
import { AboutFaqItem } from './aboutDashboardTypes';

interface AboutFaqCardItemProps {
  faqItem: AboutFaqItem;
  idx: number;
  onUpdate: (idx: number, field: string, value: string) => void;
  onRemove: (idx: number) => void;
}

export function AboutFaqCardItem({ faqItem, idx, onUpdate, onRemove }: AboutFaqCardItemProps) {
  return (
    <div className="bg-slate-50 dark:bg-[#0A192F] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-4 relative shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
        <h4 className="text-sm font-bold text-amber-800 dark:text-pharaohGold">السؤال رقم {idx + 1}</h4>
        <button
          type="button"
          onClick={() => onRemove(idx)}
          className="text-red-600 dark:text-red-400 hover:text-red-700 text-xs font-bold bg-red-500/10 hover:bg-red-500/20 px-3 py-1 rounded-lg transition-all border border-red-500/20 cursor-pointer"
        >
          حذف السؤال
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-600 dark:text-gray-400 mb-1">السؤال (عربي)</label>
          <input
            type="text"
            placeholder="مثال: ما هي الخدمات التي تقدمونها؟"
            value={faqItem.question_ar || faqItem.question || ''}
            onChange={(e) => onUpdate(idx, 'question_ar', e.target.value)}
            className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-pharaohGold placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-600 dark:text-gray-400 mb-1">Question (English)</label>
          <input
            type="text"
            placeholder="e.g. What services do you offer?"
            value={faqItem.question_en || ''}
            onChange={(e) => onUpdate(idx, 'question_en', e.target.value)}
            className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-pharaohGold placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-600 dark:text-gray-400 mb-1">الإجابة (عربي)</label>
          <textarea
            rows={3}
            placeholder="مثال: نقدم خدمات تطوير الويب المتقدمة..."
            value={faqItem.answer_ar || faqItem.answer || ''}
            onChange={(e) => onUpdate(idx, 'answer_ar', e.target.value)}
            className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-pharaohGold resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-600 dark:text-gray-400 mb-1">Answer (English)</label>
          <textarea
            rows={3}
            placeholder="e.g. We offer advanced web development..."
            value={faqItem.answer_en || ''}
            onChange={(e) => onUpdate(idx, 'answer_en', e.target.value)}
            className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-pharaohGold resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>
    </div>
  );
}
