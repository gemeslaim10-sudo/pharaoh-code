'use client';
import { PackageItem } from './serviceFormTypes';
import { ServiceFormPackageMetaInputs } from './ServiceFormPackageMetaInputs';
import { ServiceFormPackageFeaturesList } from './ServiceFormPackageFeaturesList';

interface ServiceFormPackageItemEditorProps {
  pkg: PackageItem;
  idx: number;
  onUpdate: (updatedPkg: PackageItem) => void;
}

export function ServiceFormPackageItemEditor({
  pkg,
  idx,
  onUpdate,
}: ServiceFormPackageItemEditorProps) {
  const featuresAr = Array.isArray(pkg.features_list_ar) ? pkg.features_list_ar : [''];
  const featuresEn = Array.isArray(pkg.features_list_en) ? pkg.features_list_en : [''];

  const addFeaturePoint = () => {
    onUpdate({
      ...pkg,
      features_list_ar: [...featuresAr, ''],
      features_list_en: [...featuresEn, ''],
    });
  };

  const removeFeaturePoint = (fIdx: number) => {
    onUpdate({
      ...pkg,
      features_list_ar: featuresAr.filter((_, i) => i !== fIdx),
      features_list_en: featuresEn.filter((_, i) => i !== fIdx),
    });
  };

  const updateFeatureText = (fIdx: number, lang: 'ar' | 'en', text: string) => {
    if (lang === 'ar') {
      const next = [...featuresAr];
      next[fIdx] = text;
      onUpdate({ ...pkg, features_list_ar: next });
    } else {
      const next = [...featuresEn];
      next[fIdx] = text;
      onUpdate({ ...pkg, features_list_en: next });
    }
  };

  return (
    <div className="bg-white dark:bg-[#112240] p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
      <ServiceFormPackageMetaInputs pkg={pkg} idx={idx} onUpdate={onUpdate} />

      {/* Features Heading & Dynamic Points List */}
      <div className="border-t border-slate-200 dark:border-white/10 pt-5 space-y-4">
        <div>
          <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">عنوان ترويسة قائمة المميزات (Features Header):</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">العنوان بالعربية</label>
              <input
                type="text"
                placeholder="مثال: المميزات المضمنة في الباقة:"
                value={pkg.features_heading_ar || ''}
                onChange={e => onUpdate({ ...pkg, features_heading_ar: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>
            <div dir="ltr">
              <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Features Heading (English)</label>
              <input
                type="text"
                placeholder="e.g. Included Features:"
                value={pkg.features_heading_en || ''}
                onChange={e => onUpdate({ ...pkg, features_heading_en: e.target.value })}
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>

        <ServiceFormPackageFeaturesList
          featuresAr={featuresAr}
          featuresEn={featuresEn}
          onAddPoint={addFeaturePoint}
          onRemovePoint={removeFeaturePoint}
          onUpdateText={updateFeatureText}
        />
      </div>
    </div>
  );
}
