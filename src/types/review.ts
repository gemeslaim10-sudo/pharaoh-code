export interface ReviewItem {
  id?: string;
  name: string;
  phone?: string;
  email?: string;
  initials?: string;
  text: string;
  date?: string;
  status: 'pending' | 'approved' | 'rejected' | string;
  createdAt?: string;
  [key: string]: any;
}

export interface TestimonialItem {
  id?: string;
  name?: string;
  name_en?: string;
  role?: string;
  role_en?: string;
  company?: string;
  rating?: number | string;
  content?: string;
  content_en?: string;
  text?: string;
  imageUrl?: string;
  image?: string;
  avatar?: string;
  verified?: boolean;
  [key: string]: any;
}
