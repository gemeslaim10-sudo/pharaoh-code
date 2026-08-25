import { SectionData } from '@/types';
import { admin, serializeData } from '@/lib/firebase/admin';
import ContactSection from '@/components/services/contact/ContactSection';
import { getSocialLinks } from '@/app/actions/dashboard/settings';

export const revalidate = 3600;

export default async function ContactPage() {
  let data: SectionData = {};

  try {
    const db = admin.firestore();
    const [contactDoc, identityDoc, socialData] = await Promise.all([
      db.collection('pages').doc('contact').get(),
      db.collection('settings').doc('identity').get().catch(() => ({ data: () => ({}) } as any)),
      getSocialLinks(),
    ]);

    const contactData = serializeData(contactDoc.data() || {});
    const identityData = serializeData(identityDoc?.data?.() || {});

    const wa = socialData.wa || identityData.whatsapp || identityData.phone || '+201000000000';
    const email = identityData.email || contactData.info?.email || 'info@pharaohcode.com';
    const address = identityData.address || contactData.info?.address || 'Cairo, Egypt';
    const address_ar = identityData.address_ar || contactData.info?.address_ar || 'القاهرة، جمهورية مصر العربية';
    const phone = identityData.phone || socialData.wa || '+201000000000';

    data = serializeData({
      ...contactData,
      socialPlatforms: socialData.items || [],
      info: {
        ...(contactData.info || {}),
        email,
        address,
        address_ar,
        phone,
        wa,
        whatsappLink: `https://wa.me/${wa.replace(/[^0-9]/g, '')}`,
      },
    });
  } catch (error) {
    console.error("Failed to fetch contact page data from firebase:", error);
  }

  return (
    <>
      <ContactSection data={data} />
    </>
  );
}
