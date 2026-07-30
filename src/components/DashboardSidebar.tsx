"use client";

import Link from "next/link";
import { useDashboard } from "@/contexts/DashboardContext";
import { useState } from "react";
import { clearSystemCache } from "@/app/actions/dashboard/cache";

export default function DashboardSidebar({ siteName = "Pharaoh Code" }: { siteName?: string }) {
  const { isSidebarOpen, setSidebarOpen } = useDashboard();
  const [clearingCache, setClearingCache] = useState(false);

  const handleClearCache = async () => {
    if (confirm("هل أنت متأكد من رغبتك في تفريغ ذاكرة الكاش؟ ستظهر جميع التعديلات الحديثة في الموقع مباشرة.")) {
      setClearingCache(true);
      try {
        const result = await clearSystemCache();
        if (result.success) {
          alert(result.message);
        } else {
          alert(result.error);
        }
      } catch (error) {
        alert("حدث خطأ غير متوقع.");
      } finally {
        setClearingCache(false);
      }
    }
  };

  return (
    <>
      <aside
        id="sidebar"
        className={`w-72 bg-pharaohCard border-l border-pharaohGold/10 fixed top-0 right-0 h-screen z-50 transition-transform duration-300 transform flex flex-col shadow-2xl shrink-0 ${isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}
      >
          <div className="p-6 border-b border-pharaohGold/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-black tracking-wide text-white">
                <span className="text-xl font-black tracking-tighter uppercase text-white">
                  {siteName.split(' ')[0]} <span className="text-pharaohGold">{siteName.split(' ').slice(1).join(' ')}</span>
                </span>
              </h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-pharaohGold text-xl p-1"
            >
              ✕
            </button>
          </div>
          <nav className="p-4 space-y-2 flex-1 overflow-y-auto custom-scrollbar">
            <Link
              href="/dashboard"
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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

        <div className="p-4 border-t border-pharaohGold/10 bg-[#0A192F]/40 shrink-0 space-y-3">
          <button 
            onClick={handleClearCache}
            disabled={clearingCache}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-orange-500/5 hover:bg-orange-500/10 border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 group disabled:opacity-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-pharaohNavy font-black flex items-center justify-center shadow-md transition-all duration-300">
                {clearingCache ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                ) : (
                    <svg className="w-5 h-5 transform group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                )}
              </div>
              <div className="text-right">
                <p className="text-[11px] text-orange-400/80 font-bold group-hover:text-orange-400 transition-colors duration-300">
                  {clearingCache ? "جاري التفريغ..." : "تفريغ الذاكرة المؤقتة"}
                </p>
              </div>
            </div>
          </button>

          <button className="w-full flex items-center justify-between p-3 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 group-hover:bg-red-500 group-hover:text-pharaohNavy font-black flex items-center justify-center shadow-md transition-all duration-300">
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-red-400/80 font-bold group-hover:text-red-400 transition-colors duration-300">
                  تسجيل الخروج
                </p>
              </div>
            </div>
          </button>
        </div>
      </aside>

    </>
  );
}
