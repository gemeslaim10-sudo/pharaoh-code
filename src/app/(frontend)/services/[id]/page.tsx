import { admin, serializeData } from '@/lib/firebase/admin';
import ServiceDetailHero from '@/components/services/detail/ServiceDetailHero';
import ServiceDetailOverview from '@/components/services/detail/ServiceDetailOverview';
import ServiceDetailPackages from '@/components/services/detail/ServiceDetailPackages';
import ServiceDetailRoadmap from '@/components/services/detail/ServiceDetailRoadmap';
import UnifiedContactForm from '@/components/shared/UnifiedContactForm';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const db = admin.firestore();
    const snap = await db.collection('services').get();
    return snap.docs.map(doc => ({ id: doc.id }));
  } catch (error) {
    return [];
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let service: any = null;

  try {
    const db = admin.firestore();
    const doc = await db.collection('services').doc(id).get();
    if (doc.exists) {
      service = serializeData({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.error("Error fetching service detail page:", error);
  }

  if (!service) {
    // Attempt fallback query by slug/title if direct doc ID was not matched
    try {
      const db = admin.firestore();
      const snap = await db.collection('services').where('slug', '==', id).limit(1).get();
      if (!snap.empty && snap.docs[0]) {
        const doc = snap.docs[0];
        service = serializeData({ id: doc.id, ...doc.data() });
      }
    } catch (e) {}
  }

  if (!service) {
    // Provide default fallback service structure if database doc is not found
    service = {
      id: id,
      title_ar: 'تفاصيل الخدمة البرمجية',
      title_en: 'Software Service Details',
      desc_ar: 'خدمات برمجية سيادية مخصصة لتلبية أرقى معايير التكنولوجيا.',
      desc_en: 'Sovereign custom software services tailored to top technology standards.'
    };
  }

  return (
    <>
      <ServiceDetailHero service={service} />
      <ServiceDetailOverview service={service} />
      <ServiceDetailPackages service={service} />
      <ServiceDetailRoadmap service={service} />
      
      <div id="start-project-form" className="py-16 bg-[#081426] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <UnifiedContactForm />
        </div>
      </div>
    </>
  );
}
