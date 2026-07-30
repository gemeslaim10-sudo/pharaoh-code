import { SectionData } from '@/types';
import { admin } from '@/lib/firebase/admin';

import AboutHero from '@/components/services/about/AboutHero';
import AboutVisionMission from '@/components/services/about/AboutVisionMission';
import AboutPhilosophy from '@/components/services/about/AboutPhilosophy';
import AboutFAQ from '@/components/services/about/AboutFAQ';
import AboutComments from '@/components/services/about/AboutComments';

export const revalidate = 3600; // Cache for 1 hour

export default async function AboutPage() {
  let data: SectionData = {};
  try {
    const db = admin.firestore();
    const aboutDoc = await db.collection('pages').doc('about').get();
    data = JSON.parse(JSON.stringify(aboutDoc.data() || {}));
  } catch (error) {
    console.error("Failed to fetch about page data from firebase, using fallbacks:", error);
  }

  return (
    <>
      <AboutHero data={data.hero} />
      <AboutVisionMission data={data.visionMission} />
      <AboutPhilosophy data={data.philosophy} />
      <AboutFAQ data={data.faq} />
      <AboutComments data={data.comments} />
    </>
  );
}
