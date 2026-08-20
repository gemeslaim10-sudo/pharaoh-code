'use client';

interface DashboardMetricCardsProps {
  totalServiceOrders: number;
  weeklyAvg: string;
  activityRate: number;
  activityText: string;
  peakPeriodText: string;
  peakSubtext: string;
}

export function DashboardMetricCards({
  totalServiceOrders,
  weeklyAvg,
  activityRate,
  activityText,
  peakPeriodText,
  peakSubtext,
}: DashboardMetricCardsProps) {
  return (
    <div className="bg-pharaohCard p-5 md:p-6 rounded-3xl border border-white/5 shadow-xl">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
        <h4 className="font-black text-sm md:text-base text-white flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-pharaohGold/10 text-pharaohGold flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          معدل الإقبال والطلبات الشهري
        </h4>
        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-pharaohGold/10 text-pharaohGold border border-pharaohGold/30 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>محدث الآن</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* العداد 1: إجمالي الطلبات */}
        <div className="bg-[#0A192F] p-4 rounded-2xl border border-pharaohGold/20 relative overflow-hidden group hover:border-pharaohGold/50 transition-all">
          <div className="absolute top-0 right-0 w-1.5 h-full bg-pharaohGold" />
          <p className="text-[11px] font-bold text-gray-400 mb-1">الطلبات الشهرية</p>
          <h3 className="text-2xl md:text-3xl font-black text-pharaohGold tracking-tight">
            {totalServiceOrders}
          </h3>
          <span className={`text-[10px] font-bold mt-2 inline-flex items-center gap-1 ${totalServiceOrders > 0 ? 'text-emerald-400' : 'text-gray-500'}`}>
            {totalServiceOrders > 0 ? `إجمالي ${totalServiceOrders} طلبات فعلي` : 'لا توجد طلبات بعد'}
          </span>
        </div>

        {/* العداد 2: المعدل الأسبوعي */}
        <div className="bg-[#0A192F] p-4 rounded-2xl border border-blue-500/20 relative overflow-hidden group hover:border-blue-500/50 transition-all">
          <div className="absolute top-0 right-0 w-1.5 h-full bg-blue-500" />
          <p className="text-[11px] font-bold text-gray-400 mb-1">المعدل الأسبوعي</p>
          <h3 className="text-2xl md:text-3xl font-black text-blue-400 tracking-tight">
            {weeklyAvg}
          </h3>
          <span className="text-[10px] text-gray-400 mt-2 block">
            متوسط طلبات / أسبوع
          </span>
        </div>

        {/* العداد 3: معدل الاستجابة ونشاط الإقبال */}
        <div className="bg-[#0A192F] p-4 rounded-2xl border border-emerald-500/20 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
          <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald-500" />
          <p className="text-[11px] font-bold text-gray-400 mb-1">نشاط الإقبال</p>
          <h3 className="text-2xl md:text-3xl font-black text-emerald-400 tracking-tight">
            {activityRate}%
          </h3>
          <span className={`text-[10px] font-bold mt-2 inline-flex items-center gap-1 ${totalServiceOrders > 0 ? 'text-emerald-400' : 'text-gray-500'}`}>
            {activityText}
          </span>
        </div>

        {/* العداد 4: فترة الذروة */}
        <div className="bg-[#0A192F] p-4 rounded-2xl border border-purple-500/20 relative overflow-hidden group hover:border-purple-500/50 transition-all">
          <div className="absolute top-0 right-0 w-1.5 h-full bg-purple-500" />
          <p className="text-[11px] font-bold text-gray-400 mb-1">فترة الذروة</p>
          <h3 className="text-lg md:text-xl font-black text-purple-400 tracking-tight truncate">
            {peakPeriodText}
          </h3>
          <span className="text-[10px] text-purple-300 mt-2 block truncate">
            {peakSubtext}
          </span>
        </div>
      </div>
    </div>
  );
}
