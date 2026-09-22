import StartProjectForm from '@/components/services/start-project/StartProjectForm';
import { getIdentity, getSocialLinks } from '@/app/actions/dashboard/settings';

export const revalidate = 3600;

export default async function StartProjectPage() {
  let phone = '';
  let address_ar = '';
  let address_en = '';

  try {
    const [identity, socialData] = await Promise.all([getIdentity(), getSocialLinks()]);
    const identityData = (identity || {}) as Record<string, any>;
    const social = (socialData || {}) as Record<string, any>;

    phone = identityData.phone || identityData.whatsapp || social.wa || '';
    address_ar = identityData.address_ar || '';
    address_en = identityData.address || identityData.address_en || '';
  } catch (error) {
    console.error('Failed to fetch start-project contact details from firebase:', error);
  }

  return (
    <StartProjectForm phone={phone} address_ar={address_ar} address_en={address_en} />
  );
}
