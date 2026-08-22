'use client';

import React from 'react';
import { IdentityMetaFields } from './identity/IdentityMetaFields';
import { IdentityLogosSection } from './identity/IdentityLogosSection';
import { IdentityTogglesSection } from './identity/IdentityTogglesSection';

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
  email?: string;
  phone?: string;
  address?: string;
  address_en?: string;
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

        <IdentityTogglesSection
          formData={formData}
          handleChange={handleChange}
        />
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
