'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getCategories, addCategory, updateCategory, deleteCategory } from '@/app/actions/dashboard/categories';
import { CategoryItem } from './CategoryEditModal';

export function useDashboardCategories() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [slug, setSlug] = useState('');

  const loadData = async () => {
    setLoading(true);
    const data = await getCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !nameAr.trim()) return;
    setSubmitting(true);
    setMessage(null);

    try {
      const token = await user.getIdToken();
      const res = await addCategory(token, {
        name_ar: nameAr,
        name_en: nameEn || nameAr,
        slug: slug || undefined
      });

      if (res.success) {
        setMessage({ type: 'success', text: 'تمت إضافة التصنيف بنجاح!' });
        setNameAr('');
        setNameEn('');
        setSlug('');
        await loadData();
      } else {
        setMessage({ type: 'error', text: res.error || 'حدث خطأ أثناء الإضافة.' });
      }
    } catch (err) {
      const error = err as Error;
      setMessage({ type: 'error', text: error.message || 'حدث خطأ غير متوقع.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !editingCategory || !editingCategory.id) return;
    setSubmitting(true);
    setMessage(null);

    try {
      const token = await user.getIdToken();
      const res = await updateCategory(token, editingCategory.id, {
        name_ar: editingCategory.name_ar || '',
        name_en: editingCategory.name_en || '',
        slug: editingCategory.slug
      });

      if (res.success) {
        setMessage({ type: 'success', text: 'تم تحديث التصنيف بنجاح!' });
        setEditingCategory(null);
        await loadData();
      } else {
        setMessage({ type: 'error', text: res.error || 'حدث خطأ أثناء التحديث.' });
      }
    } catch (err) {
      const error = err as Error;
      setMessage({ type: 'error', text: error.message || 'حدث خطأ غير متوقع.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`هل أنت متأكد من حذف تصنيف "${name}"؟`)) return;
    if (!user) return;

    try {
      const token = await user.getIdToken();
      const res = await deleteCategory(token, id);
      if (res.success) {
        setMessage({ type: 'success', text: 'تم حذف التصنيف بنجاح!' });
        await loadData();
      } else {
        setMessage({ type: 'error', text: res.error || 'حدث خطأ أثناء الحذف.' });
      }
    } catch (err) {
      const error = err as Error;
      setMessage({ type: 'error', text: error.message || 'حدث خطأ غير متوقع.' });
    }
  };

  return {
    categories, loading, submitting, editingCategory, setEditingCategory, message,
    nameAr, setNameAr, nameEn, setNameEn, slug, setSlug,
    handleAdd, handleUpdate, handleDelete
  };
}
