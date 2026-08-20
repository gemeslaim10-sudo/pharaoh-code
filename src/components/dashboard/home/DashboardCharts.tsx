'use client';

import { useEffect, useState } from 'react';
import { getRecentNotifications, getDashboardChartsData } from '@/app/actions/dashboard';
import { auth } from '@/lib/firebase/config';
import { DashboardMetricCards } from './DashboardMetricCards';
import { DashboardServiceBreakdown } from './DashboardServiceBreakdown';
import { DashboardNotificationsList } from './DashboardNotificationsList';

export default function DashboardCharts() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [chartCounts, setChartCounts] = useState<{ app: number; erp: number; web: number; seo: number }>({
    app: 0, erp: 0, web: 0, seo: 0
  });
  const [activeOrdersCount, setActiveOrdersCount] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const notifData = await getRecentNotifications(token);
          setNotifications(notifData);

          const chartsData = await getDashboardChartsData(token);
          if (chartsData?.pieChartData) {
            const [app = 0, erp = 0, web = 0, seo = 0] = chartsData.pieChartData;
            setChartCounts({ app, erp, web, seo });
          }
          if (typeof chartsData?.activeOrdersCount === 'number') {
            setActiveOrdersCount(chartsData.activeOrdersCount);
          }
        } catch (e) {
          console.error("Failed to fetch dashboard charts/counters data:", e);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const totalServiceOrders = chartCounts.app + chartCounts.erp + chartCounts.web + chartCounts.seo;
  const getPct = (val: number) => (totalServiceOrders > 0 ? Math.round((val / totalServiceOrders) * 100) : 0);

  const appPct = getPct(chartCounts.app);
  const erpPct = getPct(chartCounts.erp);
  const webPct = getPct(chartCounts.web);
  const seoPct = getPct(chartCounts.seo);
  const weeklyAvg = totalServiceOrders > 0 ? (totalServiceOrders / 4).toFixed(1) : '0';

  const activityRate = totalServiceOrders > 0 ? Math.round((activeOrdersCount / totalServiceOrders) * 100) : 0;
  let activityText = "لا يوجد نشاط حالياً";
  if (totalServiceOrders > 0) {
    if (activityRate >= 70) activityText = "إقبال ممتاز ومرتفع";
    else if (activityRate > 0) activityText = "نشاط إيجابي متوسط";
    else activityText = "في انتظار المعالجة";
  }

  let peakPeriodText = "لا يوجد";
  let peakSubtext = "لا توجد طلبات مسجلة";
  if (totalServiceOrders > 0) {
    const services = [
      { name: "تطبيقات الجوال", count: chartCounts.app },
      { name: "أنظمة ERP", count: chartCounts.erp },
      { name: "مواقع ويب", count: chartCounts.web },
      { name: "تسويق و SEO", count: chartCounts.seo },
    ];
    services.sort((a, b) => b.count - a.count);
    if (services[0]?.count && services[0].count > 0) {
      peakPeriodText = services[0].name;
      peakSubtext = `الأكثر طلباً (${services[0].count} طلب)`;
    } else {
      peakPeriodText = "هذا الشهر";
      peakSubtext = "بناءً على البيانات الفعلية";
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <DashboardMetricCards
          totalServiceOrders={totalServiceOrders}
          weeklyAvg={weeklyAvg}
          activityRate={activityRate}
          activityText={activityText}
          peakPeriodText={peakPeriodText}
          peakSubtext={peakSubtext}
        />

        <DashboardServiceBreakdown
          totalServiceOrders={totalServiceOrders}
          chartCounts={chartCounts}
          appPct={appPct}
          erpPct={erpPct}
          webPct={webPct}
          seoPct={seoPct}
        />
      </div>

      <DashboardNotificationsList notifications={notifications} />
    </div>
  );
}
