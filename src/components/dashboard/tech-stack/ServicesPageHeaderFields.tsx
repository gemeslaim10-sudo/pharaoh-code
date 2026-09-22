'use client';

import { type ServicesPageHeaderData } from '@/types/techStack';

interface ServicesPageHeaderFieldsProps {
  header: ServicesPageHeaderData;
  setHeaderField: (field: keyof ServicesPageHeaderData, value: string) => void;
}

const INPUT_CLASS =
  'w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white outline-none focus:border-pharaohGold placeholder:text-slate-400 dark:placeholder:text-gray-600';
const TEXTAREA_CLASS = `${INPUT_CLASS} resize-none`;
const LABEL_CLASS = 'block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1';

/**
 * Edits `pages/services -> grid` (subtitle / titlePart1 / titlePart2 / description),
 * i.e. the header shown above the services cards grid on /services.
 */
export function ServicesPageHeaderFields({ header, setHeaderField }: ServicesPageHeaderFieldsProps) {
  return (
    <div className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
      <div className="border-b border-slate-200 dark:border-white/10 pb-4">
        <h2 className="text-xl font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-2">
          <span>🏛️</span>
          <span>رأس صفحة الخدمات (Services Page Header)</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
          النصوص التي تظهر أعلى شبكة كروت الخدمات في صفحة /services. اتركها فارغة لاستخدام النص الافتراضي.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Arabic Column */}
        <div className="bg-slate-50 dark:bg-[#0A192F] p-4 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
            <span className="text-xs font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-1.5">
              <span>🇸🇦</span>
              <span>المحتوى بالعربية</span>
            </span>
            <span className="text-[10px] text-slate-400">RTL</span>
          </div>

          <div>
            <label className={LABEL_CLASS}>النص الصغير فوق العنوان (Subtitle)</label>
            <input
              type="text"
              maxLength={80}
              placeholder="مثال: خدماتنا البرمجية"
              value={header.subtitle_ar || ''}
              onChange={e => setHeaderField('subtitle_ar', e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className={LABEL_CLASS}>الجزء الأول من العنوان (Title Part 1)</label>
            <input
              type="text"
              maxLength={60}
              placeholder="مثال: حلول رقمية"
              value={header.titlePart1_ar || ''}
              onChange={e => setHeaderField('titlePart1_ar', e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className={LABEL_CLASS}>الجزء الذهبي من العنوان (Title Part 2)</label>
            <input
              type="text"
              maxLength={60}
              placeholder="مثال: تليق بعلامتك التجارية"
              value={header.titlePart2_ar || ''}
              onChange={e => setHeaderField('titlePart2_ar', e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className={LABEL_CLASS}>فقرة الوصف أسفل العنوان (Description)</label>
            <textarea
              rows={3}
              maxLength={300}
              placeholder="فقرة تعريفية قصيرة تظهر أسفل عنوان الصفحة..."
              value={header.description_ar || ''}
              onChange={e => setHeaderField('description_ar', e.target.value)}
              className={TEXTAREA_CLASS}
            />
          </div>
        </div>

        {/* English Column */}
        <div className="bg-slate-50 dark:bg-[#0A192F] p-4 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3" dir="ltr">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <span>🇬🇧</span>
              <span>English Content</span>
            </span>
            <span className="text-[10px] text-slate-400">LTR</span>
          </div>

          <div>
            <label className={LABEL_CLASS}>Eyebrow / Subtitle</label>
            <input
              type="text"
              maxLength={80}
              placeholder="e.g. Our Services"
              value={header.subtitle_en || ''}
              onChange={e => setHeaderField('subtitle_en', e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className={LABEL_CLASS}>Title Part 1</label>
            <input
              type="text"
              maxLength={60}
              placeholder="e.g. Digital Solutions"
              value={header.titlePart1_en || ''}
              onChange={e => setHeaderField('titlePart1_en', e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className={LABEL_CLASS}>Title Part 2 (gold)</label>
            <input
              type="text"
              maxLength={60}
              placeholder="e.g. Worthy Of Your Brand"
              value={header.titlePart2_en || ''}
              onChange={e => setHeaderField('titlePart2_en', e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label className={LABEL_CLASS}>Description</label>
            <textarea
              rows={3}
              maxLength={300}
              placeholder="Short introductory paragraph under the page headline..."
              value={header.description_en || ''}
              onChange={e => setHeaderField('description_en', e.target.value)}
              className={TEXTAREA_CLASS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
