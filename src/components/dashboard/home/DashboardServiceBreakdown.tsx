'use client';

interface DashboardServiceBreakdownProps {
  totalServiceOrders: number;
  chartCounts: { app: number; erp: number; web: number; seo: number };
  appPct: number;
  erpPct: number;
  webPct: number;
  seoPct: number;
}

export function DashboardServiceBreakdown({
  totalServiceOrders,
  chartCounts,
  appPct,
  erpPct,
  webPct,
  seoPct,
}: DashboardServiceBreakdownProps) {
  const serviceItems = [
    { 
      title: 'تطبيقات الجوال', 
      count: chartCounts.app, 
      pct: appPct, 
      color: 'bg-pharaohGold', 
      textCol: 'text-pharaohGold', 
      border: 'border-pharaohGold/20', 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ), 
      bgIcon: 'bg-pharaohGold/10' 
    },
    { 
      title: 'أنظمة ERP والشركات', 
      count: chartCounts.erp, 
      pct: erpPct, 
      color: 'bg-blue-500', 
      textCol: 'text-blue-400', 
      border: 'border-blue-500/20', 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ), 
      bgIcon: 'bg-blue-500/10' 
    },
    { 
      title: 'مواقع ويب ومنصات', 
      count: chartCounts.web, 
      pct: webPct, 
      color: 'bg-purple-500', 
      textCol: 'text-purple-400', 
      border: 'border-purple-500/20', 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ), 
      bgIcon: 'bg-purple-500/10' 
    },
    { 
      title: 'تسويق إلكتروني و SEO', 
      count: chartCounts.seo, 
      pct: seoPct, 
      color: 'bg-emerald-500', 
      textCol: 'text-emerald-400', 
      border: 'border-emerald-500/20', 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ), 
      bgIcon: 'bg-emerald-500/10' 
    },
  ];

  return (
    <div className="bg-white dark:bg-pharaohCard p-5 md:p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-md dark:shadow-xl">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-white/10">
        <h4 className="font-black text-sm md:text-base text-slate-900 dark:text-white flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 dark:bg-pharaohGold/10 text-amber-800 dark:text-pharaohGold flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          توزيع الطلبات حسب نوع الخدمة
        </h4>
        <span className="text-[11px] text-slate-600 dark:text-gray-400 font-medium">
          إجمالي: <strong className="text-slate-900 dark:text-white">{totalServiceOrders} طلب</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {serviceItems.map((item, idx) => (
          <div key={idx} className={`bg-slate-50 dark:bg-[#0A192F] p-4 rounded-2xl border border-slate-200 dark:${item.border} space-y-3 shadow-xs`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-xl ${item.bgIcon} ${item.textCol}`}>{item.icon}</span>
                <span className="text-xs font-bold text-slate-800 dark:text-gray-200">{item.title}</span>
              </div>
              <div className="text-right">
                <span className={`text-lg font-black ${item.textCol}`}>{item.count}</span>
                <span className="text-[10px] text-slate-500 dark:text-gray-400 mr-1">طلب ({item.pct}%)</span>
              </div>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
