'use client';
import { RoadmapStepItem } from './serviceFormTypes';

interface ServiceFormRoadmapTabProps {
  roadmapSteps: RoadmapStepItem[];
  setRoadmapSteps: (steps: RoadmapStepItem[]) => void;
}

export function ServiceFormRoadmapTab({
  roadmapSteps,
  setRoadmapSteps,
}: ServiceFormRoadmapTabProps) {
  return (
    <div className="bg-[#0A192F] p-6 rounded-2xl border border-white/10 space-y-6">
      <h5 className="text-sm font-bold text-pharaohGold border-b border-white/10 pb-2">خطوات ومراحل العمل الأربعة (4 Roadmap Steps)</h5>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roadmapSteps?.map((step, idx) => (
          <div key={idx} className="bg-[#112240] p-4 rounded-xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-1">
              <span className="text-xs font-bold text-pharaohGold">الخطوة {step.number || `0${idx + 1}`}</span>
            </div>
            <div className="space-y-2">
              <input type="text" maxLength={50} placeholder="عنوان الخطوة (عربي)" value={step.title_ar || ''} onChange={e => {
                const newS = [...roadmapSteps];
                newS[idx] = { ...newS[idx], title_ar: e.target.value };
                setRoadmapSteps(newS);
              }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white" />

              <input type="text" maxLength={50} placeholder="Step Title (English)" value={step.title_en || ''} onChange={e => {
                const newS = [...roadmapSteps];
                newS[idx] = { ...newS[idx], title_en: e.target.value };
                setRoadmapSteps(newS);
              }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white" dir="ltr" />

              <textarea rows={2} maxLength={150} placeholder="شرح تفصيلي للخطوة (عربي)" value={step.desc_ar || ''} onChange={e => {
                const newS = [...roadmapSteps];
                newS[idx] = { ...newS[idx], desc_ar: e.target.value };
                setRoadmapSteps(newS);
              }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white resize-none" />

              <textarea rows={2} maxLength={150} placeholder="Step Desc (English)" value={step.desc_en || ''} onChange={e => {
                const newS = [...roadmapSteps];
                newS[idx] = { ...newS[idx], desc_en: e.target.value };
                setRoadmapSteps(newS);
              }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white resize-none" dir="ltr" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
