'use client';

import Link from "next/link";

interface SidebarNavLinksProps {
    onNavigate: () => void;
}

export default function SidebarNavLinks({ onNavigate }: SidebarNavLinksProps) {
    return (
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto custom-scrollbar">
            <Link
              href="/dashboard"
              onClick={onNavigate}
              className="flex items-center gap-4 px-4 py-3.5 bg-[#112240] text-pharaohGold rounded-xl font-bold text-sm border border-pharaohGold/20 hover:border-pharaohGold/50 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house">
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              لوحة التحكم العام
            </Link>

            <Link
              href="/dashboard/project"
              onClick={onNavigate}
              className="flex items-center gap-4 px-4 py-3.5 bg-[#112240] text-pharaohGold rounded-xl font-bold text-sm border border-pharaohGold/20 hover:border-pharaohGold/50 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder-kanban">
                <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                <path d="M8 10v4" />
                <path d="M12 10v2" />
                <path d="M16 10v6" />
              </svg>
              طلبات المشاريع
            </Link>

            <Link
              href="/dashboard/creativity"
              onClick={onNavigate}
              className="flex items-center gap-4 px-4 py-3.5 bg-[#112240] text-pharaohGold rounded-xl font-bold text-sm border border-pharaohGold/20 hover:border-pharaohGold/50 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase-business">
                <path d="M12 12h.01" />
                <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <path d="M22 13a18.15 18.15 0 0 1-20 0" />
                <rect width="20" height="14" x="2" y="6" rx="2" />
              </svg>
              الأعمال
            </Link>

            <Link
              href="/dashboard/work"
              onClick={onNavigate}
              className="flex items-center gap-4 px-4 py-3.5 bg-[#112240] text-pharaohGold rounded-xl font-bold text-sm border border-pharaohGold/20 hover:border-pharaohGold/50 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
              فريق العمل
            </Link>

            <Link
              href="/dashboard/services-management"
              onClick={onNavigate}
              className="flex items-center gap-4 px-4 py-3.5 bg-[#112240] text-pharaohGold rounded-xl font-bold text-sm border border-pharaohGold/20 hover:border-pharaohGold/50 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-card-sim">
                <path d="M12 14v4" />
                <path d="M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                <path d="M8 14h8" />
                <rect x="8" y="10" width="8" height="8" rx="1" />
              </svg>
              الخدمات
            </Link>

            <Link
              href="/dashboard/clients"
              onClick={onNavigate}
              className="flex items-center gap-4 px-4 py-3.5 bg-[#112240] text-pharaohGold rounded-xl font-bold text-sm border border-pharaohGold/20 hover:border-pharaohGold/50 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-handshake">
                <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4-4a1 1 0 0 0 0-1.4l-2-2" />
                <path d="m18 10.1 2.9-2.9a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0L13.6 5.7" />
                <path d="m15 13-3-3" />
                <path d="m9.3 7.3 3 3" />
                <path d="M14 5.4 12.1 3.5a1 1 0 0 0-1.4 0l-4 4a1 1 0 0 0 0 1.4l2 2" />
                <path d="m8.9 13.9-2.9 2.9a1 1 0 0 0 0 1.4l3 3a1 1 0 0 0 1.4 0l2.9-2.9" />
              </svg>
              الشركاء والعملاء
            </Link>

            <Link
              href="/dashboard/settings"
              onClick={onNavigate}
              className="flex items-center gap-4 px-4 py-3.5 bg-[#112240] text-pharaohGold rounded-xl font-bold text-sm border border-pharaohGold/20 hover:border-pharaohGold/50 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings">
                <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              إعدادات المنصة
            </Link>

            <Link
              href="/"
              onClick={onNavigate}
              className="flex items-center gap-4 px-4 py-3.5 bg-pharaohGold/10 text-white rounded-xl font-bold text-sm border border-pharaohGold hover:bg-pharaohGold hover:text-[#0A192F] transition-all mt-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              العودة للموقع
            </Link>
        </nav>
    );
}
