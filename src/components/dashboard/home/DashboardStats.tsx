'use client';

import { useEffect, useState } from 'react';
import { getDashboardStats } from '@/app/actions/dashboard';
import { auth } from '@/lib/firebase/config';

export default function DashboardStats() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingLeads: 0,
        activeProjects: 0,
        generalMessages: 0
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const token = await user.getIdToken();
                    const data = await getDashboardStats(token);
                    setStats(data);
                } catch (error) {
                    console.error("Failed to fetch stats:", error);
                }
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-pharaohCard p-5 md:p-6 rounded-2xl border-r-4 border-pharaohGold shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400 text-xs font-bold mb-1">إجمالي طلبات المشاريع</p>
                        <h3 className="text-2xl md:text-3xl font-black text-white" id="stat-total-leads">{stats.totalOrders}</h3>
                    </div>
                    <span className="bg-pharaohGold/10 text-pharaohGold p-2.5 rounded-xl text-base">📁</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-4">من نموذج "ابدأ مشروعك"</p>
            </div>

            <div className="bg-pharaohCard p-5 md:p-6 rounded-2xl border-r-4 border-amber-500 shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400 text-xs font-bold mb-1">طلبات قيد الانتظار</p>
                        <h3 className="text-2xl md:text-3xl font-black text-amber-500" id="stat-pending-leads">{stats.pendingLeads}</h3>
                    </div>
                    <span className="bg-amber-500/10 text-amber-500 p-2.5 rounded-xl text-base">⏳</span>
                </div>
                <p className="text-[11px] text-amber-400 mt-4 font-medium">⚠️ بحاجة لتواصل فوري</p>
            </div>

            <div className="bg-pharaohCard p-5 md:p-6 rounded-2xl border-r-4 border-emerald-500 shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400 text-xs font-bold mb-1">المشاريع الجارية (Active)</p>
                        <h3 className="text-2xl md:text-3xl font-black text-emerald-500" id="stat-active-projects">{stats.activeProjects}</h3>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-500 p-2.5 rounded-xl text-base">🚀</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-4">قيد التنفيذ والتطوير حالياً</p>
            </div>

            <div className="bg-pharaohCard p-5 md:p-6 rounded-2xl border-r-4 border-blue-400 shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400 text-xs font-bold mb-1">رسائل اتصل بنا</p>
                        <h3 className="text-2xl md:text-3xl font-black text-blue-400" id="stat-general-messages">{stats.generalMessages}</h3>
                    </div>
                    <span className="bg-blue-400/10 text-blue-400 p-2.5 rounded-xl text-base">📩</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-4">استفسارات عامة للزوار</p>
            </div>
        </div>
    );
}
