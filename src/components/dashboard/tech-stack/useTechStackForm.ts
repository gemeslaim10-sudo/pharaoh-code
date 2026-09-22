'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  getTechStackContent,
  updateTechStackContent,
  getServicesPageHeader,
  updateServicesPageHeader,
} from '@/app/actions/dashboard/techStack';
import {
  type TechStackFormData,
  type TechCardItem,
  type ServicesPageHeaderData,
  INITIAL_SERVICES_PAGE_HEADER,
} from '@/types/techStack';

const EMPTY_CARD: TechCardItem = { title_ar: '', title_en: '', desc_ar: '', desc_en: '', icon: '' };

const INITIAL_TECH_STACK_FORM: TechStackFormData = {
  subtitle_ar: '', subtitle_en: '',
  title1_ar: '', title1_en: '',
  title2_ar: '', title2_en: '',
  description_ar: '', description_en: '',
  cleanArch_ar: '', cleanArch_en: '',
  aesEncrypt_ar: '', aesEncrypt_en: '',
  cards: Array.from({ length: 6 }, () => ({ ...EMPTY_CARD })),
};

export function useTechStackForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [form, setForm] = useState<TechStackFormData>(INITIAL_TECH_STACK_FORM);
  const [header, setHeader] = useState<ServicesPageHeaderData>(INITIAL_SERVICES_PAGE_HEADER);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [content, headerContent] = await Promise.all([
        getTechStackContent(),
        getServicesPageHeader(),
      ]);

      if (content && Object.keys(content).length > 0) {
        setForm(prev => ({
          ...prev,
          ...content,
          cards: Array.isArray(content.cards) && content.cards.length > 0
            ? content.cards
            : prev.cards,
        }));
      }

      if (headerContent && Object.keys(headerContent).length > 0) {
        setHeader(prev => ({ ...prev, ...headerContent }));
      }

      setLoading(false);
    }
    loadData();
  }, []);

  const setHeaderField = (field: keyof ServicesPageHeaderData, value: string) => {
    setHeader(prev => ({ ...prev, [field]: value }));
  };

  const addCard = () => {
    setForm(prev => ({ ...prev, cards: [...(prev.cards || []), { ...EMPTY_CARD }] }));
  };

  const removeCard = (idx: number) => {
    setForm(prev => {
      const cards = prev.cards || [];
      if (cards.length <= 1) {
        alert('يجب الإبقاء على بطاقة تقنية واحدة على الأقل');
        return prev;
      }
      return { ...prev, cards: cards.filter((_, i) => i !== idx) };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMessage(null);

    try {
      const token = await user.getIdToken();
      const [techRes, headerRes] = await Promise.all([
        updateTechStackContent(token, form),
        updateServicesPageHeader(token, header),
      ]);

      if (techRes.success && headerRes.success) {
        setMessage({ type: 'success', text: 'تم حفظ وتحديث رأس صفحة الخدمات وقسم التقنيات (Tech Stack) بنجاح!' });
      } else {
        setMessage({ type: 'error', text: techRes.error || headerRes.error || 'حدث خطأ أثناء الحفظ.' });
      }
    } catch (err) {
      const error = err as Error;
      setMessage({ type: 'error', text: error.message || 'حدث خطأ غير متوقع.' });
    } finally {
      setSaving(false);
    }
  };

  return { loading, saving, message, form, setForm, header, setHeader, setHeaderField, addCard, removeCard, handleSave };
}
