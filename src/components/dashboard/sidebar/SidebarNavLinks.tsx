'use client';

import Link from 'next/link';
import { DASHBOARD_LINKS } from './dashboardNavItems';

interface SidebarNavLinksProps {
  onNavigate: () => void;
}

export default function SidebarNavLinks({ onNavigate }: SidebarNavLinksProps) {
  return (
    <nav className="p-4 space-y-2 flex-1 overflow-y-auto custom-scrollbar">
      {DASHBOARD_LINKS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className="flex items-center gap-4 px-4 py-3.5 bg-slate-100/90 dark:bg-[#112240] text-amber-900 dark:text-pharaohGold rounded-xl font-bold text-sm border border-slate-200 dark:border-pharaohGold/20 hover:border-pharaohGold/60 hover:bg-amber-500/10 dark:hover:bg-[#15274d] transition-all shadow-xs"
        >
          {item.icon}
          {item.label}
        </Link>
      ))}

      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-4 px-4 py-3.5 bg-amber-500/10 dark:bg-pharaohGold/10 text-amber-900 dark:text-white rounded-xl font-bold text-sm border border-amber-600/40 dark:border-pharaohGold hover:bg-pharaohGold hover:text-[#0A192F] transition-all mt-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        العودة للموقع
      </Link>
    </nav>
  );
}
