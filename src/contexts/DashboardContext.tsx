'use client';

import { createContext, useContext, useState } from 'react';

interface DashboardContextType {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType>({
  isSidebarOpen: false,
  setSidebarOpen: () => {},
});

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardContext.Provider value={{ isSidebarOpen, setSidebarOpen }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);
