import { SectionData } from '@/types';
import { admin } from '@/lib/firebase/admin';

import PortfolioHero from '@/components/services/portfolio/PortfolioHero';
import PortfolioCore from '@/components/services/portfolio/PortfolioCore';
import PortfolioServices from '@/components/services/portfolio/PortfolioServices';

export const revalidate = 3600;

export default async function PortfolioPage() {
  let docData: admin.firestore.DocumentData = {};
  let servicesDocs: admin.firestore.QueryDocumentSnapshot[] = [];
  let philosophyDocs: admin.firestore.QueryDocumentSnapshot[] = [];
  let portfolioDocs: admin.firestore.QueryDocumentSnapshot[] = [];

  try {
    const db = admin.firestore();
    const [doc, servicesSnap, philosophySnap, portfolioSnap] = await Promise.all([
      db.collection('pages').doc('portfolio').get(),
      db.collection('services').orderBy('createdAt', 'desc').get(),
      db.collection('philosophy').orderBy('createdAt', 'desc').get(),
      db.collection('portfolio').orderBy('createdAt', 'desc').get()
    ]);
    docData = doc.data() || {};
    servicesDocs = servicesSnap.docs;
    philosophyDocs = philosophySnap.docs;
    portfolioDocs = portfolioSnap.docs;
  } catch (error) {
    console.error("Failed to fetch portfolio data from firebase:", error);
  }

  const data: SectionData = JSON.parse(JSON.stringify(docData));

  // Map services from services collection
  const dbServices = servicesDocs.map(doc => {
      const sData = doc.data();
      return {
          title: sData.title || '',
          description: sData.desc || '',
          iconSvg: sData.icon || '',
          actionText: sData.btnText || '',
      };
  });

  if (!data.services) data.services = {};
  if (dbServices.length > 0) {
    data.services.items = dbServices;
  }

  // Map philosophy from philosophy collection
  const dbPhilosophy = philosophyDocs.map(doc => {
      const phData = doc.data();
      return {
          title: phData.title || '',
          description: phData.desc || '',
          iconSvg: phData.icon || '',
      };
  });

  if (!data.core) data.core = {};
  if (dbPhilosophy.length > 0) {
    data.core.items = dbPhilosophy;
  }

  // Map portfolio from portfolio collection
  const dbPortfolio = portfolioDocs.map(doc => {
      const pData = doc.data();
      return {
          title: pData.title || '',
          category: pData.category === 'web' ? 'Web Development' : pData.category === 'app' ? 'App Development' : 'Motion Graphics',
          filterClass: pData.category || 'web',
          image: pData.image || '',
          description: pData.desc || '',
          link: pData.link || ''
      };
  });

  if (!data.hero) data.hero = {};
  if (dbPortfolio.length > 0) {
    data.hero.items = dbPortfolio;
  }

  return (
    <>
      <PortfolioHero data={data.hero} />
      <PortfolioCore data={data.core} />
      <PortfolioServices data={data.services} />
    </>
  );
}

