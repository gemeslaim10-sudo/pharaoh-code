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
    <div className="bg-[#112240] p-4 md:p-5 rounded-xl border border-white/10 space-y-4">
      <ServiceFormPackageMetaInputs pkg={pkg} idx={idx} onUpdate={onUpdate} />

      {/* Features Heading & Dynamic Points List */}
      <div className="border-t border-white/5 pt-3 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-gray-400 mb-1">عنوان المميزات (عربي)</label>
            <input
              type="text"
              placeholder="المميزات المضمنة في الباقة:"
              value={pkg.features_heading_ar || ''}
              onChange={e => onUpdate({ ...pkg, features_heading_ar: e.target.value })}
              className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] text-gray-400 mb-1">Features Heading (EN)</label>
            <input
              type="text"
              placeholder="Included Features:"
              value={pkg.features_heading_en || ''}
              onChange={e => onUpdate({ ...pkg, features_heading_en: e.target.value })}
              className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white"
              dir="ltr"
            />
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
