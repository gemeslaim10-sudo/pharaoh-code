import WebDevHero from '@/components/services/web-development/WebDevHero';
import WebDevOverview from '@/components/services/web-development/WebDevOverview';
import WebDevPackages from '@/components/services/web-development/WebDevPackages';
import WebDevRoadmap from '@/components/services/web-development/WebDevRoadmap';
import WebDevForm from '@/components/services/web-development/WebDevForm';

export default function WebDevPage() {
  return (
    <>
      <WebDevHero />
      <WebDevOverview />
      <WebDevPackages />
      <WebDevRoadmap />
      <WebDevForm />
    </>
  );
}
