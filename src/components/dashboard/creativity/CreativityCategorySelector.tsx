'use client';

interface CategoryItem {
  slug?: string;
  id?: string;
  name_ar?: string;
  name_en?: string;
}

interface CreativityCategorySelectorProps {
  availableCategories: CategoryItem[];
  selectedCategories: string[];
  onToggleCategory: (slug: string) => void;
}

export function CreativityCategorySelector({
  availableCategories,
  selectedCategories,
  onToggleCategory,
}: CreativityCategorySelectorProps) {
  return (
    <div className="md:col-span-2 bg-slate-50 dark:bg-[#0A192F] p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-amber-800 dark:text-pharaohGold uppercase tracking-wider">
          تصنيف العمل الرقمي (يمكنك اختيار أكثر من تصنيف)
        </label>
        <span className="text-[11px] text-slate-500 dark:text-gray-400">محدد: {selectedCategories.length} تصنيف</span>
      </div>
      <div className="flex flex-wrap gap-3 pt-2">
        {availableCategories.map((cat) => {
          const catSlug = cat.slug || cat.id || '';
          const isSelected = selectedCategories.includes(catSlug);
          return (
            <button
              key={catSlug}
              type="button"
              onClick={() => onToggleCategory(catSlug)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                isSelected
                  ? 'bg-pharaohGold text-[#0A192F] border-pharaohGold shadow-lg shadow-pharaohGold/20 scale-105'
                  : 'bg-white dark:bg-[#112240] text-slate-700 dark:text-gray-300 border-slate-200 dark:border-white/10 hover:border-amber-500/40 dark:hover:border-pharaohGold/40'
              }`}
            >
              <span>{isSelected ? '✓' : '+'}</span>
              <span>{cat.name_ar || cat.name_en || catSlug}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
