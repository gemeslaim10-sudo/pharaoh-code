'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { addCreativityItem } from '@/app/actions/dashboard/creativity';
import { getCategories } from '@/app/actions/dashboard/categories';

export function useCreativityForm(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['web']);
  const [availableCategories, setAvailableCategories] = useState<Array<{ slug?: string; id?: string; name_ar?: string; name_en?: string }>>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [link, setLink] = useState('');
  const [appLink, setAppLink] = useState('');
  const [desc, setDesc] = useState('');
  const [descEn, setDescEn] = useState('');

  useEffect(() => {
    async function fetchCats() {
      const cats = await getCategories();
      setAvailableCategories(cats);
    }
    fetchCats();
  }, []);

  const isAppCategory = selectedCategories.some(cat => 
    cat.toLowerCase().includes('app') || 
    cat.includes('تطبيق') || 
    cat.toLowerCase().includes('mobile')
  );

  const toggleCategory = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter(c => c !== slug));
      }
    } else {
      setSelectedCategories([...selectedCategories, slug]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();
      
      const categoryString = selectedCategories.join(',');

      await addCreativityItem(token, 'portfolio', {
        title,
        title_ar: title,
        title_en: titleEn,
        category: categoryString || 'web',
        categories: selectedCategories,
        image: imageUrl,
        desc,
        desc_ar: desc,
        desc_en: descEn,
        description: desc,
        description_ar: desc,
        description_en: descEn,
        link,
        appLink: isAppCategory ? appLink : ''
      });
      
      setTitle('');
      setTitleEn('');
      setSelectedCategories(['web']);
      setImageUrl('');
      setLink('');
      setAppLink('');
      setDesc('');
      setDescEn('');
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء إضافة المشروع.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading, title, setTitle, titleEn, setTitleEn,
    selectedCategories, availableCategories, toggleCategory,
    isAppCategory, imageUrl, setImageUrl, link, setLink,
    appLink, setAppLink, desc, setDesc, descEn, setDescEn,
    handleSubmit
  };
}
