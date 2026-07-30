'use client';

import DashboardStats from '@/components/dashboard/home/DashboardStats';
import DashboardCharts from '@/components/dashboard/home/DashboardCharts';
import DashboardRecentOrders from '@/components/dashboard/home/DashboardRecentOrders';
import DashboardReviews from '@/components/dashboard/home/DashboardReviews';
import DashboardScriptsInteractive from '@/components/dashboard/home/DashboardScriptsInteractive';
import DashboardScriptsCharts from '@/components/dashboard/home/DashboardScriptsCharts';

export default function DashboardHome() {
  return (
    <>
      <DashboardScriptsInteractive />
      <DashboardScriptsCharts />
      <DashboardStats />
      <DashboardCharts />
      <DashboardRecentOrders />
      <DashboardReviews />
    </>
  );
}
