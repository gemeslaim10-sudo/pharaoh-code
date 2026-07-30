'use client';

import { useEffect, useState } from 'react';
import { getRecentOrders, updateOrderStatus } from '@/app/actions/dashboard';
import { auth } from '@/lib/firebase/config';

interface Order {
    id: string;
    name: string;
    phone: string;
    email: string;
    service: string;
    date: string;
    status: string;
}

export default function DashboardRecentOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const token = await user.getIdToken();
                    const data = await getRecentOrders(token);
                    setOrders(data as Order[]);
                } catch (error) {
                    console.error("Failed to fetch orders:", error);
                }
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            const user = auth.currentUser;
            if (!user) return;
            const token = await user.getIdToken();
            await updateOrderStatus(token, orderId, newStatus);
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        } catch (error) {
            console.error("Failed to update status:", error);
            window.alert('حدث خطأ أثناء تحديث الحالة.');
        }
    };

    return (
        <div className="bg-pharaohCard rounded-3xl border border-white/5 shadow-xl overflow-hidden mt-6">
            <div className="p-6 border-b border-pharaohGold/10">
                <h4 className="font-black text-sm md:text-base text-white">جدول أحدث الطلبات والوارد</h4>
                <p className="text-[11px] text-gray-400 mt-1">آخر العملاء المستقطبين</p>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="w-full text-right border-collapse text-xs md:text-sm min-w-[600px]">
                    <thead>
                        <tr className="bg-[#0A192F] text-gray-400 font-bold border-b border-white/5">
                            <th className="p-4">اسم العميل</th>
                            <th className="p-4">الهاتف / الإيميل</th>
                            <th className="p-4">الخدمة</th>
                            <th className="p-4">تاريخ الطلب</th>
                            <th className="p-4">الحالة</th>
                            <th className="p-4 text-center">إجراء سريع</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">جاري تحميل الطلبات...</td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">لا توجد طلبات حديثة.</td>
                            </tr>
                        ) : orders.map(order => (
                            <tr key={order.id} className="hover:bg-[#0A192F]/50 transition-colors">
                                <td className="p-4 font-bold text-white">{order.name}</td>
                                <td className="p-4 text-gray-300">
                                    <span className="block">{order.phone}</span>
                                    <span className="text-[11px] text-gray-500">{order.email}</span>
                                </td>
                                <td className="p-4">
                                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${
                                        order.service.includes('تطبيق') ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                        'bg-pharaohGold/10 text-pharaohGold border-pharaohGold/20'
                                    }`}>
                                        {order.service}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-400 text-[11px]">{order.date}</td>
                                <td className="p-4">
                                    {order.status === 'pending' && <span className="status-badge bg-amber-500/10 text-amber-500 text-[11px] font-medium px-2.5 py-1 rounded-full border border-amber-500/20">معلق</span>}
                                    {order.status === 'contacted' && <span className="status-badge bg-emerald-500/10 text-emerald-500 text-[11px] font-medium px-2.5 py-1 rounded-full border border-emerald-500/20">تم التواصل</span>}
                                    {order.status === 'rejected' && <span className="status-badge bg-rose-500/10 text-rose-500 text-[11px] font-medium px-2.5 py-1 rounded-full border border-rose-500/20">مرفوض</span>}
                                </td>
                                <td className="p-4 text-center">
                                    <select 
                                        value={order.status} 
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="bg-[#0A192F] border border-pharaohGold/20 rounded-lg px-2 py-1 text-xs text-gray-300 focus:outline-none cursor-pointer"
                                    >
                                        <option value="pending">معلق</option>
                                        <option value="contacted">تم التواصل</option>
                                        <option value="rejected">مرفوض</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
