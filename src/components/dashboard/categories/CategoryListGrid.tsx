'use client';
import { CategoryItem } from './CategoryEditModal';

interface CategoryListGridProps {
  categories: CategoryItem[];
  loading: boolean;
  onEdit: (cat: CategoryItem) => void;
  onDelete: (id: string, name: string) => void;
}

export function CategoryListGrid({
  categories,
  loading,
  onEdit,
  onDelete,
}: CategoryListGridProps) {
  return (
    <div className="bg-[#112240] p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
      <h2 className="text-xl font-bold text-pharaohGold border-b border-white/10 pb-3">التصنيفات الحالية ({categories.length})</h2>

      {loading ? (
        <div className="text-center py-8 text-gray-400">جاري تحميل التصنيفات...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-8 text-gray-500">لا توجد تصنيفات معرفة.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const catId = cat.id || cat.slug || '';
            const catName = cat.name_ar || cat.name_en || '';
            return (
              <div key={catId} className="bg-[#0A192F] border border-white/10 p-5 rounded-xl flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">{cat.name_ar}</h3>
                    <span className="text-[10px] bg-pharaohGold/10 text-pharaohGold px-2.5 py-1 rounded-md font-mono">{cat.slug || cat.id}</span>
                  </div>
                  {cat.name_en && (
                    <p className="text-xs text-gray-400 mt-1" dir="ltr">{cat.name_en}</p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
                  <button
                    onClick={() => onEdit(cat)}
                    className="text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg transition"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => onDelete(catId, catName)}
                    className="text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition"
                  >
                    حذف
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
