'use client';

import { useState } from 'react';
import { CategoryEditModal } from '@/components/dashboard/categories/CategoryEditModal';
import { CategoryAddForm } from '@/components/dashboard/categories/CategoryAddForm';
import { CategoryListGrid } from '@/components/dashboard/categories/CategoryListGrid';
import { useDashboardCategories } from '@/components/dashboard/categories/useDashboardCategories';
import { DashboardAccordionGroup } from '@/components/dashboard/layout/DashboardAccordionGroup';

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
    handleDelete,
  } = useDashboardCategories();

  const [openAdd, setOpenAdd] = useState(true);
  const [openList, setOpenList] = useState(true);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 text-right" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-pharaohGold/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">إدارة تصنيفات العمل الرقمي</h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 dark:bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold border border-amber-500/30 dark:border-pharaohGold/30">
              {categories.length} تصنيف
            </span>
          </div>
          <p className="text-slate-600 dark:text-gray-400 text-sm mt-1">إضافة، تعديل، وحذف تصنيفات المشاريع والأعمال الرقمية التي تنعكس تلقائياً في كافة صفحات الموقع</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'
        }`}>
          <span>{message.type === 'success' ? '✓' : '⚠️'}</span>
          {message.text}
        </div>
      )}

      {/* Group 1: Add Category */}
      <DashboardAccordionGroup
        group={{
          id: 'category-add',
          title: 'إضافة تصنيف عمل جديد (Add New Category)',
          description: 'إنشاء تصنيف جديد بالعربية والإنجليزية مع الـ Slug الخاص به',
          icon: <span className="text-base">➕</span>,
          badge: 'جديد',
          children: (
            <CategoryAddForm
              nameAr={nameAr} setNameAr={setNameAr}
              nameEn={nameEn} setNameEn={setNameEn}
              slug={slug} setSlug={setSlug}
              submitting={submitting}
              onAdd={handleAdd}
            />
          ),
        }}
        isOpen={openAdd}
        onToggle={() => setOpenAdd(!openAdd)}
      />

      {/* Group 2: Categories List */}
      <DashboardAccordionGroup
        group={{
          id: 'category-list',
          title: 'قائمة التصنيفات النشطة في المنصة',
          description: 'استعراض كافة التصنيفات الحالية مع إمكانية التعديل السريع أو الحذف',
          icon: <span className="text-base">📁</span>,
          badge: `${categories.length} متاح`,
          children: (
            <CategoryListGrid
              categories={categories}
              loading={loading}
              onEdit={setEditingCategory}
              onDelete={handleDelete}
            />
          ),
        }}
        isOpen={openList}
        onToggle={() => setOpenList(!openList)}
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
