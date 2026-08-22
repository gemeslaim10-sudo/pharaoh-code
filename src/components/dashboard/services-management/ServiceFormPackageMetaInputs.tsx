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
    <div className="space-y-4">
      {/* Package Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-[#0A192F] p-4 rounded-xl border border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-amber-500/15 dark:bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold flex items-center justify-center font-bold text-xs">
            #{idx + 1}
          </span>
          <div>
            <h6 className="text-xs font-bold text-slate-900 dark:text-white">
              {pkg.title_ar || `الباقة رقم ${idx + 1}`}
              {idx === 1 && <span className="text-amber-800 dark:text-pharaohGold mr-1.5">(الباقة الافتراضية المفضلة)</span>}
            </h6>
            <span className="text-[10px] text-slate-500 dark:text-gray-400">{pkg.title_en || 'Package Title'}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-gray-300 bg-white dark:bg-[#112240] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 cursor-pointer hover:border-amber-500/40">
            <input
              type="checkbox"
              checked={pkg.isPopular || false}
              onChange={e => onUpdate({ ...pkg, isPopular: e.target.checked })}
              className="accent-amber-600 rounded"
            />
            <span>⭐ تمييز كأكثر طلباً ومبيعاً</span>
          </label>
        </div>
      </div>

      {/* Pricing Bar */}
      <div className="bg-amber-500/5 dark:bg-pharaohGold/5 p-3.5 rounded-xl border border-amber-500/20 dark:border-pharaohGold/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base">💵</span>
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white">سعر الباقة (Price)</label>
              <span className="text-[10px] text-slate-500 dark:text-gray-400">يظهر بوضوح في كرت الباقة التسعيرية</span>
            </div>
          </div>
          <input
            type="text"
            placeholder="مثال: 45,000 ج.م أو $1,500"
            value={pkg.price || ''}
            onChange={e => onUpdate({ ...pkg, price: e.target.value })}
            className="sm:w-64 bg-white dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white font-bold focus:border-pharaohGold outline-none"
          />
        </div>
      </div>

      {/* Two Column Multilingual Grid (AR on Right, EN on Left in RTL) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Arabic Column */}
        <div className="bg-slate-50 dark:bg-[#0A192F] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
            <span className="text-xs font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-1.5">
              <span>🇸🇦</span>
              <span>المحتوى باللغة العربية</span>
            </span>
            <span className="text-[10px] text-slate-400">RTL</span>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">المستوى (Level AR)</label>
            <input
              type="text"
              placeholder="مثال: المستوى الأول / البداية الذكية"
              value={pkg.level_ar || ''}
              onChange={e => onUpdate({ ...pkg, level_ar: e.target.value })}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">عنوان الباقة (Package Title AR)</label>
            <input
              type="text"
              placeholder="مثال: الباقة الأساسية"
              value={pkg.title_ar || ''}
              onChange={e => onUpdate({ ...pkg, title_ar: e.target.value })}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">فقرة الشرح (Description AR)</label>
            <textarea
              rows={2}
              placeholder="فقرة توضيحية لنطاق عمل ومخرجات هذه الباقة..."
              value={pkg.desc_ar || ''}
              onChange={e => onUpdate({ ...pkg, desc_ar: e.target.value })}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* English Column */}
        <div className="bg-slate-50 dark:bg-[#0A192F] p-4 rounded-xl border border-slate-200 dark:border-white/10 space-y-3" dir="ltr">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <span>🇬🇧</span>
              <span>English Content</span>
            </span>
            <span className="text-[10px] text-slate-400">LTR</span>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Level (EN)</label>
            <input
              type="text"
              placeholder="e.g. Level 1 - Smart Start"
              value={pkg.level_en || ''}
              onChange={e => onUpdate({ ...pkg, level_en: e.target.value })}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Package Title (EN)</label>
            <input
              type="text"
              placeholder="e.g. Starter Package"
              value={pkg.title_en || ''}
              onChange={e => onUpdate({ ...pkg, title_en: e.target.value })}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2.5 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">Description Paragraph (EN)</label>
            <textarea
              rows={2}
              placeholder="Scope and deliverables description in English..."
              value={pkg.desc_en || ''}
              onChange={e => onUpdate({ ...pkg, desc_en: e.target.value })}
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
