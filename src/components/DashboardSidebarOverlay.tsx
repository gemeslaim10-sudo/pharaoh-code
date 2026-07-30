'use client';

import { useDashboard } from '@/contexts/DashboardContext';

export default function DashboardSidebarOverlay() {
  const { isSidebarOpen, setSidebarOpen } = useDashboard();

  if (!isSidebarOpen) return null;

  return (
    <div 
        id="sidebarOverlay" 
        onClick={() => setSidebarOpen(false)}
        className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
    ></div>
  );
}
