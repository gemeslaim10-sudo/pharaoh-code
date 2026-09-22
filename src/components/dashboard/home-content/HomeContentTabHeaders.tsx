'use client';

import { type HomeContentData } from '@/types/homeContent';
import { HomeContentHeaderCard } from './HomeContentHeaderCard';
import { FallbackNote } from './HomeContentFields';

interface HomeContentTabHeadersProps {
  form: HomeContentData;
  setForm: React.Dispatch<React.SetStateAction<HomeContentData>>;
}

type HeaderSectionKey = 'portfolio' | 'services' | 'clients' | 'creative' | 'workflow' | 'team' | 'testimonials';

export function HomeContentTabHeaders({ form, setForm }: HomeContentTabHeadersProps) {
  const updateSection = (section: HeaderSectionKey) => (field: string, value: string) => {
    setForm(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  return (
    <div className="space-y-6">
      <FallbackNote />

      <HomeContentHeaderCard
        icon="🗂️"
        title="قسم معرض الأعمال (Portfolio)"
        description="عناوين ووصف قسم المشاريع. المشاريع نفسها بتتدار من صفحة (الأعمال)."
        value={form.portfolio}
        onChange={updateSection('portfolio')}
        withLink
        placeholders={{
          subtitleAr: 'نماذج واقعية من مشاريع أطلقناها بمقاييس عالمية',
          subtitleEn: 'Real-world blueprints delivered with world-class metrics',
          titlePart1Ar: 'معرض',
          titlePart1En: 'Our',
          titlePart2Ar: 'أعمالنا',
          titlePart2En: 'Portfolio',
          descriptionAr: 'معرض يضم أبرز مشاريعنا وحلولنا البرمجية المبتكرة ذات الأثر الملموس.',
          descriptionEn: 'A showcase of our premier digital architectures and high-impact solutions.',
          linkTextAr: 'عرض كافة الأعمال',
          linkTextEn: 'View Full Portfolio',
        }}
      />

      <HomeContentHeaderCard
        icon="🧰"
        title="قسم الخدمات (Services)"
        description="عناوين ووصف قسم الخدمات. كروت الخدمات نفسها بتتدار من صفحة (الخدمات)."
        value={form.services}
        onChange={updateSection('services')}
        withLink
        placeholders={{
          subtitleAr: 'من بناء الأساسات حتى القمة، نوفر كل ما يحتاجه مشروعك',
          subtitleEn: 'From foundation stones to apex summit',
          titlePart1Ar: 'حلولنا',
          titlePart1En: 'Software',
          titlePart2Ar: 'البرمجية',
          titlePart2En: 'Solutions',
          descriptionAr: 'حزمة متكاملة من الحلول البرمجية السيادية المطورة بأعلى معايير الدقة.',
          descriptionEn: 'A sovereign suite of full-cycle software architectures.',
          linkTextAr: 'عرض كافة الخدمات',
          linkTextEn: 'View All Services',
        }}
      />

      <HomeContentHeaderCard
        icon="🤝"
        title="قسم الشركاء والعملاء (Clients)"
        description="عناوين ووصف قسم الشركاء. بيانات الشركاء بتتدار من صفحة (الشركاء والعملاء)."
        value={form.clients}
        onChange={updateSection('clients')}
        withLink
        placeholders={{
          subtitleAr: 'شركاء النجاح',
          subtitleEn: 'Our Partners',
          titlePart1Ar: 'عملاؤنا',
          titlePart1En: 'Our',
          titlePart2Ar: 'المميزون',
          titlePart2En: 'Clients',
          descriptionAr: 'شركاء النجاح الذين وضعوا ثقتهم في حلولنا الرقمية والهندسية المتطورة.',
          descriptionEn: 'Visionary partners who trust our high-performance software solutions.',
          linkTextAr: 'عرض كافة الشركاء',
          linkTextEn: 'View All Partners',
        }}
      />

      <HomeContentHeaderCard
        icon="💎"
        title="قسم فلسفة الإبداع (Creative)"
        description="عناوين ووصف قسم الفلسفة. الركائز نفسها بتتدار من صفحة (من نحن) ← فلسفة التشييد."
        value={form.creative}
        onChange={updateSection('creative')}
        placeholders={{
          subtitleAr: 'فلسفة التشييد الرقمي',
          subtitleEn: 'Digital Craftsmanship',
          titlePart1Ar: 'نحن لا نكتب كوداً..',
          titlePart1En: 'We Don\'t Just Code..',
          titlePart2Ar: 'بل نهندس إرثاً',
          titlePart2En: 'We Engineer Legacy',
          descriptionAr: 'فلسفتنا لا تقتصر على كتابة الأكواد، بل تقوم على هندسة حلول مستدامة.',
          descriptionEn: 'Our philosophy extends beyond clean code to timeless digital ecosystems.',
        }}
      />

      <HomeContentHeaderCard
        icon="⚙️"
        title="قسم منهجية العمل (Workflow)"
        description="عناوين ووصف قسم خطوات العمل. الخطوات نفسها في تبويب (خطوات المنهجية)."
        value={form.workflow}
        onChange={updateSection('workflow')}
        placeholders={{
          subtitleAr: 'منهجية دقيقة من الفكرة للإطلاق',
          subtitleEn: 'A refined idea-to-launch methodology',
          titlePart1Ar: 'منهجية',
          titlePart1En: 'Our',
          titlePart2Ar: 'العمل',
          titlePart2En: 'Methodology',
          descriptionAr: 'منهجية دقيقة ومحكمة تقود مشروعك من الفكرة المجردة إلى إطلاق سيادي متكامل.',
          descriptionEn: 'A refined methodology that transforms your vision into a sovereign reality.',
        }}
      />

      <HomeContentHeaderCard
        icon="👥"
        title="قسم فريق العمل (Team)"
        description="عناوين ووصف قسم الفريق. أعضاء الفريق بيتداروا من صفحة (فريق العمل)."
        value={form.team}
        onChange={updateSection('team')}
        withLink
        placeholders={{
          subtitleAr: 'العقول خلف المشاريع',
          subtitleEn: 'The Minds Behind The Work',
          titlePart1Ar: 'فريق',
          titlePart1En: 'Our',
          titlePart2Ar: 'العمل',
          titlePart2En: 'Team',
          descriptionAr: 'نخبة من المهندسين والمطورين المبدعين في صناعة البرمجيات.',
          descriptionEn: 'Elite engineers and digital architects dedicated to software craftsmanship.',
          linkTextAr: 'استعرض كافة الفريق',
          linkTextEn: 'View Full Team',
        }}
      />

      <HomeContentHeaderCard
        icon="⭐"
        title="قسم آراء العملاء (Testimonials)"
        description="عناوين ووصف قسم الشهادات. الآراء نفسها بتتعرض من التقييمات المعتمدة."
        value={form.testimonials}
        onChange={updateSection('testimonials')}
        placeholders={{
          subtitleAr: 'شهادات شركاء النجاح',
          subtitleEn: 'Client Testimonials',
          titlePart1Ar: 'قالوا',
          titlePart1En: 'What They',
          titlePart2Ar: 'عنا',
          titlePart2En: 'Say About Us',
          descriptionAr: 'شهادات حقيقية من قادة الأعمال والشركات التي وثقت بنا لتحقيق تحولها الرقمي.',
          descriptionEn: 'Authentic testimonials from industry leaders who partnered with us.',
        }}
      />
    </div>
  );
}
