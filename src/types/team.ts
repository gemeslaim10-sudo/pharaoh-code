export interface Skill {
  name: string;
  name_ar?: string;
  name_en?: string;
  value: string;
}

export interface Stat {
  value: string;
  label: string;
  label_ar?: string;
  label_en?: string;
}

export interface TeamMember {
  id: string;
  name?: string;
  name_ar?: string;
  name_en?: string;
  role?: string;
  role_ar?: string;
  role_en?: string;
  image?: string;
  description?: string;
  description_ar?: string;
  description_en?: string;
  skills?: Skill[];
  stats?: Stat[];
  social?: {
    facebook?: string;
    instagram?: string;
    [key: string]: string | undefined;
  };
  [key: string]: any;
}

export interface TeamMemberData {
  id?: string;
  name?: string;
  name_en?: string;
  role?: string;
  role_en?: string;
  description?: string;
  description_en?: string;
  image?: string;
  imageUrl?: string;
  skills?: Array<{ name: string; level?: number; percentage?: number } | string>;
  stats?: Array<{ label: string; value: string | number; label_en?: string }>;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    email?: string;
  };
}
