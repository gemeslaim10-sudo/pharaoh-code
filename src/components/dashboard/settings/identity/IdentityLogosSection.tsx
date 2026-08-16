'use client';
import { IdentityFormData } from '../SettingsIdentityForm';

interface IdentityLogosSectionProps {
  formData: IdentityFormData;
  faviconPreview: string | null;
  handleFaviconChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logoPreview: string | null;
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logoLightPreview: string | null;
  handleLogoLightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenLogoCropper?: ((target?: 'dark' | 'light') => void) | undefined;
}

export function IdentityLogosSection({
  formData,
  faviconPreview,
  handleFaviconChange,
  logoPreview,
  handleLogoChange,
  logoLightPreview,
  handleLogoLightChange,
  onOpenLogoCropper,
}: IdentityLogosSectionProps) {
  return (
    <>
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              اختر صورة من جهازك
            </label>
            <p className="text-[11px] text-gray-400 mt-2">يفضل أن تكون الصورة مربعة بصيغة PNG أو ICO.</p>
          </div>
        </div>
      </div>

      {/* Dark Mode Logo Upload Section */}
      <div className="md:col-span-2 bg-[#112240] border border-white/5 p-6 rounded-2xl">
        <label className="block text-sm font-bold text-white mb-4">🌙 شعار الوضع الداكن (Dark Mode Logo) <span className="text-pharaohGold text-xs">(يظهر عندما تكون الخلفية داكنة)</span></label>
        <div className="flex items-center gap-6">
          <div className="h-16 px-4 shrink-0 bg-[#0A192F] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
            {(logoPreview || formData.logo || formData.logo_dark) ? (
              <img src={logoPreview || formData.logo || formData.logo_dark} alt="Dark Logo Preview" className="max-h-12 w-auto object-contain" />
            ) : (
              <span className="text-gray-500 text-xs">نصي (PHARAOH CODE)</span>
            )}
          </div>
          <div className="flex-1">
            <input type="file" id="site-logo" accept="image/png, image/jpeg, image/svg+xml, image/webp" onChange={handleLogoChange} className="hidden" />
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="site-logo" className="cursor-pointer inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-lg border border-white/10 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                رفع شعار الوضع الداكن
              </label>
              {(logoPreview || formData.logo || formData.logo_dark) && onOpenLogoCropper && (
                <button
                  type="button"
                  onClick={() => onOpenLogoCropper('dark')}
                  className="inline-flex items-center gap-2 bg-pharaohGold/10 hover:bg-pharaohGold/20 text-pharaohGold text-xs font-bold px-4 py-2 rounded-lg border border-pharaohGold/30 transition-colors shadow-sm"
                >
                  ✂️ قص وتعديل حجم شعار الدارك مود
                </button>
              )}
            </div>
            <p className="text-[11px] text-gray-400 mt-2">الشعار المصمم خصيصاً ليظهر بوضوح فوق الخلفيات الداكنة.</p>
          </div>
        </div>
      </div>

      {/* Light Mode Logo Upload Section */}
      <div className="md:col-span-2 bg-[#112240] border border-white/5 p-6 rounded-2xl">
        <label className="block text-sm font-bold text-white mb-4">☀️ شعار الوضع الفاتح (Light Mode Logo) <span className="text-pharaohGold text-xs">(يظهر عندما تكون الخلفية بيضاء أو فاتحة)</span></label>
        <div className="flex items-center gap-6">
          <div className="h-16 px-4 shrink-0 bg-[#F8FAFC] rounded-xl border border-gray-300 flex items-center justify-center overflow-hidden">
            {(logoLightPreview || formData.logo_light) ? (
              <img src={logoLightPreview || formData.logo_light} alt="Light Logo Preview" className="max-h-12 w-auto object-contain" />
            ) : (
              <span className="text-gray-400 text-xs">نصي (PHARAOH CODE)</span>
            )}
          </div>
          <div className="flex-1">
            <input type="file" id="site-logo_light" accept="image/png, image/jpeg, image/svg+xml, image/webp" onChange={handleLogoLightChange} className="hidden" />
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="site-logo_light" className="cursor-pointer inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-4 py-2 rounded-lg border border-white/10 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                رفع شعار الوضع الفاتح
              </label>
              {(logoLightPreview || formData.logo_light) && onOpenLogoCropper && (
                <button
                  type="button"
                  onClick={() => onOpenLogoCropper('light')}
                  className="inline-flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold px-4 py-2 rounded-lg border border-amber-500/30 transition-colors shadow-sm"
                >
                  ✂️ قص وتعديل حجم شعار اللايت مود
                </button>
              )}
            </div>
            <p className="text-[11px] text-gray-400 mt-2">الشعار الداكن أو الملون المخصص للظهور بشكل ممتاز فوق الخلفيات البيضاء.</p>
          </div>
        </div>
      </div>
    </>
  );
}
