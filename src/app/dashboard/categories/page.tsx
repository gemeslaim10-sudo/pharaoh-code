'use client';

import { CategoryEditModal } from '@/components/dashboard/categories/CategoryEditModal';
import { CategoryAddForm } from '@/components/dashboard/categories/CategoryAddForm';
import { CategoryListGrid } from '@/components/dashboard/categories/CategoryListGrid';
import { useDashboardCategories } from '@/components/dashboard/categories/useDashboardCategories';

export default function DashboardCategoriesPage() {
  const {
    categories,
    loading,
    submitting,
    editingCategory,
    setEditingCategory,
    message,
    nameAr,
    setNameAr,
    nameEn,
    setNameEn,
    slug,
    setSlug,
    handleAdd,
    handleUpdate,
    handleDelete
  } = useDashboardCategories();

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-pharaohGold/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">إدارة تصنيفات العمل الرقمي</h1>
          <p className="text-gray-400 text-sm mt-1">إضافة، تعديل، وحذف تصنيفات المشاريع والأعمال الرقمية المتاحة للاختيار المتعدد</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
          <span>{message.type === 'success' ? '✓' : '⚠️'}</span>
          {message.text}
        </div>
      )}

      <CategoryAddForm
        nameAr={nameAr} setNameAr={setNameAr}
        nameEn={nameEn} setNameEn={setNameEn}
        slug={slug} setSlug={setSlug}
        submitting={submitting}
        onAdd={handleAdd}
      />

      <CategoryListGrid
        categories={categories}
        loading={loading}
        onEdit={setEditingCategory}
        onDelete={handleDelete}
      />

      {editingCategory && (
        <CategoryEditModal
          category={editingCategory}
          submitting={submitting}
          onClose={() => setEditingCategory(null)}
          onUpdate={handleUpdate}
          onChange={setEditingCategory}
        />
      )}
    </div>
  );
}
