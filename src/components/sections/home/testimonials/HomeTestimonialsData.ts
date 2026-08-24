export type { TestimonialItem } from '@/types/review';
import { TestimonialItem } from '@/types/review';



export const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'جمال سليم',
    name_en: 'Gamal Sellim',
    role: 'شريك نجاح | الرئيس التنفيذي',
    role_en: 'Success Partner | CEO',
    company: 'NextGen Solutions',
    rating: 5,
    content: 'من أفضل الفرق البرمجية التي تعاملت معها على المستوى الشخصي والمهني. دقة فائقة في المواعيد وكود نظيف بأعلى معايير الأمان وقابلية التوسع.',
    content_en: 'One of the finest software engineering teams I have collaborated with professionally. Unmatched precision, clean code, and sovereign security.',
    verified: true,
  },
  {
    name: 'م. أحمد خالد',
    name_en: 'Eng. Ahmed Khaled',
    role: 'مدير قطاع التكنولوجيا',
    role_en: 'Chief Technology Officer',
    company: 'Apex Cloud Systems',
    rating: 5,
    content: 'تم تسليم منصتنا السحابية قبل الموعد المحدد بأداء فائق وتصميم استثنائي. دعمهم الفني المستمر بعد الإطلاق جعلهم شريكاً استراتيجياً حقيقياً لأعمالنا.',
    content_en: 'Delivered our cloud platform ahead of schedule with lightning performance. Their dedicated post-launch support made them our true strategic partner.',
    verified: true,
  },
  {
    name: 'د. سارة المنصوري',
    name_en: 'Dr. Sara Al-Mansouri',
    role: 'مؤسس المنصة',
    role_en: 'Platform Founder',
    company: 'Visionary Retail Group',
    rating: 5,
    content: 'تجربة المستخدم التي صمموها لتطبيق الجوال ضاعفت معدل التحويل لدينا بشكل ملحوظ. اهتمامهم بالتفاصيل الدقيقة والجمالية هو ما يميزهم عن غيرهم.',
    content_en: 'The UX design they crafted for our mobile app significantly doubled our conversion rate. Their meticulous eye for luxury aesthetics sets them apart.',
    verified: true,
  }
];
