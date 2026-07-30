import SystemHero from '@/components/services/system/SystemHero';
import SystemOverview from '@/components/services/system/SystemOverview';
import SystemPackages from '@/components/services/system/SystemPackages';
import SystemRoadmap from '@/components/services/system/SystemRoadmap';
import SystemForm from '@/components/services/system/SystemForm';

export default function SystemPage() {
  return (
    <>
      <SystemHero />
      <SystemOverview />
      <SystemPackages />
      <SystemRoadmap />
      <SystemForm />
    </>
  );
}
