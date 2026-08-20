'use client';

import { IdentityMetaFields } from './identity/IdentityMetaFields';
import { IdentityLogosSection } from './identity/IdentityLogosSection';

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
  logo_dark?: string;
  logo_light?: string;
  logo_en?: string;
  reverse_navbar_ar?: boolean;
  show_scroll_progress?: boolean;
  show_side_scrollbar?: boolean;
}

interface SettingsIdentityFormProps {
  formData: IdentityFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  faviconPreview: string | null;
  handleFaviconChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logoPreview: string | null;
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logoLightPreview: string | null;
  handleLogoLightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenLogoCropper?: (target?: 'dark' | 'light') => void;
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
  logoLightPreview,
  handleLogoLightChange,
  onOpenLogoCropper,
  loading,
  handleSubmit
}: SettingsIdentityFormProps) {
  return (
    <form id="form-identity" onSubmit={handleSubmit} className="bg-pharaohCard border border-white/5 rounded-3xl p-6 lg:p-10 shadow-2xl relative">
      <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-pharaohGold text-pharaohNavy font-black text-[10px] uppercase tracking-[3px] px-4 py-1.5 rounded-full shadow-lg">
        IDENTITY ENGINE
      </div>
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3 text-pharaohGold">
        <span className="w-2 h-2 bg-pharaohGold rounded-full" />
        تحديث وحفظ بيانات الهوية (باللغتين العربية والإنجليزية)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IdentityMetaFields formData={formData} handleChange={handleChange} />

        <IdentityLogosSection
          formData={formData}
          faviconPreview={faviconPreview}
          handleFaviconChange={handleFaviconChange}
          logoPreview={logoPreview}
          handleLogoChange={handleLogoChange}
          logoLightPreview={logoLightPreview}
          handleLogoLightChange={handleLogoLightChange}
          onOpenLogoCropper={onOpenLogoCropper}
        />

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
                const syntheticEvent = {
                  target: { id: 'site-reverse_navbar_ar', value: e.target.checked }
                } as unknown as React.ChangeEvent<HTMLInputElement>;
                handleChange(syntheticEvent);
              }}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-[#0A192F] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-pharaohGold" />
          </label>
        </div>

        {/* Top Scroll Progress Bar Option */}
        <div className="md:col-span-2 bg-[#112240] border border-white/5 p-6 rounded-2xl flex items-center justify-between gap-4">
          <div>
            <label className="block text-sm font-bold text-white mb-1">إظهار شريط تقدم التمرير العلوي (Top Scroll Progress Bar)</label>
            <p className="text-xs text-gray-400">شريط ذهبي رفيع في أعلى الشاشة يتقدم أثناء التمرير في الصفحة. (الوضع الافتراضي: مخفي).</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="site-show_scroll_progress"
              checked={formData.show_scroll_progress === true}
              onChange={(e) => {
                const syntheticEvent = {
                  target: { id: 'site-show_scroll_progress', value: e.target.checked }
                } as unknown as React.ChangeEvent<HTMLInputElement>;
                handleChange(syntheticEvent);
              }}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-[#0A192F] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-pharaohGold" />
          </label>
        </div>

        {/* Side Scrollbar & Floating Controls Option */}
        <div className="md:col-span-2 bg-[#112240] border border-white/5 p-6 rounded-2xl flex items-center justify-between gap-4">
          <div>
            <label className="block text-sm font-bold text-white mb-1">إظهار شريط وأزرار التمرير الجانبية (Side Scrollbar & Floating Controls)</label>
            <p className="text-xs text-gray-400">تفعيل شريط التمرير المخصص وزر العودة للأعلى العائم على جانب الشاشة. (الوضع الافتراضي: مخفي).</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="site-show_side_scrollbar"
              checked={formData.show_side_scrollbar === true}
              onChange={(e) => {
                const syntheticEvent = {
                  target: { id: 'site-show_side_scrollbar', value: e.target.checked }
                } as unknown as React.ChangeEvent<HTMLInputElement>;
                handleChange(syntheticEvent);
              }}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-[#0A192F] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-pharaohGold" />
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
