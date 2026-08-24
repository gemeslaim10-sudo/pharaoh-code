'use client';

export type { ClientItem } from '@/types/client';
import { ClientItem } from '@/types/client';



interface ClientsTableProps {
    loading: boolean;
    clients: ClientItem[];
    onEdit: (client: ClientItem) => void;
    onDelete: (id: string) => void;
}

export default function ClientsTable({
    loading,
    clients,
    onEdit,
    onDelete
}: ClientsTableProps) {
    return (
        <div className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 hover:border-pharaohGold/30 shadow-md dark:shadow-2xl transition-all duration-500 mt-10">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/5 pb-4 mb-6">
                <div className="w-2 h-6 bg-pharaohGold rounded-full"></div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">قائمة شركاء النجاح الحاليين</h4>
            </div>

            {loading ? (
                <div className="text-center text-amber-800 dark:text-pharaohGold py-10 font-bold">جاري تحميل قائمة الشركاء...</div>
            ) : clients.length === 0 ? (
                <div className="text-center text-slate-500 dark:text-gray-500 py-10">لا يوجد عملاء مضافين في قاعدة البيانات حالياً.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm text-slate-600 dark:text-gray-400">
                        <thead className="text-xs uppercase bg-slate-100 dark:bg-pharaohNavy text-amber-800 dark:text-pharaohGold font-bold border-b border-slate-200 dark:border-white/10">
                            <tr>
                                <th className="px-6 py-4">العميل / الشريك</th>
                                <th className="px-6 py-4">رابط الموقع</th>
                                <th className="px-6 py-4 text-center">التحكم والتعديل</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client.id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <img src={client.logo} alt={client.name} className="w-14 h-10 rounded-lg object-cover border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0A192F]" />
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-900 dark:text-white">{client.name}</span>
                                            <span className="text-[10px] text-slate-500 dark:text-gray-500 line-clamp-1">{client.description}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">
                                            {client.websiteUrl}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-center space-x-2 space-x-reverse">
                                        <button onClick={() => onEdit(client)} className="text-xs text-amber-800 dark:text-pharaohGold bg-amber-500/10 dark:bg-pharaohGold/10 border border-amber-500/30 dark:border-pharaohGold/30 px-3 py-1.5 rounded-full hover:bg-pharaohGold hover:text-[#0A192F] transition cursor-pointer font-bold">
                                            تعديل
                                        </button>
                                        <button onClick={() => onDelete(client.id)} className="text-xs text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full hover:bg-red-500 hover:text-white transition cursor-pointer font-bold">
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
