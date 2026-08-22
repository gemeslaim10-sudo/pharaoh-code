'use client';

import { useState } from 'react';
import SettingsIdentityForm from './SettingsIdentityForm';
import LogoCropperModal from './LogoCropperModal';
import { useSettingsIdentity } from './identity/useSettingsIdentity';
import { IdentityRecordsTable } from './identity/IdentityRecordsTable';
import { DashboardAccordionGroup } from '../layout/DashboardAccordionGroup';

export default function SettingsIdentity() {
  const {
    loading,
    initialLoad,
    formData,
    faviconPreview,
    logoPreview,
    logoLightPreview,
    isCropperOpen,
    cropperImageSrc,
    activeCropperTarget,
    setIsCropperOpen,
    handleChange,
    handleFaviconChange,
    handleLogoChange,
    handleLogoLightChange,
    handleOpenLogoCropper,
    handleCropComplete,
    handleSubmit,
  } = useSettingsIdentity();

  const [openForm, setOpenForm] = useState(true);
  const [openTable, setOpenTable] = useState(false);

  if (initialLoad) {
    return <div className="p-10 text-center text-pharaohGold">جاري تحميل بيانات الهوية...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Group 1: Form & Customization */}
      <DashboardAccordionGroup
        group={{
          id: 'identity-form',
          title: 'تعديل وتخصيص الهوية والشعارات',
          description: 'تعديل اسم المنصة، اللوجو الداكن والفاتح، والأيقونة المصغرة وخيارات العرض',
          icon: <span className="text-base">👑</span>,
          badge: 'أساسي',
          children: (
            <SettingsIdentityForm
              formData={formData}
              handleChange={handleChange}
              faviconPreview={faviconPreview}
              handleFaviconChange={handleFaviconChange}
              logoPreview={logoPreview}
              handleLogoChange={handleLogoChange}
              logoLightPreview={logoLightPreview}
              handleLogoLightChange={handleLogoLightChange}
              onOpenLogoCropper={handleOpenLogoCropper}
              loading={loading}
              handleSubmit={handleSubmit}
            />
          ),
        }}
        isOpen={openForm}
        onToggle={() => setOpenForm(!openForm)}
      />

      {/* Group 2: Records Table */}
      <DashboardAccordionGroup
        group={{
          id: 'identity-table',
          title: 'السجلات المحفوظة للهوية الرقمية',
          description: 'استعراض البيانات المعتمدة حالياً للهوية والكلمات المفتاحية في قاعدة البيانات',
          icon: <span className="text-base">📋</span>,
          badge: 'سجلات',
          children: <IdentityRecordsTable formData={formData} />,
        }}
        isOpen={openTable}
        onToggle={() => setOpenTable(!openTable)}
      />

      <LogoCropperModal
        imageSrc={cropperImageSrc}
        isOpen={isCropperOpen}
        onClose={() => setIsCropperOpen(false)}
        onCropComplete={handleCropComplete}
        target={activeCropperTarget}
      />
    </div>
  );
}
