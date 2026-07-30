"use client";

import { useDashboard } from "@/contexts/DashboardContext";

export default function DashboardHeader() {
  const { setSidebarOpen } = useDashboard();

  return (
    <header className="bg-pharaohCard border-b border-pharaohGold/10 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-lg">
      <div className="flex items-center gap-3">
        <button 
            id="openSidebar"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white bg-[#0A192F] border border-pharaohGold/20 p-2.5 rounded-xl hover:text-pharaohGold transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu w-5 h-5"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
        <div className="flex items-center gap-2">
            <h1 className="text-base md:text-xl font-black text-white flex items-center gap-2">
                <span className="text-pharaohGold animate-pulse">⚡</span>
                Pharaoh <span className="text-pharaohGold">Code</span>
            </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-left hidden sm:block">
          <p className="text-xs text-gray-400 font-medium">مرحباً بك، المسؤول</p>
          <p className="text-sm font-bold text-pharaohGold">أحمد إسماعيل</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-[#0A192F] border border-pharaohGold/30 flex items-center justify-center font-bold text-pharaohGold text-xs shadow-md">
          AD
        </div>
      </div>
    </header>
  );
}
