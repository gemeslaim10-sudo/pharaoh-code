'use client';

import { useEffect, useState } from 'react';
import { getRecentNotifications } from '@/app/actions/dashboard';
import { auth } from '@/lib/firebase/config';

export default function DashboardCharts() {
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const token = await user.getIdToken();
                    const data = await getRecentNotifications(token);
                    setNotifications(data);
                } catch (e) {
                    console.error("Failed to fetch notifications:", e);
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

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-pharaohCard p-4 md:p-6 rounded-3xl border border-white/5 shadow-xl">
                    <div className="mb-4">
                        <h4 className="font-black text-sm md:text-base text-white">معدل الإقبال والطلبات الشهري</h4>
                    </div>
                    <div className="relative h-60 w-full">
                        <canvas id="lineChart"></canvas>
                    </div>
                </div>

                <div className="bg-pharaohCard p-4 md:p-6 rounded-3xl border border-white/5 shadow-xl">
                    <div className="mb-4">
                        <h4 className="font-black text-sm md:text-base text-white">توزيع الطلبات حسب نوع الخدمة</h4>
                    </div>
                    <div className="relative h-56 w-full flex justify-center">
                        <canvas id="pieChart"></canvas>
                    </div>
                </div>
            </div>

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
                            // Map style strings to Tailwind classes based on original design
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
                                        {/* Simple rendering, if we need bold parts we'd have to parse the string, 
                                            but since we construct it in the action, we can just display the title */}
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
