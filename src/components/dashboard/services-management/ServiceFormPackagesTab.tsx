'use client';
import { PackageItem } from './serviceFormTypes';

interface ServiceFormPackagesTabProps {
  packagesTitleAr: string;
  setPackagesTitleAr: (val: string) => void;
  packagesTitleEn: string;
  setPackagesTitleEn: (val: string) => void;
  packages: PackageItem[];
  setPackages: (packages: PackageItem[]) => void;
}

export function ServiceFormPackagesTab({
  packagesTitleAr,
  setPackagesTitleAr,
  packagesTitleEn,
  setPackagesTitleEn,
  packages,
  setPackages,
}: ServiceFormPackagesTabProps) {
  return (
    <div className="bg-[#0A192F] p-6 rounded-2xl border border-white/10 space-y-6">
      <h5 className="text-sm font-bold text-pharaohGold border-b border-white/10 pb-2">باقات التسعير الثلاث (3 Packages & Pricing)</h5>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1">عنوان قسم الباقات (عربي)</label>
          <input type="text" placeholder="باقات استثمار الخدمة" value={packagesTitleAr || ''} onChange={e => setPackagesTitleAr(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1">Packages Section Title (English)</label>
          <input type="text" placeholder="Service Investment Packages" value={packagesTitleEn || ''} onChange={e => setPackagesTitleEn(e.target.value)} className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white" dir="ltr" />
        </div>
      </div>

      <div className="space-y-6">
        {packages?.map((pkg, idx) => (
          <div key={idx} className="bg-[#112240] p-4 md:p-5 rounded-xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h6 className="text-xs font-bold text-pharaohGold">الباقة رقم {idx + 1} {idx === 1 ? '(الأكثر طلباً)' : ''}</h6>
              <label className="flex items-center gap-2 text-xs text-gray-300">
                <input type="checkbox" checked={pkg.isPopular || false} onChange={e => {
                  const newP = [...packages];
                  newP[idx] = { ...newP[idx], isPopular: e.target.checked };
                  setPackages(newP);
                }} />
                تميز كأكثر مبيعاً
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">اسم الباقة (عربي)</label>
                <input type="text" maxLength={50} placeholder="مثال: الباقة التعريفية" value={pkg.title_ar || ''} onChange={e => {
                  const newP = [...packages];
                  newP[idx] = { ...newP[idx], title_ar: e.target.value };
                  setPackages(newP);
                }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Package Title (English)</label>
                <input type="text" maxLength={50} placeholder="e.g. Starter Package" value={pkg.title_en || ''} onChange={e => {
                  const newP = [...packages];
                  newP[idx] = { ...newP[idx], title_en: e.target.value };
                  setPackages(newP);
                }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white" dir="ltr" />
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">السعر (e.g. 45,000 ج.م)</label>
                <input type="text" maxLength={30} placeholder="45,000 ج.م" value={pkg.price || ''} onChange={e => {
                  const newP = [...packages];
                  newP[idx] = { ...newP[idx], price: e.target.value };
                  setPackages(newP);
                }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">شرح الباقة (عربي)</label>
                <textarea rows={2} maxLength={150} placeholder="شرح مختصر لمحتوى الباقة..." value={pkg.desc_ar || ''} onChange={e => {
                  const newP = [...packages];
                  newP[idx] = { ...newP[idx], desc_ar: e.target.value };
                  setPackages(newP);
                }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white resize-none" />
              </div>
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Package Desc (English)</label>
                <textarea rows={2} maxLength={150} placeholder="Short package summary..." value={pkg.desc_en || ''} onChange={e => {
                  const newP = [...packages];
                  newP[idx] = { ...newP[idx], desc_en: e.target.value };
                  setPackages(newP);
                }} className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white resize-none" dir="ltr" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
