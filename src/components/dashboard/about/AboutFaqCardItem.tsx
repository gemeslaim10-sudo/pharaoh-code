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
    <div className="bg-[#0A192F] p-4 rounded-xl border border-white/10 space-y-4 relative">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <h4 className="text-sm font-bold text-pharaohGold">السؤال رقم {idx + 1}</h4>
        <button
          type="button"
          onClick={() => onRemove(idx)}
          className="text-red-400 hover:text-red-300 text-xs font-bold bg-red-500/10 hover:bg-red-500/20 px-3 py-1 rounded-lg transition-all border border-red-500/20"
        >
          حذف السؤال
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">السؤال (عربي)</label>
          <input
            type="text"
            placeholder="مثال: ما هي الخدمات التي تقدمونها؟"
            value={faqItem.question_ar || faqItem.question || ''}
            onChange={(e) => onUpdate(idx, 'question_ar', e.target.value)}
            className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-pharaohGold"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Question (English)</label>
          <input
            type="text"
            placeholder="e.g. What services do you offer?"
            value={faqItem.question_en || ''}
            onChange={(e) => onUpdate(idx, 'question_en', e.target.value)}
            className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-pharaohGold"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">الإجابة (عربي)</label>
          <textarea
            rows={3}
            placeholder="مثال: نقدم خدمات تطوير الويب المتقدمة..."
            value={faqItem.answer_ar || faqItem.answer || ''}
            onChange={(e) => onUpdate(idx, 'answer_ar', e.target.value)}
            className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-pharaohGold resize-none"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Answer (English)</label>
          <textarea
            rows={3}
            placeholder="e.g. We offer advanced web development..."
            value={faqItem.answer_en || ''}
            onChange={(e) => onUpdate(idx, 'answer_en', e.target.value)}
            className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-pharaohGold resize-none"
            dir="ltr"
          />
        </div>
      </div>
    </div>
  );
}
