'use client';

export interface CategoryItem {
  id?: string;
  slug?: string;
  name_ar?: string;
  name_en?: string;
}

interface CategoryEditModalProps {
  category: CategoryItem;
  submitting: boolean;
  onClose: () => void;
  onUpdate: (e: React.FormEvent) => void;
  onChange: (updated: CategoryItem) => void;
}

export function CategoryEditModal({
  category,
  submitting,
  onClose,
  onUpdate,
  onChange,
}: CategoryEditModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#112240] border border-pharaohGold/30 p-6 md:p-8 rounded-2xl max-w-md w-full space-y-6 shadow-2xl">
        <h3 className="text-xl font-bold text-pharaohGold border-b border-white/10 pb-3">تعديل التصنيف</h3>
        <form onSubmit={onUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">اسم التصنيف (بالعربية)</label>
            <input
              type="text"
              required
              value={category.name_ar || ''}
              onChange={(e) => onChange({ ...category, name_ar: e.target.value })}
              className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-pharaohGold outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Name (English)</label>
            <input
              type="text"
              value={category.name_en || ''}
              onChange={(e) => onChange({ ...category, name_en: e.target.value })}
              className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-pharaohGold outline-none"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">المعرف (Slug)</label>
            <input
              type="text"
              value={category.slug || ''}
              onChange={(e) => onChange({ ...category, slug: e.target.value })}
              className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3 text-sm text-white focus:border-pharaohGold outline-none"
              dir="ltr"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-400 hover:text-white bg-white/5"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-pharaohGold text-[#0A192F] px-6 py-2.5 rounded-xl text-xs font-black hover:bg-white transition"
            >
              {submitting ? 'جاري الحفظ...' : 'حفظ التعديل'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
