import { SafeSvg } from '@/components/common/SafeSvg';
import { isMediaUrl, stripSvgColors } from '@/lib/svgHelper';

interface SmartIconProps {
  /** Either inline <svg> markup or an uploaded image URL (Cloudinary / local / data URI). */
  value: unknown;
  className?: string;
  imgClassName?: string;
  alt?: string;
  /** Strip hardcoded colors from inline SVG so it inherits currentColor. */
  inheritColor?: boolean;
  as?: 'div' | 'span';
}

/**
 * Renders a CMS icon regardless of how the admin provided it:
 * an uploaded image (preferred) or legacy inline SVG markup.
 */
export function SmartIcon({ value, className, imgClassName, alt = '', inheritColor = false, as: Tag = 'div' }: SmartIconProps) {
  if (isMediaUrl(value)) {
    return (
      <Tag className={className}>
        <img src={value} alt={alt} loading="lazy" className={imgClassName || 'w-full h-full object-contain'} />
      </Tag>
    );
  }
  const markup = typeof value === 'string' && inheritColor ? stripSvgColors(value) : value;
  return <SafeSvg as={Tag} {...(className ? { className } : {})} markup={markup} />;
}
