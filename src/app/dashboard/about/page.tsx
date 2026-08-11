'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getAboutContent, updateAboutContent } from '@/app/actions/dashboard/about';

export default function DashboardAboutPage() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'hero' | 'vision' | 'philosophy' | 'faq'>('hero');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const [form, setForm] = useState<any>({
        hero: {
            subtitle_ar: '', subtitle_en: '',
            titlePart1_ar: '', titlePart1_en: '',
            titlePart2_ar: '', titlePart2_en: '',
            description_ar: '', description_en: '',
            buttonText_ar: '', buttonText_en: '',
            establishedText: '', imageUrl: '',
            features: [
                { title_ar: '', title_en: '', description_ar: '', description_en: '' },
                { title_ar: '', title_en: '', description_ar: '', description_en: '' }
            ]
        },
        visionMission: {
            visionTitle_ar: '', visionTitle_en: '',
            visionText_ar: '', visionText_en: '',
            missionTitle_ar: '', missionTitle_en: '',
            missionText_ar: '', missionText_en: ''
        },
        philosophy: {
            subtitle_ar: '', subtitle_en: '',
            titlePart1_ar: '', titlePart1_en: '',
            titlePart2_ar: '', titlePart2_en: '',
            items: [
                { title_ar: '', title_en: '', description_ar: '', description_en: '' },
                { title_ar: '', title_en: '', description_ar: '', description_en: '' },
                { title_ar: '', title_en: '', description_ar: '', description_en: '' }
            ]
        },
        faq: {
            subtitle_ar: '', subtitle_en: '',
            titlePart1_ar: '', titlePart1_en: '',
            titlePart2_ar: '', titlePart2_en: '',
            faqs: []
        }
    });

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const content = await getAboutContent();
            if (content && Object.keys(content).length > 0) {
                setForm((prev: any) => ({
                    hero: { ...prev.hero, ...(content.hero || {}) },
                    visionMission: { ...prev.visionMission, ...(content.visionMission || {}) },
                    philosophy: { ...prev.philosophy, ...(content.philosophy || {}) },
                    faq: { ...prev.faq, faqs: [], ...(content.faq || {}) }
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
            const res = await updateAboutContent(token, form);
            if (res.success) {
                setMessage({ type: 'success', text: 'تم حفظ وتحديث محتوى صفحة (من نحن) بنجاح!' });
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
                    جاري تحميل بيانات صفحة من نحن...
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-pharaohGold/10 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-white">إدارة محتوى صفحة (من نحن)</h1>
                    <p className="text-gray-400 text-sm mt-1">تعديل النصوص العربية والإنجليزية لصفحة About Us مع الحفاظ على القيم الافتراضية</p>
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

            {/* Tabs Header */}
            <div className="flex border-b border-white/10 gap-2 overflow-x-auto custom-scrollbar pb-1">
                <button
                    onClick={() => setActiveTab('hero')}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'hero' ? 'bg-pharaohGold text-pharaohNavy shadow-md' : 'text-gray-400 hover:text-white bg-white/5'}`}
                >
                    القسم الرئيسي (Hero)
                </button>
                <button
                    onClick={() => setActiveTab('vision')}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'vision' ? 'bg-pharaohGold text-pharaohNavy shadow-md' : 'text-gray-400 hover:text-white bg-white/5'}`}
                >
                    الرؤية والرسالة (Vision & Mission)
                </button>
                <button
                    onClick={() => setActiveTab('philosophy')}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'philosophy' ? 'bg-pharaohGold text-pharaohNavy shadow-md' : 'text-gray-400 hover:text-white bg-white/5'}`}
                >
                    فلسفة التشييد (Philosophy)
                </button>
                <button
                    onClick={() => setActiveTab('faq')}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'faq' ? 'bg-pharaohGold text-pharaohNavy shadow-md' : 'text-gray-400 hover:text-white bg-white/5'}`}
                >
                    الأسئلة الشائعة (FAQ)
                </button>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* TAB 1: HERO */}
                {activeTab === 'hero' && (
                    <div className="bg-[#112240] p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
                        <h2 className="text-xl font-bold text-pharaohGold border-b border-white/10 pb-3">تعديل قسم الهيرو (Hero Section)</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الفرعي (عربي)</label>
                                <input
                                    type="text"
                                    placeholder="رؤيتنا وإرثنا"
                                    value={form.hero.subtitle_ar || ''}
                                    onChange={(e) => setForm({ ...form, hero: { ...form.hero, subtitle_ar: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">Subtitle (English)</label>
                                <input
                                    type="text"
                                    placeholder="Legacy & Vision"
                                    value={form.hero.subtitle_en || ''}
                                    onChange={(e) => setForm({ ...form, hero: { ...form.hero, subtitle_en: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الرئيسي - الجزء الأول (عربي)</label>
                                <input
                                    type="text"
                                    placeholder="حيث يلتقي ذكاء الكود"
                                    value={form.hero.titlePart1_ar || ''}
                                    onChange={(e) => setForm({ ...form, hero: { ...form.hero, titlePart1_ar: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">Title Part 1 (English)</label>
                                <input
                                    type="text"
                                    placeholder="Where Code Mastery Meets"
                                    value={form.hero.titlePart1_en || ''}
                                    onChange={(e) => setForm({ ...form, hero: { ...form.hero, titlePart1_en: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الرئيسي - الجزء الذهبي (عربي)</label>
                                <input
                                    type="text"
                                    placeholder="بعظمة الأجداد"
                                    value={form.hero.titlePart2_ar || ''}
                                    onChange={(e) => setForm({ ...form, hero: { ...form.hero, titlePart2_ar: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">Title Part 2 (English)</label>
                                <input
                                    type="text"
                                    placeholder="Legacy Engineering"
                                    value={form.hero.titlePart2_en || ''}
                                    onChange={(e) => setForm({ ...form, hero: { ...form.hero, titlePart2_en: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">وصف الهيرو (عربي)</label>
                                <textarea
                                    rows={4}
                                    placeholder="في Pharaoh Code، نحن لا نكتفي ببرمجة تطبيقات..."
                                    value={form.hero.description_ar || ''}
                                    onChange={(e) => setForm({ ...form, hero: { ...form.hero, description_ar: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">Hero Description (English)</label>
                                <textarea
                                    rows={4}
                                    placeholder="At Pharaoh Code, we don't just write apps..."
                                    value={form.hero.description_en || ''}
                                    onChange={(e) => setForm({ ...form, hero: { ...form.hero, description_en: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none resize-none"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">نص الزر (عربي)</label>
                                <input
                                    type="text"
                                    placeholder="استكشف عالمنا"
                                    value={form.hero.buttonText_ar || ''}
                                    onChange={(e) => setForm({ ...form, hero: { ...form.hero, buttonText_ar: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">Button Text (English)</label>
                                <input
                                    type="text"
                                    placeholder="Explore Our World"
                                    value={form.hero.buttonText_en || ''}
                                    onChange={(e) => setForm({ ...form, hero: { ...form.hero, buttonText_en: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="text-lg font-bold text-white mb-4">مميزات الهيرو (Features)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Feature 1 */}
                                <div className="bg-[#0A192F] p-4 rounded-xl border border-white/10 space-y-4">
                                    <h4 className="text-sm font-bold text-pharaohGold">الميزة الأولى (Feature 1)</h4>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">العنوان (عربي)</label>
                                        <input
                                            type="text"
                                            placeholder="دقة فرعونية"
                                            value={form.hero.features?.[0]?.title_ar || ''}
                                            onChange={(e) => {
                                                const feats = [...(form.hero.features || [])];
                                                feats[0] = { ...feats[0], title_ar: e.target.value };
                                                setForm({ ...form, hero: { ...form.hero, features: feats } });
                                            }}
                                            className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Title (English)</label>
                                        <input
                                            type="text"
                                            placeholder="Pharaonic Precision"
                                            value={form.hero.features?.[0]?.title_en || ''}
                                            onChange={(e) => {
                                                const feats = [...(form.hero.features || [])];
                                                feats[0] = { ...feats[0], title_en: e.target.value };
                                                setForm({ ...form, hero: { ...form.hero, features: feats } });
                                            }}
                                            className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                                            dir="ltr"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">الوصف (عربي)</label>
                                        <input
                                            type="text"
                                            placeholder="اهتمام بكل بكسل في الكود"
                                            value={form.hero.features?.[0]?.description_ar || ''}
                                            onChange={(e) => {
                                                const feats = [...(form.hero.features || [])];
                                                feats[0] = { ...feats[0], description_ar: e.target.value };
                                                setForm({ ...form, hero: { ...form.hero, features: feats } });
                                            }}
                                            className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Description (English)</label>
                                        <input
                                            type="text"
                                            placeholder="Attention to every pixel in code."
                                            value={form.hero.features?.[0]?.description_en || ''}
                                            onChange={(e) => {
                                                const feats = [...(form.hero.features || [])];
                                                feats[0] = { ...feats[0], description_en: e.target.value };
                                                setForm({ ...form, hero: { ...form.hero, features: feats } });
                                            }}
                                            className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>

                                {/* Feature 2 */}
                                <div className="bg-[#0A192F] p-4 rounded-xl border border-white/10 space-y-4">
                                    <h4 className="text-sm font-bold text-pharaohGold">الميزة الثانية (Feature 2)</h4>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">العنوان (عربي)</label>
                                        <input
                                            type="text"
                                            placeholder="سرعة خارقة"
                                            value={form.hero.features?.[1]?.title_ar || ''}
                                            onChange={(e) => {
                                                const feats = [...(form.hero.features || [])];
                                                feats[1] = { ...feats[1], title_ar: e.target.value };
                                                setForm({ ...form, hero: { ...form.hero, features: feats } });
                                            }}
                                            className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Title (English)</label>
                                        <input
                                            type="text"
                                            placeholder="Blazing Speed"
                                            value={form.hero.features?.[1]?.title_en || ''}
                                            onChange={(e) => {
                                                const feats = [...(form.hero.features || [])];
                                                feats[1] = { ...feats[1], title_en: e.target.value };
                                                setForm({ ...form, hero: { ...form.hero, features: feats } });
                                            }}
                                            className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                                            dir="ltr"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">الوصف (عربي)</label>
                                        <input
                                            type="text"
                                            placeholder="أداء لا يعرف البطء أو التعليق"
                                            value={form.hero.features?.[1]?.description_ar || ''}
                                            onChange={(e) => {
                                                const feats = [...(form.hero.features || [])];
                                                feats[1] = { ...feats[1], description_ar: e.target.value };
                                                setForm({ ...form, hero: { ...form.hero, features: feats } });
                                            }}
                                            className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1">Description (English)</label>
                                        <input
                                            type="text"
                                            placeholder="Performance without lag or slowdown."
                                            value={form.hero.features?.[1]?.description_en || ''}
                                            onChange={(e) => {
                                                const feats = [...(form.hero.features || [])];
                                                feats[1] = { ...feats[1], description_en: e.target.value };
                                                setForm({ ...form, hero: { ...form.hero, features: feats } });
                                            }}
                                            className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: VISION & MISSION */}
                {activeTab === 'vision' && (
                    <div className="bg-[#112240] p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
                        <h2 className="text-xl font-bold text-pharaohGold border-b border-white/10 pb-3">الرؤية والرسالة (Vision & Mission)</h2>

                        {/* Vision */}
                        <div className="space-y-4 border-b border-white/10 pb-6">
                            <h3 className="text-md font-bold text-white">قسم الرؤية (Our Vision)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-2">عنوان الرؤية (عربي)</label>
                                    <input
                                        type="text"
                                        placeholder="رؤيتنا"
                                        value={form.visionMission.visionTitle_ar || ''}
                                        onChange={(e) => setForm({ ...form, visionMission: { ...form.visionMission, visionTitle_ar: e.target.value } })}
                                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-2">Vision Title (English)</label>
                                    <input
                                        type="text"
                                        placeholder="Our Vision"
                                        value={form.visionMission.visionTitle_en || ''}
                                        onChange={(e) => setForm({ ...form, visionMission: { ...form.visionMission, visionTitle_en: e.target.value } })}
                                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                        dir="ltr"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-2">نص الرؤية (عربي)</label>
                                    <textarea
                                        rows={3}
                                        placeholder="أن نعيد كتابة تاريخ التكنولوجيا بأيادٍ مصرية..."
                                        value={form.visionMission.visionText_ar || ''}
                                        onChange={(e) => setForm({ ...form, visionMission: { ...form.visionMission, visionText_ar: e.target.value } })}
                                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-2">Vision Text (English)</label>
                                    <textarea
                                        rows={3}
                                        placeholder="To rewrite technology history through engineering mastery..."
                                        value={form.visionMission.visionText_en || ''}
                                        onChange={(e) => setForm({ ...form, visionMission: { ...form.visionMission, visionText_en: e.target.value } })}
                                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none resize-none"
                                        dir="ltr"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Mission */}
                        <div className="space-y-4">
                            <h3 className="text-md font-bold text-white">قسم الرسالة (Our Mission)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-2">عنوان الرسالة (عربي)</label>
                                    <input
                                        type="text"
                                        placeholder="رسالتنا"
                                        value={form.visionMission.missionTitle_ar || ''}
                                        onChange={(e) => setForm({ ...form, visionMission: { ...form.visionMission, missionTitle_ar: e.target.value } })}
                                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-2">Mission Title (English)</label>
                                    <input
                                        type="text"
                                        placeholder="Our Mission"
                                        value={form.visionMission.missionTitle_en || ''}
                                        onChange={(e) => setForm({ ...form, visionMission: { ...form.visionMission, missionTitle_en: e.target.value } })}
                                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                        dir="ltr"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-2">نص الرسالة (عربي)</label>
                                    <textarea
                                        rows={3}
                                        placeholder="تمكين طموحات عملائنا عبر تقديم حلول برمجية ذكية..."
                                        value={form.visionMission.missionText_ar || ''}
                                        onChange={(e) => setForm({ ...form, visionMission: { ...form.visionMission, missionText_ar: e.target.value } })}
                                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-300 mb-2">Mission Text (English)</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Empowering our clients' ambitions through intelligent software..."
                                        value={form.visionMission.missionText_en || ''}
                                        onChange={(e) => setForm({ ...form, visionMission: { ...form.visionMission, missionText_en: e.target.value } })}
                                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none resize-none"
                                        dir="ltr"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: PHILOSOPHY */}
                {activeTab === 'philosophy' && (
                    <div className="bg-[#112240] p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
                        <h2 className="text-xl font-bold text-pharaohGold border-b border-white/10 pb-3">فلسفة التشييد الرقمي (Philosophy)</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الفرعي (عربي)</label>
                                <input
                                    type="text"
                                    placeholder="كيف نفكر"
                                    value={form.philosophy.subtitle_ar || ''}
                                    onChange={(e) => setForm({ ...form, philosophy: { ...form.philosophy, subtitle_ar: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">Subtitle (English)</label>
                                <input
                                    type="text"
                                    placeholder="HOW WE THINK"
                                    value={form.philosophy.subtitle_en || ''}
                                    onChange={(e) => setForm({ ...form, philosophy: { ...form.philosophy, subtitle_en: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        {/* 3 Philosophy Cards */}
                        <div className="space-y-6 border-t border-white/10 pt-6">
                            <h3 className="text-md font-bold text-white">بطاقات الفلسفة الثلاث (3 Cards)</h3>

                            {form.philosophy.items?.map((item: any, idx: number) => (
                                <div key={idx} className="bg-[#0A192F] p-4 rounded-xl border border-white/10 space-y-4">
                                    <h4 className="text-sm font-bold text-pharaohGold">البطاقة رقم {idx + 1}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">العنوان (عربي)</label>
                                            <input
                                                type="text"
                                                placeholder={idx === 0 ? 'التحليل العميق' : idx === 1 ? 'كود لا يصدأ' : 'السيادة التقنية'}
                                                value={item.title_ar || ''}
                                                onChange={(e) => {
                                                    const items = [...(form.philosophy.items || [])];
                                                    items[idx] = { ...items[idx], title_ar: e.target.value };
                                                    setForm({ ...form, philosophy: { ...form.philosophy, items } });
                                                }}
                                                className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Title (English)</label>
                                            <input
                                                type="text"
                                                placeholder={idx === 0 ? 'Deep Analysis' : idx === 1 ? 'Stainless Code' : 'Technical Dominance'}
                                                value={item.title_en || ''}
                                                onChange={(e) => {
                                                    const items = [...(form.philosophy.items || [])];
                                                    items[idx] = { ...items[idx], title_en: e.target.value };
                                                    setForm({ ...form, philosophy: { ...form.philosophy, items } });
                                                }}
                                                className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                                                dir="ltr"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">الوصف (عربي)</label>
                                            <textarea
                                                rows={2}
                                                placeholder="نبدأ بدراسة فكرتك كأنها أساس لمعبد..."
                                                value={item.description_ar || ''}
                                                onChange={(e) => {
                                                    const items = [...(form.philosophy.items || [])];
                                                    items[idx] = { ...items[idx], description_ar: e.target.value };
                                                    setForm({ ...form, philosophy: { ...form.philosophy, items } });
                                                }}
                                                className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white resize-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Description (English)</label>
                                            <textarea
                                                rows={2}
                                                placeholder="We study your idea as a temple foundation..."
                                                value={item.description_en || ''}
                                                onChange={(e) => {
                                                    const items = [...(form.philosophy.items || [])];
                                                    items[idx] = { ...items[idx], description_en: e.target.value };
                                                    setForm({ ...form, philosophy: { ...form.philosophy, items } });
                                                }}
                                                className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white resize-none"
                                                dir="ltr"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 4: FAQ */}
                {activeTab === 'faq' && (
                    <div className="bg-[#112240] p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
                        <h2 className="text-xl font-bold text-pharaohGold border-b border-white/10 pb-3">قسم الأسئلة الشائعة (FAQ)</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الفرعي (عربي)</label>
                                <input
                                    type="text"
                                    placeholder="قاعدة المعرفة"
                                    value={form.faq.subtitle_ar || ''}
                                    onChange={(e) => setForm({ ...form, faq: { ...form.faq, subtitle_ar: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">Subtitle (English)</label>
                                <input
                                    type="text"
                                    placeholder="Knowledge Base"
                                    value={form.faq.subtitle_en || ''}
                                    onChange={(e) => setForm({ ...form, faq: { ...form.faq, subtitle_en: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الرئيسي - السؤال (عربي)</label>
                                <input
                                    type="text"
                                    placeholder="لديك أسئلة؟"
                                    value={form.faq.titlePart1_ar || ''}
                                    onChange={(e) => setForm({ ...form, faq: { ...form.faq, titlePart1_ar: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">Title Part 1 (English)</label>
                                <input
                                    type="text"
                                    placeholder="Have Questions?"
                                    value={form.faq.titlePart1_en || ''}
                                    onChange={(e) => setForm({ ...form, faq: { ...form.faq, titlePart1_en: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">العنوان الرئيسي - الإجابة الذهبية (عربي)</label>
                                <input
                                    type="text"
                                    placeholder="لدينا حلول أسطورية"
                                    value={form.faq.titlePart2_ar || ''}
                                    onChange={(e) => setForm({ ...form, faq: { ...form.faq, titlePart2_ar: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-300 mb-2">Title Part 2 (English)</label>
                                <input
                                    type="text"
                                    placeholder="We Have Engineering Answers"
                                    value={form.faq.titlePart2_en || ''}
                                    onChange={(e) => setForm({ ...form, faq: { ...form.faq, titlePart2_en: e.target.value } })}
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-pharaohGold outline-none"
                                    dir="ltr"
                                />
                            </div>
                        </div>

                        {/* FAQ Items (Questions & Answers) */}
                        <div className="space-y-6 border-t border-white/10 pt-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-md font-bold text-white">الأسئلة والإجابات ({form.faq.faqs?.length || 0})</h3>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentFaqs = [...(form.faq.faqs || [])];
                                        setForm({
                                            ...form,
                                            faq: {
                                                ...form.faq,
                                                faqs: [
                                                    ...currentFaqs,
                                                    { question_ar: '', question_en: '', answer_ar: '', answer_en: '' }
                                                ]
                                            }
                                        });
                                    }}
                                    className="bg-pharaohGold/20 hover:bg-pharaohGold text-pharaohGold hover:text-[#0A192F] px-4 py-2 rounded-xl text-xs font-bold transition-all border border-pharaohGold/40"
                                >
                                    + إضافة سؤال جديد
                                </button>
                            </div>

                            {(!form.faq.faqs || form.faq.faqs.length === 0) && (
                                <p className="text-xs text-gray-400 italic">لا يوجد أسئلة حالية. اضغط على "+ إضافة سؤال جديد" لإضافة أول سؤال وإجابة.</p>
                            )}

                            {form.faq.faqs?.map((faqItem: any, idx: number) => (
                                <div key={idx} className="bg-[#0A192F] p-4 rounded-xl border border-white/10 space-y-4 relative">
                                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                        <h4 className="text-sm font-bold text-pharaohGold">السؤال رقم {idx + 1}</h4>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = form.faq.faqs.filter((_: any, i: number) => i !== idx);
                                                setForm({ ...form, faq: { ...form.faq, faqs: updated } });
                                            }}
                                            className="text-red-400 hover:text-red-300 text-xs font-bold bg-red-500/10 hover:bg-red-500/20 px-3 py-1 rounded-lg transition-all border border-red-500/20"
                                        >
                                            حذف السؤال
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">السؤال (عربي)</label>
                                            <input
                                                type="text"
                                                placeholder="مثال: ما هي الخدمات التي تقدمونها؟"
                                                value={faqItem.question_ar || faqItem.question || ''}
                                                onChange={(e) => {
                                                    const faqs = [...(form.faq.faqs || [])];
                                                    faqs[idx] = { ...faqs[idx], question_ar: e.target.value };
                                                    setForm({ ...form, faq: { ...form.faq, faqs } });
                                                }}
                                                className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-pharaohGold"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Question (English)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. What services do you offer?"
                                                value={faqItem.question_en || ''}
                                                onChange={(e) => {
                                                    const faqs = [...(form.faq.faqs || [])];
                                                    faqs[idx] = { ...faqs[idx], question_en: e.target.value };
                                                    setForm({ ...form, faq: { ...form.faq, faqs } });
                                                }}
                                                className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-pharaohGold"
                                                dir="ltr"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">الإجابة (عربي)</label>
                                            <textarea
                                                rows={3}
                                                placeholder="مثال: نقدم خدمات تطوير الويب المتقدمة..."
                                                value={faqItem.answer_ar || faqItem.answer || ''}
                                                onChange={(e) => {
                                                    const faqs = [...(form.faq.faqs || [])];
                                                    faqs[idx] = { ...faqs[idx], answer_ar: e.target.value };
                                                    setForm({ ...form, faq: { ...form.faq, faqs } });
                                                }}
                                                className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-pharaohGold resize-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-400 mb-1">Answer (English)</label>
                                            <textarea
                                                rows={3}
                                                placeholder="e.g. We offer advanced web development..."
                                                value={faqItem.answer_en || ''}
                                                onChange={(e) => {
                                                    const faqs = [...(form.faq.faqs || [])];
                                                    faqs[idx] = { ...faqs[idx], answer_en: e.target.value };
                                                    setForm({ ...form, faq: { ...form.faq, faqs } });
                                                }}
                                                className="w-full bg-[#112240] border border-white/10 rounded-lg p-2.5 text-xs text-white outline-none focus:border-pharaohGold resize-none"
                                                dir="ltr"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

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
