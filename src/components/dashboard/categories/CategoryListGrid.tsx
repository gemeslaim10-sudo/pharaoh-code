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
    <div className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
      <h2 className="text-lg sm:text-xl font-bold text-amber-800 dark:text-pharaohGold border-b border-slate-200 dark:border-white/10 pb-3">التصنيفات الحالية ({categories.length})</h2>

      {loading ? (
        <div className="text-center py-8 text-slate-500 dark:text-gray-400">جاري تحميل التصنيفات...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-8 text-slate-500 dark:text-gray-500">لا توجد تصنيفات معرفة.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const catId = cat.id || cat.slug || '';
            const catName = cat.name_ar || cat.name_en || '';
            return (
              <div key={catId} className="bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 p-5 rounded-xl flex flex-col justify-between space-y-3 shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">{cat.name_ar}</h3>
                    <span className="text-[10px] bg-amber-500/10 dark:bg-pharaohGold/10 text-amber-800 dark:text-pharaohGold border border-amber-500/20 dark:border-pharaohGold/20 px-2.5 py-1 rounded-md font-mono">{cat.slug || cat.id}</span>
                  </div>
                  {cat.name_en && (
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-1" dir="ltr">{cat.name_en}</p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-white/5">
                  <button
                    onClick={() => onEdit(cat)}
                    className="text-xs bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 hover:bg-blue-500 hover:text-white px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => onDelete(catId, catName)}
                    className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold"
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
