"use client";

import Link from "next/link";
import { useDashboard } from "@/contexts/DashboardContext";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function DashboardHeader() {
  const { setSidebarOpen } = useDashboard();
  const { user } = useAuth();

  const userDisplayName = user?.displayName || user?.email?.split('@')[0] || "المسؤول";
  const userInitial = userDisplayName.charAt(0).toUpperCase() || "A";

  return (
    <header className="bg-white dark:bg-pharaohCard border-b border-slate-200 dark:border-pharaohGold/10 px-4 md:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm dark:shadow-lg transition-colors">
      <div className="flex items-center gap-3">
        <button 
          id="openSidebar"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar menu"
          className="lg:hidden text-slate-800 dark:text-white bg-slate-100 dark:bg-[#0A192F] border border-slate-200 dark:border-pharaohGold/20 p-2.5 rounded-xl hover:text-pharaohGold transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-gradient-to-br dark:from-[#C5A16F]/20 dark:to-[#C5A16F]/5 border border-amber-500/30 dark:border-[#C5A16F]/30 flex items-center justify-center text-amber-800 dark:text-[#C5A16F] shadow-sm">
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-base md:text-lg font-black text-slate-900 dark:text-white">
            لوحة التحكم والإدارة
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* 1. Theme Switcher in Dashboard */}
        <ThemeSwitcher className="!w-9 !h-9 !rounded-xl" />

        {/* 2. Language Switcher in Dashboard */}
        <LanguageSwitcher iconOnly={true} className="!h-9 !rounded-xl" />

        {/* 3. View Public Website Button */}
        <Link
          href="/"
          title="معاينة الموقع العام"
          className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:text-pharaohGold hover:border-pharaohGold/40 flex items-center justify-center transition-all shadow-sm group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>

        {/* 4. Logged-in Admin User Profile */}
        <div className="flex items-center gap-2.5 pl-1 border-r border-slate-200 dark:border-white/10 pr-2 sm:pr-3">
          <div className="text-left hidden md:block">
            <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-gray-400 font-semibold leading-none mb-1">
              <svg className="w-3 h-3 text-amber-700 dark:text-[#C5A16F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>مدير النظام</span>
            </div>
            <p className="text-xs font-bold text-amber-800 dark:text-pharaohGold leading-none max-w-[120px] truncate">{userDisplayName}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#0A192F] border border-amber-500/40 dark:border-pharaohGold/30 overflow-hidden flex items-center justify-center font-bold text-amber-800 dark:text-pharaohGold text-xs shadow-md shrink-0">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={userDisplayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <span>{userInitial}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
