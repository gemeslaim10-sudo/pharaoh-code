import { uploadImage } from '@/app/actions/dashboard/upload';
import { IdentityFormData } from '../SettingsIdentityForm';

export const INITIAL_IDENTITY_FORM: IdentityFormData = {
  name: '',
  name_en: '',
  title: '',
  title_en: '',
  keywords: '',
  keywords_en: '',
  desc: '',
  desc_en: '',
  favicon: '',
  logo: '',
  logo_dark: '',
  logo_light: '',
  logo_en: '',
  email: '',
  phone: '',
  address: '',
  address_en: '',
  reverse_navbar_ar: true,
  show_scroll_progress: false,
  show_side_scrollbar: false,
};

export function mapIdentityDataToForm(data: Record<string, any>): IdentityFormData {
  return {
    name: data.name || data.name_ar || '',
    name_en: data.name_en || '',
    title: data.title || data.title_ar || '',
    title_en: data.title_en || '',
    keywords: data.keywords || data.keywords_ar || '',
    keywords_en: data.keywords_en || '',
    desc: data.desc || data.desc_ar || data.description || '',
    desc_en: data.desc_en || data.description_en || '',
    favicon: data.favicon || '',
    logo: data.logo || data.logo_dark || '',
    logo_dark: data.logo_dark || data.logo || '',
    logo_light: data.logo_light || '',
    logo_en: data.logo_en || '',
    email: data.email || '',
    phone: data.phone || data.whatsapp || '',
    address: data.address || data.address_ar || '',
    address_en: data.address_en || '',
    reverse_navbar_ar: data.reverse_navbar_ar !== undefined ? data.reverse_navbar_ar : true,
    show_scroll_progress: data.show_scroll_progress === true,
    show_side_scrollbar: data.show_side_scrollbar === true,
  };
}

export async function uploadSingleFile(token: string, file: File): Promise<string> {
  const uploadData = new FormData();
  uploadData.append('file', file);
  const uploadRes = await uploadImage(token, uploadData);
  if (!uploadRes.success) throw new Error(uploadRes.error);
  return uploadRes.url || '';
}
