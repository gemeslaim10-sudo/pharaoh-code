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
    { title: 'تطبيقات الجوال', count: chartCounts.app, pct: appPct, color: 'bg-pharaohGold', textCol: 'text-pharaohGold', border: 'border-pharaohGold/20', icon: '📱', bgIcon: 'bg-pharaohGold/10' },
    { title: 'أنظمة ERP والشركات', count: chartCounts.erp, pct: erpPct, color: 'bg-blue-500', textCol: 'text-blue-400', border: 'border-blue-500/20', icon: '🏢', bgIcon: 'bg-blue-500/10' },
    { title: 'مواقع ويب ومنصات', count: chartCounts.web, pct: webPct, color: 'bg-purple-500', textCol: 'text-purple-400', border: 'border-purple-500/20', icon: '💻', bgIcon: 'bg-purple-500/10' },
    { title: 'تسويق إلكتروني و SEO', count: chartCounts.seo, pct: seoPct, color: 'bg-emerald-500', textCol: 'text-emerald-400', border: 'border-emerald-500/20', icon: '🚀', bgIcon: 'bg-emerald-500/10' },
  ];

  return (
    <div className="bg-pharaohCard p-5 md:p-6 rounded-3xl border border-white/5 shadow-xl">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
        <h4 className="font-black text-sm md:text-base text-white flex items-center gap-2">
          <span className="text-pharaohGold text-lg">📊</span>
          توزيع الطلبات حسب نوع الخدمة
        </h4>
        <span className="text-[11px] text-gray-400 font-medium">
          إجمالي: <strong className="text-white">{totalServiceOrders} طلب</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {serviceItems.map((item, idx) => (
          <div key={idx} className={`bg-[#0A192F] p-4 rounded-2xl border ${item.border} space-y-3`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-xl ${item.bgIcon} ${item.textCol} text-sm`}>{item.icon}</span>
                <span className="text-xs font-bold text-gray-200">{item.title}</span>
              </div>
              <div className="text-right">
                <span className={`text-lg font-black ${item.textCol}`}>{item.count}</span>
                <span className="text-[10px] text-gray-400 mr-1">طلب ({item.pct}%)</span>
              </div>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
