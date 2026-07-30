import PrivacyHeroSection from '@/components/services/privacy/PrivacyHeroSection';
import PrivacyDetailsList from '@/components/services/privacy/PrivacyDetailsList';

export const metadata = {
  title: 'سياسة الخصوصية وسرية المعلومات',
  description: 'سياسة الخصوصية وسرية المعلومات لمنصة Pharaoh Code'
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PrivacyHeroSection />
      <PrivacyDetailsList />
    </>
  );
}
