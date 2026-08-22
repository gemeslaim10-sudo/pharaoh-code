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
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-gray-300">بنود ومميزات الباقة (نقاط مرنة):</span>
        <button
          type="button"
          onClick={onAddPoint}
          className="text-[11px] font-bold text-pharaohGold hover:underline bg-pharaohGold/10 px-2.5 py-1 rounded-lg cursor-pointer"
        >
          + إضافة بند ميزة
        </button>
      </div>

      <div className="space-y-2">
        {featuresAr.map((fItem, fIdx) => (
          <div key={fIdx} className="flex items-center gap-2">
            <input
              type="text"
              placeholder={`بند ${fIdx + 1} بالعربية`}
              value={fItem}
              onChange={e => onUpdateText(fIdx, 'ar', e.target.value)}
              className="flex-1 bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white"
            />
            <input
              type="text"
              placeholder={`Feature ${fIdx + 1} (EN)`}
              value={featuresEn[fIdx] || ''}
              onChange={e => onUpdateText(fIdx, 'en', e.target.value)}
              className="flex-1 bg-[#0A192F] border border-white/10 rounded-lg p-2 text-xs text-white"
              dir="ltr"
            />
            <button
              type="button"
              onClick={() => onRemovePoint(fIdx)}
              className="w-7 h-7 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs flex items-center justify-center shrink-0 cursor-pointer"
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
