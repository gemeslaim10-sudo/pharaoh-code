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
                    <label className="block text-gray-400 text-sm mb-2.5 font-medium">الوصف العربي للخدمة</label>
                    <textarea id="adv-srv-desc" rows={4} required value={desc} onChange={e => setDesc(e.target.value)} placeholder="اكتب وصفاً جذاباً باللغة العربية..." className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600"></textarea>
                </div>
                <div>
                    <label className="block text-gray-400 text-sm mb-2.5 font-medium">الوصف بالإنجليزية (Description EN)</label>
                    <textarea id="adv-srv-desc-en" rows={4} value={descEn} onChange={e => setDescEn(e.target.value)} placeholder="Write attractive description in English..." className="w-full bg-pharaohNavy border border-white/10 rounded-xl p-3.5 text-white focus:border-pharaohGold outline-none transition placeholder:text-gray-600" dir="ltr"></textarea>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button type="submit" disabled={loading} id="submit-form-btn" className="w-full bg-pharaohGold text-pharaohNavy font-black px-8 py-4 rounded-xl hover:bg-white hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-[0_10px_20px_rgba(197,161,111,0.15)] disabled:opacity-50">
                    {loading ? "جاري التثبيت في الصرح..." : (editingService ? "حفظ التعديلات في الصرح 𓂀" : "تثبيت العرض والخدمة في الصرح 𓂀")}
                </button>
            </div>
        </>
    );
}
