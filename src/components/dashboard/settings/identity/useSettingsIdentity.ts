'use client';

import { useState, useEffect } from 'react';
import { getIdentity, updateIdentity } from '@/app/actions/dashboard/settings';
import { auth } from '@/lib/firebase/config';
import { IdentityFormData } from '../SettingsIdentityForm';
import { INITIAL_IDENTITY_FORM, mapIdentityDataToForm, uploadSingleFile } from './identityState';

export function useSettingsIdentity() {
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [formData, setFormData] = useState<IdentityFormData>(INITIAL_IDENTITY_FORM);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoLightFile, setLogoLightFile] = useState<File | null>(null);
  const [logoLightPreview, setLogoLightPreview] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [cropperImageSrc, setCropperImageSrc] = useState<string | null>(null);
  const [activeCropperTarget, setActiveCropperTarget] = useState<'dark' | 'light' | null>('dark');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getIdentity();
        if (data) setFormData(mapIdentityDataToForm(data));
      } catch (error) {
        console.error("Failed to load identity:", error);
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
      
      const finalFaviconUrl = faviconFile ? await uploadSingleFile(token, faviconFile) : formData.favicon;
      const finalLogoUrl = logoFile ? await uploadSingleFile(token, logoFile) : (formData.logo || formData.logo_dark || '');
      const finalLogoLightUrl = logoLightFile ? await uploadSingleFile(token, logoLightFile) : (formData.logo_light || '');

      const payload = {
        ...formData,
        name_ar: formData.name,
        title_ar: formData.title,
        keywords_ar: formData.keywords,
        desc_ar: formData.desc,
        favicon: finalFaviconUrl,
        logo: finalLogoUrl,
        logo_dark: finalLogoUrl,
        logo_light: finalLogoLightUrl
      };

      await updateIdentity(token, payload);
      setFaviconFile(null);
      setLogoFile(null);
      setLogoLightFile(null);
      alert("تم تحديث وحفظ سجل الهوية وشعارات المنصة بنجاح! 👑");
    } catch (error) {
      const err = error as Error;
      console.error(err);
      alert(`حدث خطأ أثناء حفظ الهوية: ${err?.message || 'يرجى التحقق من اتصالك وإعادة المحاولة.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const fieldKey = e.target.id.replace('site-', '');
    setFormData(prev => ({ ...prev, [fieldKey]: e.target.value }));
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFaviconFile(file);
      setFaviconPreview(URL.createObjectURL(file));
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setActiveCropperTarget('dark');
      setCropperImageSrc(URL.createObjectURL(file));
      setIsCropperOpen(true);
    }
  };

  const handleLogoLightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setActiveCropperTarget('light');
      setCropperImageSrc(URL.createObjectURL(file));
      setIsCropperOpen(true);
    }
  };

  const handleOpenLogoCropper = (target: 'dark' | 'light' = 'dark') => {
    const currentSrc = target === 'light'
      ? (logoLightPreview || formData.logo_light)
      : (logoPreview || formData.logo || formData.logo_dark);

    if (currentSrc) {
      setActiveCropperTarget(target);
      setCropperImageSrc(currentSrc);
      setIsCropperOpen(true);
    }
  };

  const handleCropComplete = (croppedFile: File, previewUrl: string) => {
    if (activeCropperTarget === 'light') {
      setLogoLightFile(croppedFile);
      setLogoLightPreview(previewUrl);
    } else {
      setLogoFile(croppedFile);
      setLogoPreview(previewUrl);
    }
  };

  return {
    loading, initialLoad, formData, faviconPreview, logoPreview, logoLightPreview,
    isCropperOpen, cropperImageSrc, setIsCropperOpen, handleChange, handleFaviconChange,
    handleLogoChange, handleLogoLightChange, handleOpenLogoCropper, handleCropComplete, handleSubmit
  };
}
