'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase/config';
import { getStatsContent, updateStatsContent, StatsSectionData, DEFAULT_STATS_DATA } from '@/app/actions/dashboard/stats';

export function useStatsForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [form, setForm] = useState<StatsSectionData>(DEFAULT_STATS_DATA);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getStatsContent();
        setForm(data);
      } catch (error) {
        console.error("Failed to load stats data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();

      const res = await updateStatsContent(token, form);
      if (res.success) {
        setMessage({ text: 'تم حفظ ونشر إعدادات وبيانات قسم الإحصائيات بنجاح!', type: 'success' });
      } else {
        setMessage({ text: res.error || 'حدث خطأ أثناء حفظ الإحصائيات.', type: 'error' });
      }
    } catch (error: any) {
      console.error(error);
      setMessage({ text: error.message || 'حدث خطأ غير متوقع.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return {
    loading,
    saving,
    message,
    form,
    setForm,
    handleSave,
  };
}
