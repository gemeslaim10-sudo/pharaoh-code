'use client';
import { Stat } from './workFormTypes';

interface WorkFormStatsProps {
    stats: Stat[];
    onAddStat: () => void;
    onRemoveStat: (index: number) => void;
    onStatChange: (index: number, field: keyof Stat, val: string) => void;
}

export default function WorkFormStats({
    stats,
    onAddStat,
    onRemoveStat,
    onStatChange
}: WorkFormStatsProps) {
    return (
        <div className="bg-slate-50 dark:bg-pharaohNavy/50 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-3">
                <div>
                    <h5 className="text-sm font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-2">
                        <span>📊</span>
                        <span>الإحصائيات الرقمية ومؤشرات الإنجاز (Key Metrics & Stats)</span>
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">أضف الإحصائيات باللغتين العربية والإنجليزية مع الرقم الإحصائي.</p>
                </div>
                <button
                    type="button"
                    onClick={onAddStat}
                    className="bg-amber-500/10 hover:bg-amber-500/20 dark:bg-pharaohGold/10 dark:hover:bg-pharaohGold/20 border border-amber-500/30 dark:border-pharaohGold/30 text-amber-800 dark:text-pharaohGold font-bold text-xs px-3.5 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                >
                    <span>+</span>
                    <span>إضافة إحصائية أخرى</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="relative p-4 bg-white dark:bg-[#112240] rounded-xl border border-slate-200 dark:border-white/10 shadow-xs space-y-3"
                    >
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                            <span className="w-6 h-6 rounded-lg bg-amber-500/10 dark:bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold flex items-center justify-center font-bold text-xs">
                                0{index + 1}
                            </span>
                            {stats.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => onRemoveStat(index)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-500/10 px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer"
                                >
                                    حذف
                                </button>
                            )}
                        </div>

                        <div>
                            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
                                🔢 الرقم أو القيمة الإحصائية (Value)
                            </label>
                            <input
                                type="text"
                                value={stat.value}
                                onChange={e => onStatChange(index, 'value', e.target.value)}
                                placeholder="مثال: 25+ أو 99.9%"
                                required
                                className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none font-mono placeholder:text-slate-400 dark:placeholder:text-gray-600"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                                <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
                                    🇸🇦 التسمية (عربي)
                                </label>
                                <input
                                    type="text"
                                    value={stat.label || stat.label_ar || ''}
                                    onChange={e => {
                                        onStatChange(index, 'label', e.target.value);
                                        onStatChange(index, 'label_ar', e.target.value);
                                    }}
                                    placeholder="مثال: مشروع تم تسليمه"
                                    required
                                    className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
                                    🇬🇧 Label (EN)
                                </label>
                                <input
                                    type="text"
                                    value={stat.label_en || ''}
                                    onChange={e => onStatChange(index, 'label_en', e.target.value)}
                                    placeholder="e.g. Delivered Projects"
                                    className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                                    dir="ltr"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
