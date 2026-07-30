'use client';

interface IdentityFormData {
    name: string;
    title: string;
    keywords: string;
    desc: string;
    favicon: string;
}

interface SettingsIdentityFormProps {
    formData: IdentityFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    faviconPreview: string | null;
    handleFaviconChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    handleSubmit: (e: React.FormEvent) => void;
}

export default function SettingsIdentityForm({
    formData,
    handleChange,
    faviconPreview,
    handleFaviconChange,
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
                تحديث وحفظ بيانات الهوية
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">اسم المنصة</label>
                    <input type="text" id="site-name" required value={formData.name} onChange={handleChange}
                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2">عنوان الموقع الوصفي (SEO Title)</label>
                    <input type="text" id="site-title" required value={formData.title} onChange={handleChange}
                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 mb-2">الكلمات الدلالية المفتاحية (Keywords)</label>
                    <input type="text" id="site-keywords" value={formData.keywords} onChange={handleChange}
                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 mb-2">الوصف المتقدم (Meta Description)</label>
                    <textarea id="site-desc" rows={3} value={formData.desc} onChange={handleChange}
                        className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition resize-none"></textarea>
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
