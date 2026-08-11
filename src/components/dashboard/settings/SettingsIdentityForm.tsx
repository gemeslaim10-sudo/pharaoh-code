'use client';

export interface IdentityFormData {
    name: string;
    name_en: string;
    title: string;
    title_en: string;
    keywords: string;
    keywords_en: string;
    desc: string;
    desc_en: string;
    favicon: string;
    logo?: string;
    logo_en?: string;
    reverse_navbar_ar?: boolean;
}

interface SettingsIdentityFormProps {
    formData: IdentityFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    faviconPreview: string | null;
    handleFaviconChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    logoPreview: string | null;
    handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onOpenLogoCropper?: () => void;
    loading: boolean;
    handleSubmit: (e: React.FormEvent) => void;
}

export default function SettingsIdentityForm({
    formData,
    handleChange,
    faviconPreview,
    handleFaviconChange,
    logoPreview,
    handleLogoChange,
    onOpenLogoCropper,
    loading,
    handleSubmit
}: SettingsIdentityFormProps) {
    return (
        <form id="form-identity" onSubmit={handleSubmit}
            className="bg-pharaohCard border border-white/5 rounded-3xl p-6 lg:p-10 shadow-2xl relative">
            <div
                className="absolute top-0 right-10 transform -translate-y-1/2 bg-pharaohGold text-pharaohNavy font-black text-[10px] uppercase tracking-[3px] px-4 py-1.5 rounded-full shadow-lg">IDENTITY
                ENGINE</div>
            <h3
                className="text-lg font-bold text-white mb-6 flex items-center gap-3 text-pharaohGold">
                <span className="w-2 h-2 bg-pharaohGold rounded-full"></span>
                تحديث وحفظ بيانات الهوية (باللغتين العربية والإنجليزية)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">اسم المنصة (بالعربية)</label>
                    <input type="text" id="site-name" required value={formData.name} onChange={handleChange}
                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" placeholder="مثال: صرح فرعون للبرمجيات" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">اسم المنصة (بالإنجليزية - Name EN)</label>
                    <input type="text" id="site-name_en" value={formData.name_en} onChange={handleChange}
                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" placeholder="e.g. Pharaoh Code Software" dir="ltr" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">عنوان الموقع الوصفي (SEO Title - بالعربية)</label>
                    <input type="text" id="site-title" required value={formData.title} onChange={handleChange}
                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" placeholder="مثال: فرعون للبرمجيات - أنظمة برمجية أسطورية" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">عنوان الموقع الوصفي (SEO Title - EN)</label>
                    <input type="text" id="site-title_en" value={formData.title_en} onChange={handleChange}
                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" placeholder="e.g. Pharaoh Code - Premier Software House" dir="ltr" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">الكلمات الدلالية (Keywords - بالعربية)</label>
                    <input type="text" id="site-keywords" value={formData.keywords} onChange={handleChange}
                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" placeholder="برمجة, تطبيقات, لوحات تحكم" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">الكلمات الدلالية (Keywords - EN)</label>
                    <input type="text" id="site-keywords_en" value={formData.keywords_en} onChange={handleChange}
                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" placeholder="software, apps, web development" dir="ltr" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">الوصف المتقدم (Meta Description - بالعربية)</label>
                    <textarea id="site-desc" rows={3} value={formData.desc} onChange={handleChange}
                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition resize-none" placeholder="اكتب وصفاً شاملاً للمنصة يظهر في نتائج البحث..."></textarea>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">الوصف المتقدم (Meta Description - EN)</label>
                    <textarea id="site-desc_en" rows={3} value={formData.desc_en} onChange={handleChange}
                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition resize-none" placeholder="Write comprehensive platform description for search engines..." dir="ltr"></textarea>
                </div>

                {/* Favicon Upload Section */}
                <div className="md:col-span-2 bg-[#112240] border border-white/5 p-6 rounded-2xl">
                    <label className="block text-sm font-bold text-white mb-4">أيقونة الموقع (Favicon) <span className="text-pharaohGold text-xs">(المقاس الموصى به: 32x32 أو 64x64 بكسل)</span></label>
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 shrink-0 bg-[#0A192F] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                            {(faviconPreview || formData.favicon) ? (
                                <img src={faviconPreview || formData.favicon} alt="Favicon Preview" className="w-full h-full object-contain p-2" />
                            ) : (
                                <span className="text-gray-500 text-xs">لا يوجد</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <input type="file" id="site-favicon" accept="image/png, image/jpeg, image/x-icon, image/svg+xml" onChange={handleFaviconChange} className="hidden" />
                            <label htmlFor="site-favicon" className="cursor-pointer inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-lg border border-white/10 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                اختر صورة من جهازك
                            </label>
                            <p className="text-[11px] text-gray-400 mt-2">يفضل أن تكون الصورة مربعة بصيغة PNG أو ICO.</p>
                        </div>
                    </div>
                </div>

                {/* Logo Upload Section */}
                <div className="md:col-span-2 bg-[#112240] border border-white/5 p-6 rounded-2xl">
                    <label className="block text-sm font-bold text-white mb-4">شعار المنصة الرئيسي (Logo) <span className="text-pharaohGold text-xs">(سيظهر في الناف بار بدلاً من النص إذا تم رفعه)</span></label>
                    <div className="flex items-center gap-6">
                        <div className="h-16 px-4 shrink-0 bg-[#0A192F] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                            {(logoPreview || formData.logo) ? (
                                <img src={logoPreview || formData.logo} alt="Logo Preview" className="max-h-12 w-auto object-contain" />
                            ) : (
                                <span className="text-gray-500 text-xs">نصي (PHARAOH CODE)</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <input type="file" id="site-logo" accept="image/png, image/jpeg, image/svg+xml, image/webp" onChange={handleLogoChange} className="hidden" />
                            <div className="flex flex-wrap items-center gap-3">
                                <label htmlFor="site-logo" className="cursor-pointer inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-lg border border-white/10 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                    رفع شعار المنصة
                                </label>
                                {(logoPreview || formData.logo) && onOpenLogoCropper && (
                                    <button
                                        type="button"
                                        onClick={onOpenLogoCropper}
                                        className="inline-flex items-center gap-2 bg-pharaohGold/10 hover:bg-pharaohGold/20 text-pharaohGold text-xs font-bold px-4 py-2 rounded-lg border border-pharaohGold/30 transition-colors shadow-sm"
                                    >
                                        ✂️ قص وتعديل حجم الشعار
                                    </button>
                                )}
                            </div>
                            <p className="text-[11px] text-gray-400 mt-2">إذا لم تقم برفع شعار، سيتم كتابة اسم المنصة تلقائياً كنص.</p>
                        </div>
                    </div>
                </div>

                {/* Reverse Navbar Option */}
                <div className="md:col-span-2 bg-[#112240] border border-white/5 p-6 rounded-2xl flex items-center justify-between gap-4">
                    <div>
                        <label className="block text-sm font-bold text-white mb-1">عكس اتجاه الناف بار في اللغة العربية (RTL Navbar)</label>
                        <p className="text-xs text-gray-400">تفعيل هذا الخيار يجعل اللوجو على اليمين والروابط/الأزرار على اليسار عند تصفح الموقع باللغة العربية.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            id="site-reverse_navbar_ar"
                            checked={formData.reverse_navbar_ar !== false}
                            onChange={(e) => {
                                handleChange({
                                    target: {
                                        id: 'site-reverse_navbar_ar',
                                        value: e.target.checked
                                    }
                                } as any);
                            }}
                            className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-[#0A192F] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-pharaohGold"></div>
                    </label>
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                <button type="submit" id="btn-save-identity" disabled={loading}
                    className="bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50">
                    {loading ? 'جاري الحفظ...' : 'حفظ وتحديث السجل'}
                </button>
            </div>
        </form>
    );
}
