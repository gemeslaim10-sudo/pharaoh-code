'use client';
import { type AboutFormData, type AboutCommentsData } from './aboutDashboardTypes';

interface AboutTabCommentsProps {
  form: AboutFormData;
  setForm: React.Dispatch<React.SetStateAction<AboutFormData>>;
}

const INPUT_CLASS =
  'w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600';
const TEXTAREA_CLASS = `${INPUT_CLASS} resize-none`;
const LABEL_CLASS = 'block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2';

/** Edits `pages/about -> comments`, read by src/components/services/about/AboutComments.tsx. */
export function AboutTabComments({ form, setForm }: AboutTabCommentsProps) {
  const updateComments = (field: keyof AboutCommentsData, value: string) => {
    setForm(prev => ({ ...prev, comments: { ...prev.comments, [field]: value } }));
  };

  return (
    <div className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
      <div className="border-b border-slate-200 dark:border-white/10 pb-3">
        <h2 className="text-xl font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-2">
          <span>💬</span>
          <span>قسم التعليقات (Comments Section)</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">نصوص قسم التعليقات أسفل صفحة من نحن. اتركها فارغة لاستخدام النص الافتراضي.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={LABEL_CLASS}>العنوان الفرعي (عربي)</label>
          <input
            type="text"
            placeholder="أصوات المجتمع"
            value={form.comments.subtitle_ar || ''}
            onChange={(e) => updateComments('subtitle_ar', e.target.value)}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Subtitle (English)</label>
          <input
            type="text"
            placeholder="COMMUNITY VOICES"
            value={form.comments.subtitle_en || ''}
            onChange={(e) => updateComments('subtitle_en', e.target.value)}
            className={INPUT_CLASS}
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={LABEL_CLASS}>العنوان الرئيسي - الجزء الأول (عربي)</label>
          <input
            type="text"
            placeholder="اترك بصمتك"
            value={form.comments.titlePart1_ar || ''}
            onChange={(e) => updateComments('titlePart1_ar', e.target.value)}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Title Part 1 (English)</label>
          <input
            type="text"
            placeholder="Leave Your"
            value={form.comments.titlePart1_en || ''}
            onChange={(e) => updateComments('titlePart1_en', e.target.value)}
            className={INPUT_CLASS}
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={LABEL_CLASS}>العنوان الرئيسي - الجزء الذهبي (عربي)</label>
          <input
            type="text"
            placeholder="الرقمية"
            value={form.comments.titlePart2_ar || ''}
            onChange={(e) => updateComments('titlePart2_ar', e.target.value)}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Title Part 2 (English)</label>
          <input
            type="text"
            placeholder="Digital Mark"
            value={form.comments.titlePart2_en || ''}
            onChange={(e) => updateComments('titlePart2_en', e.target.value)}
            className={INPUT_CLASS}
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={LABEL_CLASS}>وصف القسم (عربي)</label>
          <textarea
            rows={3}
            placeholder="شاركنا رأيك وتجربتك مع فريق Pharaoh Code..."
            value={form.comments.description_ar || ''}
            onChange={(e) => updateComments('description_ar', e.target.value)}
            className={TEXTAREA_CLASS}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Section Description (English)</label>
          <textarea
            rows={3}
            placeholder="Share your thoughts and experience with our team..."
            value={form.comments.description_en || ''}
            onChange={(e) => updateComments('description_en', e.target.value)}
            className={TEXTAREA_CLASS}
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={LABEL_CLASS}>عنوان نموذج التعليق (عربي)</label>
          <input
            type="text"
            placeholder="أضف تعليقك"
            value={form.comments.formTitle_ar || ''}
            onChange={(e) => updateComments('formTitle_ar', e.target.value)}
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Comment Form Title (English)</label>
          <input
            type="text"
            placeholder="Add Your Comment"
            value={form.comments.formTitle_en || ''}
            onChange={(e) => updateComments('formTitle_en', e.target.value)}
            className={INPUT_CLASS}
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label className={LABEL_CLASS}>الكلمة المائية في الخلفية (Background Watermark)</label>
        <input
          type="text"
          maxLength={20}
          placeholder="PHARAOH"
          value={form.comments.backgroundText || ''}
          onChange={(e) => updateComments('backgroundText', e.target.value)}
          className={INPUT_CLASS}
          dir="ltr"
        />
        <p className="text-[11px] text-slate-500 dark:text-gray-500 mt-1">كلمة واحدة بدون ترجمة تظهر بشكل باهت خلف نموذج التعليقات. الافتراضي: PHARAOH</p>
      </div>
    </div>
  );
}
