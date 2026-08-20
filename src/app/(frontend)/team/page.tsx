import { SectionData } from '@/types';
import { admin } from '@/lib/firebase/admin';
import { getTeamMembers } from '@/app/actions/dashboard/team';
import { getIdentity } from '@/app/actions/dashboard/settings';

import TeamHero from '@/components/services/team/TeamHero';
import TeamModal from '@/components/services/team/TeamModal';
import TeamProcess from '@/components/services/team/TeamProcess';

export const revalidate = 3600;

export default async function TeamPage() {
  let data: SectionData = {};
  try {
    const db = admin.firestore();
    const doc = await db.collection('pages').doc('team').get();
    data = JSON.parse(JSON.stringify(doc.data() || {}));
  } catch (error) {
    console.error("Failed to fetch team page data from firebase, using fallbacks:", error);
  }

  const [members, identity] = await Promise.all([
    getTeamMembers(),
    getIdentity()
  ]);

  if (!data.hero) data.hero = {};
  data.hero.members = members;
  data.hero.logoUrl = identity?.logo || identity?.logo_dark || '';
  data.hero.logoLightUrl = identity?.logo_light || '';

  return (
    <>
      <TeamHero data={data.hero} />
      <TeamModal />
      <TeamProcess />
    </>
  );
}
