'use client';
import { useState } from 'react';
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

const PACKAGE_DEFAULTS = [
  { defaultTitleAr: 'الباقة الأساسية', defaultTitleEn: 'Starter Package', icon: '👑' },
  { defaultTitleAr: 'الباقة المتقدمة', defaultTitleEn: 'Professional Package', icon: '⭐' },
  { defaultTitleAr: 'الباقة الشاملة', defaultTitleEn: 'Enterprise Package', icon: '⚡' },
];

export function ServiceFormPackagesTab({
  packagesTitleAr,
  setPackagesTitleAr,
  packagesTitleEn,
  setPackagesTitleEn,
  packages,
  setPackages,
}: ServiceFormPackagesTabProps) {
  const [activePackageIdx, setActivePackageIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('tabs');

  const handleUpdatePackage = (idx: number, updatedPkg: PackageItem) => {
    const next = [...packages];
    next[idx] = updatedPkg;
    setPackages(next);
  };

  return (
    <div className="bg-slate-50 dark:bg-[#0A192F] p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h5 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-amber-800 dark:text-pharaohGold text-lg">💰</span>
            <span>باقات واستثمار الخدمة (3 Pricing Packages)</span>
          </h5>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">قم بتهيئة وتعديل تفاصيل باقات التسعير الثلاث والأسعار والمميزات الخاصة بكل باقة.</p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-[#112240] p-1 rounded-xl border border-slate-300 dark:border-white/10 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('tabs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'tabs'
                ? 'bg-amber-800 dark:bg-pharaohGold text-white dark:text-[#0A192F] shadow-sm'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            عرض بالتبويبات (منظم)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'all'
                ? 'bg-amber-800 dark:bg-pharaohGold text-white dark:text-[#0A192F] shadow-sm'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            عرض الكل معاً
          </button>
        </div>
      </div>

      {/* Global Section Titles (AR / EN) */}
      <div className="bg-white dark:bg-[#112240] p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs space-y-3">
        <span className="text-xs font-bold text-amber-800 dark:text-pharaohGold block">العنوان العام لقسم الباقات في صفحة الخدمة:</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-gray-300">عنوان قسم الباقات</label>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-800 dark:text-pharaohGold border border-amber-500/20 font-bold">🇸🇦 عربي</span>
            </div>
            <input
              type="text"
              placeholder="مثال: باقات استثمار الخدمة"
              value={packagesTitleAr || ''}
              onChange={e => setPackagesTitleAr(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-gray-300">Packages Section Title</label>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold">🇬🇧 English</span>
            </div>
            <input
              type="text"
              placeholder="e.g. Service Investment Packages"
              value={packagesTitleEn || ''}
              onChange={e => setPackagesTitleEn(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
              dir="ltr"
            />
          </div>
        </div>
      </div>

      {/* Interactive Sub-Tabs Switcher for the 3 Packages */}
      {viewMode === 'tabs' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
            {packages?.map((pkg, idx) => {
              const meta = PACKAGE_DEFAULTS[idx] || { defaultTitleAr: `الباقة ${idx + 1}`, defaultTitleEn: `Package ${idx + 1}`, icon: '📦' };
              const isActive = activePackageIdx === idx;
              const title = pkg.title_ar || meta.defaultTitleAr;
              const price = pkg.price || 'لم يحدد السعر';

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePackageIdx(idx)}
                  className={`flex-1 min-w-[200px] p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/15 dark:bg-[#112240] border-amber-500 dark:border-pharaohGold text-slate-900 dark:text-white shadow-md'
                      : 'bg-white dark:bg-[#112240]/60 border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:border-amber-500/40 dark:hover:border-pharaohGold/40 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl shrink-0">{meta.icon}</span>
                    <div className="min-w-0 truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold truncate">{title}</span>
                        {pkg.isPopular && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-amber-500 text-[#0A192F] font-black shrink-0">الأكثر طلباً</span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-gray-400 font-mono block mt-0.5">{price}</span>
                    </div>
                  </div>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-amber-600 dark:bg-pharaohGold' : 'bg-transparent'}`} />
                </button>
              );
            })}
          </div>

          {/* Active Package Item Editor */}
          {packages[activePackageIdx] && (
            <ServiceFormPackageItemEditor
              key={activePackageIdx}
              pkg={packages[activePackageIdx]}
              idx={activePackageIdx}
              onUpdate={(updated) => handleUpdatePackage(activePackageIdx, updated)}
            />
          )}
        </div>
      )}

      {/* All Packages View Mode */}
      {viewMode === 'all' && (
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
      )}
    </div>
  );
}
