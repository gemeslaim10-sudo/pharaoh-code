'use client';
import { TechStackFeaturePoints } from './TechStackFeaturePoints';

export type { TechCardItem, TechStackFormData } from '@/types/techStack';
import { TechStackFormData } from '@/types/techStack';



interface TechStackHeaderFieldsProps {
  form: TechStackFormData;
  setForm: React.Dispatch<React.SetStateAction<TechStackFormData>>;
}

export function TechStackHeaderFields({ form, setForm }: TechStackHeaderFieldsProps) {
  return (
    <div className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
      <h2 className="text-xl font-bold text-amber-800 dark:text-pharaohGold border-b border-slate-200 dark:border-white/10 pb-3">العناوين والأوصاف الرئيسية (Header Info)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">العنوان العلوي (عربي)</label>
          <input
            type="text"
            placeholder="مهندسة لأقصى أداء"
            value={form.subtitle_ar || ''}
            onChange={(e) => setForm({ ...form, subtitle_ar: e.target.value })}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Subtitle (English)</label>
          <input
            type="text"
            placeholder="ENGINEERED FOR PEAK PERFORMANCE"
            value={form.subtitle_en || ''}
            onChange={(e) => setForm({ ...form, subtitle_en: e.target.value })}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">العنوان - السطر الأول (عربي)</label>
          <input
            type="text"
            placeholder="لماذا نختار"
            value={form.title1_ar || ''}
            onChange={(e) => setForm({ ...form, title1_ar: e.target.value })}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Title Line 1 (English)</label>
          <input
            type="text"
            placeholder="Why We Carefully Select"
            value={form.title1_en || ''}
            onChange={(e) => setForm({ ...form, title1_en: e.target.value })}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">العنوان - السطر الثاني (عربي)</label>
          <input
            type="text"
            placeholder="تقنياتنا بعناية؟"
            value={form.title2_ar || ''}
            onChange={(e) => setForm({ ...form, title2_ar: e.target.value })}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Title Line 2 (English)</label>
          <input
            type="text"
            placeholder="Our Technology Stack?"
            value={form.title2_en || ''}
            onChange={(e) => setForm({ ...form, title2_en: e.target.value })}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">الفقرة التوضيحية (عربي)</label>
          <textarea
            rows={3}
            placeholder="نحن لا نتبع الترندات العابرة. في Pharaoh Code، نختار التقنيات التي تضمن لعملائنا..."
            value={form.description_ar || ''}
            onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Description Paragraph (English)</label>
          <textarea
            rows={3}
            placeholder="We don't follow passing trends. At Pharaoh Code, we engineer software..."
            value={form.description_en || ''}
            onChange={(e) => setForm({ ...form, description_en: e.target.value })}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>

      <TechStackFeaturePoints form={form} setForm={setForm} />
    </div>
  );
}
