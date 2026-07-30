'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase/config';
import { addService, updateService } from '@/app/actions/dashboard';
import { uploadImage } from '@/app/actions/dashboard/upload';
import { getAvailablePages } from '@/app/actions/dashboard/pages';

export function useServiceForm(editingService: any, setEditingService: (service: any) => void, onSuccess: () => void) {
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
    const [detailPageUrl, setDetailPageUrl] = useState('');
    
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [availablePages, setAvailablePages] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        getAvailablePages().then(setAvailablePages);
    }, []);

    useEffect(() => {
        if (editingService) {
            setTitle(editingService.title || editingService.title_ar || '');
            setTitleEn(editingService.title_en || '');
            const defaultTypes = ["لوحة تحكم شاملة", "سيستم ونظام مخصص", "صفحة هبوط تسويقية"];
            if (editingService.type && !defaultTypes.includes(editingService.type)) {
                setType('custom_option');
                setTypeCustom(editingService.type);
            } else {
                setType(editingService.type || 'لوحة تحكم شاملة');
                setTypeCustom('');
            }
            setPrice(editingService.price || '');
            setBadge(editingService.badge || '');
            setBtnText(editingService.btnText || '');
            setSvg(editingService.icon || '');
            setDesc(editingService.desc || editingService.desc_ar || '');
            setDescEn(editingService.desc_en || '');
            setDetailPageUrl(editingService.detailPageUrl || '');
            setImageUrl(editingService.image || '');
            setImageFile(null);
        } else {
            setTitle('');
            setTitleEn('');
            setType('لوحة تحكم شاملة');
            setTypeCustom('');
            setPrice('');
            setBadge('');
            setBtnText('');
            setSvg('');
            setDesc('');
            setDescEn('');
            setDetailPageUrl('');
            setImageUrl('');
            setImageFile(null);
        }
    }, [editingService]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
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
                if (uploadRes.success && uploadRes.url) {
                    finalImageUrl = uploadRes.url;
                } else {
                    throw new Error(uploadRes.error || 'فشل رفع الصورة');
                }
            }

            const serviceData = {
                title,
                title_ar: title,
                title_en: titleEn,
                type: type === 'custom_option' ? typeCustom : type,
                price,
                badge,
                btnText,
                icon: svg,
                desc,
                desc_ar: desc,
                desc_en: descEn,
                detailPageUrl,
                image: finalImageUrl
            };

            if (editingService) {
                await updateService(token, editingService.id, serviceData);
                alert('تم تعديل الخدمة بنجاح 𓂀');
            } else {
                await addService(token, serviceData);
                alert('تمت إضافة الخدمة بنجاح 𓂀');
            }

            setTitle('');
            setTitleEn('');
            setType('لوحة تحكم شاملة');
            setTypeCustom('');
            setPrice('');
            setBadge('');
            setBtnText('');
            setSvg('');
            setDesc('');
            setDescEn('');
            setDetailPageUrl('');
            setImageUrl('');
            setImageFile(null);
            setEditingService(null);
            onSuccess();
        } catch (error: any) {
            console.error(error);
            alert(error.message || 'حدث خطأ أثناء حفظ الخدمة.');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        title, setTitle,
        titleEn, setTitleEn,
        type, setType,
        typeCustom, setTypeCustom,
        price, setPrice,
        badge, setBadge,
        btnText, setBtnText,
        svg, setSvg,
        desc, setDesc,
        descEn, setDescEn,
        detailPageUrl, setDetailPageUrl,
        imageFile, imageUrl,
        availablePages,
        handleFileChange,
        handleSubmit
    };
}
