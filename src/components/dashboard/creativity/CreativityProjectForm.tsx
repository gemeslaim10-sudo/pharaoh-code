'use client';

import { CreativityCategorySelector } from './CreativityCategorySelector';
import { useCreativityForm } from './useCreativityForm';

interface Props {
  onSuccess: () => void;
}

export default function CreativityProjectForm({ onSuccess }: Props) {
  const {
    loading, title, setTitle, titleEn, setTitleEn,
    selectedCategories, availableCategories, toggleCategory,
    isAppCategory, imageUrl, setImageUrl, link, setLink,
    appLink, setAppLink, desc, setDesc, descEn, setDescEn,
    handleSubmit
  } = useCreativityForm(onSuccess);

  return (
    <form onSubmit={handleSubmit} className="db-form-content bg-pharaohCard border border-white/5 rounded-3xl p-6 lg:p-10 shadow-2xl relative">
      <div className="absolute top-0 left-10 transform -translate-y-1/2 bg-pharaohGold text-pharaohNavy font-black text-[10px] uppercase tracking-[3px] px-4 py-1.5 rounded-full shadow-lg">PORTFOLIO DEPLOYMENT</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">عنوان المشروع (بالعربية)</label>
          <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition" placeholder="مثال: منصة حورس للتجارة الإلكترونية" />
        </div>
        <div>
          <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">عنوان المشروع (بالإنجليزية - Title EN)</label>
          <input type="text" value={titleEn} onChange={e => setTitleEn(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition" placeholder="e.g. Horus E-Commerce Platform" dir="ltr" />
        </div>

        <CreativityCategorySelector
          availableCategories={availableCategories}
          selectedCategories={selectedCategories}
          onToggleCategory={toggleCategory}
        />

        {isAppCategory && (
          <div className="md:col-span-2 bg-[#0A192F]/80 p-5 rounded-2xl border border-pharaohGold/30 space-y-2">
            <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider">رابط التطبيق (App Link - Google Play / App Store / APK)</label>
            <input
              type="url"
              value={appLink}
              onChange={e => setAppLink(e.target.value)}
              className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition"
              placeholder="https://play.google.com/store/apps/details?id=com.example.app"
              dir="ltr"
            />
            <p className="text-[11px] text-gray-400">يظهر هذا الحقل عند اختيار تصنيف تطبيقات الهواتف الموبايل.</p>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">رابط غلاف المشروع (Image URL)</label>
          <input type="url" required value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition" placeholder="https://example.com/image.jpg" />
        </div>

        <div>
          <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">رابط المشروع الحي (Project Link - اختياري)</label>
          <input type="url" value={link} onChange={e => setLink(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition" placeholder="https://my-project.com" dir="ltr" />
        </div>

        <div>
          <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">شرح المشروع (بالعربية)</label>
          <textarea rows={3} required value={desc} onChange={e => setDesc(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition resize-none" placeholder="اكتب هنا التفاصيل المعمارية البرمجية للمشروع المنجز..." />
        </div>
        <div>
          <label className="block text-xs font-bold text-pharaohGold uppercase tracking-wider mb-2">شرح المشروع (بالإنجليزية - Description EN)</label>
          <textarea rows={3} value={descEn} onChange={e => setDescEn(e.target.value)} className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition resize-none" placeholder="Write software architectural details in English..." dir="ltr" />
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button type="submit" disabled={loading} className="bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl shadow-pharaohGold/10 hover:opacity-90 transition disabled:opacity-50">
          {loading ? 'جاري التنصيب...' : 'تنصيب المشروع في المعرض'}
        </button>
      </div>
    </form>
  );
}
