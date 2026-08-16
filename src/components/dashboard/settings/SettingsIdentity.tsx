'use client';

import SettingsIdentityForm from './SettingsIdentityForm';
import LogoCropperModal from './LogoCropperModal';
import { useSettingsIdentity } from './identity/useSettingsIdentity';
import { IdentityRecordsTable } from './identity/IdentityRecordsTable';

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
    setIsCropperOpen,
    handleChange,
    handleFaviconChange,
    handleLogoChange,
    handleLogoLightChange,
    handleOpenLogoCropper,
    handleCropComplete,
    handleSubmit
  } = useSettingsIdentity();

  if (initialLoad) {
    return <div className="p-10 text-center text-pharaohGold">جاري تحميل بيانات الهوية...</div>;
  }

  return (
    <div id="sec-identity" className="section-panel space-y-10">
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

      <LogoCropperModal
        imageSrc={cropperImageSrc}
        isOpen={isCropperOpen}
        onClose={() => setIsCropperOpen(false)}
        onCropComplete={handleCropComplete}
      />

      <IdentityRecordsTable formData={formData} />
    </div>
  );
}
