import { SectionData } from '@/types';
import { admin } from '@/lib/firebase/admin';
import { getTeamMembers } from '@/app/actions/dashboard/team';

export async function getHomePageData() {
  let docSnapData: admin.firestore.DocumentData = {};
  let reviewsDocs: admin.firestore.QueryDocumentSnapshot[] = [];
  let portfolioDocs: admin.firestore.QueryDocumentSnapshot[] = [];
  let philosophyDocs: admin.firestore.QueryDocumentSnapshot[] = [];
  let servicesDocs: admin.firestore.QueryDocumentSnapshot[] = [];
  let clientsDocs: admin.firestore.QueryDocumentSnapshot[] = [];
  let members: unknown[] = [];

  try {
    const db = admin.firestore();
    const [docSnap, reviewsSnap, portfolioSnap, philosophySnap, servicesSnap, teamMembers, clientsSnap] = await Promise.all([
      db.collection('pages').doc('home').get(),
      db.collection('reviews').get(),
      db.collection('portfolio').orderBy('createdAt', 'desc').get(),
      db.collection('philosophy').orderBy('createdAt', 'desc').get(),
      db.collection('services').orderBy('createdAt', 'desc').get(),
      getTeamMembers(),
      db.collection('clients').orderBy('createdAt', 'desc').get().catch(() => ({ docs: [] } as any))
    ]);
    docSnapData = docSnap.data() || {};
    reviewsDocs = reviewsSnap.docs;
    portfolioDocs = portfolioSnap.docs;
    philosophyDocs = philosophySnap.docs;
    servicesDocs = servicesSnap.docs;
    clientsDocs = clientsSnap.docs || [];
    members = teamMembers;
  } catch (error) {
    console.error("Failed to fetch home page data from firebase, using fallbacks:", error);
    try {
      members = await getTeamMembers();
    } catch {
      members = [];
    }
  }

  const data: SectionData = JSON.parse(JSON.stringify(docSnapData));
  
  // --- Reviews (Testimonials) ---
  const dbReviews = reviewsDocs.map(doc => {
      const revData = doc.data();
      return {
          name: revData.name || 'عميل',
          name_ar: revData.name_ar || revData.name,
          name_en: revData.name_en,
          role: revData.role || 'شريك نجاح',
          role_ar: revData.role_ar || revData.role,
          role_en: revData.role_en,
          content: revData.text || revData.content || '',
          content_ar: revData.text_ar || revData.content_ar || revData.text || revData.content,
          content_en: revData.text_en || revData.content_en,
          rating: '★★★★★',
          imageUrl: revData.image || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
      };
  });

  if (!data.testimonials) data.testimonials = {};
  data.testimonials.items = dbReviews;

  // --- Portfolio ---
  const dbPortfolio = portfolioDocs.map(doc => {
      const pData = doc.data();
      return {
          title: pData.title,
          title_ar: pData.title_ar || pData.title,
          title_en: pData.title_en,
          category: pData.category,
          categoryLabel: pData.category === 'web' ? 'Web Development' : pData.category === 'app' ? 'App Development' : 'Motion Graphics',
          image: pData.image,
          description: pData.desc || pData.description,
          description_ar: pData.desc_ar || pData.description_ar || pData.desc,
          description_en: pData.desc_en || pData.description_en,
          link: pData.link,
      };
  });
  if (!data.portfolio) data.portfolio = {};
  if (dbPortfolio.length > 0) data.portfolio.items = dbPortfolio;

  // --- Services ---
  const dbServices = servicesDocs.map(doc => {
      const sData = doc.data();
      return {
          title: sData.title,
          title_ar: sData.title_ar || sData.title,
          title_en: sData.title_en,
          description: sData.desc || sData.description,
          description_ar: sData.desc_ar || sData.description_ar || sData.desc,
          description_en: sData.desc_en || sData.description_en,
          iconSvg: sData.icon,
          detailPageUrl: sData.detailPageUrl || '',
      };
  });
  if (!data.services) data.services = {};
  if (dbServices.length > 0) data.services.items = dbServices;

  // --- Philosophy (Creative) ---
  const dbPhilosophy = philosophyDocs.map(doc => {
      const phData = doc.data();
      return {
          title: phData.title,
          title_ar: phData.title_ar || phData.title,
          title_en: phData.title_en,
          description: phData.desc || phData.description,
          description_ar: phData.desc_ar || phData.description_ar || phData.desc,
          description_en: phData.desc_en || phData.description_en,
          iconSvg: phData.icon,
      };
  });
  if (!data.creative) data.creative = {};
  if (dbPhilosophy.length > 0) data.creative.items = dbPhilosophy;

  if (!data.team) data.team = {};
  data.team.members = members;

  // --- Clients ---
  const dbClients = clientsDocs.map(doc => {
      const cData = doc.data();
      return {
          id: doc.id,
          name: cData.name || '',
          name_ar: cData.name_ar || cData.name,
          name_en: cData.name_en,
          logo: cData.logo || '',
          description: cData.description || cData.desc || '',
          description_ar: cData.description_ar || cData.desc_ar || cData.description,
          description_en: cData.description_en || cData.desc_en,
          websiteUrl: cData.websiteUrl || ''
      };
  });

  return { data, dbClients };
}
