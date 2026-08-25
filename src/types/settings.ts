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

export interface SocialPlatform {
  id: string;
  name: string;
  name_ar?: string | undefined;
  name_en?: string | undefined;
  url: string;
  icon?: string | undefined; // Image URL or preset name
  iconSvg?: string | undefined; // Custom SVG string
  color?: string | undefined; // Custom accent/brand color (e.g. #1877F2)
  order?: number | undefined;
  createdAt?: any;
  updatedAt?: any;
}

export interface SocialSettings {
  items?: SocialPlatform[];
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
  items?: SocialPlatform[];
  fb?: string;
  wa?: string;
  ig?: string;
  x?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  telegram?: string;
  [key: string]: any;
}

export interface SystemStatusSettings {
  mode: 'on' | 'off' | string;
  message: string;
  updatedAt?: any;
}
