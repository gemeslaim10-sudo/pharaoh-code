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
  let categoriesDocs: admin.firestore.QueryDocumentSnapshot[] = [];

  try {
    const db = admin.firestore();
    const [doc, servicesSnap, philosophySnap, portfolioSnap, categoriesSnap] = await Promise.all([
      db.collection('pages').doc('portfolio').get(),
      db.collection('services').orderBy('createdAt', 'desc').get(),
      db.collection('philosophy').orderBy('createdAt', 'desc').get(),
      db.collection('portfolio').orderBy('createdAt', 'desc').get(),
      db.collection('categories').orderBy('createdAt', 'desc').get().catch(() => ({ docs: [] } as any)),
    ]);
    docData = doc.data() || {};
    servicesDocs = servicesSnap.docs;
    philosophyDocs = philosophySnap.docs;
    portfolioDocs = portfolioSnap.docs;
    categoriesDocs = categoriesSnap.docs || [];
  } catch (error) {
    console.error("Failed to fetch portfolio data from firebase:", error);
  }

  const data: SectionData = JSON.parse(JSON.stringify(docData));

  // Map services
  const dbServices = servicesDocs.map(d => {
    const s = d.data();
    return {
      title: s.title || s.title_ar || '',
      title_ar: s.title_ar || s.title || '',
      title_en: s.title_en || '',
      description: s.desc || s.description || s.desc_ar || '',
      description_ar: s.desc_ar || s.description_ar || s.desc || '',
      description_en: s.desc_en || s.description_en || '',
      iconSvg: s.icon || '',
      actionText: s.btnText || s.btnText_ar || '',
      actionText_ar: s.btnText_ar || s.btnText || '',
      actionText_en: s.btnText_en || '',
    };
  });
  if (!data.services) data.services = {};
  if (dbServices.length > 0) data.services.items = dbServices;

  // Map philosophy
  const dbPhilosophy = philosophyDocs.map(d => {
    const ph = d.data();
    return {
      title: ph.title || ph.title_ar || '',
      title_ar: ph.title_ar || ph.title || '',
      title_en: ph.title_en || '',
      description: ph.desc || ph.description || ph.desc_ar || '',
      description_ar: ph.desc_ar || ph.description_ar || ph.desc || '',
      description_en: ph.desc_en || ph.description_en || '',
      iconSvg: ph.icon || '',
    };
  });
  if (!data.core) data.core = {};
  if (dbPhilosophy.length > 0) data.core.items = dbPhilosophy;

  // Map portfolio & categories
  const dbPortfolio = portfolioDocs.map(d => {
    const p = d.data();
    return {
      id: d.id,
      title: p.title || p.title_ar || '',
      title_ar: p.title_ar || p.title || '',
      title_en: p.title_en || '',
      category: p.category || '',
      filterClass: p.category || '',
      image: p.image || '',
      description: p.desc || p.description || p.desc_ar || '',
      description_ar: p.desc_ar || p.description_ar || p.desc || '',
      description_en: p.desc_en || p.description_en || '',
      link: p.link || '',
    };
  });

  const categories = categoriesDocs.map(d => {
    const c = d.data();
    return {
      id: d.id,
      nameAr: c.nameAr || c.name || '',
      nameEn: c.nameEn || '',
      slug: c.slug || d.id,
    };
  });

  if (!data.hero) data.hero = {};
  if (dbPortfolio.length > 0) data.hero.items = dbPortfolio;
  data.hero.categories = categories;

  return (
    <>
      <PortfolioHero data={data.hero} />
      <PortfolioCore data={data.core} />
      <PortfolioServices data={data.services} />
    </>
  );
}
