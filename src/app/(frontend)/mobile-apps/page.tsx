import MobileAppsHero from '@/components/services/mobile-apps/MobileAppsHero';
import MobileAppsOverview from '@/components/services/mobile-apps/MobileAppsOverview';
import MobileAppsPackages from '@/components/services/mobile-apps/MobileAppsPackages';
import MobileAppsRoadmap from '@/components/services/mobile-apps/MobileAppsRoadmap';
import MobileAppsForm from '@/components/services/mobile-apps/MobileAppsForm';

export default function MobileAppsPage() {
  return (
    <>
      <MobileAppsHero />
      <MobileAppsOverview />
      <MobileAppsPackages />
      <MobileAppsRoadmap />
      <MobileAppsForm />
    </>
  );
}
