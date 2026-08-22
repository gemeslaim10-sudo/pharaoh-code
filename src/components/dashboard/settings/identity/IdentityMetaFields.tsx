'use client';
import { IdentityFormData } from '../SettingsIdentityForm';

interface IdentityMetaFieldsProps {
  formData: IdentityFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function IdentityMetaFields({ formData, handleChange }: IdentityMetaFieldsProps) {
  return (
    <>
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
        <label className="block text-xs font-bold text-gray-400 mb-2">البريد الإلكتروني الرسمي للتواصل (Email)</label>
        <input type="email" id="site-email" value={formData.email || ''} onChange={handleChange}
          className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" placeholder="info@pharaohcode.com" dir="ltr" />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-400 mb-2">رقم الهاتف / الواتساب الرئيسي (Phone)</label>
        <input type="text" id="site-phone" value={formData.phone || ''} onChange={handleChange}
          className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" placeholder="+201000000000" dir="ltr" />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 mb-2">عنوان ومقر الشركة (بالعربية)</label>
        <input type="text" id="site-address" value={formData.address || ''} onChange={handleChange}
          className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" placeholder="القاهرة، جمهورية مصر العربية" />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-400 mb-2">عنوان ومقر الشركة (EN - Address)</label>
        <input type="text" id="site-address_en" value={formData.address_en || ''} onChange={handleChange}
          className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition" placeholder="Cairo, Egypt" dir="ltr" />
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
          className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition resize-none" placeholder="اكتب وصفاً شاملاً للمنصة يظهر في نتائج البحث..." />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-400 mb-2">الوصف المتقدم (Meta Description - EN)</label>
        <textarea id="site-desc_en" rows={3} value={formData.desc_en} onChange={handleChange}
          className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-pharaohGold transition resize-none" placeholder="Write comprehensive platform description for search engines..." dir="ltr" />
      </div>
    </>
  );
}
