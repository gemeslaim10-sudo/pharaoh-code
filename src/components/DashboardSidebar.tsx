"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import { useState } from "react";
import { clearSystemCache } from "@/app/actions/dashboard/cache";
import SidebarNavLinks from "./dashboard/sidebar/SidebarNavLinks";
import SidebarFooterActions from "./dashboard/sidebar/SidebarFooterActions";

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

      <SidebarNavLinks onNavigate={() => setSidebarOpen(false)} />

      <SidebarFooterActions
        clearingCache={clearingCache}
        onClearCache={handleClearCache}
      />
    </aside>
  );
}
