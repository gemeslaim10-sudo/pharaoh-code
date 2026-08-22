'use client';
import { AboutFormData } from './aboutDashboardTypes';
import { AboutFaqCardItem } from './AboutFaqCardItem';

interface AboutTabFaqProps {
  form: AboutFormData;
  setForm: React.Dispatch<React.SetStateAction<AboutFormData>>;
}

export function AboutTabFaq({ form, setForm }: AboutTabFaqProps) {
  const updateFaqItem = (idx: number, field: string, value: string) => {
    const faqs = [...(form.faq.faqs || [])];
    faqs[idx] = { ...faqs[idx], [field]: value };
    setForm(prev => ({ ...prev, faq: { ...prev.faq, faqs } }));
  };

  const addFaq = () => {
    const currentFaqs = [...(form.faq.faqs || [])];
    setForm(prev => ({
      ...prev,
      faq: {
        ...prev.faq,
        faqs: [...currentFaqs, { question_ar: '', question_en: '', answer_ar: '', answer_en: '' }]
      }
    }));
  };

  const removeFaq = (idx: number) => {
    const updated = (form.faq.faqs || []).filter((_, i) => i !== idx);
    setForm(prev => ({ ...prev, faq: { ...prev.faq, faqs: updated } }));
  };

  return (
    <div className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
      <h2 className="text-xl font-bold text-amber-800 dark:text-pharaohGold border-b border-slate-200 dark:border-white/10 pb-3">قسم الأسئلة الشائعة (FAQ)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">العنوان الفرعي (عربي)</label>
          <input
            type="text"
            placeholder="قاعدة المعرفة"
            value={form.faq.subtitle_ar || ''}
            onChange={(e) => setForm(prev => ({ ...prev, faq: { ...prev.faq, subtitle_ar: e.target.value } }))}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Subtitle (English)</label>
          <input
            type="text"
            placeholder="Knowledge Base"
            value={form.faq.subtitle_en || ''}
            onChange={(e) => setForm(prev => ({ ...prev, faq: { ...prev.faq, subtitle_en: e.target.value } }))}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">العنوان الرئيسي - السؤال (عربي)</label>
          <input
            type="text"
            placeholder="لديك أسئلة؟"
            value={form.faq.titlePart1_ar || ''}
            onChange={(e) => setForm(prev => ({ ...prev, faq: { ...prev.faq, titlePart1_ar: e.target.value } }))}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Title Part 1 (English)</label>
          <input
            type="text"
            placeholder="Have Questions?"
            value={form.faq.titlePart1_en || ''}
            onChange={(e) => setForm(prev => ({ ...prev, faq: { ...prev.faq, titlePart1_en: e.target.value } }))}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">العنوان الرئيسي - الإجابة الذهبية (عربي)</label>
          <input
            type="text"
            placeholder="لدينا حلول أسطورية"
            value={form.faq.titlePart2_ar || ''}
            onChange={(e) => setForm(prev => ({ ...prev, faq: { ...prev.faq, titlePart2_ar: e.target.value } }))}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">Title Part 2 (English)</label>
          <input
            type="text"
            placeholder="We Have Engineering Answers"
            value={form.faq.titlePart2_en || ''}
            onChange={(e) => setForm(prev => ({ ...prev, faq: { ...prev.faq, titlePart2_en: e.target.value } }))}
            className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            dir="ltr"
          />
        </div>
      </div>

      <div className="space-y-6 border-t border-slate-200 dark:border-white/10 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-bold text-slate-900 dark:text-white">الأسئلة والإجابات ({form.faq.faqs?.length || 0})</h3>
          <button
            type="button"
            onClick={addFaq}
            className="bg-amber-500/10 hover:bg-amber-500/20 dark:bg-pharaohGold/20 dark:hover:bg-pharaohGold text-amber-800 dark:text-pharaohGold dark:hover:text-[#0A192F] px-4 py-2 rounded-xl text-xs font-bold transition-all border border-amber-500/30 dark:border-pharaohGold/40 cursor-pointer"
          >
            + إضافة سؤال جديد
          </button>
        </div>

        {(!form.faq.faqs || form.faq.faqs.length === 0) && (
          <p className="text-xs text-slate-500 dark:text-gray-400 italic">لا يوجد أسئلة حالية. اضغط على &quot;+ إضافة سؤال جديد&quot; لإضافة أول سؤال وإجابة.</p>
        )}

        {form.faq.faqs?.map((faqItem, idx) => (
          <AboutFaqCardItem
            key={idx}
            faqItem={faqItem}
            idx={idx}
            onUpdate={updateFaqItem}
            onRemove={removeFaq}
          />
        ))}
      </div>
    </div>
  );
}
