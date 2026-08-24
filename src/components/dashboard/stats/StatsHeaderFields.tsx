'use client';

import { StatsSectionData } from '@/app/actions/dashboard/stats';

interface StatsHeaderFieldsProps {
  form: StatsSectionData;
  setForm: React.Dispatch<React.SetStateAction<StatsSectionData>>;
}

export function StatsHeaderFields({ form, setForm }: StatsHeaderFieldsProps) {
  const updateField = (field: keyof StatsSectionData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
      <div className="border-b border-slate-200 dark:border-white/10 pb-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2.5">
          <span className="text-amber-800 dark:text-pharaohGold text-xl">🏷️</span>
          <span>عناوين ووصف قسم الإحصائيات (Section Headers & Meta)</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
          التحكم في الشارة العلوية، العنوان الرئيسي، والنص الذهبي البارز، والفقرة التوضيحية باللغتين العربية والإنجليزية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Arabic Column */}
        <div className="bg-slate-50 dark:bg-[#0A192F] p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
            <span className="text-xs font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-1.5">
              <span>🇸🇦</span>
              <span>العناوين بالعربية</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">RTL</span>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
              النص المميز / الشارة العلوية (Subtitle)
            </label>
            <input
              type="text"
              maxLength={60}
              placeholder="مثال: أرقامنا القياسية"
              value={form.subtitle_ar || ''}
              onChange={e => updateField('subtitle_ar', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
              الجزء الأول من العنوان (Title Part 1)
            </label>
            <input
              type="text"
              maxLength={60}
              placeholder="مثال: إنجازات صنعت"
              value={form.titlePart1_ar || ''}
              onChange={e => updateField('titlePart1_ar', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1 flex items-center justify-between">
              <span>الجزء الثاني من العنوان - النص الذهبي (Title Part 2)</span>
              <span className="text-[10px] text-amber-600 dark:text-pharaohGold font-bold">✨ ملوّن بالتدرج الذهبي</span>
            </label>
            <input
              type="text"
              maxLength={60}
              placeholder="مثال: فارقاً حقيقياً"
              value={form.titlePart2_ar || ''}
              onChange={e => updateField('titlePart2_ar', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-amber-500/30 dark:border-pharaohGold/40 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
              وصف القسم (Description)
            </label>
            <textarea
              rows={3}
              maxLength={250}
              placeholder="أرقام تعكس التزامنا بالتميز الهندسي وثقة شركاء النجاح حول العالم..."
              value={form.description_ar || ''}
              onChange={e => updateField('description_ar', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white resize-none focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* English Column */}
        <div className="bg-slate-50 dark:bg-[#0A192F] p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4" dir="ltr">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <span>🇬🇧</span>
              <span>English Headers & Meta</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">LTR</span>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
              Top Badge / Subtitle (English)
            </label>
            <input
              type="text"
              maxLength={60}
              placeholder="e.g. RECORD NUMBERS"
              value={form.subtitle_en || ''}
              onChange={e => updateField('subtitle_en', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
              Title Part 1 (English)
            </label>
            <input
              type="text"
              maxLength={60}
              placeholder="e.g. Achievements That Made"
              value={form.titlePart1_en || ''}
              onChange={e => updateField('titlePart1_en', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1 flex items-center justify-between">
              <span>Title Part 2 - Gold Highlight (English)</span>
              <span className="text-[10px] text-amber-600 dark:text-pharaohGold font-bold">✨ Gold Gradient</span>
            </label>
            <input
              type="text"
              maxLength={60}
              placeholder="e.g. A Real Difference"
              value={form.titlePart2_en || ''}
              onChange={e => updateField('titlePart2_en', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-amber-500/30 dark:border-pharaohGold/40 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
              Section Description (English)
            </label>
            <textarea
              rows={3}
              maxLength={250}
              placeholder="Numbers reflecting our commitment to engineering excellence..."
              value={form.description_en || ''}
              onChange={e => updateField('description_en', e.target.value)}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white resize-none focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
