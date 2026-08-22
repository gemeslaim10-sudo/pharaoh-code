'use client';

import React from 'react';
import { IdentityFormData } from '../SettingsIdentityForm';

interface IdentityTogglesSectionProps {
  formData: IdentityFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function IdentityTogglesSection({ formData, handleChange }: IdentityTogglesSectionProps) {
  return (
    <>
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
    </>
  );
}
