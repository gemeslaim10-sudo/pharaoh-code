'use client';

interface ServiceFormPackageFeaturesListProps {
  featuresAr: string[];
  featuresEn: string[];
  onAddPoint: () => void;
  onRemovePoint: (idx: number) => void;
  onUpdateText: (idx: number, lang: 'ar' | 'en', text: string) => void;
}

export function ServiceFormPackageFeaturesList({
  featuresAr,
  featuresEn,
  onAddPoint,
  onRemovePoint,
  onUpdateText,
}: ServiceFormPackageFeaturesListProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">✨</span>
          <span className="text-xs font-bold text-slate-800 dark:text-gray-200">بنود ومميزات الباقة التفصيلية:</span>
          <span className="inline-flex items-center leading-none text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-gray-400 font-bold">
            {featuresAr.length} بنود
          </span>
        </div>
        <button
          type="button"
          onClick={onAddPoint}
          className="text-xs font-bold text-amber-800 dark:text-pharaohGold hover:bg-amber-500/20 bg-amber-500/10 dark:bg-pharaohGold/10 px-3 py-1.5 rounded-xl cursor-pointer border border-amber-500/20 dark:border-pharaohGold/30 transition-all flex items-center gap-1.5"
        >
          <span>+</span>
          <span>إضافة بند ميزة جديد</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {featuresAr.map((fItem, fIdx) => (
          <div key={fIdx} className="bg-slate-50 dark:bg-[#0A192F] p-2.5 sm:p-3 rounded-xl border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shadow-2xs">
            <span className="w-6 h-6 rounded-lg bg-amber-500/10 dark:bg-pharaohGold/10 text-amber-800 dark:text-pharaohGold text-[11px] font-bold flex items-center justify-center shrink-0 self-start sm:self-center">
              {fIdx + 1}
            </span>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder={`الميزة ${fIdx + 1} بالعربية`}
                  value={fItem}
                  onChange={e => onUpdateText(fIdx, 'ar', e.target.value)}
                  className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg py-2 px-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                />
              </div>
              <div className="relative" dir="ltr">
                <input
                  type="text"
                  placeholder={`Feature ${fIdx + 1} in English`}
                  value={featuresEn[fIdx] || ''}
                  onChange={e => onUpdateText(fIdx, 'en', e.target.value)}
                  className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg py-2 px-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => onRemovePoint(fIdx)}
              className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white text-red-600 dark:text-red-400 text-xs flex items-center justify-center shrink-0 cursor-pointer border border-red-500/20 transition-all self-end sm:self-center"
              title="حذف هذا البند"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
