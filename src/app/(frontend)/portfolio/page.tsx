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
          title: sData.title || sData.title_ar || '',
          title_ar: sData.title_ar || sData.title || '',
          title_en: sData.title_en || '',
          description: sData.desc || sData.description || sData.desc_ar || '',
          description_ar: sData.desc_ar || sData.description_ar || sData.desc || '',
          description_en: sData.desc_en || sData.description_en || '',
          iconSvg: sData.icon || '',
          actionText: sData.btnText || '',
          actionText_ar: sData.btnText_ar || sData.btnText || '',
          actionText_en: sData.btnText_en || '',
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
          title: phData.title || phData.title_ar || '',
          title_ar: phData.title_ar || phData.title || '',
          title_en: phData.title_en || '',
          description: phData.desc || phData.description || phData.desc_ar || '',
          description_ar: phData.desc_ar || phData.description_ar || phData.desc || '',
          description_en: phData.desc_en || phData.description_en || '',
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
          title: pData.title || pData.title_ar || '',
          title_ar: pData.title_ar || pData.title || '',
          title_en: pData.title_en || '',
          category: pData.category === 'web' ? 'Web Development' : pData.category === 'app' ? 'App Development' : 'Motion Graphics',
          filterClass: pData.category || 'web',
          image: pData.image || '',
          description: pData.desc || pData.description || pData.desc_ar || '',
          description_ar: pData.desc_ar || pData.description_ar || pData.desc || '',
          description_en: pData.desc_en || pData.description_en || '',
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
