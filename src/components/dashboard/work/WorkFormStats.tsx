'use client';

interface Stat {
    value: string;
    label: string;
}

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
        <div className="bg-pharaohNavy/50 p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex justify-between items-center mb-2">
                <h5 className="text-pharaohGold font-bold text-xs uppercase tracking-wider">الإحصائيات الرقمية للنافذة التعريفية (Modal)</h5>
                <button type="button" onClick={onAddStat} className="bg-pharaohGold/10 hover:bg-pharaohGold/20 border border-pharaohGold/30 text-pharaohGold font-bold text-xs px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1 cursor-pointer">
                    <span>+</span> إضافة إحصائية أخرى
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="flex gap-2 p-3 bg-[#112240] rounded-xl border border-white/5 relative">
                        <input type="text" value={stat.value} onChange={e => onStatChange(index, 'value', e.target.value)} placeholder="الرقم (25+)" required className="w-1/3 bg-pharaohNavy border border-white/10 rounded-lg p-2 text-xs text-white focus:border-pharaohGold outline-none" />
                        <input type="text" value={stat.label} onChange={e => onStatChange(index, 'label', e.target.value)} placeholder="التسمية (مشروع ناجح)" required className="w-2/3 bg-pharaohNavy border border-white/10 rounded-lg p-2 text-xs text-white focus:border-pharaohGold outline-none" />
                        {stats.length > 1 && (
                            <button type="button" onClick={() => onRemoveStat(index)} className="absolute top-1 left-2 text-red-400 hover:text-red-600 text-[10px] font-bold p-1">إزالة</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
