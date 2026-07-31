import { redirect } from 'next/navigation';
import { admin } from '@/lib/firebase/admin';

export const revalidate = 0;

export default async function WebDevPage() {
  let targetUrl = '/services';

  try {
    const db = admin.firestore();
    const snap = await db.collection('services').get();
    if (!snap.empty) {
      const match = snap.docs.find(doc => {
        const d = doc.data();
        const type = (d.type || '').toLowerCase();
        const title = (d.title || d.title_ar || '').toLowerCase();
        return type.includes('web') || type.includes('موقع') || title.includes('مواقع') || title.includes('ويب');
      });

      if (match) {
        targetUrl = `/services/${match.id}`;
      }
    }
  } catch (error) {
    console.error("Redirect error in web-development page:", error);
  }

  redirect(targetUrl);
}
