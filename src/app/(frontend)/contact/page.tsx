import { SectionData } from '@/types';
import { admin } from '@/lib/firebase/admin';

import ContactSection from '@/components/services/contact/ContactSection';

export const revalidate = 3600;

export default async function ContactPage() {
  let data: SectionData = {};
  try {
    const db = admin.firestore();
    const doc = await db.collection('pages').doc('contact').get();
    data = JSON.parse(JSON.stringify(doc.data() || {}));
  } catch (error) {
    console.error("Failed to fetch contact page data from firebase, using fallbacks:", error);
  }

  return (
    <>
      <ContactSection data={data} />
    </>
  );
}
