import { SectionItem } from '@/types';

export function stripSvgColors(svg: string): string {
  if (!svg) return '';
  return svg
    .replace(/\s*(?:group-hover:|group-active:)?text-\[#[^\]]+\]/g, '')
    .replace(/\s*(?:group-hover:|group-active:)?stroke-\[#[^\]]+\]/g, '')
    .replace(/stroke="#[a-fA-F0-9]{3,6}"/g, 'stroke="currentColor"')
    .replace(/fill="#[a-fA-F0-9]{3,6}"/g, 'fill="currentColor"')
    .replace(/stroke:#[a-fA-F0-9]{3,6}/g, 'stroke:currentColor')
    .replace(/fill:#[a-fA-F0-9]{3,6}/g, 'fill:currentColor');
}

export const PILLAR_METRICS = [
  { metric: '100%', labelAr: 'دقة هندسية', labelEn: 'Precision' },
  { metric: '0.1s', labelAr: 'استجابة فائقة', labelEn: 'Ultra Speed' },
  { metric: '24/7', labelAr: 'استقرار سيادي', labelEn: 'Availability' },
  { metric: 'A+', labelAr: 'معايير أمان', labelEn: 'Security Grade' },
];

export const FALLBACK_CREATIVE: SectionItem[] = [
  {
    title: 'هندسة معمارية نظيفة',
    title_en: 'Clean Architecture',
    description: 'بناء معمارية برمجية صلبة ومرنة تضمن أعلى مستويات الأمان وسهولة التوسع المستقبلي.',
    description_en: 'Building resilient software architecture ensuring supreme security and effortless scalability.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>`
  },
  {
    title: 'تجربة مستخدم استثنائية',
    title_en: 'Exceptional UX',
    description: 'تصميم تجارب رقمية فاخرة وسلسة تحول زوار منصتك إلى عملاء دائمين.',
    description_en: 'Designing bespoke digital journeys that turn platform visitors into loyal partners.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>`
  },
  {
    title: 'أداء فائق واستقرار سيادي',
    title_en: 'Sovereign Performance',
    description: 'تحسين سرعة الاستجابة بأحدث تقنيات الـ Edge لضمان التواجد المستمر على مدار الساعة.',
    description_en: 'Optimizing response speed with edge tech to ensure 24/7 sovereign availability.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>`
  }
];
