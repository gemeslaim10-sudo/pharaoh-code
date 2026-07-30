import { SectionData } from '@/types';
import { admin } from '@/lib/firebase/admin';

import ServicesGrid from '@/components/services/services-page/ServicesGrid';
import ServicesTechStack from '@/components/services/services-page/ServicesTechStack';

export const revalidate = 3600;

export default async function ServicesPage() {
  let data: SectionData = {};
  try {
    const db = admin.firestore();
    const [doc, servicesSnap] = await Promise.all([
      db.collection('pages').doc('services').get(),
      db.collection('services').orderBy('createdAt', 'desc').get()
    ]);
    data = JSON.parse(JSON.stringify(doc.data() || {}));

    const dbServices = servicesSnap.docs.map(doc => {
      const sData = doc.data();
      return {
        title: sData.title || '',
        description: sData.desc || '',
        image: sData.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600',
        badgeTopRight: sData.type || '',
        badgeTopLeft: sData.badge || '',
        metaKey: sData.price ? "السعر يبدأ من" : "",
        metaValue: sData.price || "",
        linkText: sData.detailPageUrl ? "استكشف الخدمة" : "اطلب الخدمة",
        linkUrl: sData.detailPageUrl || "/start-project"
      };
    });

    if (!data.grid) data.grid = {};
    if (dbServices.length > 0) {
      data.grid.items = dbServices;
    }
  } catch (error) {
    console.error("Failed to fetch services page data from firebase, using fallbacks:", error);
  }

  return (
    <>
      <ServicesGrid data={data.grid || {}} />
      <ServicesTechStack />
    </>
  );
}
