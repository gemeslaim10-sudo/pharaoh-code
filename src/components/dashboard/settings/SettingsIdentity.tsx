'use client';

import { useState, useEffect } from 'react';
import { getIdentity, updateIdentity } from '@/app/actions/dashboard/settings';
import { uploadImage } from '@/app/actions/dashboard/upload';
import { auth } from '@/lib/firebase/config';
import SettingsIdentityForm, { IdentityFormData } from './SettingsIdentityForm';

export default function SettingsIdentity() {
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [formData, setFormData] = useState<IdentityFormData>({
        name: '',
        name_en: '',
        title: '',
        title_en: '',
        keywords: '',
        keywords_en: '',
        desc: '',
        desc_en: '',
        favicon: '',
        logo: '',
        logo_en: '',
        reverse_navbar_ar: true
    });
    const [faviconFile, setFaviconFile] = useState<File | null>(null);
    const [faviconPreview, setFaviconPreview] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getIdentity();
                if (data) {
                    setFormData({
                        name: data.name || data.name_ar || '',
                        name_en: data.name_en || '',
                        title: data.title || data.title_ar || '',
                        title_en: data.title_en || '',
                        keywords: data.keywords || data.keywords_ar || '',
                        keywords_en: data.keywords_en || '',
                        desc: data.desc || data.desc_ar || data.description || '',
                        desc_en: data.desc_en || data.description_en || '',
                        favicon: data.favicon || '',
                        logo: data.logo || '',
                        logo_en: data.logo_en || '',
                        reverse_navbar_ar: data.reverse_navbar_ar !== undefined ? data.reverse_navbar_ar : true
                    });
                }
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
            
            let finalFaviconUrl = formData.favicon;
            let finalLogoUrl = formData.logo;
            
            if (faviconFile) {
                const uploadData = new FormData();
                uploadData.append('file', faviconFile);
                const uploadRes = await uploadImage(token, uploadData);
                if (!uploadRes.success) {
                    throw new Error(uploadRes.error);
                }
                finalFaviconUrl = uploadRes.url || '';
            }

            if (logoFile) {
                const uploadData = new FormData();
                uploadData.append('file', logoFile);
                const uploadRes = await uploadImage(token, uploadData);
                if (!uploadRes.success) {
                    throw new Error(uploadRes.error);
                }
                finalLogoUrl = uploadRes.url || '';
            }

            const payload = {
                ...formData,
                name_ar: formData.name,
                title_ar: formData.title,
                keywords_ar: formData.keywords,
                desc_ar: formData.desc,
                favicon: finalFaviconUrl,
                logo: finalLogoUrl
            };

            await updateIdentity(token, payload);
            setFaviconFile(null);
            setLogoFile(null);
            alert("تم تحديث وحفظ سجل الهوية الرقمية المعتمدة! 👑");
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء حفظ الهوية.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { id: string; value: any } }) => {
        const fieldKey = e.target.id.replace('site-', '');
        setFormData(prev => ({
            ...prev,
            [fieldKey]: e.target.value
        }));
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
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    if (initialLoad) return <div className="p-10 text-center text-pharaohGold">جاري تحميل بيانات الهوية...</div>;

    return (
        <div id="sec-identity" className="section-panel space-y-10">
            <SettingsIdentityForm
                formData={formData}
                handleChange={handleChange}
                faviconPreview={faviconPreview}
                handleFaviconChange={handleFaviconChange}
                logoPreview={logoPreview}
                handleLogoChange={handleLogoChange}
                loading={loading}
                handleSubmit={handleSubmit}
            />

            <div className="bg-[#112240]/40 border border-white/5 rounded-3xl p-6 lg:p-8">
                <h4 className="text-sm font-bold text-pharaohGold mb-4">📜 السجلات المحفوظة الحالية لهوية المنصة</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm text-gray-400">
                        <thead className="text-xs uppercase bg-[#0A192F] text-pharaohGold font-bold border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4">اسم المنصة</th>
                                <th className="px-6 py-4">العنوان الوصفي</th>
                                <th className="px-6 py-4">الكلمات الدلالية</th>
                                <th className="px-6 py-4 text-center">التحكم والتعديل</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-white/5 hover:bg-white/5 transition">
                                <td className="px-6 py-4 font-bold text-white">
                                    <div>{formData.name}</div>
                                    {formData.name_en && <div className="text-xs text-pharaohGold/80" dir="ltr">{formData.name_en}</div>}
                                </td>
                                <td className="px-6 py-4">
                                    <div>{formData.title}</div>
                                    {formData.title_en && <div className="text-xs text-pharaohGold/80" dir="ltr">{formData.title_en}</div>}
                                </td>
                                <td className="px-6 py-4 truncate max-w-[200px]">{formData.keywords}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="text-xs text-pharaohGold bg-pharaohGold/10 px-3 py-1 rounded-full">السجل النشط 🟢</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
