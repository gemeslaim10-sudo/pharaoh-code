'use client';

import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { FooterSocialButtons } from './FooterSocialButtons';
import { FooterSocialLinks } from '@/types/settings';

interface FooterBrandProps {
  siteName?: string;
  activeLogo?: string;
  socialLinks?: FooterSocialLinks;
}

export function FooterBrand({
  siteName = 'PHARAOH CODE',
  activeLogo,
  socialLinks = { items: [] },
}: FooterBrandProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const nameParts = siteName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');

  const baseBtnClass = isLight
    ? "bg-white border-slate-200/90 text-slate-600 shadow-sm shadow-slate-200/50"
    : "bg-[#091528]/90 border-white/10 text-gray-300 shadow-md shadow-black/20";

  return (
    <div className="lg:col-span-4 space-y-6">
      <Link href="/" className="inline-flex items-center gap-2 group">
        {activeLogo ? (
          <img src={activeLogo} alt={siteName} className="h-10 sm:h-12 w-auto object-contain drop-shadow-md py-1 transition-transform group-hover:scale-105" />
        ) : (
          <div className="flex items-center gap-2 text-2xl font-black tracking-tight">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#C5A16F] to-[#DFB77D] p-0.5 shadow-[0_0_10px_rgba(197,161,111,0.4)] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#050B14]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z"/>
              </svg>
            </div>
            <span className={isLight ? "text-slate-900" : "text-white"}>{firstWord}</span>
            {restWords && <span className="text-[#C5A16F]">{restWords}</span>}
          </div>
        )}
      </Link>

      <p className={`leading-relaxed text-sm max-w-sm font-light ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
        {t('footer.brandDesc')}
      </p>

      {/* Social Media Channels */}
      <FooterSocialButtons
        socialLinks={socialLinks}
        baseBtnClass={baseBtnClass}
      />
    </div>
  );
}
