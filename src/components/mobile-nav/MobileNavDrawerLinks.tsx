'use client';

import Link from 'next/link';

export interface MobileNavItem {
  href: string;
  labelAr: string;
  labelEn: string;
  icon: string;
}

export const ROOT_MOBILE_NAV_LINKS: MobileNavItem[] = [
  { href: "/", labelAr: "الرئيسية", labelEn: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { href: "/about", labelAr: "من نحن", labelEn: "About", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { href: "/services", labelAr: "الخدمات", labelEn: "Services", icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" },
  { href: "/portfolio", labelAr: "الأعمال", labelEn: "Portfolio", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { href: "/team", labelAr: "فريق العمل", labelEn: "Team", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { href: "/clients", labelAr: "العملاء", labelEn: "Clients", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { href: "/contact", labelAr: "تواصل معنا", labelEn: "Contact", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
];

interface MobileNavDrawerLinksProps {
  pathname: string;
  language: string;
  direction: 'rtl' | 'ltr';
  onClose: () => void;
}

export function MobileNavDrawerLinks({ pathname, language, direction, onClose }: MobileNavDrawerLinksProps) {
  return (
    <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
      {ROOT_MOBILE_NAV_LINKS.map(({ href, labelAr, labelEn, icon }, idx) => {
        const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
        const label = language === 'ar' ? labelAr : labelEn;
        return (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            style={{ animationDelay: `${idx * 40}ms` }}
            className={`
              group/link flex items-center gap-3.5 px-4 py-3.5 rounded-2xl
              transition-all duration-300 relative overflow-hidden
              ${isActive
                ? "bg-[#C5A16F]/12 border border-[#C5A16F]/25 text-[#C5A16F] shadow-[0_0_14px_rgba(197,161,111,0.1)]"
                : "border border-transparent text-white/70 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.07]"
              }
            `}
          >
            {/* Active glow bar */}
            {isActive && (
              <span className={`absolute inset-y-0 w-0.5 rounded-full bg-gradient-to-b from-[#C5A16F]/80 to-[#C5A16F]/20 shadow-[0_0_8px_#C5A16F] ${direction === 'rtl' ? 'right-0' : 'left-0'}`} />
            )}

            {/* Icon box */}
            <div className={`
              w-8.5 h-8.5 rounded-xl flex items-center justify-center shrink-0
              transition-all duration-300
              ${isActive
                ? "bg-[#C5A16F]/20 text-[#C5A16F]"
                : "bg-white/[0.05] text-white/40 group-hover/link:bg-white/[0.08] group-hover/link:text-white/80"
              }
            `}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d={icon} />
              </svg>
            </div>

            <span className="font-bold text-[15px] flex-1">{label}</span>

            {/* Arrow */}
            <svg
              className={`w-3.5 h-3.5 shrink-0 opacity-0 group-hover/link:opacity-100 transition-all duration-300 ${direction === 'rtl' ? 'rotate-180' : ''} ${isActive ? 'opacity-60' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        );
      })}
    </nav>
  );
}
