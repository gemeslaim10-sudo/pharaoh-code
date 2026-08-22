'use client';

interface ServiceFormDescriptionsProps {
    desc: string;
    setDesc: (val: string) => void;
    descEn: string;
    setDescEn: (val: string) => void;
}

export default function ServiceFormDescriptions({
    desc,
    setDesc,
    descEn,
    setDescEn
}: ServiceFormDescriptionsProps) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="flex justify-between items-center mb-2.5">
                        <label className="block text-slate-700 dark:text-gray-400 text-sm font-medium">الوصف المختصر للكرت (بالعربية)</label>
                        <span className="text-[10px] text-amber-800 dark:text-pharaohGold/70 font-mono">{desc.length}/160</span>
                    </div>
                    <textarea id="adv-srv-desc" rows={3} required maxLength={160} value={desc} onChange={e => setDesc(e.target.value)} placeholder="اكتب وصفاً محدد ومختصراً يظهر في كرت الخدمة..." className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600 text-xs md:text-sm resize-none"></textarea>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2.5">
                        <label className="block text-slate-700 dark:text-gray-400 text-sm font-medium">الوصف المختصر بالإنجليزية (Description EN)</label>
                        <span className="text-[10px] text-amber-800 dark:text-pharaohGold/70 font-mono">{descEn.length}/160</span>
                    </div>
                    <textarea id="adv-srv-desc-en" rows={3} maxLength={160} value={descEn} onChange={e => setDescEn(e.target.value)} placeholder="Write concise card description in English..." className="w-full bg-slate-50 dark:bg-pharaohNavy border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-slate-900 dark:text-white focus:border-pharaohGold outline-none transition placeholder:text-slate-400 dark:placeholder:text-gray-600 text-xs md:text-sm resize-none" dir="ltr"></textarea>
                </div>
            </div>
        </>
    );
}
