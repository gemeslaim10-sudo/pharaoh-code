'use client';

import { useState, useEffect } from 'react';
import { getHeroThemeConfig, updateHeroThemeConfig } from '@/app/actions/dashboard/heroTheme';
import { type HeroThemeConfig } from '@/types/heroTheme';
import { auth } from '@/lib/firebase/config';

const EMPTY_CONFIG: HeroThemeConfig = {
  darkSlide1Media: '', darkSlide1Video: '', darkSlide1Image: '',
  darkSlide2Media: '', darkSlide2Video: '', darkSlide2Image: '',
  darkPreset: 'royal_gold',
  lightSlide1Media: '', lightSlide1Video: '', lightSlide1Image: '',
  lightSlide2Media: '', lightSlide2Video: '', lightSlide2Image: '',
  lightPreset: 'royal_gold',
};

/** Normalises the three legacy keys (Media/Video/Image) of a slide into one value. */
function pickSlide(data: HeroThemeConfig, mode: 'dark' | 'light', slide: 1 | 2): string {
  const base = `${mode}Slide${slide}` as const;
  return (data[`${base}Media`] || data[`${base}Video`] || data[`${base}Image`] || '') as string;
}

export function useHeroThemeSettings() {
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [config, setConfig] = useState<HeroThemeConfig>(EMPTY_CONFIG);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getHeroThemeConfig();
        if (data) {
          const d1 = pickSlide(data, 'dark', 1), d2 = pickSlide(data, 'dark', 2);
          const l1 = pickSlide(data, 'light', 1), l2 = pickSlide(data, 'light', 2);
          setConfig({
            darkSlide1Media: d1, darkSlide1Video: d1, darkSlide1Image: d1,
            darkSlide2Media: d2, darkSlide2Video: d2, darkSlide2Image: d2,
            darkPreset: data.darkPreset || 'royal_gold',
            lightSlide1Media: l1, lightSlide1Video: l1, lightSlide1Image: l1,
            lightSlide2Media: l2, lightSlide2Video: l2, lightSlide2Image: l2,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();

      await updateHeroThemeConfig(token, config);
      alert("تم حفظ وتحديث ميديا وقوالب ألوان الهيرو بنجاح! التغييرات ظاهرة الآن على الموقع.");
    } catch (error) {
      const err = error as Error;
      console.error(err);
      alert(`حدث خطأ أثناء الحفظ: ${err?.message || 'تعذر حفظ البيانات.'}`);
    } finally {
      setLoading(false);
    }
  };

  return { loading, initialLoad, config, setConfig, handleSubmit };
}
