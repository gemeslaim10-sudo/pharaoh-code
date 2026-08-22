'use client';

import Link from 'next/link';

interface NavItem {
  href: string;
  label: string;
}

interface NavbarDesktopNavProps {
  navLinks: NavItem[];
  pathname: string;
}

export function NavbarDesktopNav({ navLinks, pathname }: NavbarDesktopNavProps) {
  return (
    <div className="hidden lg:flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-2 py-1.5 backdrop-blur-sm shadow-inner">
      {navLinks.map(({ href, label }) => {
        const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`
              relative px-3.5 py-2 rounded-xl text-[13px] font-semibold
              transition-all duration-300 group/link
              ${isActive
                ? "text-[#C5A16F] bg-[#C5A16F]/10"
                : "text-white/70 hover:text-white hover:bg-white/[0.06]"
              }
            `}
          >
            {/* Active indicator dot */}
            {isActive && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C5A16F] shadow-[0_0_6px_#C5A16F]" />
            )}
            {label}
          </Link>
        );
      })}
    </div>
  );
}
