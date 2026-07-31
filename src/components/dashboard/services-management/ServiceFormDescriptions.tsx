'use client';

interface ServiceFormDescriptionsProps {
    desc: string;
    setDesc: (val: string) => void;
    descEn: string;
    setDescEn: (val: string) => void;
    loading: boolean;
    editingService: any;
}

export default function ServiceFormDescriptions({
    desc,
    setDesc,
    descEn,
    setDescEn,
    loading,
    editingService
}: ServiceFormDescriptionsProps) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="flex justify-between items-center mb-2.5">
                        <label className="block text-gray-400 text-sm font-medium">الوصف المختصر للكرت (بالعربية)</label>
                        <span className="text-[10px] text-pharaohGold/70 font-mono">{desc.length}/160</span>
                    </div>
                    <textarea id="adv-srv-desc" rows={3} required maxLength={160} value={desc} onChange={e => setDesc(e.target.value)} placeholder="اكتب وصفاً محدد ومختصراً يظهر في كرت الخدمة..." className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600 text-xs md:text-sm resize-none"></textarea>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-2.5">
                        <label className="block text-gray-400 text-sm font-medium">الوصف المختصر بالإنجليزية (Description EN)</label>
                        <span className="text-[10px] text-pharaohGold/70 font-mono">{descEn.length}/160</span>
                    </div>
                    <textarea id="adv-srv-desc-en" rows={3} maxLength={160} value={descEn} onChange={e => setDescEn(e.target.value)} placeholder="Write concise card description in English..." className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600 text-xs md:text-sm resize-none" dir="ltr"></textarea>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button type="submit" disabled={loading} id="submit-form-btn" className="w-full bg-pharaohGold text-pharaohNavy font-black px-8 py-4 rounded-xl hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-[0_10px_20px_rgba(197,161,111,0.15)] disabled:opacity-50">
                    {loading ? "جاري التثبيت وحفظ التغيرات..." : (editingService ? "حفظ وتثبيت تعديلات الخدمة 𓂀" : "تثبيت ونشر الخدمة الجديدة 𓂀")}
                </button>
            </div>
        </>
    );
}
