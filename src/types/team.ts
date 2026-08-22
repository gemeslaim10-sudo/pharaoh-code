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
