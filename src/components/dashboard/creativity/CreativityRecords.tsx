'use client';

import { useEffect, useState } from 'react';
import { CreativityType, getCreativityItems, deleteCreativityItem } from '@/app/actions/dashboard/creativity';
import { auth } from '@/lib/firebase/config';

interface Props {
    activeTab: CreativityType;
    refreshKey: number;
}

export default function CreativityRecords({ activeTab, refreshKey }: Props) {
    const [records, setRecords] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRecords = async () => {
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (user) {
                const token = await user.getIdToken();
                const data = await getCreativityItems(token, activeTab);
                setRecords(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) fetchRecords();
            else setLoading(false);
        });
        return () => unsubscribe();
    }, [activeTab, refreshKey]);

    const handleDelete = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا السجل؟')) return;
        try {
            const user = auth.currentUser;
            if (!user) return;
            const token = await user.getIdToken();
            await deleteCreativityItem(token, activeTab, id);
            setRecords(prev => prev.filter(r => r.id !== id));
        } catch (error) {
            console.error(error);
            alert('حدث خطأ أثناء الحذف');
        }
    };

    const getTabName = () => {
        if (activeTab === 'portfolio') return 'المشاريع المضافة';
        if (activeTab === 'philosophy') return 'الفلسفة وجوهر العمل';
        if (activeTab === 'services') return 'الخدمات الرقمية';
        return '';
    };

    return (
        <div className="mt-20 border-t border-white/10 pt-16">
            <div className="flex flex-col mb-12">
                <span className="text-pharaohGold tracking-[0.3em] uppercase text-xs mb-2">Control Panel Records</span>
                <h3 className="text-3xl font-black text-white">سجلات <span className="text-pharaohGold">{getTabName()}</span></h3>
                <p className="text-gray-400 text-sm mt-2">من هنا يمكنك إدارة، تعديل، أو حذف جميع السجلات المضافة ديناميكياً لتحديث الديزاين الأصلي.</p>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-400">جاري تحميل السجلات...</div>
            ) : records.length === 0 ? (
                <div className="text-center py-10 text-gray-500 bg-[#0A192F] rounded-2xl border border-white/5">لا توجد سجلات مضافة حتى الآن في هذا القسم.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {records.map(record => (
                        <div key={record.id} className="bg-pharaohCard border border-white/5 rounded-2xl p-6 shadow-xl relative group">
                            <button onClick={() => handleDelete(record.id)} className="absolute top-4 left-4 text-red-400/50 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition opacity-0 group-hover:opacity-100" title="حذف السجل">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                            
                            <h4 className="text-white font-bold text-lg mb-2 pl-10 truncate">{record.title}</h4>
                            
                            {activeTab === 'portfolio' && (
                                <div className="space-y-3">
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs bg-pharaohGold/10 text-pharaohGold px-3 py-1 rounded-full">{record.category}</span>
                                        {record.link && (
                                            <a href={record.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full hover:bg-blue-400/20 transition-colors">عرض الرابط</a>
                                        )}
                                    </div>
                                    <p className="text-gray-400 text-xs line-clamp-2">{record.desc}</p>
                                    {record.image && <img src={record.image} alt={record.title} className="w-full h-32 object-cover rounded-xl mt-3" />}
                                </div>
                            )}

                            {activeTab === 'philosophy' && (
                                <div className="space-y-3">
                                    <div className="text-pharaohGold w-10 h-10" dangerouslySetInnerHTML={{ __html: record.icon }} />
                                    <p className="text-gray-400 text-xs line-clamp-3">{record.desc}</p>
                                </div>
                            )}

                            {activeTab === 'services' && (
                                <div className="space-y-3">
                                    <div className="text-pharaohGold w-10 h-10" dangerouslySetInnerHTML={{ __html: record.icon }} />
                                    <p className="text-gray-400 text-xs line-clamp-3">{record.desc}</p>
                                    <span className="text-xs text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full mt-2 inline-block">{record.btnText}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
