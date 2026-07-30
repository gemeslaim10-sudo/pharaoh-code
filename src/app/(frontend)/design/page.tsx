import DesignHero from '@/components/services/design/DesignHero';
import DesignOverview from '@/components/services/design/DesignOverview';
import DesignPackages from '@/components/services/design/DesignPackages';
import DesignRoadmap from '@/components/services/design/DesignRoadmap';
import DesignForm from '@/components/services/design/DesignForm';

export default function DesignPage() {
  return (
    <>
      <DesignHero />
      <DesignOverview />
      <DesignPackages />
      <DesignRoadmap />
      <DesignForm />
    </>
  );
}
