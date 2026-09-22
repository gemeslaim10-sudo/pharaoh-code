import { cache } from 'react';
import { type SectionData } from '@/types';
import { admin } from '@/lib/firebase/admin';
import type { DocumentData, QueryDocumentSnapshot } from 'firebase-admin/firestore';
import { getTeamMembers } from '@/app/actions/dashboard/team';
import {
  mapReviews,
  mapPortfolio,
  mapServices,
  mapPhilosophy,
  mapClients,
  mapCategories,
} from './homePageMappers';

export const getHomePageData = cache(async function getHomePageData() {
  let docSnapData: DocumentData = {};
  let reviewsDocs: QueryDocumentSnapshot[] = [];
  let portfolioDocs: QueryDocumentSnapshot[] = [];
  let philosophyDocs: QueryDocumentSnapshot[] = [];
  let servicesDocs: QueryDocumentSnapshot[] = [];
  let clientsDocs: QueryDocumentSnapshot[] = [];
  let categoriesDocs: QueryDocumentSnapshot[] = [];
  let members: unknown[] = [];
  let identityData: Record<string, any> = {};

  try {
    const db = admin.firestore();
    const [docSnap, reviewsSnap, portfolioSnap, philosophySnap, servicesSnap, teamMembers, clientsSnap, identitySnap, categoriesSnap] = await Promise.all([
      db.collection('pages').doc('home').get(),
      db.collection('reviews').where('status', '==', 'approved').get(),
      db.collection('portfolio').orderBy('createdAt', 'desc').get(),
      db.collection('philosophy').orderBy('createdAt', 'desc').get(),
      db.collection('services').orderBy('createdAt', 'desc').get(),
      getTeamMembers(),
      db.collection('clients').orderBy('createdAt', 'desc').get().catch(() => ({ docs: [] } as any)),
      db.collection('settings').doc('identity').get().catch(() => ({ data: () => ({}) } as any)),
      db.collection('categories').orderBy('createdAt', 'desc').get().catch(() => ({ docs: [] } as any)),
    ]);
    docSnapData = docSnap.data() || {};
    reviewsDocs = reviewsSnap.docs;
    portfolioDocs = portfolioSnap.docs;
    philosophyDocs = philosophySnap.docs;
    servicesDocs = servicesSnap.docs;
    clientsDocs = clientsSnap.docs || [];
    categoriesDocs = categoriesSnap.docs || [];
    members = teamMembers;
    identityData = identitySnap?.data?.() || {};
  } catch (error) {
    console.error("Failed to fetch home page data from firebase, using fallbacks:", error);
    try { members = await getTeamMembers(); } catch { members = []; }
  }

  const data: SectionData = JSON.parse(JSON.stringify(docSnapData));
  
  if (!data.testimonials) data.testimonials = {};
  data.testimonials.items = mapReviews(reviewsDocs);

  if (!data.portfolio) data.portfolio = {};
  data.portfolio.items = mapPortfolio(portfolioDocs);
  data.portfolio.categories = mapCategories(categoriesDocs);

  if (!data.services) data.services = {};
  if (servicesDocs.length > 0) data.services.items = mapServices(servicesDocs);

  if (!data.creative) data.creative = {};
  if (philosophyDocs.length > 0) data.creative.items = mapPhilosophy(philosophyDocs);

  const logoUrl = identityData.logo || identityData.logo_dark || '';
  const logoLightUrl = identityData.logo_light || '';

  if (!data.team) data.team = {};
  data.team.members = members;
  data.team.logoUrl = logoUrl;
  data.team.logoLightUrl = logoLightUrl;

  const dbClients = mapClients(clientsDocs);

  return { data, dbClients };
});
