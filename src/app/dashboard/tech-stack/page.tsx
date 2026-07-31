'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getTechStackContent, updateTechStackContent } from '@/app/actions/dashboard/techStack';

export default function DashboardTechStackPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const [form, setForm] = useState<any>({
        subtitle_ar: '', subtitle_en: '',
        title1_ar: '', title1_en: '',
        title2_ar: '', title2_en: '',
        description_ar: '', description_en: '',
        cleanArch_ar: '', cleanArch_en: '',
        aesEncrypt_ar: '', aesEncrypt_en: '',
        cards: [
            { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
            { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
            { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
            { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
            { title_ar: '', title_en: '', desc_ar: '', desc_en: '' },
            { title_ar: '', title_en: '', desc_ar: '', desc_en: '' }
        ]
    });

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const content = await getTechStackContent();
            if (content && Object.keys(content).length > 0) {
                setForm((prev: any) => ({
                    ...prev,
                    ...content,
                    cards: Array.isArray(content.cards) && content.cards.length === 6
                        ? content.cards
                        : prev.cards
                }));
            }
            setLoading(false);
        }
        loadData();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setSaving(true);
        setMessage(null);

        try {
            const token = await user.getIdToken();
            const res = await updateTechStackContent(token, form);
            if (res.success) {
                setMessage({ type: 'success', text: 'تم حفظ وتحديث محتوى قسم التقنيات (Tech Stack) بنجاح!' });
            } else {
                setMessage({ type: 'error', text: res.error || 'حدث خطأ أثناء الحفظ.' });
            }
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'حدث خطأ غير متوقع.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-pharaohGold text-lg font-bold flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-pharaohGold border-t-transparent rounded-full animate-spin"></div>
                    جاري تحميل بيانات قسم التقنيات...
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-pharaohGold/10 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-white">إدارة محتوى قسم التقنيات (Tech Stack)</h1>
                    <p className="text-gray-400 text-sm mt-1">تعديل النصوص العربية والإنجليزية لقسم التقنيات مع الحفاظ على القيم الافتراضية</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-pharaohGold text-[#0A192F] px-8 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {saving ? (
                        <>
                            <div className="w-4 h-4 border-2 border-[#0A192F] border-t-transparent rounded-full animate-spin"></div>
                            جاري الحفظ...
                        </>
                    ) : 'حفظ التغيرات'}
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
                    <span>{message.type === 'success' ? '✓' : '⚠️'}</span>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-8">
                {/* Header Section Controls */}
                <div className="bg-[#112240] p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
                    <h2 className="text-xl font-bold text-pharaohGold border-b border-white/10 pb-3">العناوين والأوصاف الرئيسية (Header Info)</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-300 mb-2">العنوان العلوي (عربي)</label>
                            <input
                                type="text"
                                placeholder="مهندسة لأقصى أداء"
                                value={form.subtitle_ar || ''}
                                onChange={(e) => setForm({ ...form, subtitle_ar: e.target.value })}
                                className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-300 mb-2">Subtitle (English)</label>
                            <input
                                type="text"
                                placeholder="ENGINEERED FOR PEAK PERFORMANCE"
                                value={form.subtitle_en || ''}
                                onChange={(e) => setForm({ ...form, subtitle_en: e.target.value })}
                                className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-300 mb-2">العنوان - السطر الأول (عربي)</label>
                            <input
                                type="text"
                                placeholder="لماذا نختار"
                                value={form.title1_ar || ''}
                                onChange={(e) => setForm({ ...form, title1_ar: e.target.value })}
                                className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-300 mb-2">Title Line 1 (English)</label>
                            <input
                                type="text"
                                placeholder="Why We Carefully Select"
                                value={form.title1_en || ''}
                                onChange={(e) => setForm({ ...form, title1_en: e.target.value })}
                                className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-300 mb-2">العنوان - السطر الثاني (عربي)</label>
                            <input
                                type="text"
                                placeholder="تقنياتنا بعناية؟"
                                value={form.title2_ar || ''}
                                onChange={(e) => setForm({ ...form, title2_ar: e.target.value })}
                                className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-300 mb-2">Title Line 2 (English)</label>
                            <input
                                type="text"
                                placeholder="Our Technology Stack?"
                                value={form.title2_en || ''}
                                onChange={(e) => setForm({ ...form, title2_en: e.target.value })}
                                className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-300 mb-2">الفقرة التوضيحية (عربي)</label>
                            <textarea
                                rows={3}
                                placeholder="نحن لا نتبع الترندات العابرة. في Pharaoh Code، نختار التقنيات التي تضمن لعملائنا..."
                                value={form.description_ar || ''}
                                onChange={(e) => setForm({ ...form, description_ar: e.target.value })}
                                className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-300 mb-2">Description Paragraph (English)</label>
                            <textarea
                                rows={3}
                                placeholder="We don't follow passing trends. At Pharaoh Code, we engineer software..."
                                value={form.description_en || ''}
                                onChange={(e) => setForm({ ...form, description_en: e.target.value })}
                                className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none resize-none"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                        <div>
                            <label className="block text-xs font-bold text-gray-300 mb-2">النقطة الأولى (Clean Architecture)</label>
                            <input
                                type="text"
                                placeholder="الاعتماد على Clean Architecture"
                                value={form.cleanArch_ar || ''}
                                onChange={(e) => setForm({ ...form, cleanArch_ar: e.target.value })}
                                className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Clean Architecture Engineering"
                                value={form.cleanArch_en || ''}
                                onChange={(e) => setForm({ ...form, cleanArch_en: e.target.value })}
                                className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                dir="ltr"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-300 mb-2">النقطة الثانية (AES Encryption)</label>
                            <input
                                type="text"
                                placeholder="تشفير البيانات بمعايير AES-256"
                                value={form.aesEncrypt_ar || ''}
                                onChange={(e) => setForm({ ...form, aesEncrypt_ar: e.target.value })}
                                className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none mb-2"
                            />
                            <input
                                type="text"
                                placeholder="AES-256 Military Grade Encryption"
                                value={form.aesEncrypt_en || ''}
                                onChange={(e) => setForm({ ...form, aesEncrypt_en: e.target.value })}
                                className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                dir="ltr"
                            />
                        </div>
                    </div>
                </div>

                {/* 6 Tech Cards */}
                <div className="bg-[#112240] p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
                    <h2 className="text-xl font-bold text-pharaohGold border-b border-white/10 pb-3">بطاقات التقنيات الست (6 Tech Cards)</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {form.cards?.map((card: any, idx: number) => {
                            const defaultTitles = [
                                'الأنظمة الخلفية', 'تطبيقات الجوال', 'قواعد البيانات',
                                'السحابية (Cloud)', 'واجهات المستخدم', 'الأمن السيبراني'
                            ];
                            const defaultTitlesEn = [
                                'Backend Systems', 'Mobile Applications', 'Databases & Storage',
                                'Cloud Infrastructure', 'Frontend & UI/UX', 'Cybersecurity'
                            ];

                            return (
                                <div key={idx} className="bg-[#0A192F] p-5 rounded-xl border border-white/10 space-y-4">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                        <h3 className="text-sm font-bold text-pharaohGold">البطاقة {idx + 1}: {defaultTitles[idx]}</h3>
                                        <span className="text-xs text-gray-400">{defaultTitlesEn[idx]}</span>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">العنوان (عربي)</label>
                                            <input
                                                type="text"
                                                placeholder={defaultTitles[idx]}
                                                value={card.title_ar || ''}
                                                onChange={(e) => {
                                                    const cards = [...(form.cards || [])];
                                                    cards[idx] = { ...cards[idx], title_ar: e.target.value };
                                                    setForm({ ...form, cards });
                                                }}
                                                className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Title (English)</label>
                                            <input
                                                type="text"
                                                placeholder={defaultTitlesEn[idx]}
                                                value={card.title_en || ''}
                                                onChange={(e) => {
                                                    const cards = [...(form.cards || [])];
                                                    cards[idx] = { ...cards[idx], title_en: e.target.value };
                                                    setForm({ ...form, cards });
                                                }}
                                                className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                                                dir="ltr"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">الوصف (عربي)</label>
                                            <textarea
                                                rows={2}
                                                placeholder="وصف التقنيات والتفاصيل..."
                                                value={card.desc_ar || card.description_ar || ''}
                                                onChange={(e) => {
                                                    const cards = [...(form.cards || [])];
                                                    cards[idx] = { ...cards[idx], desc_ar: e.target.value, description_ar: e.target.value };
                                                    setForm({ ...form, cards });
                                                }}
                                                className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white resize-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Description (English)</label>
                                            <textarea
                                                rows={2}
                                                placeholder="Tech stack details..."
                                                value={card.desc_en || card.description_en || ''}
                                                onChange={(e) => {
                                                    const cards = [...(form.cards || [])];
                                                    cards[idx] = { ...cards[idx], desc_en: e.target.value, description_en: e.target.value };
                                                    setForm({ ...form, cards });
                                                }}
                                                className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white resize-none"
                                                dir="ltr"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-pharaohGold text-[#0A192F] px-10 py-4 rounded-xl font-black text-sm hover:bg-white transition-all shadow-xl disabled:opacity-50"
                    >
                        {saving ? 'جاري الحفظ والرفع...' : 'حفظ التغيرات ونشر التحديثات'}
                    </button>
                </div>
            </form>
        </div>
    );
}
