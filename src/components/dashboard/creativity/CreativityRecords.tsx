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
        <div className="mt-12 border-t border-slate-200 dark:border-white/10 pt-10">
            <div className="flex flex-col mb-8">
                <span className="text-amber-800 dark:text-pharaohGold tracking-[0.3em] uppercase text-xs mb-2 font-bold">Control Panel Records</span>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">سجلات <span className="text-amber-800 dark:text-pharaohGold">{getTabName()}</span></h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm mt-2">من هنا يمكنك إدارة، تعديل، أو حذف جميع السجلات المضافة ديناميكياً لتحديث الديزاين الأصلي.</p>
            </div>

            {loading ? (
                <div className="text-center py-10 text-slate-500 dark:text-gray-400">جاري تحميل السجلات...</div>
            ) : records.length === 0 ? (
                <div className="text-center py-10 text-slate-500 dark:text-gray-500 bg-slate-50 dark:bg-[#0A192F] rounded-2xl border border-slate-200 dark:border-white/5">لا توجد سجلات مضافة حتى الآن في هذا القسم.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {records.map(record => (
                        <div key={record.id} className="bg-white dark:bg-pharaohCard border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-md dark:shadow-xl relative group">
                            <button onClick={() => handleDelete(record.id)} className="absolute top-4 left-4 text-red-500 dark:text-red-400/50 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition opacity-100 sm:opacity-0 group-hover:opacity-100 cursor-pointer" title="حذف السجل">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                            
                            <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-1 pl-10 truncate">{record.title || record.title_ar}</h4>
                            {record.title_en && <p className="text-amber-800 dark:text-pharaohGold/80 text-xs mb-2 italic" dir="ltr">{record.title_en}</p>}
                            
                            {activeTab === 'portfolio' && (
                                <div className="space-y-3">
                                     <div className="flex flex-wrap gap-2 items-center">
                                         <span className="text-xs bg-amber-500/10 dark:bg-pharaohGold/10 text-amber-800 dark:text-pharaohGold px-3 py-1 rounded-full border border-amber-500/20 dark:border-pharaohGold/20 font-bold inline-flex items-center justify-center leading-none">{record.category}</span>
                                         {record.link && (
                                             <a href={record.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full hover:bg-blue-500/20 transition-colors inline-flex items-center justify-center leading-none">رابط الموقع</a>
                                         )}
                                         {record.appLink && (
                                             <a href={record.appLink} target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 dark:text-green-400 bg-green-500/10 px-3 py-1 rounded-full hover:bg-green-500/20 transition-colors flex items-center gap-1 leading-none">📱 رابط التطبيق</a>
                                         )}
                                     </div>
                                    <p className="text-slate-600 dark:text-gray-400 text-xs line-clamp-2">{record.desc || record.description || record.desc_ar}</p>
                                    {record.image && <img src={record.image} alt={record.title} className="w-full h-32 object-cover rounded-xl mt-3 border border-slate-200 dark:border-white/10" />}
                                </div>
                            )}

                            {activeTab === 'philosophy' && (
                                <div className="space-y-3">
                                    <div className="text-amber-800 dark:text-pharaohGold w-10 h-10" dangerouslySetInnerHTML={{ __html: record.icon }} />
                                    <p className="text-slate-600 dark:text-gray-400 text-xs line-clamp-3">{record.desc || record.description || record.desc_ar}</p>
                                </div>
                            )}

                            {activeTab === 'services' && (
                                <div className="space-y-3">
                                    <div className="text-amber-800 dark:text-pharaohGold w-10 h-10" dangerouslySetInnerHTML={{ __html: record.icon }} />
                                    <p className="text-slate-600 dark:text-gray-400 text-xs line-clamp-3">{record.desc || record.description || record.desc_ar}</p>
                                    <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full mt-2 inline-flex items-center justify-center leading-none border border-blue-500/20">{record.btnText}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
