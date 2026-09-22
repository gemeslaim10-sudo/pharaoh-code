'use client';

import { type HomeSectionHeaderContent } from '@/types/homeContent';
import { BilingualField, HomeContentCard } from './HomeContentFields';

export interface HeaderCardPlaceholders {
  subtitleAr?: string;
  subtitleEn?: string;
  titlePart1Ar?: string;
  titlePart1En?: string;
  titlePart2Ar?: string;
  titlePart2En?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  linkTextAr?: string;
  linkTextEn?: string;
}

interface HomeContentHeaderCardProps {
  icon: string;
  title: string;
  description: string;
  /** Current values; `linkText_*` is only read when `withLink` is true. */
  value: HomeSectionHeaderContent & { linkText_ar?: string; linkText_en?: string };
  onChange: (field: string, value: string) => void;
  /** Show the "view all" button label fields. */
  withLink?: boolean;
  placeholders?: HeaderCardPlaceholders;
}

/**
 * Editor card for a home section header: badge subtitle, split title
 * (white part + gold italic part), paragraph, and optionally the CTA label.
 */
export function HomeContentHeaderCard({
  icon,
  title,
  description,
  value,
  onChange,
  withLink = false,
  placeholders = {},
}: HomeContentHeaderCardProps) {
  return (
    <HomeContentCard icon={icon} title={title} description={description}>
      <BilingualField
        labelAr="الشارة العلوية / العنوان الفرعي (عربي)"
        labelEn="Badge / Subtitle (English)"
        valueAr={value.subtitle_ar || ''}
        valueEn={value.subtitle_en || ''}
        onChangeAr={v => onChange('subtitle_ar', v)}
        onChangeEn={v => onChange('subtitle_en', v)}
        {...(placeholders.subtitleAr ? { placeholderAr: placeholders.subtitleAr } : {})}
        {...(placeholders.subtitleEn ? { placeholderEn: placeholders.subtitleEn } : {})}
      />

      <BilingualField
        labelAr="العنوان — الجزء الأبيض (عربي)"
        labelEn="Title Part 1 — White (English)"
        valueAr={value.titlePart1_ar || ''}
        valueEn={value.titlePart1_en || ''}
        onChangeAr={v => onChange('titlePart1_ar', v)}
        onChangeEn={v => onChange('titlePart1_en', v)}
        {...(placeholders.titlePart1Ar ? { placeholderAr: placeholders.titlePart1Ar } : {})}
        {...(placeholders.titlePart1En ? { placeholderEn: placeholders.titlePart1En } : {})}
      />

      <BilingualField
        labelAr="العنوان — الجزء الذهبي المائل (عربي)"
        labelEn="Title Part 2 — Gold Italic (English)"
        valueAr={value.titlePart2_ar || ''}
        valueEn={value.titlePart2_en || ''}
        onChangeAr={v => onChange('titlePart2_ar', v)}
        onChangeEn={v => onChange('titlePart2_en', v)}
        {...(placeholders.titlePart2Ar ? { placeholderAr: placeholders.titlePart2Ar } : {})}
        {...(placeholders.titlePart2En ? { placeholderEn: placeholders.titlePart2En } : {})}
      />

      <BilingualField
        multiline
        rows={3}
        labelAr="الفقرة التعريفية للقسم (عربي)"
        labelEn="Section Description (English)"
        valueAr={value.description_ar || ''}
        valueEn={value.description_en || ''}
        onChangeAr={v => onChange('description_ar', v)}
        onChangeEn={v => onChange('description_en', v)}
        {...(placeholders.descriptionAr ? { placeholderAr: placeholders.descriptionAr } : {})}
        {...(placeholders.descriptionEn ? { placeholderEn: placeholders.descriptionEn } : {})}
      />

      {withLink && (
        <BilingualField
          labelAr="نص زر (عرض الكل) (عربي)"
          labelEn="View All Button Text (English)"
          valueAr={value.linkText_ar || ''}
          valueEn={value.linkText_en || ''}
          onChangeAr={v => onChange('linkText_ar', v)}
          onChangeEn={v => onChange('linkText_en', v)}
          {...(placeholders.linkTextAr ? { placeholderAr: placeholders.linkTextAr } : {})}
          {...(placeholders.linkTextEn ? { placeholderEn: placeholders.linkTextEn } : {})}
        />
      )}
    </HomeContentCard>
  );
}
