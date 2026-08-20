import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import Script from "next/script";

import AdminRouteGuard from "@/components/AdminRouteGuard";
import { DashboardProvider } from "@/contexts/DashboardContext";
import DashboardSidebarOverlay from "@/components/DashboardSidebarOverlay";
import { getIdentity } from '@/app/actions/dashboard/settings';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const identity = await getIdentity();
  const siteName = identity?.name || "Pharaoh Code";
  const logoUrl = identity?.logo || identity?.logo_dark || "";
  const logoLightUrl = identity?.logo_light || "";

  return (
    <div className="flex min-h-screen relative text-white bg-[#0A192F] text-right overflow-x-hidden" dir="rtl">
      {/* Load Chart.js globally for the dashboard */}
      <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="afterInteractive" />
      
      <DashboardProvider>
        <AdminRouteGuard>
          <DashboardSidebarOverlay />
          <DashboardSidebar siteName={siteName} logoUrl={logoUrl} logoLightUrl={logoLightUrl} />
          <div className="flex-1 flex flex-col min-w-0 lg:mr-72">
            <DashboardHeader />
            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-6 space-y-6 max-w-7xl w-full mx-auto relative z-10 custom-scrollbar">
              {children}
            </main>
            
            <footer className="bg-pharaohCard border-t border-pharaohGold/5 py-4 px-6 text-center text-xs text-gray-500">
              <p>&copy; {new Date().getFullYear()} {siteName}. جميع الحقوق محفوظة.</p>
            </footer>
          </div>
        </AdminRouteGuard>
      </DashboardProvider>
    </div>
  );
}
