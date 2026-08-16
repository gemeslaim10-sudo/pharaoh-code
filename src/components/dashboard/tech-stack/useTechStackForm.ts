'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getTechStackContent, updateTechStackContent } from '@/app/actions/dashboard/techStack';
import { TechStackFormData } from './TechStackHeaderFields';

const INITIAL_TECH_STACK_FORM: TechStackFormData = {
  subtitle_ar: '', subtitle_en: '',
  title1_ar: '', title1_en: '',
  title2_ar: '', title2_en: '',
  description_ar: '', description_en: '',
  cleanArch_ar: '', cleanArch_en: '',
  aesEncrypt_ar: '', aesEncrypt_en: '',
  cards: [
    { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
    { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
    { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
    { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
    { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
    { title_ar: '', title_en: '', desc_ar: '', desc_en: '' }
  ]
};

export function useTechStackForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [form, setForm] = useState<TechStackFormData>(INITIAL_TECH_STACK_FORM);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const content = await getTechStackContent();
      if (content && Object.keys(content).length > 0) {
        setForm(prev => ({
          ...prev,
          ...content,
          cards: Array.isArray(content.cards) && content.cards.length === 6
            ? content.cards
            : prev.cards
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
      const res = await updateTechStackContent(token, form);
      if (res.success) {
        setMessage({ type: 'success', text: 'تم حفظ وتحديث محتوى قسم التقنيات (Tech Stack) بنجاح!' });
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

  return { loading, saving, message, form, setForm, handleSave };
}
