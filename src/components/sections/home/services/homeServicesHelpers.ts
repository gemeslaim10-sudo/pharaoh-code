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

export const TECH_TAGS: Record<number, string[]> = {
  0: ['Enterprise Cloud', 'Custom API', 'High Scale'],
  1: ['iOS Native', 'Android Native', 'Flutter'],
  2: ['Next.js 15', 'Full-Stack', 'SSR & Edge'],
  3: ['UI / UX', 'Design System', 'Figma Mastery'],
  4: ['AI Automation', 'LLM Models', 'Smart Workflows'],
  5: ['Cyber Security', 'Pen Testing', 'Zero Trust'],
  6: ['DevOps', 'Kubernetes', 'CI / CD Pipelines'],
  7: ['Growth SEO', 'Performance', 'Rank #1'],
};

export const FALLBACK_SERVICES: SectionItem[] = [
  {
    title: 'تطوير البرمجيات والأنظمة',
    title_en: 'Enterprise Software Engineering',
    description: 'بناء أنظمة برمجية سحابية مخصصة ومصممة بأعلى معايير الأداء وقابلية التوسع.',
    description_en: 'Custom cloud software architectures engineered for extreme scale and performance.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`
  },
  {
    title: 'تطبيقات الهواتف الذكية',
    title_en: 'Mobile Applications',
    description: 'تطبيقات أصلية فائقة السرعة على منصات iOS و Android بأحدث التقنيات العالمية.',
    description_en: 'High-performance native apps for iOS & Android built with cutting-edge tech.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>`
  },
  {
    title: 'تطوير مواقع الويب الحديثة',
    title_en: 'Modern Web Platforms',
    description: 'واجهات وتطبيقات ويب سريعة جداً مبنية بأحدث معمارية Next.js والـ Edge Computing.',
    description_en: 'Blazing fast web platforms powered by Next.js and modern Edge architectures.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>`
  },
  {
    title: 'تصميم تجربة المستخدم UI/UX',
    title_en: 'UI / UX Design Systems',
    description: 'تصاميم فريدة وفاخرة تواكب أعلى معايير الجاذبية والسهولة لزيادة التفاعل.',
    description_en: 'Bespoke, luxury user experiences and atomic design systems that drive engagement.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>`
  }
];
