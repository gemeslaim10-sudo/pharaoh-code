'use client';

import FooterServices from './FooterServices';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { FooterBrand } from './footer/FooterBrand';
import { FooterQuickLinks } from './footer/FooterQuickLinks';
import { FooterNewsletter } from './footer/FooterNewsletter';
import { FooterBottomBar } from './footer/FooterBottomBar';

import { FooterSocialLinks } from '@/types/settings';

interface FooterProps {
  siteName?: string;
  siteNameAr?: string;
  siteNameEn?: string;
  logoUrl?: string;
  logoLightUrl?: string;
  socialLinks?: FooterSocialLinks;
}

export default function Footer({ 
  siteName = 'PHARAOH CODE',
  siteNameAr,
  siteNameEn,
  logoUrl,
  logoLightUrl,
  socialLinks = { items: [] }
}: FooterProps) {
  const { language, direction } = useTranslation();
  const { theme } = useTheme();
  const currentSiteName = language === 'en' ? (siteNameEn || siteName) : (siteNameAr || siteName);

  const nameParts = currentSiteName.split(' ');
  const firstWord = nameParts[0];
  const activeLogo = theme === 'light' ? (logoLightUrl || logoUrl || '') : (logoUrl || logoLightUrl || '');

  return (
    <footer 
      className="relative bg-[#040810] pt-16 sm:pt-24 pb-10 overflow-hidden border-t border-white/5 text-white select-none" 
      dir={direction}
    >
      {/* Background ambient gold & blue glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#C5A16F]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Cyber Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Giant Monumental Watermark Text */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full opacity-[0.02] pointer-events-none text-center select-none">
        <span className="text-[20vw] font-black text-[#C5A16F] uppercase tracking-[1.5rem] whitespace-nowrap">
          {firstWord}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          <FooterBrand siteName={currentSiteName} activeLogo={activeLogo} socialLinks={socialLinks} />
          <FooterQuickLinks />
          <div className="lg:col-span-3">
            <FooterServices />
          </div>
          <FooterNewsletter />
        </div>

        <FooterBottomBar siteName={currentSiteName} />
      </div>
    </footer>
  );
}
