'use client';

import { useState, useEffect } from 'react';
import { getHeroThemeConfig, updateHeroThemeConfig, HeroThemeConfig } from '@/app/actions/dashboard/heroTheme';
import { uploadImage } from '@/app/actions/dashboard/upload';
import { auth } from '@/lib/firebase/config';

export default function SettingsHeroTheme() {
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [config, setConfig] = useState<HeroThemeConfig>({
        darkSlide1Video: '',
        darkSlide2Video: '',
        darkSlide2Image: '',
        darkPreset: 'royal_gold',

        lightSlide1Video: '',
        lightSlide2Video: '',
        lightSlide2Image: '',
        lightPreset: 'royal_gold',
    });

    const [uploadingField, setUploadingField] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getHeroThemeConfig();
                if (data) {
                    setConfig({
                        darkSlide1Video: data.darkSlide1Video || '',
                        darkSlide2Video: data.darkSlide2Video || '',
                        darkSlide2Image: data.darkSlide2Image || '',
                        darkPreset: data.darkPreset || 'royal_gold',

                        lightSlide1Video: data.lightSlide1Video || '',
                        lightSlide2Video: data.lightSlide2Video || '',
                        lightSlide2Image: data.lightSlide2Image || '',
                        lightPreset: data.lightPreset || 'royal_gold',
                    });
                }
            } catch (error) {
                console.error("Failed to load hero theme settings:", error);
            } finally {
                setInitialLoad(false);
            }
        };
        loadData();
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldKey: keyof HeroThemeConfig) => {
        if (!e.target.files || !e.target.files[0]) return;
        const file = e.target.files[0];
        setUploadingField(fieldKey as string);

        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');
            const token = await user.getIdToken();

            const uploadData = new FormData();
            uploadData.append('file', file);
            const uploadRes = await uploadImage(token, uploadData);
            if (!uploadRes.success) {
                throw new Error(uploadRes.error);
            }
            if (uploadRes.url) {
                setConfig(prev => ({ ...prev, [fieldKey]: uploadRes.url }));
            }
        } catch (error: any) {
            console.error(error);
            alert(`حدث خطأ أثناء رفع الملف: ${error?.message || 'تعذر الرفع.'}`);
        } finally {
            setUploadingField(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Not authenticated');
            const token = await user.getIdToken();

            await updateHeroThemeConfig(token, config);
            alert("تم حفظ وتحديث ميديا وقوالب ألوان الهيرو بنجاح! 👑");
        } catch (error: any) {
            console.error(error);
            alert(`حدث خطأ أثناء الحفظ: ${error?.message || 'تعذر حفظ البيانات.'}`);
        } finally {
            setLoading(false);
        }
    };

    if (initialLoad) return <div className="p-10 text-center text-pharaohGold">جاري تحميل إعدادات الهيرو والألوان...</div>;

    const presetsList = [
        { id: 'royal_gold', name: 'الملكي الكلاسيكي (Pharaoh Gold & Royal Navy)', desc: 'عناوين بيضاء ناصعة مع لمسات ذهبية وأزرار كحلية وذهبية فاخرة', titleColor: '#FFFFFF', accentColor: '#C5A16F' },
        { id: 'luminous_gold', name: 'الذهبي البراق (Luminous Gold & White)', desc: 'ألوان ذهبية براقة مع خلفية أزرار ذهبية مشعة وتباين عالٍ', titleColor: '#FFFFFF', accentColor: '#F59E0B' },
        { id: 'sovereign_silver', name: 'السيادي الفضي والذهبي (Sovereign Silver & Gold)', desc: 'عناوين فضية ملكية وتفاصيل ذهبية دافئة', titleColor: '#F8FAFC', accentColor: '#EAB308' },
        { id: 'cinematic', name: 'التباين العالي السينمائي (High Contrast Cinematic Yellow)', desc: 'ألوان سينمائية ذات تباين ناصع جداً وقراءة مريحة فوق جميع الفيديوهات', titleColor: '#FFFFFF', accentColor: '#FACC15' }
    ];

    return (
        <div id="sec-hero-theme" className="section-panel hidden space-y-10">
            <form onSubmit={handleSubmit} className="bg-pharaohCard border border-white/5 rounded-3xl p-6 lg:p-10 shadow-2xl relative space-y-10">
                <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-pharaohGold text-pharaohNavy font-black text-[10px] uppercase tracking-[3px] px-4 py-1.5 rounded-full shadow-lg">
                    HERO MEDIA & COLORS
                </div>

                <div>
                    <h3 className="text-xl font-black text-white flex items-center gap-3 text-pharaohGold mb-2">
                        <span className="w-2.5 h-2.5 bg-pharaohGold rounded-full"></span>
                        إدارة فيديوهات وألوان قسم الهيرو (Hero Section Customizer)
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        قم بتحديد الفيديوهات وقوالب الألوان المخصصة لقسم الهيرو بشكل مستقل في الوضع الداكن والوضع الفاتح. الفيديوهات الافتراضية تعمل تلقائياً إذا لم يقع اختيارك على فيديو معين.
                    </p>
                </div>

                {/* Info Callout */}
                <div className="bg-[#0A192F] border border-pharaohGold/30 p-4 rounded-2xl flex items-center gap-4 text-xs text-gray-300">
                    <div className="text-2xl">🎬</div>
                    <div>
                        <span className="font-bold text-pharaohGold block">فيديوهات الخلفية الافتراضية:</span>
                        إذا تركْتَ حقول الفيديوهات فارغة، ستقوم المنصة باستخدام الفيديوهات الافتراضية السريعة عبر السحابة تلقائياً.
                    </div>
                </div>

                {/* Dark Mode Hero Section */}
                <div className="bg-[#112240] border border-white/10 rounded-2xl p-6 space-y-6">
                    <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                        🌙 تخصيص ميديا (صورة أو فيديو) وألوان الهيرو في الوضع الداكن (Dark Mode Hero)
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Slide 1 Media */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-bold text-gray-300">ميديا السلايد الأول (صورة 🖼️ أو فيديو 🎬)</label>
                                {(config.darkSlide1Media || config.darkSlide1Video || config.darkSlide1Image) && (
                                    <span className="text-[10px] text-pharaohGold bg-pharaohGold/10 px-2 py-0.5 rounded-full font-bold">
                                        {(config.darkSlide1Media || config.darkSlide1Video || '').match(/\.(mp4|webm|mov)(\?.*)?$/i) ? '🎬 فيديو' : '🖼️ صورة'}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={config.darkSlide1Media || config.darkSlide1Video || config.darkSlide1Image || ''}
                                    onChange={e => setConfig(prev => ({ ...prev, darkSlide1Media: e.target.value, darkSlide1Video: e.target.value, darkSlide1Image: e.target.value }))}
                                    placeholder="رابط صورة أو فيديو MP4..."
                                    className="flex-1 bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-xs text-white dir-ltr focus:border-pharaohGold outline-none"
                                />
                                <label className="cursor-pointer bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-4 py-3 rounded-xl border border-white/10 transition-colors flex items-center gap-1 shrink-0">
                                    <span>{uploadingField === 'darkSlide1Media' ? 'جاري الرفع...' : 'رفع صورة/فيديو'}</span>
                                    <input type="file" accept="image/*,video/*" onChange={e => handleFileUpload(e, 'darkSlide1Media')} className="hidden" />
                                </label>
                            </div>
                        </div>

                        {/* Slide 2 Media */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-bold text-gray-300">ميديا السلايد الثاني (صورة 🖼️ أو فيديو 🎬)</label>
                                {(config.darkSlide2Media || config.darkSlide2Video || config.darkSlide2Image) && (
                                    <span className="text-[10px] text-pharaohGold bg-pharaohGold/10 px-2 py-0.5 rounded-full font-bold">
                                        {(config.darkSlide2Media || config.darkSlide2Video || '').match(/\.(mp4|webm|mov)(\?.*)?$/i) ? '🎬 فيديو' : '🖼️ صورة'}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={config.darkSlide2Media || config.darkSlide2Video || config.darkSlide2Image || ''}
                                    onChange={e => setConfig(prev => ({ ...prev, darkSlide2Media: e.target.value, darkSlide2Video: e.target.value, darkSlide2Image: e.target.value }))}
                                    placeholder="رابط صورة أو فيديو..."
                                    className="flex-1 bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-xs text-white dir-ltr focus:border-pharaohGold outline-none"
                                />
                                <label className="cursor-pointer bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-4 py-3 rounded-xl border border-white/10 transition-colors flex items-center gap-1 shrink-0">
                                    <span>{uploadingField === 'darkSlide2Media' ? 'جاري الرفع...' : 'رفع صورة/فيديو'}</span>
                                    <input type="file" accept="image/*,video/*" onChange={e => handleFileUpload(e, 'darkSlide2Media')} className="hidden" />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Dark Mode Color Scheme Presets */}
                    <div>
                        <label className="block text-xs font-bold text-pharaohGold mb-3">قالب ألوان النصوص والأزرار في الوضع الداكن:</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {presetsList.map(preset => (
                                <div
                                    key={preset.id}
                                    onClick={() => setConfig(prev => ({ ...prev, darkPreset: preset.id }))}
                                    className={`cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between space-y-2 ${config.darkPreset === preset.id ? 'bg-[#0A192F] border-pharaohGold shadow-lg shadow-pharaohGold/10' : 'bg-[#0A192F]/50 border-white/5 hover:border-white/20'}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-xs text-white">{preset.name}</span>
                                        {config.darkPreset === preset.id && <span className="text-pharaohGold text-xs font-bold">محدد 🟢</span>}
                                    </div>
                                    <p className="text-[11px] text-gray-400">{preset.desc}</p>
                                    <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[10px]">
                                        <span className="w-3 h-3 rounded-full inline-block border border-white/20" style={{ backgroundColor: preset.titleColor }}></span>
                                        <span className="text-gray-400">عنوان الرئيسي</span>
                                        <span className="w-3 h-3 rounded-full inline-block border border-white/20 ml-2" style={{ backgroundColor: preset.accentColor }}></span>
                                        <span className="text-gray-400">اللون البارز</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Light Mode Hero Section */}
                <div className="bg-[#112240] border border-white/10 rounded-2xl p-6 space-y-6">
                    <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                        ☀️ تخصيص ميديا (صورة أو فيديو) وألوان الهيرو في الوضع الفاتح (Light Mode Hero)
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Slide 1 Media for Light Mode */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-bold text-gray-300">ميديا السلايد الأول - لايت مود (صورة 🖼️ أو فيديو 🎬)</label>
                                {(config.lightSlide1Media || config.lightSlide1Video || config.lightSlide1Image) && (
                                    <span className="text-[10px] text-pharaohGold bg-pharaohGold/10 px-2 py-0.5 rounded-full font-bold">
                                        {(config.lightSlide1Media || config.lightSlide1Video || '').match(/\.(mp4|webm|mov)(\?.*)?$/i) ? '🎬 فيديو' : '🖼️ صورة'}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={config.lightSlide1Media || config.lightSlide1Video || config.lightSlide1Image || ''}
                                    onChange={e => setConfig(prev => ({ ...prev, lightSlide1Media: e.target.value, lightSlide1Video: e.target.value, lightSlide1Image: e.target.value }))}
                                    placeholder="رابط صورة أو فيديو لايت مود..."
                                    className="flex-1 bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-xs text-white dir-ltr focus:border-pharaohGold outline-none"
                                />
                                <label className="cursor-pointer bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-4 py-3 rounded-xl border border-white/10 transition-colors flex items-center gap-1 shrink-0">
                                    <span>{uploadingField === 'lightSlide1Media' ? 'جاري الرفع...' : 'رفع صورة/فيديو'}</span>
                                    <input type="file" accept="image/*,video/*" onChange={e => handleFileUpload(e, 'lightSlide1Media')} className="hidden" />
                                </label>
                            </div>
                        </div>

                        {/* Slide 2 Media for Light Mode */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-bold text-gray-300">ميديا السلايد الثاني - لايت مود (صورة 🖼️ أو فيديو 🎬)</label>
                                {(config.lightSlide2Media || config.lightSlide2Video || config.lightSlide2Image) && (
                                    <span className="text-[10px] text-pharaohGold bg-pharaohGold/10 px-2 py-0.5 rounded-full font-bold">
                                        {(config.lightSlide2Media || config.lightSlide2Video || '').match(/\.(mp4|webm|mov)(\?.*)?$/i) ? '🎬 فيديو' : '🖼️ صورة'}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={config.lightSlide2Media || config.lightSlide2Video || config.lightSlide2Image || ''}
                                    onChange={e => setConfig(prev => ({ ...prev, lightSlide2Media: e.target.value, lightSlide2Video: e.target.value, lightSlide2Image: e.target.value }))}
                                    placeholder="رابط صورة أو فيديو لايت مود..."
                                    className="flex-1 bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-xs text-white dir-ltr focus:border-pharaohGold outline-none"
                                />
                                <label className="cursor-pointer bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-4 py-3 rounded-xl border border-white/10 transition-colors flex items-center gap-1 shrink-0">
                                    <span>{uploadingField === 'lightSlide2Media' ? 'جاري الرفع...' : 'رفع صورة/فيديو'}</span>
                                    <input type="file" accept="image/*,video/*" onChange={e => handleFileUpload(e, 'lightSlide2Media')} className="hidden" />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Light Mode Color Scheme Presets */}
                    <div>
                        <label className="block text-xs font-bold text-pharaohGold mb-3">قالب ألوان النصوص والأزرار في الوضع الفاتح:</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {presetsList.map(preset => (
                                <div
                                    key={preset.id}
                                    onClick={() => setConfig(prev => ({ ...prev, lightPreset: preset.id }))}
                                    className={`cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between space-y-2 ${config.lightPreset === preset.id ? 'bg-[#0A192F] border-pharaohGold shadow-lg shadow-pharaohGold/10' : 'bg-[#0A192F]/50 border-white/5 hover:border-white/20'}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-xs text-white">{preset.name}</span>
                                        {config.lightPreset === preset.id && <span className="text-pharaohGold text-xs font-bold">محدد 🟢</span>}
                                    </div>
                                    <p className="text-[11px] text-gray-400">{preset.desc}</p>
                                    <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[10px]">
                                        <span className="w-3 h-3 rounded-full inline-block border border-white/20" style={{ backgroundColor: preset.titleColor }}></span>
                                        <span className="text-gray-400">عنوان الرئيسي</span>
                                        <span className="w-3 h-3 rounded-full inline-block border border-white/20 ml-2" style={{ backgroundColor: preset.accentColor }}></span>
                                        <span className="text-gray-400">اللون البارز</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? 'جاري الحفظ...' : 'حفظ وتطبيق إعدادات الهيرو والألوان 👑'}
                    </button>
                </div>
            </form>
        </div>
    );
}
