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
        title: sData.title || sData.title_ar || '',
        title_ar: sData.title_ar || sData.title || '',
        title_en: sData.title_en || '',
        description: sData.desc || sData.description || sData.desc_ar || '',
        description_ar: sData.desc_ar || sData.description_ar || sData.desc || '',
        description_en: sData.desc_en || sData.description_en || '',
        image: sData.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600',
        badgeTopRight: sData.type || '',
        badgeTopRight_ar: sData.type_ar || sData.type || '',
        badgeTopRight_en: sData.type_en || sData.type || '',
        badgeTopLeft: sData.badge || '',
        badgeTopLeft_ar: sData.badge_ar || sData.badge || '',
        badgeTopLeft_en: sData.badge_en || sData.badge || '',
        metaKey_ar: sData.price ? "السعر يبدأ من" : "",
        metaKey_en: sData.price ? "Starting from" : "",
        metaValue: sData.price || "",
        linkText_ar: sData.detailPageUrl ? "استكشف الخدمة" : "اطلب الخدمة",
        linkText_en: sData.detailPageUrl ? "Explore Service" : "Order Service",
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
