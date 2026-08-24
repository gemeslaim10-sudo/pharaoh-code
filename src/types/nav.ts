import { ReactNode } from 'react';

export interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

export interface NavLinkItem {
  href: string;
  label: string;
  icon: string;
}

export interface NavItemData {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
  isActive: boolean;
  isWhatsApp?: boolean;
  icon: (active: boolean, isLight: boolean) => ReactNode;
}

export interface MobileNavItem {
  href: string;
  labelAr: string;
  labelEn: string;
  icon: string;
}
