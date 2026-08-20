'use client';

import { useState, useEffect } from 'react';
import { getHeroThemeConfig, updateHeroThemeConfig, HeroThemeConfig } from '@/app/actions/dashboard/heroTheme';
import { uploadImage } from '@/app/actions/dashboard/upload';
import { auth } from '@/lib/firebase/config';

export function useHeroThemeSettings() {
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [config, setConfig] = useState<HeroThemeConfig>({
    darkSlide1Video: '',
    darkSlide2Video: '',
    darkSlide2Image: '',
    darkPreset: 'royal_gold',
    lightSlide1Video: '',
    lightSlide2Video: '',
    lightSlide2Image: '',
    lightPreset: 'royal_gold',
  });

  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getHeroThemeConfig();
        if (data) {
          setConfig({
            darkSlide1Video: data.darkSlide1Video || '',
            darkSlide2Video: data.darkSlide2Video || '',
            darkSlide2Image: data.darkSlide2Image || '',
            darkPreset: data.darkPreset || 'royal_gold',
            lightSlide1Video: data.lightSlide1Video || '',
            lightSlide2Video: data.lightSlide2Video || '',
            lightSlide2Image: data.lightSlide2Image || '',
            lightPreset: data.lightPreset || 'royal_gold',
          });
        }
      } catch (error) {
        console.error("Failed to load hero theme settings:", error);
      } finally {
        setInitialLoad(false);
      }
    };
    loadData();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldKey: string) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setUploadingField(fieldKey);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();

      const uploadData = new FormData();
      uploadData.append('file', file);
      const uploadRes = await uploadImage(token, uploadData);
      if (!uploadRes.success) throw new Error(uploadRes.error);
      if (uploadRes.url) {
        setConfig(prev => ({ ...prev, [fieldKey]: uploadRes.url }));
      }
    } catch (error) {
      const err = error as Error;
      console.error(err);
      alert(`حدث خطأ أثناء رفع الملف: ${err?.message || 'تعذر الرفع.'}`);
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();

      await updateHeroThemeConfig(token, config);
      alert("تم حفظ وتحديث ميديا وقوالب ألوان الهيرو بنجاح!");
    } catch (error) {
      const err = error as Error;
      console.error(err);
      alert(`حدث خطأ أثناء الحفظ: ${err?.message || 'تعذر حفظ البيانات.'}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading, initialLoad, config, setConfig, uploadingField, handleFileUpload, handleSubmit
  };
}
