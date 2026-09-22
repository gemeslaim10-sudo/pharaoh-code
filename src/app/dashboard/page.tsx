'use client';

import DashboardStats from '@/components/dashboard/home/DashboardStats';
import DashboardCharts from '@/components/dashboard/home/DashboardCharts';
import DashboardRecentOrders from '@/components/dashboard/home/DashboardRecentOrders';
import DashboardReviews from '@/components/dashboard/home/DashboardReviews';

export default function DashboardHome() {
  return (
    <>
      <DashboardStats />
      <DashboardCharts />
      <DashboardRecentOrders />
      <DashboardReviews />
    </>
  );
}
