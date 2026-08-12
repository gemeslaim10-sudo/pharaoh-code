import dynamic from 'next/dynamic';
import { getHomePageData } from '@/lib/firebase/getHomePageData';
import { getHeroThemeConfig } from '@/app/actions/dashboard/heroTheme';

const HomeHero = dynamic(() => import('../../components/sections/home/HomeHero'));
const HomePortfolio = dynamic(() => import('../../components/sections/home/HomePortfolio'));
const HomeServices = dynamic(() => import('../../components/sections/home/HomeServices'));
const HomeClients = dynamic(() => import('../../components/sections/home/HomeClients'));
const HomeCreative = dynamic(() => import('../../components/sections/home/HomeCreative'));
const HomeWorkflow = dynamic(() => import('../../components/sections/home/HomeWorkflow'));
const HomeStats = dynamic(() => import('../../components/sections/home/HomeStats'));
const HomeTeam = dynamic(() => import('../../components/sections/home/HomeTeam'));
const HomeTestimonials = dynamic(() => import('../../components/sections/home/HomeTestimonials'));

export default async function HomePage() {
  const [{ data, dbClients }, heroThemeConfig] = await Promise.all([
    getHomePageData(),
    getHeroThemeConfig()
  ]);

  return (
    <>
      <HomeHero data={data.hero} heroThemeConfig={heroThemeConfig} />
      <HomePortfolio data={data.portfolio} />
      <HomeServices data={data.services} />
      <HomeClients clients={dbClients} />
      <HomeCreative data={data.creative} />
      <HomeWorkflow data={data.workflow} />
      <HomeStats data={data.stats} />
      <HomeTeam data={data.team} />
      <HomeTestimonials data={data.testimonials} />
    </>
  );
}
