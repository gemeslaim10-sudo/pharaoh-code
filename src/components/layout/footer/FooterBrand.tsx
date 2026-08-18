'use client';

import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { FooterSocialButtons, FooterSocialLinks } from './FooterSocialButtons';

interface FooterBrandProps {
  siteName?: string;
  activeLogo?: string;
  socialLinks?: FooterSocialLinks;
}

export function FooterBrand({
  siteName = 'PHARAOH CODE',
  activeLogo,
  socialLinks = { fb: '#', wa: '#', ig: '#' },
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
            <span className="text-[#C5A16F] text-2xl">𓂀</span>
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
