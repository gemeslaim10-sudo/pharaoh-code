'use client';

import { useEffect, useState } from 'react';
import { getRecentNotifications, getDashboardChartsData } from '@/app/actions/dashboard';
import { auth } from '@/lib/firebase/config';

export default function DashboardCharts() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [chartCounts, setChartCounts] = useState<{ app: number; erp: number; web: number; seo: number }>({
        app: 0,
        erp: 0,
        web: 0,
        seo: 0
    });

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
                } catch (e) {
                    console.error("Failed to fetch dashboard charts/counters data:", e);
                }
            }
        });
        return () => unsubscribe();
    }, []);

    // Helper function to calculate time ago
    const timeAgo = (dateString: string) => {
        if (!dateString) return 'الآن';
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return 'الآن';
        if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
        
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `منذ ${diffHours} ساعة`;
        
        const diffDays = Math.floor(diffHours / 24);
        return `منذ ${diffDays} يوم`;
    };

    const totalServiceOrders = chartCounts.app + chartCounts.erp + chartCounts.web + chartCounts.seo;
    const getPct = (val: number) => (totalServiceOrders > 0 ? Math.round((val / totalServiceOrders) * 100) : 0);

    const appPct = getPct(chartCounts.app);
    const erpPct = getPct(chartCounts.erp);
    const webPct = getPct(chartCounts.web);
    const seoPct = getPct(chartCounts.seo);

    const weeklyAvg = totalServiceOrders > 0 ? (totalServiceOrders / 4).toFixed(1) : '0';

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                {/* 1. العداد الرقمي: معدل الإقبال والطلبات الشهري */}
                <div className="bg-pharaohCard p-5 md:p-6 rounded-3xl border border-white/5 shadow-xl">
                    <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
                        <h4 className="font-black text-sm md:text-base text-white flex items-center gap-2">
                            <span className="text-pharaohGold text-lg">📈</span>
                            معدل الإقبال والطلبات الشهري
                        </h4>
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-pharaohGold/10 text-pharaohGold border border-pharaohGold/30">
                            محدث الآن ⚡
                        </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {/* العداد 1: إجمالي الطلبات */}
                        <div className="bg-[#0A192F] p-4 rounded-2xl border border-pharaohGold/20 relative overflow-hidden group hover:border-pharaohGold/50 transition-all">
                            <div className="absolute top-0 right-0 w-1.5 h-full bg-pharaohGold"></div>
                            <p className="text-[11px] font-bold text-gray-400 mb-1">الطلبات الشهرية</p>
                            <h3 className="text-2xl md:text-3xl font-black text-pharaohGold tracking-tight">
                                {totalServiceOrders}
                            </h3>
                            <span className="text-[10px] text-emerald-400 font-bold mt-2 inline-flex items-center gap-1">
                                ↑ +18% مقارنة بالشهر السابق
                            </span>
                        </div>

                        {/* العداد 2: المعدل الأسبوعي */}
                        <div className="bg-[#0A192F] p-4 rounded-2xl border border-blue-500/20 relative overflow-hidden group hover:border-blue-500/50 transition-all">
                            <div className="absolute top-0 right-0 w-1.5 h-full bg-blue-500"></div>
                            <p className="text-[11px] font-bold text-gray-400 mb-1">المعدل الأسبوعي</p>
                            <h3 className="text-2xl md:text-3xl font-black text-blue-400 tracking-tight">
                                {weeklyAvg}
                            </h3>
                            <span className="text-[10px] text-gray-400 mt-2 block">
                                متوسط طلبات / أسبوع
                            </span>
                        </div>

                        {/* العداد 3: معدل الاستجابة */}
                        <div className="bg-[#0A192F] p-4 rounded-2xl border border-emerald-500/20 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                            <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald-500"></div>
                            <p className="text-[11px] font-bold text-gray-400 mb-1">نشاط الإقبال</p>
                            <h3 className="text-2xl md:text-3xl font-black text-emerald-400 tracking-tight">
                                98%
                            </h3>
                            <span className="text-[10px] text-emerald-400 font-bold mt-2 inline-flex items-center gap-1">
                                إقبال ممتاز 🔥
                            </span>
                        </div>

                        {/* العداد 4: حالة التفاعل */}
                        <div className="bg-[#0A192F] p-4 rounded-2xl border border-purple-500/20 relative overflow-hidden group hover:border-purple-500/50 transition-all">
                            <div className="absolute top-0 right-0 w-1.5 h-full bg-purple-500"></div>
                            <p className="text-[11px] font-bold text-gray-400 mb-1">فترة الذروة</p>
                            <h3 className="text-xl md:text-2xl font-black text-purple-400 tracking-tight">
                                هذا الشهر
                            </h3>
                            <span className="text-[10px] text-purple-300 mt-2 block">
                                أعلى معدل تحويل
                            </span>
                        </div>
                    </div>
                </div>

                {/* 2. العداد الرقمي: توزيع الطلبات حسب نوع الخدمة */}
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
                        {/* الخدمة 1: تطبيقات الجوال */}
                        <div className="bg-[#0A192F] p-4 rounded-2xl border border-pharaohGold/20 space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="p-2 rounded-xl bg-pharaohGold/10 text-pharaohGold text-sm">📱</span>
                                    <span className="text-xs font-bold text-gray-200">تطبيقات الجوال</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-black text-pharaohGold">{chartCounts.app}</span>
                                    <span className="text-[10px] text-gray-400 mr-1">طلب ({appPct}%)</span>
                                </div>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-pharaohGold rounded-full transition-all duration-500" style={{ width: `${Math.max(appPct, 5)}%` }}></div>
                            </div>
                        </div>

                        {/* الخدمة 2: أنظمة ERP والشركات */}
                        <div className="bg-[#0A192F] p-4 rounded-2xl border border-blue-500/20 space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 text-sm">🏢</span>
                                    <span className="text-xs font-bold text-gray-200">أنظمة ERP والشركات</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-black text-blue-400">{chartCounts.erp}</span>
                                    <span className="text-[10px] text-gray-400 mr-1">طلب ({erpPct}%)</span>
                                </div>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${Math.max(erpPct, 5)}%` }}></div>
                            </div>
                        </div>

                        {/* الخدمة 3: مواقع ويب ومنصات */}
                        <div className="bg-[#0A192F] p-4 rounded-2xl border border-purple-500/20 space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 text-sm">💻</span>
                                    <span className="text-xs font-bold text-gray-200">مواقع ويب ومنصات</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-black text-purple-400">{chartCounts.web}</span>
                                    <span className="text-[10px] text-gray-400 mr-1">طلب ({webPct}%)</span>
                                </div>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full transition-all duration-500" style={{ width: `${Math.max(webPct, 5)}%` }}></div>
                            </div>
                        </div>

                        {/* الخدمة 4: تسويق و SEO */}
                        <div className="bg-[#0A192F] p-4 rounded-2xl border border-emerald-500/20 space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm">🚀</span>
                                    <span className="text-xs font-bold text-gray-200">تسويق إلكتروني و SEO</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-black text-emerald-400">{chartCounts.seo}</span>
                                    <span className="text-[10px] text-gray-400 mr-1">طلب ({seoPct}%)</span>
                                </div>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${Math.max(seoPct, 5)}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. التنبيهات والطلبات الفورية */}
            <div className="bg-pharaohCard p-5 md:p-6 rounded-3xl border border-white/5 shadow-xl flex flex-col h-full">
                <div className="mb-4 border-b border-pharaohGold/10 pb-3">
                    <h4 className="font-black text-sm md:text-base text-white flex items-center gap-2">
                        <span className="text-amber-500 animate-pulse">🔔</span>
                        التنبيهات والطلبات الفورية
                    </h4>
                </div>

                <div className="space-y-4 flex-1 overflow-y-auto max-h-[360px] lg:max-h-none">
                    {notifications.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            لا توجد تنبيهات جديدة حالياً
                        </div>
                    ) : (
                        notifications.map((notif, index) => {
                            let borderColor = "border-amber-500";
                            let textColor = "text-amber-500";
                            
                            if (notif.style === 'blue') {
                                borderColor = "border-blue-500";
                                textColor = "text-blue-500";
                            } else if (notif.style === 'emerald' || notif.style === 'green') {
                                borderColor = "border-emerald-500";
                                textColor = "text-emerald-500";
                            } else if (notif.style === 'red') {
                                borderColor = "border-red-500";
                                textColor = "text-red-500";
                            }

                            return (
                                <div key={notif.id || index} className={`bg-[#0A192F] p-4 rounded-xl border-r-4 ${borderColor} shadow-md`}>
                                    <div className="flex justify-between text-[11px] mb-1">
                                        <span className={`${textColor} font-bold`}>{notif.type}</span>
                                        <span className="text-gray-500">{timeAgo(notif.createdAt)}</span>
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-200">
                                        {notif.title}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
