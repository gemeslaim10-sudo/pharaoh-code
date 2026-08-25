'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { addCreativityItem } from '@/app/actions/dashboard/creativity';
import { getCategories } from '@/app/actions/dashboard/categories';

export function useCreativityForm(onSuccess: () => void) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
      if (cats && cats.length > 0) {
        const first = cats[0];
        const firstSlug = (first?.slug || first?.id || '');
        if (firstSlug) setSelectedCategories([firstSlug]);
      }
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
    if (selectedCategories.length === 0) {
      alert('يرجى اختيار تصنيف واحد على الأقل للمشروع');
      return;
    }
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();
      
      const categoryString = selectedCategories.join(',');
      const primaryCat = availableCategories.find(c => (c.slug || c.id) === selectedCategories[0]);

      await addCreativityItem(token, 'portfolio', {
        title,
        title_ar: title,
        title_en: titleEn,
        category: categoryString,
        categories: selectedCategories,
        category_ar: primaryCat?.name_ar || '',
        category_en: primaryCat?.name_en || '',
        categoryLabel: primaryCat?.name_ar || selectedCategories[0] || '',
        image: imageUrl,
        imageUrl: imageUrl,
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
      const firstCat = availableCategories[0];
      const resetSlug = firstCat?.slug || firstCat?.id;
      if (resetSlug) {
        setSelectedCategories([resetSlug]);
      } else {
        setSelectedCategories([]);
      }
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
