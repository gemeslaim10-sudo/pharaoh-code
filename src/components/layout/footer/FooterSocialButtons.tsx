'use client';

import { FooterSocialLinks, SocialPlatform } from '@/types/settings';
import { DynamicSocialIcon } from '@/components/common/DynamicSocialIcon';

interface FooterSocialButtonsProps {
  socialLinks?: FooterSocialLinks;
  baseBtnClass: string;
}

export function FooterSocialButtons({
  socialLinks,
  baseBtnClass,
}: FooterSocialButtonsProps) {
  const platforms: SocialPlatform[] = Array.isArray(socialLinks?.items) ? socialLinks.items : [];

  if (platforms.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      {platforms.map((platform) => {
        const isWhatsapp = (platform.name?.toLowerCase().includes('whatsapp') || platform.icon === 'whatsapp');
        let link = platform.url;
        if (isWhatsapp && !link.startsWith('http')) {
          link = `https://wa.me/${link.replace(/[^0-9]/g, '')}`;
        }

        const brandColor = platform.color || '#C5A16F';

        return (
          <a
            key={platform.id}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            title={platform.name}
            aria-label={platform.name}
            data-social-name={platform.name}
            className={`footer-social-btn group relative w-11 h-11 border rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5 active:scale-95 hover:text-white ${baseBtnClass}`}
            style={{
              // Custom CSS hover style variable
              ['--hover-color' as string]: brandColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = brandColor;
              e.currentTarget.style.borderColor = brandColor;
              e.currentTarget.style.boxShadow = `0 8px 20px ${brandColor}44`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '';
              e.currentTarget.style.borderColor = '';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            <DynamicSocialIcon
              name={platform.name}
              icon={platform.icon}
              iconSvg={platform.iconSvg}
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
            />
          </a>
        );
      })}
    </div>
  );
}

export default FooterSocialButtons;
