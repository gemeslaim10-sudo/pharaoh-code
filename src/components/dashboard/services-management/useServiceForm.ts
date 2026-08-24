'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase/config';
import { addService, updateService } from '@/app/actions/dashboard';
import { uploadImage } from '@/app/actions/dashboard/upload';
import { ServiceItem } from './serviceFormTypes';
import {
  FeatureItem, PackageItem, RoadmapStepItem, GuaranteeItem,
  DEFAULT_FEATURES, DEFAULT_PACKAGES, DEFAULT_ROADMAP_STEPS, DEFAULT_GUARANTEES,
  TemplateFields, INITIAL_TEMPLATE_FIELDS, extractTemplateFromService
} from './serviceFormTypes';

export function useServiceForm(
  editingService: ServiceItem | null,
  setEditingService: (service: ServiceItem | null) => void,
  onSuccess: () => void
) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [type, setType] = useState('لوحة تحكم شاملة');
  const [typeCustom, setTypeCustom] = useState('');
  const [price, setPrice] = useState('');
  const [badge, setBadge] = useState('');
  const [btnText, setBtnText] = useState('');
  const [svg, setSvg] = useState('');
  const [desc, setDesc] = useState('');
  const [descEn, setDescEn] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [tpl, setTpl] = useState<TemplateFields>(INITIAL_TEMPLATE_FIELDS);

  const [features, setFeatures] = useState<FeatureItem[]>(DEFAULT_FEATURES);
  const [guarantees, setGuarantees] = useState<GuaranteeItem[]>(DEFAULT_GUARANTEES);
  const [packages, setPackages] = useState<PackageItem[]>(DEFAULT_PACKAGES);
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStepItem[]>(DEFAULT_ROADMAP_STEPS);

  useEffect(() => {
    if (editingService) {
      const s = editingService as Record<string, any>;
      setTitle(s.title || s.title_ar || '');
      setTitleEn(s.title_en || '');
      const defaultTypes = ["لوحة تحكم شاملة", "سيستم ونظام مخصص", "صفحة هبوط تسويقية"];
      if (s.type && !defaultTypes.includes(s.type)) {
        setType('custom_option');
        setTypeCustom(s.type);
      } else {
        setType(s.type || 'لوحة تحكم شاملة');
        setTypeCustom('');
      }
      setPrice(s.price || '');
      setBadge(s.badge || '');
      setBtnText(s.btnText || '');
      setSvg(s.icon || '');
      setDesc(s.desc || s.desc_ar || '');
      setDescEn(s.desc_en || '');
      setImageUrl(s.image || '');
      setImageFile(null);
      setTpl(extractTemplateFromService(s));

      if (Array.isArray(s.features) && s.features.length > 0) setFeatures(s.features);
      else setFeatures(DEFAULT_FEATURES);

      if (Array.isArray(s.guarantees) && s.guarantees.length > 0) setGuarantees(s.guarantees);
      else setGuarantees(DEFAULT_GUARANTEES);

      if (Array.isArray(s.packages) && s.packages.length > 0) setPackages(s.packages);
      else setPackages(DEFAULT_PACKAGES);

      if (Array.isArray(s.roadmapSteps) && s.roadmapSteps.length > 0) setRoadmapSteps(s.roadmapSteps);
      else setRoadmapSteps(DEFAULT_ROADMAP_STEPS);
    } else {
      setTitle(''); setTitleEn(''); setType('لوحة تحكم شاملة'); setTypeCustom('');
      setPrice(''); setBadge(''); setBtnText(''); setSvg(''); setDesc(''); setDescEn('');
      setImageUrl(''); setImageFile(null);
      setTpl(INITIAL_TEMPLATE_FIELDS);
      setFeatures(DEFAULT_FEATURES);
      setGuarantees(DEFAULT_GUARANTEES);
      setPackages(DEFAULT_PACKAGES);
      setRoadmapSteps(DEFAULT_ROADMAP_STEPS);
    }
  }, [editingService]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImageFile(e.target.files[0]);
  };

  const setTplField = (field: keyof TemplateFields, value: string) => {
    setTpl(prev => ({ ...prev, [field]: value }));
  };

  const addFeature = () => {
    setFeatures(prev => [...prev, { title_ar: '', title_en: '', desc_ar: '', desc_en: '' }]);
  };

  const removeFeature = (idx: number) => {
    if (features.length <= 1) {
      alert('يجب الإبقاء على ميزة واحدة على الأقل');
      return;
    }
    setFeatures(prev => prev.filter((_, i) => i !== idx));
  };

  const updateFeature = (idx: number, field: keyof FeatureItem, value: string) => {
    setFeatures(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const addGuarantee = () => {
    setGuarantees(prev => [...prev, { icon: '✨', title_ar: '', title_en: '', desc_ar: '', desc_en: '' }]);
  };

  const removeGuarantee = (idx: number) => {
    if (guarantees.length <= 1) {
      alert('يجب الإبقاء على بند ضمان وقيمة مضافة واحد على الأقل');
      return;
    }
    setGuarantees(prev => prev.filter((_, i) => i !== idx));
  };

  const updateGuarantee = (idx: number, field: keyof GuaranteeItem, value: string) => {
    setGuarantees(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();

      let finalImageUrl = imageUrl;
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const uploadRes = await uploadImage(token, formData);
        if (uploadRes.success && uploadRes.url) finalImageUrl = uploadRes.url;
        else throw new Error(uploadRes.error || 'فشل رفع الصورة');
      }

      const serviceData = {
        title, title_ar: title, title_en: titleEn,
        type: type === 'custom_option' ? typeCustom : type,
        price, badge, btnText, icon: svg,
        desc, desc_ar: desc, desc_en: descEn, image: finalImageUrl,
        heroSubtitle_ar: tpl.heroSubtitleAr, heroSubtitle_en: tpl.heroSubtitleEn,
        heroTitle1_ar: tpl.heroTitle1Ar, heroTitle1_en: tpl.heroTitle1En,
        heroTitle2_ar: tpl.heroTitle2Ar, heroTitle2_en: tpl.heroTitle2En,
        heroDesc_ar: tpl.heroDescAr, heroDesc_en: tpl.heroDescEn,
        heroBtn_ar: tpl.heroBtnAr, heroBtn_en: tpl.heroBtnEn,
        overviewSubtitle_ar: tpl.overviewSubtitleAr, overviewSubtitle_en: tpl.overviewSubtitleEn,
        overviewTitle_ar: tpl.overviewTitleAr, overviewTitle_en: tpl.overviewTitleEn,
        overviewDesc_ar: tpl.overviewDescAr, overviewDesc_en: tpl.overviewDescEn,
        packagesTitle_ar: tpl.packagesTitleAr, packagesTitle_en: tpl.packagesTitleEn,
        addedValueTitle_ar: tpl.addedValueTitleAr, addedValueTitle_en: tpl.addedValueTitleEn,
        addedValueSubtitle_ar: tpl.addedValueSubtitleAr, addedValueSubtitle_en: tpl.addedValueSubtitleEn,
        features, guarantees, packages, roadmapSteps
      };

      if (editingService && editingService.id) {
        await updateService(token, editingService.id, serviceData);
        alert('تم تعديل الخدمة بنجاح!');
      } else {
        await addService(token, serviceData);
        alert('تمت إضافة الخدمة بنجاح!');
      }

      setEditingService(null);
      onSuccess();
    } catch (error) {
      const err = error as Error;
      console.error(err);
      alert(err.message || 'حدث خطأ أثناء حفظ الخدمة.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading, title, setTitle, titleEn, setTitleEn, type, setType, typeCustom, setTypeCustom,
    price, setPrice, badge, setBadge, btnText, setBtnText, svg, setSvg, desc, setDesc,
    descEn, setDescEn, imageFile, imageUrl, tpl, setTplField,
    features, setFeatures, addFeature, removeFeature, updateFeature,
    guarantees, setGuarantees, addGuarantee, removeGuarantee, updateGuarantee,
    packages, setPackages, roadmapSteps, setRoadmapSteps,
    handleFileChange, handleSubmit
  };
}
