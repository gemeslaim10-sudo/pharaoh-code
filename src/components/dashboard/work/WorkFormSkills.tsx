'use client';

interface Skill {
    name: string;
    value: string;
}

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
        <div className="bg-pharaohNavy/50 p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex justify-between items-center mb-2">
                <h5 className="text-pharaohGold font-bold text-xs uppercase tracking-wider">𓂀 القدرات والمهارات البرمجية والفنية</h5>
                <button type="button" onClick={onAddSkill} className="bg-pharaohGold/10 hover:bg-pharaohGold/20 border border-pharaohGold/30 text-pharaohGold font-bold text-xs px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1">
                    <span>+</span> إضافة مهارة أخرى
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                    <div key={index} className="space-y-2 relative p-3 bg-[#112240] rounded-xl border border-white/5">
                        <input type="text" value={skill.name} onChange={e => onSkillChange(index, 'name', e.target.value)} placeholder="اسم المهارة (مثال: Figma)" required className="w-full bg-pharaohNavy border border-white/10 rounded-lg p-2 text-xs text-white focus:border-pharaohGold outline-none" />
                        <input type="text" value={skill.value} onChange={e => onSkillChange(index, 'value', e.target.value)} placeholder="النسبة (مثال: 95%)" required className="w-full bg-pharaohNavy border border-white/10 rounded-lg p-2 text-xs text-white focus:border-pharaohGold outline-none" />
                        {skills.length > 1 && (
                            <button type="button" onClick={() => onRemoveSkill(index)} className="absolute top-1 left-2 text-red-400 hover:text-red-600 text-[10px] font-bold p-1">إزالة</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
