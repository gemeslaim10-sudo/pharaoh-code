'use client';

import { CreativityCategorySelector } from './CreativityCategorySelector';
import { useCreativityForm } from './useCreativityForm';
import { MediaUploadField } from '@/components/dashboard/common/MediaUploadField';
import { MediaGalleryField } from '@/components/dashboard/common/MediaGalleryField';

interface Props {
  onSuccess: () => void;
  editingItem?: any | null;
  onCancelEdit?: () => void;
}

const inputCls = "w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition";
const labelCls = "block text-xs font-bold text-amber-800 dark:text-pharaohGold uppercase tracking-wider mb-2";

export default function CreativityProjectForm({ onSuccess, editingItem = null, onCancelEdit }: Props) {
  const {
    loading, isEditing, title, setTitle, titleEn, setTitleEn,
    selectedCategories, availableCategories, toggleCategory,
    isAppCategory, imageUrl, setImageUrl, link, setLink,
    appLink, setAppLink, desc, setDesc, descEn, setDescEn,
    clientName, setClientName, clientNameEn, setClientNameEn,
    projectYear, setProjectYear, tools, setTools,
    gallery, setGallery, videos, setVideos, mediaUploading, setMediaUploading,
    handleSubmit
  } = useCreativityForm(onSuccess, editingItem);

  return (
    <form onSubmit={handleSubmit} className="db-form-content bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/5 rounded-3xl p-6 lg:p-10 shadow-md dark:shadow-2xl relative">
      <div className="absolute top-0 left-10 transform -translate-y-1/2 bg-pharaohGold text-[#0A192F] font-black text-[10px] uppercase tracking-[3px] px-4 py-1.5 rounded-full shadow-lg">
        {isEditing ? 'EDIT PROJECT' : 'PORTFOLIO DEPLOYMENT'}
      </div>

      {isEditing && (
        <div className="mb-6 bg-amber-500/10 border border-amber-500/30 dark:border-pharaohGold/30 text-amber-900 dark:text-pharaohGold text-xs font-bold px-4 py-3 rounded-xl">
          أنت تعدّل المشروع: <span className="font-black">{editingItem?.title_ar || editingItem?.title}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className={labelCls}>عنوان المشروع (بالعربية)</label>
          <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className={inputCls} placeholder="مثال: منصة حورس للتجارة الإلكترونية" />
        </div>
        <div>
          <label className={labelCls}>عنوان المشروع (بالإنجليزية - Title EN)</label>
          <input type="text" value={titleEn} onChange={e => setTitleEn(e.target.value)} className={inputCls} placeholder="e.g. Horus E-Commerce Platform" dir="ltr" />
        </div>

        <CreativityCategorySelector
          availableCategories={availableCategories}
          selectedCategories={selectedCategories}
          onToggleCategory={toggleCategory}
        />

        {isAppCategory && (
          <div className="md:col-span-2 bg-slate-50 dark:bg-[#0A192F]/80 p-5 rounded-2xl border border-amber-500/30 dark:border-pharaohGold/30 space-y-2">
            <label className="block text-xs font-bold text-amber-800 dark:text-pharaohGold uppercase tracking-wider">رابط التطبيق (App Link - Google Play / App Store / APK)</label>
            <input
              type="url"
              value={appLink}
              onChange={e => setAppLink(e.target.value)}
              className="w-full bg-white dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-pharaohGold transition"
              placeholder="https://play.google.com/store/apps/details?id=com.example.app"
              dir="ltr"
            />
            <p className="text-[11px] text-slate-500 dark:text-gray-400">يظهر هذا الحقل عند اختيار تصنيف تطبيقات الهواتف الموبايل.</p>
          </div>
        )}

        <div>
          <MediaUploadField
            label="غلاف المشروع (صورة من الجهاز)"
            value={imageUrl}
            onChange={setImageUrl}
            accept="image"
            required
            previewClassName="w-full h-32"
          />
        </div>

        <div>
          <label className={labelCls}>رابط المشروع الحي (Project Link - اختياري)</label>
          <input type="url" value={link} onChange={e => setLink(e.target.value)} className={inputCls} placeholder="https://my-project.com" dir="ltr" />
        </div>

        <div>
          <label className={labelCls}>شرح المشروع (بالعربية)</label>
          <textarea rows={5} required value={desc} onChange={e => setDesc(e.target.value)} className={`${inputCls} resize-none`} placeholder="اكتب هنا التفاصيل المعمارية البرمجية للمشروع المنجز..." />
        </div>
        <div>
          <label className={labelCls}>شرح المشروع (بالإنجليزية - Description EN)</label>
          <textarea rows={5} value={descEn} onChange={e => setDescEn(e.target.value)} className={`${inputCls} resize-none`} placeholder="Write software architectural details in English..." dir="ltr" />
        </div>

        <div>
          <label className={labelCls}>اسم العميل (بالعربية - اختياري)</label>
          <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} className={inputCls} placeholder="مثال: مطاعم بيت الأكل" />
        </div>
        <div>
          <label className={labelCls}>اسم العميل (بالإنجليزية - اختياري)</label>
          <input type="text" value={clientNameEn} onChange={e => setClientNameEn(e.target.value)} className={inputCls} placeholder="e.g. Beit El Akl Restaurants" dir="ltr" />
        </div>

        <div>
          <label className={labelCls}>سنة التنفيذ (اختياري)</label>
          <input type="text" inputMode="numeric" maxLength={9} value={projectYear} onChange={e => setProjectYear(e.target.value)} className={inputCls} placeholder="2026" dir="ltr" />
        </div>
        <div>
          <label className={labelCls}>الأدوات والتقنيات المستخدمة (اختياري)</label>
          <input type="text" value={tools} onChange={e => setTools(e.target.value)} className={inputCls} placeholder="Next.js, Firebase, Photoshop, Illustrator" dir="ltr" />
          <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-1.5">افصل بينها بفاصلة ( , )</p>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-slate-200 dark:border-white/10 space-y-8">
        <div>
          <h5 className="text-sm font-black text-slate-900 dark:text-white">معرض الأعمال والوسائط</h5>
          <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-1">كل الصور والفيديوهات هنا تظهر في صفحة تفاصيل العمل على الموقع بنفس الترتيب.</p>
        </div>
        <MediaGalleryField
          kind="image"
          label="الصور والتصميمات واللوجوهات"
          description="تصميمات جرافيك، لوجو، صور شاشات، هوية بصرية..."
          value={gallery}
          onChange={setGallery}
          onUploadingChange={setMediaUploading}
        />
        <MediaGalleryField
          kind="video"
          label="الفيديوهات"
          description="فيديو واحد أو أكثر (موشن جرافيك، إعلان، عرض للمشروع...)"
          value={videos}
          onChange={setVideos}
          onUploadingChange={setMediaUploading}
        />
      </div>

      <div className="mt-8 flex justify-end gap-3">
        {isEditing && onCancelEdit && (
          <button type="button" onClick={onCancelEdit} className="border border-slate-300 dark:border-white/20 text-slate-700 dark:text-gray-300 font-bold text-xs px-6 py-4 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition cursor-pointer">
            إلغاء التعديل
          </button>
        )}
        <button type="submit" disabled={loading || mediaUploading} className="bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl shadow-pharaohGold/10 hover:opacity-90 transition disabled:opacity-50 cursor-pointer">
          {mediaUploading ? 'جاري رفع الوسائط...' : loading ? 'جاري الحفظ...' : (isEditing ? 'حفظ تعديلات المشروع' : 'تنصيب المشروع في المعرض')}
        </button>
      </div>
    </form>
  );
}
