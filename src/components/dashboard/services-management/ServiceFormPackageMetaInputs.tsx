'use client';
import { PackageItem } from './serviceFormTypes';

interface ServiceFormPackageMetaInputsProps {
  pkg: PackageItem;
  idx: number;
  onUpdate: (updatedPkg: PackageItem) => void;
}

export function ServiceFormPackageMetaInputs({
  pkg,
  idx,
  onUpdate,
}: ServiceFormPackageMetaInputsProps) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <h6 className="text-xs font-bold text-pharaohGold">الباقة رقم {idx + 1} {idx === 1 ? '(الأكثر طلباً)' : ''}</h6>
        <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={pkg.isPopular || false}
            onChange={e => onUpdate({ ...pkg, isPopular: e.target.checked })}
          />
          تمييز كأكثر طلباً ومبيعاً
        </label>
      </div>

      {/* Level & Title & Price */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-[11px] text-gray-400 mb-1">المستوى (Level AR)</label>
          <input
            type="text"
            placeholder="مثال: المستوى الأول"
            value={pkg.level_ar || ''}
            onChange={e => onUpdate({ ...pkg, level_ar: e.target.value })}
            className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white"
          />
        </div>
        <div>
          <label className="block text-[11px] text-gray-400 mb-1">عنوان الباقة (Package Title AR)</label>
          <input
            type="text"
            placeholder="مثال: الباقة الأساسية"
            value={pkg.title_ar || ''}
            onChange={e => onUpdate({ ...pkg, title_ar: e.target.value })}
            className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white"
          />
        </div>
        <div>
          <label className="block text-[11px] text-gray-400 mb-1">السعر (Price e.g. 45,000 ج.م)</label>
          <input
            type="text"
            placeholder="45,000 ج.م"
            value={pkg.price || ''}
            onChange={e => onUpdate({ ...pkg, price: e.target.value })}
            className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white"
          />
        </div>
      </div>

      {/* English fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] text-gray-400 mb-1">Level (EN)</label>
          <input
            type="text"
            placeholder="e.g. Level 1 - Starter"
            value={pkg.level_en || ''}
            onChange={e => onUpdate({ ...pkg, level_en: e.target.value })}
            className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-[11px] text-gray-400 mb-1">Package Title (EN)</label>
          <input
            type="text"
            placeholder="e.g. Starter Package"
            value={pkg.title_en || ''}
            onChange={e => onUpdate({ ...pkg, title_en: e.target.value })}
            className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2.5 text-xs text-white"
            dir="ltr"
          />
        </div>
      </div>

      {/* Description Paragraph */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] text-gray-400 mb-1">فقرة الشرح (عربي)</label>
          <textarea
            rows={2}
            placeholder="فقرة توضيحية لنطاق عمل الباقة..."
            value={pkg.desc_ar || ''}
            onChange={e => onUpdate({ ...pkg, desc_ar: e.target.value })}
            className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white resize-none"
          />
        </div>
        <div>
          <label className="block text-[11px] text-gray-400 mb-1">Description Paragraph (EN)</label>
          <textarea
            rows={2}
            placeholder="Package scope explanation..."
            value={pkg.desc_en || ''}
            onChange={e => onUpdate({ ...pkg, desc_en: e.target.value })}
            className="w-full bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white resize-none"
            dir="ltr"
          />
        </div>
      </div>
    </>
  );
}
