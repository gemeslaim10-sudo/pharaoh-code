'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useMobileNavItems } from './mobile-nav/useMobileNavItems';
import { MobileBottomNavItem } from './mobile-nav/MobileBottomNavItem';
import { MobileBottomCenterButton } from './mobile-nav/MobileBottomCenterButton';

interface MobileBottomNavProps {
  whatsappNumber?: string;
  logoUrl?: string;
  logoLightUrl?: string;
}

export default function MobileBottomNav({
  whatsappNumber = '+201000000000',
  logoUrl,
  logoLightUrl,
}: MobileBottomNavProps) {
  const { direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  // Theme-aware dynamic logo selection with reciprocal fallback
  const activeLogo = isLight ? (logoLightUrl || logoUrl || '') : (logoUrl || logoLightUrl || '');

  const { homeItem, servicesItem, portfolioItem, whatsappItem, language } = useMobileNavItems(whatsappNumber);

  return (
    <div
      dir={direction}
      className="md:hidden fixed bottom-0 inset-x-0 z-[80] select-none pointer-events-auto pb-[env(safe-area-inset-bottom,0px)]"
    >
      {/* Dock Bar Container */}
      <nav
        aria-label="Mobile Navigation"
        className={`relative flex items-center justify-around px-2 h-[68px] transition-all duration-300 border-t ${
          isLight
            ? 'bg-white/97 backdrop-blur-3xl border-slate-200/80 shadow-[0_-12px_40px_rgba(0,0,0,0.08),0_-2px_8px_rgba(0,0,0,0.04)]'
            : 'bg-[#05101E]/97 backdrop-blur-3xl border-[#C5A16F]/15 shadow-[0_-12px_50px_rgba(0,0,0,0.85),0_-2px_8px_rgba(197,161,111,0.06)]'
        }`}
      >
        {/* Top gold accent shimmer line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F]/70 to-transparent pointer-events-none" />

        {/* 1. First Item: Home */}
        <MobileBottomNavItem item={homeItem} isLight={isLight} />

        {/* 2. Second Item: Services */}
        <MobileBottomNavItem item={servicesItem} isLight={isLight} />

        {/* 3. Center Elevated Dynamic Logo Button */}
        <MobileBottomCenterButton
          activeLogo={activeLogo}
          isLight={isLight}
          language={language}
        />

        {/* 4. Fourth Item: Portfolio */}
        <MobileBottomNavItem item={portfolioItem} isLight={isLight} />

        {/* 5. Fifth Item: WhatsApp Quick Action */}
        <MobileBottomNavItem item={whatsappItem} isLight={isLight} />
      </nav>
    </div>
  );
}
