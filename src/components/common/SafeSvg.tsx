import { sanitizeSvg } from '@/lib/sanitizeSvg';

interface SafeSvgProps {
  markup: unknown;
  className?: string;
  as?: 'div' | 'span';
}

export function SafeSvg({ markup, className, as: Tag = 'div' }: SafeSvgProps) {
  return (
    <Tag
      className={className}
      // Only this boundary may insert markup; all callers pass through DOMPurify.
       
      dangerouslySetInnerHTML={{ __html: sanitizeSvg(markup) }}
    />
  );
}
