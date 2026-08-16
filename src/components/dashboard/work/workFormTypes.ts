export interface Skill {
  name: string;
  value: string;
}

export interface Stat {
  value: string;
  label: string;
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
