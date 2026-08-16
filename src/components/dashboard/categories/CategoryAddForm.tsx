'use client';

interface CategoryAddFormProps {
  nameAr: string;
  setNameAr: (val: string) => void;
  nameEn: string;
  setNameEn: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  submitting: boolean;
  onAdd: (e: React.FormEvent) => void;
}

export function CategoryAddForm({
  nameAr,
  setNameAr,
  nameEn,
  setNameEn,
  slug,
  setSlug,
  submitting,
  onAdd,
}: CategoryAddFormProps) {
  return (
    <div className="bg-[#112240] p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
      <h2 className="text-xl font-bold text-pharaohGold border-b border-white/10 pb-3">إضافة تصنيف عمل جديد</h2>
      <form onSubmit={onAdd} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">اسم التصنيف (بالعربية)</label>
          <input
            type="text"
            required
            placeholder="مثال: تطبيقات الويب والهواتف"
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">Name (English)</label>
          <input
            type="text"
            placeholder="e.g. Web & Mobile Apps"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-2">معرف التصنيف / Slug (اختياري)</label>
          <input
            type="text"
            placeholder="e.g. web-apps"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
            dir="ltr"
          />
        </div>
        <div className="md:col-span-3 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="bg-pharaohGold text-[#0A192F] px-8 py-3.5 rounded-xl font-black text-sm hover:bg-white transition-all shadow-lg disabled:opacity-50"
          >
            {submitting ? 'جاري الإضافة...' : '+ إضافة التصنيف'}
          </button>
        </div>
      </form>
    </div>
  );
}
