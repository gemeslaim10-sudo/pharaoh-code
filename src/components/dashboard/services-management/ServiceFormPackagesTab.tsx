'use client';
import { PackageItem } from './serviceFormTypes';
import { ServiceFormPackageItemEditor } from './ServiceFormPackageItemEditor';

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
  const handleUpdatePackage = (idx: number, updatedPkg: PackageItem) => {
    const next = [...packages];
    next[idx] = updatedPkg;
    setPackages(next);
  };

  return (
    <div className="bg-[#0A192F] p-6 rounded-2xl border border-white/10 space-y-6">
      <h5 className="text-sm font-bold text-pharaohGold border-b border-white/10 pb-2">باقات التسعير الثلاث (3 Packages & Pricing)</h5>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1">عنوان قسم الباقات (عربي)</label>
          <input
            type="text"
            placeholder="باقات استثمار الخدمة"
            value={packagesTitleAr || ''}
            onChange={e => setPackagesTitleAr(e.target.value)}
            className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1">Packages Section Title (English)</label>
          <input
            type="text"
            placeholder="Service Investment Packages"
            value={packagesTitleEn || ''}
            onChange={e => setPackagesTitleEn(e.target.value)}
            className="w-full bg-[#112240] border border-white/10 rounded-xl p-3 text-xs text-white"
            dir="ltr"
          />
        </div>
      </div>

      <div className="space-y-6">
        {packages?.map((pkg, idx) => (
          <ServiceFormPackageItemEditor
            key={idx}
            pkg={pkg}
            idx={idx}
            onUpdate={(updated) => handleUpdatePackage(idx, updated)}
          />
        ))}
      </div>
    </div>
  );
}
