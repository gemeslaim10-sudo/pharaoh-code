'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase/config';
import { addService, updateService } from '@/app/actions/dashboard';
import { uploadImage } from '@/app/actions/dashboard/upload';
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
    
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState('');

    // Extended Template Fields for Service Detail Page
    const [heroSubtitleAr, setHeroSubtitleAr] = useState('');
    const [heroSubtitleEn, setHeroSubtitleEn] = useState('');
    const [heroTitle1Ar, setHeroTitle1Ar] = useState('');
    const [heroTitle1En, setHeroTitle1En] = useState('');
    const [heroTitle2Ar, setHeroTitle2Ar] = useState('');
    const [heroTitle2En, setHeroTitle2En] = useState('');
    const [heroDescAr, setHeroDescAr] = useState('');
    const [heroDescEn, setHeroDescEn] = useState('');
    const [heroBtnAr, setHeroBtnAr] = useState('');
    const [heroBtnEn, setHeroBtnEn] = useState('');

    const [overviewSubtitleAr, setOverviewSubtitleAr] = useState('');
    const [overviewSubtitleEn, setOverviewSubtitleEn] = useState('');
    const [overviewTitleAr, setOverviewTitleAr] = useState('');
    const [overviewTitleEn, setOverviewTitleEn] = useState('');
    const [overviewDescAr, setOverviewDescAr] = useState('');
    const [overviewDescEn, setOverviewDescEn] = useState('');

    const [packagesTitleAr, setPackagesTitleAr] = useState('');
    const [packagesTitleEn, setPackagesTitleEn] = useState('');

    const [features, setFeatures] = useState<any[]>([
        { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
        { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
        { title_ar: '', title_en: '', desc_ar: '', desc_en: '' }
    ]);

    const [packages, setPackages] = useState<any[]>([
        { badge_ar: '', badge_en: '', title_ar: '', title_en: '', price: '', period_ar: '', period_en: '', desc_ar: '', desc_en: '', isPopular: false },
        { badge_ar: '', badge_en: '', title_ar: '', title_en: '', price: '', period_ar: '', period_en: '', desc_ar: '', desc_en: '', isPopular: true },
        { badge_ar: '', badge_en: '', title_ar: '', title_en: '', price: '', period_ar: '', period_en: '', desc_ar: '', desc_en: '', isPopular: false }
    ]);

    const [roadmapSteps, setRoadmapSteps] = useState<any[]>([
        { number: '01', title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
        { number: '02', title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
        { number: '03', title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
        { number: '04', title_ar: '', title_en: '', desc_ar: '', desc_en: '' }
    ]);



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
            setImageUrl(editingService.image || '');
            setImageFile(null);

            // Populate Template Fields
            setHeroSubtitleAr(editingService.heroSubtitle_ar || '');
            setHeroSubtitleEn(editingService.heroSubtitle_en || '');
            setHeroTitle1Ar(editingService.heroTitle1_ar || '');
            setHeroTitle1En(editingService.heroTitle1_en || '');
            setHeroTitle2Ar(editingService.heroTitle2_ar || '');
            setHeroTitle2En(editingService.heroTitle2_en || '');
            setHeroDescAr(editingService.heroDesc_ar || '');
            setHeroDescEn(editingService.heroDesc_en || '');
            setHeroBtnAr(editingService.heroBtn_ar || '');
            setHeroBtnEn(editingService.heroBtn_en || '');

            setOverviewSubtitleAr(editingService.overviewSubtitle_ar || '');
            setOverviewSubtitleEn(editingService.overviewSubtitle_en || '');
            setOverviewTitleAr(editingService.overviewTitle_ar || '');
            setOverviewTitleEn(editingService.overviewTitle_en || '');
            setOverviewDescAr(editingService.overviewDesc_ar || '');
            setOverviewDescEn(editingService.overviewDesc_en || '');
            setPackagesTitleAr(editingService.packagesTitle_ar || '');
            setPackagesTitleEn(editingService.packagesTitle_en || '');

            if (Array.isArray(editingService.features) && editingService.features.length > 0) {
                setFeatures(editingService.features);
            }
            if (Array.isArray(editingService.packages) && editingService.packages.length > 0) {
                setPackages(editingService.packages);
            }
            if (Array.isArray(editingService.roadmapSteps) && editingService.roadmapSteps.length > 0) {
                setRoadmapSteps(editingService.roadmapSteps);
            }
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
            setImageUrl('');
            setImageFile(null);

            setHeroSubtitleAr('');
            setHeroSubtitleEn('');
            setHeroTitle1Ar('');
            setHeroTitle1En('');
            setHeroTitle2Ar('');
            setHeroTitle2En('');
            setHeroDescAr('');
            setHeroDescEn('');
            setHeroBtnAr('');
            setHeroBtnEn('');

            setOverviewSubtitleAr('');
            setOverviewSubtitleEn('');
            setOverviewTitleAr('');
            setOverviewTitleEn('');
            setOverviewDescAr('');
            setOverviewDescEn('');

            setFeatures([
                { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
                { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
                { title_ar: '', title_en: '', desc_ar: '', desc_en: '' }
            ]);
            setPackages([
                { badge_ar: '', badge_en: '', title_ar: '', title_en: '', price: '', period_ar: '', period_en: '', desc_ar: '', desc_en: '', isPopular: false },
                { badge_ar: '', badge_en: '', title_ar: '', title_en: '', price: '', period_ar: '', period_en: '', desc_ar: '', desc_en: '', isPopular: true },
                { badge_ar: '', badge_en: '', title_ar: '', title_en: '', price: '', period_ar: '', period_en: '', desc_ar: '', desc_en: '', isPopular: false }
            ]);
            setRoadmapSteps([
                { number: '01', title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
                { number: '02', title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
                { number: '03', title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
                { number: '04', title_ar: '', title_en: '', desc_ar: '', desc_en: '' }
            ]);
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
                image: finalImageUrl,
                heroSubtitle_ar: heroSubtitleAr,
                heroSubtitle_en: heroSubtitleEn,
                heroTitle1_ar: heroTitle1Ar,
                heroTitle1_en: heroTitle1En,
                heroTitle2_ar: heroTitle2Ar,
                heroTitle2_en: heroTitle2En,
                heroDesc_ar: heroDescAr,
                heroDesc_en: heroDescEn,
                heroBtn_ar: heroBtnAr,
                heroBtn_en: heroBtnEn,
                overviewSubtitle_ar: overviewSubtitleAr,
                overviewSubtitle_en: overviewSubtitleEn,
                overviewTitle_ar: overviewTitleAr,
                overviewTitle_en: overviewTitleEn,
                overviewDesc_ar: overviewDescAr,
                overviewDesc_en: overviewDescEn,
                packagesTitle_ar: packagesTitleAr,
                packagesTitle_en: packagesTitleEn,
                features,
                packages,
                roadmapSteps
            };

            if (editingService) {
                await updateService(token, editingService.id, serviceData);
                alert('تم تعديل الخدمة بنجاح 𓂀');
            } else {
                await addService(token, serviceData);
                alert('تمت إضافة الخدمة بنجاح 𓂀');
            }

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
        imageFile, imageUrl,
        heroSubtitleAr, setHeroSubtitleAr,
        heroSubtitleEn, setHeroSubtitleEn,
        heroTitle1Ar, setHeroTitle1Ar,
        heroTitle1En, setHeroTitle1En,
        heroTitle2Ar, setHeroTitle2Ar,
        heroTitle2En, setHeroTitle2En,
        heroDescAr, setHeroDescAr,
        heroDescEn, setHeroDescEn,
        heroBtnAr, setHeroBtnAr,
        heroBtnEn, setHeroBtnEn,
        overviewSubtitleAr, setOverviewSubtitleAr,
        overviewSubtitleEn, setOverviewSubtitleEn,
        overviewTitleAr, setOverviewTitleAr,
        overviewTitleEn, setOverviewTitleEn,
        overviewDescAr, setOverviewDescAr,
        overviewDescEn, setOverviewDescEn,
        packagesTitleAr, setPackagesTitleAr,
        packagesTitleEn, setPackagesTitleEn,
        features, setFeatures,
        packages, setPackages,
        roadmapSteps, setRoadmapSteps,
        handleFileChange,
        handleSubmit
    };
}
