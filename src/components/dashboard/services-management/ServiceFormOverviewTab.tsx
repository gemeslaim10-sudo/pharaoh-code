'use client';
import { FeatureItem } from './serviceFormTypes';

interface ServiceFormOverviewTabProps {
  overviewTitleAr: string;
  setOverviewTitleAr: (val: string) => void;
  overviewTitleEn: string;
  setOverviewTitleEn: (val: string) => void;
  overviewDescAr: string;
  setOverviewDescAr: (val: string) => void;
  overviewDescEn: string;
  setOverviewDescEn: (val: string) => void;
  features: FeatureItem[];
  setFeatures: (features: FeatureItem[]) => void;
}

export function ServiceFormOverviewTab({
  overviewTitleAr,
  setOverviewTitleAr,
  overviewTitleEn,
  setOverviewTitleEn,
  overviewDescAr,
  setOverviewDescAr,
  overviewDescEn,
  setOverviewDescEn,
  features,
  setFeatures,
}: ServiceFormOverviewTabProps) {
  return (
    <div className="bg-[#0A192F] p-6 rounded-2xl border border-white/10 space-y-6">
      <h5 className="text-sm font-bold text-pharaohGold border-b border-white/10 pb-2">قسم النظرة العامة والمميزات الثلاث (Overview & Features)</h5>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1">عنوان القسم العلوي (عربي)</label>
          <input type="text" maxLength={60} placeholder="نظرة عامة على الخدمة الفنية" value={overviewTitleAr} onChange={e => setOverviewTitleAr(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1">Overview Section Title (English)</label>
          <input type="text" maxLength={60} placeholder="Technical Service Overview" value={overviewTitleEn} onChange={e => setOverviewTitleEn(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" dir="ltr" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1">فقرة النظرة العامة (عربي)</label>
          <textarea rows={3} maxLength={250} placeholder="نحن لا نعتمد على حلول مستهلكة؛ بل نعتمد على هندسة أكواد مخصصة..." value={overviewDescAr} onChange={e => setOverviewDescAr(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white resize-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1">Overview Description (English)</label>
          <textarea rows={3} maxLength={250} placeholder="We engineer custom, high-performance software code..." value={overviewDescEn} onChange={e => setOverviewDescEn(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white resize-none" dir="ltr" />
        </div>
      </div>

      <div className="space-y-4 border-t border-white/10 pt-4">
        <h6 className="text-xs font-bold text-white">المميزات الرئيسية الثلاث (3 Features)</h6>
        {features?.map((feat, idx) => (
          <div key={idx} className="bg-[#112240] p-4 rounded-xl border border-white/10 space-y-3">
            <h6 className="text-xs font-bold text-pharaohGold">الميزة رقم {idx + 1}</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input type="text" maxLength={50} placeholder="عنوان الميزة (عربي)" value={feat.title_ar || ''} onChange={e => {
                const newF = [...features];
                newF[idx] = { ...newF[idx], title_ar: e.target.value };
                setFeatures(newF);
              }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white" />
              <input type="text" maxLength={50} placeholder="Feature Title (English)" value={feat.title_en || ''} onChange={e => {
                const newF = [...features];
                newF[idx] = { ...newF[idx], title_en: e.target.value };
                setFeatures(newF);
              }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white" dir="ltr" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input type="text" maxLength={150} placeholder="شرح الميزة (عربي)" value={feat.desc_ar || ''} onChange={e => {
                const newF = [...features];
                newF[idx] = { ...newF[idx], desc_ar: e.target.value };
                setFeatures(newF);
              }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white" />
              <input type="text" maxLength={150} placeholder="Feature Desc (English)" value={feat.desc_en || ''} onChange={e => {
                const newF = [...features];
                newF[idx] = { ...newF[idx], desc_en: e.target.value };
                setFeatures(newF);
              }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white" dir="ltr" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
