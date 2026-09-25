'use client';

import { SmartIcon } from '@/components/common/SmartIcon';
import { type MemberLink } from '@/types/team';

interface TeamMemberLinkIconsProps {
  links?: MemberLink[] | undefined;
  isLight: boolean;
  /** `card` = small stacked badges over a team card, `detail` = row of larger buttons on the profile page. */
  variant?: 'card' | 'detail';
  /** Maximum icons to show (cards stay uncluttered). */
  max?: number;
  className?: string;
}

function hostLabel(url: string): string {
  try {
    const { protocol, hostname, pathname } = new URL(url);
    if (protocol === 'mailto:') return pathname;
    if (protocol === 'tel:') return pathname;
    return hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/** Renders a team member's custom links as clickable icons (opens the link in a new tab). */
export default function TeamMemberLinkIcons({
  links,
  isLight,
  variant = 'detail',
  max,
  className = '',
}: TeamMemberLinkIconsProps) {
  const items = (links || []).slice(0, max ?? links?.length ?? 0);
  if (items.length === 0) return null;

  const isCard = variant === 'card';

  return (
    <div className={`flex ${isCard ? 'flex-col gap-1.5' : 'flex-wrap gap-2.5'} ${className}`}>
      {items.map((link, i) => {
        const title = link.label || hostLabel(link.url);
        const external = /^https?:/i.test(link.url);
        return (
          <a
            key={`${link.url}-${i}`}
            href={link.url}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            title={title}
            aria-label={title}
            className={`flex items-center justify-center border transition-all duration-300 cursor-pointer shrink-0 ${
              isCard
                ? 'w-8 h-8 rounded-lg p-1.5 backdrop-blur-md shadow-md hover:scale-110'
                : 'w-11 h-11 rounded-xl p-2.5 shadow-sm hover:-translate-y-0.5'
            } ${
              isLight
                ? 'bg-white/95 border-[#8A5800]/30 text-[#8A5800] hover:border-[#8A5800] hover:shadow-[0_6px_16px_rgba(138,88,0,0.2)]'
                : 'bg-[#070F1E]/90 border-[#C5A16F]/35 text-[#C5A16F] hover:border-[#C5A16F] hover:bg-[#C5A16F]/15 hover:shadow-[0_0_16px_rgba(197,161,111,0.35)]'
            }`}
          >
            <SmartIcon
              value={link.icon}
              alt={title}
              inheritColor
              as="span"
              className="w-full h-full flex items-center justify-center [&_svg]:w-full [&_svg]:h-full"
            />
          </a>
        );
      })}
    </div>
  );
}
