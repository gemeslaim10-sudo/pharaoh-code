export interface IdentitySettings {
  logo?: string;
  siteName_ar?: string;
  siteName_en?: string;
  tagline_ar?: string;
  tagline_en?: string;
  phone?: string;
  email?: string;
  address_ar?: string;
  address_en?: string;
  [key: string]: any;
}

export interface SocialSettings {
  fb?: string;
  wa?: string;
  ig?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  x?: string;
  youtube?: string;
  tiktok?: string;
  telegram?: string;
  [key: string]: any;
}

export interface FooterSocialLinks {
  fb?: string;
  wa?: string;
  ig?: string;
  x?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  telegram?: string;
  [key: string]: string | undefined;
}

export interface SystemStatusSettings {
  mode: 'on' | 'off' | string;
  message: string;
  updatedAt?: any;
}
