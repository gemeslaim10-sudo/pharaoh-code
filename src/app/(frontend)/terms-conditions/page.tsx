import TermsHeroSection from '@/components/services/terms/TermsHeroSection';
import TermsDetailsList from '@/components/services/terms/TermsDetailsList';

export const metadata = {
  title: 'الشروط والأحكام العامة',
  description: 'الشروط والأحكام العامة لاستخدام منصة Pharaoh Code'
};

export default function TermsConditionsPage() {
  return (
    <>
      <TermsHeroSection />
      <TermsDetailsList />
    </>
  );
}
