'use client';

import { SmartIcon } from '@/components/common/SmartIcon';
import { IconField } from '@/components/dashboard/common/IconField';
import {
  type HomeContentData,
  type HomeWorkflowStepContent,
  EMPTY_WORKFLOW_STEP,
} from '@/types/homeContent';
import { BilingualField, HomeContentCard, FallbackNote } from './HomeContentFields';

interface HomeContentTabWorkflowProps {
  form: HomeContentData;
  setForm: React.Dispatch<React.SetStateAction<HomeContentData>>;
}

const STEP_PRESET_ICONS = [
  {
    name: 'التحليل والبحث (Search)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`,
  },
  {
    name: 'التخطيط والاستراتيجية (Plan)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>`,
  },
  {
    name: 'التطوير والبرمجة (Code)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`,
  },
  {
    name: 'الإطلاق والتسليم (Launch)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>`,
  },
  {
    name: 'الاختبار والجودة (Check)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  },
  {
    name: 'الدعم المستمر (Support)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m-12.728 0a9 9 0 010-12.728m9.9 9.9a5 5 0 010-7.072m-7.072 0a5 5 0 010 7.072" /></svg>`,
  },
];

export function HomeContentTabWorkflow({ form, setForm }: HomeContentTabWorkflowProps) {
  const steps = form.workflow.steps || [];

  const updateStep = (idx: number, field: keyof HomeWorkflowStepContent, value: string) => {
    const nextSteps = steps.map((step, i) => (i === idx ? { ...step, [field]: value } : step));
    setForm(prev => ({ ...prev, workflow: { ...prev.workflow, steps: nextSteps } }));
  };

  const addStep = () => {
    setForm(prev => ({
      ...prev,
      workflow: { ...prev.workflow, steps: [...(prev.workflow.steps || []), { ...EMPTY_WORKFLOW_STEP }] },
    }));
  };

  const removeStep = (idx: number) => {
    if (steps.length <= 1) return;
    setForm(prev => ({
      ...prev,
      workflow: { ...prev.workflow, steps: (prev.workflow.steps || []).filter((_, i) => i !== idx) },
    }));
  };

  return (
    <HomeContentCard
      icon="🧭"
      title="خطوات منهجية العمل (Workflow Steps)"
      description="الكروت المتحركة اللي بتوضح رحلة المشروع من الفكرة للإطلاق. لازم تسيب خطوة واحدة على الأقل."
    >
      <FallbackNote />

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-slate-900 dark:text-white">
          عدد الخطوات الحالية: {steps.length}
        </h3>
        <button
          type="button"
          onClick={addStep}
          className="bg-amber-500/10 hover:bg-amber-500/20 dark:bg-pharaohGold/20 dark:hover:bg-pharaohGold text-amber-800 dark:text-pharaohGold dark:hover:text-[#0A192F] px-4 py-2 rounded-xl text-xs font-bold transition-all border border-amber-500/30 dark:border-pharaohGold/40 cursor-pointer"
        >
          + إضافة خطوة جديدة
        </button>
      </div>

      {steps.length === 0 && (
        <p className="text-xs text-slate-500 dark:text-gray-400 italic">
          مفيش خطوات. اضغط &quot;+ إضافة خطوة جديدة&quot; علشان تبدأ.
        </p>
      )}

      <div className="space-y-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-slate-50 dark:bg-[#0A192F] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-5"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-white/5 pb-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-9 h-9 rounded-xl bg-amber-500/15 dark:bg-pharaohGold/20 text-amber-800 dark:text-pharaohGold flex items-center justify-center font-black text-sm shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <SmartIcon
                  as="div"
                  className="w-8 h-8 rounded-lg bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 text-amber-800 dark:text-pharaohGold flex items-center justify-center shrink-0 [&_svg]:w-4 [&_svg]:h-4"
                  value={step.iconSvg || ''}
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
                    {step.title_ar || `الخطوة رقم ${idx + 1}`}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-gray-400 font-mono truncate" dir="ltr">
                    {step.title_en || `Step ${idx + 1}`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeStep(idx)}
                disabled={steps.length <= 1}
                className="shrink-0 text-red-500 hover:text-white hover:bg-red-500 border border-red-500/30 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                حذف
              </button>
            </div>

            <BilingualField
              labelAr="عنوان الخطوة (عربي)"
              labelEn="Step Title (English)"
              valueAr={step.title_ar || ''}
              valueEn={step.title_en || ''}
              onChangeAr={v => updateStep(idx, 'title_ar', v)}
              onChangeEn={v => updateStep(idx, 'title_en', v)}
              placeholderAr="مثال: التحليل والاكتشاف"
              placeholderEn="e.g. Discovery & Analysis"
            />

            <BilingualField
              multiline
              rows={3}
              labelAr="وصف الخطوة (عربي)"
              labelEn="Step Description (English)"
              valueAr={step.description_ar || ''}
              valueEn={step.description_en || ''}
              onChangeAr={v => updateStep(idx, 'description_ar', v)}
              onChangeEn={v => updateStep(idx, 'description_en', v)}
              placeholderAr="شرح مختصر لللي بيحصل في الخطوة دي."
              placeholderEn="A short description of what happens in this step."
            />

            <div className="bg-white dark:bg-[#112240] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🎨</span>
                <span>أيقونة الخطوة (Step Icon)</span>
              </span>
              <IconField
                label="أيقونة الخطوة"
                value={step.iconSvg || ''}
                onChange={v => updateStep(idx, 'iconSvg', v)}
                presets={STEP_PRESET_ICONS}
              />
            </div>
          </div>
        ))}
      </div>
    </HomeContentCard>
  );
}
