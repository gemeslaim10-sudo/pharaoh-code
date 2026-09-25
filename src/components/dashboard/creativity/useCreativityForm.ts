'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { addCreativityItem, updateCreativityItem } from '@/app/actions/dashboard/creativity';
import { getCategories } from '@/app/actions/dashboard/categories';

export function useCreativityForm(onSuccess: () => void, editingItem: any | null = null) {
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
  const [clientName, setClientName] = useState('');
  const [clientNameEn, setClientNameEn] = useState('');
  const [projectYear, setProjectYear] = useState('');
  const [tools, setTools] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  // Counter, because the image and video galleries can upload at the same time.
  const [uploadsInFlight, setUploadsInFlight] = useState(0);
  const mediaUploading = uploadsInFlight > 0;
  const setMediaUploading = (uploading: boolean) => setUploadsInFlight(n => Math.max(0, n + (uploading ? 1 : -1)));

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

  // Prefill when an existing record is being edited
  useEffect(() => {
    if (!editingItem) return;
    setTitle(editingItem.title_ar || editingItem.title || '');
    setTitleEn(editingItem.title_en || '');
    const cats: string[] = Array.isArray(editingItem.categories) && editingItem.categories.length > 0
      ? editingItem.categories
      : (editingItem.category ? String(editingItem.category).split(',').map((c: string) => c.trim()).filter(Boolean) : []);
    if (cats.length > 0) setSelectedCategories(cats);
    setImageUrl(editingItem.image || editingItem.imageUrl || '');
    setLink(editingItem.link || '');
    setAppLink(editingItem.appLink || '');
    setDesc(editingItem.desc_ar || editingItem.desc || editingItem.description || '');
    setDescEn(editingItem.desc_en || editingItem.description_en || '');
    setClientName(editingItem.clientName_ar || editingItem.clientName || '');
    setClientNameEn(editingItem.clientName_en || '');
    setProjectYear(editingItem.projectYear || '');
    setTools(Array.isArray(editingItem.tools) ? editingItem.tools.join(', ') : (editingItem.tools || ''));
    setGallery(Array.isArray(editingItem.gallery) ? editingItem.gallery : []);
    setVideos(Array.isArray(editingItem.videos) ? editingItem.videos : []);
  }, [editingItem]);

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
    if (mediaUploading) {
      alert('يرجى الانتظار حتى يكتمل رفع الصور والفيديوهات');
      return;
    }
    if (!imageUrl) {
      alert('يرجى رفع صورة غلاف المشروع من جهازك أولاً');
      return;
    }
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();
      
      const categoryString = selectedCategories.join(',');
      const primaryCat = availableCategories.find(c => (c.slug || c.id) === selectedCategories[0]);

      const payload = {
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
        appLink: isAppCategory ? appLink : '',
        clientName: clientName.trim(),
        clientName_ar: clientName.trim(),
        clientName_en: clientNameEn.trim(),
        projectYear: projectYear.trim(),
        tools: tools.split(/[,،]/).map(t => t.trim()).filter(Boolean),
        gallery,
        videos
      };
      if (editingItem?.id) {
        await updateCreativityItem(token, 'portfolio', editingItem.id, payload);
      } else {
        await addCreativityItem(token, 'portfolio', payload);
      }
      
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
      setClientName('');
      setClientNameEn('');
      setProjectYear('');
      setTools('');
      setGallery([]);
      setVideos([]);
      onSuccess();
    } catch (error) {
      console.error(error);
      alert(editingItem ? 'حدث خطأ أثناء تعديل المشروع.' : 'حدث خطأ أثناء إضافة المشروع.');
    } finally {
      setLoading(false);
    }
  };

  const isEditing = Boolean(editingItem?.id);

  return {
    loading, isEditing, title, setTitle, titleEn, setTitleEn,
    selectedCategories, availableCategories, toggleCategory,
    isAppCategory, imageUrl, setImageUrl, link, setLink,
    appLink, setAppLink, desc, setDesc, descEn, setDescEn,
    clientName, setClientName, clientNameEn, setClientNameEn,
    projectYear, setProjectYear, tools, setTools,
    gallery, setGallery, videos, setVideos, mediaUploading, setMediaUploading,
    handleSubmit
  };
}
