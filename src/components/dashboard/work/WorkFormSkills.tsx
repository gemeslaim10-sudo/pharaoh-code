'use client';
import { Skill } from './workFormTypes';

interface WorkFormSkillsProps {
    skills: Skill[];
    onAddSkill: () => void;
    onRemoveSkill: (index: number) => void;
    onSkillChange: (index: number, field: keyof Skill, val: string) => void;
}

export default function WorkFormSkills({
    skills,
    onAddSkill,
    onRemoveSkill,
    onSkillChange
}: WorkFormSkillsProps) {
    return (
        <div className="bg-slate-50 dark:bg-pharaohNavy/50 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/10 pb-3">
                <div>
                    <h5 className="text-sm font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-2">
                        <span>⚡</span>
                        <span>القدرات والمهارات البرمجية والفنية (Core Technical Arsenal)</span>
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">أضف المهارات باللغتين العربية والإنجليزية مع النسبة المئوية.</p>
                </div>
                <button
                    type="button"
                    onClick={onAddSkill}
                    className="bg-amber-500/10 hover:bg-amber-500/20 dark:bg-pharaohGold/10 dark:hover:bg-pharaohGold/20 border border-amber-500/30 dark:border-pharaohGold/30 text-amber-800 dark:text-pharaohGold font-bold text-xs px-3.5 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                >
                    <span>+</span>
                    <span>إضافة مهارة أخرى</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className="relative p-4 bg-white dark:bg-[#112240] rounded-xl border border-slate-200 dark:border-white/10 shadow-xs space-y-3"
                    >
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2">
                            <span className="w-6 h-6 rounded-lg bg-amber-500/10 dark:bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold flex items-center justify-center font-bold text-xs">
                                0{index + 1}
                            </span>
                            {skills.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => onRemoveSkill(index)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-500/10 px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer"
                                >
                                    حذف
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                                <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
                                    🇸🇦 اسم المهارة (عربي)
                                </label>
                                <input
                                    type="text"
                                    value={skill.name || skill.name_ar || ''}
                                    onChange={e => {
                                        onSkillChange(index, 'name', e.target.value);
                                        onSkillChange(index, 'name_ar', e.target.value);
                                    }}
                                    placeholder="مثال: هندسة النظم البرمجية"
                                    required
                                    className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
                                    🇬🇧 Skill Name (EN)
                                </label>
                                <input
                                    type="text"
                                    value={skill.name_en || ''}
                                    onChange={e => onSkillChange(index, 'name_en', e.target.value)}
                                    placeholder="e.g. System Engineering"
                                    className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-medium text-slate-700 dark:text-gray-300 mb-1">
                                📊 النسبة المئوية (Percentage)
                            </label>
                            <input
                                type="text"
                                value={skill.value}
                                onChange={e => onSkillChange(index, 'value', e.target.value)}
                                placeholder="مثال: 95%"
                                required
                                className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none font-mono placeholder:text-slate-400 dark:placeholder:text-gray-600"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
