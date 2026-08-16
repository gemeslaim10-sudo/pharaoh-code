'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getAboutContent, updateAboutContent } from '@/app/actions/dashboard/about';
import { AboutFormData, INITIAL_ABOUT_FORM } from './aboutDashboardTypes';

export function useAboutDashboardForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'vision' | 'philosophy' | 'faq'>('hero');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [form, setForm] = useState<AboutFormData>(INITIAL_ABOUT_FORM);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const content = await getAboutContent();
      if (content && Object.keys(content).length > 0) {
        setForm(prev => ({
          hero: { ...prev.hero, ...(content.hero || {}) },
          visionMission: { ...prev.visionMission, ...(content.visionMission || {}) },
          philosophy: { ...prev.philosophy, ...(content.philosophy || {}) },
          faq: { ...prev.faq, faqs: [], ...(content.faq || {}) }
        }));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMessage(null);

    try {
      const token = await user.getIdToken();
      const res = await updateAboutContent(token, form);
      if (res.success) {
        setMessage({ type: 'success', text: 'تم حفظ وتحديث محتوى صفحة (من نحن) بنجاح!' });
      } else {
        setMessage({ type: 'error', text: res.error || 'حدث خطأ أثناء الحفظ.' });
      }
    } catch (err) {
      const error = err as Error;
      setMessage({ type: 'error', text: error.message || 'حدث خطأ غير متوقع.' });
    } finally {
      setSaving(false);
    }
  };

  return {
    loading, saving, activeTab, setActiveTab, message, form, setForm, handleSave
  };
}
