'use client';

export interface ClientItem {
    id: string;
    name?: string;
    name_ar?: string;
    name_en?: string;
    logo?: string;
    description?: string;
    description_ar?: string;
    description_en?: string;
    websiteUrl?: string;
}

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
        <div className="bg-[#112240] p-8 rounded-[2.5rem] border border-white/5 hover:border-pharaohGold/20 shadow-2xl transition-all duration-500 mt-10">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                <div className="w-2 h-6 bg-pharaohGold rounded-full"></div>
                <h4 className="text-xl font-bold text-white">قائمة شركاء النجاح الحاليين</h4>
            </div>

            {loading ? (
                <div className="text-center text-pharaohGold py-10 font-bold">جاري تحميل قائمة الشركاء...</div>
            ) : clients.length === 0 ? (
                <div className="text-center text-gray-500 py-10">لا يوجد عملاء مضافين في قاعدة البيانات حالياً.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm text-gray-400">
                        <thead className="text-xs uppercase bg-pharaohNavy text-pharaohGold font-bold border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4">العميل / الشريك</th>
                                <th className="px-6 py-4">رابط الموقع</th>
                                <th className="px-6 py-4 text-center">التحكم والتعديل</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client.id} className="border-b border-white/5 hover:bg-white/5 transition">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <img src={client.logo} alt={client.name} className="w-14 h-10 rounded-lg object-cover border border-white/10 bg-[#0A192F]" />
                                        <div className="flex flex-col">
                                            <span className="font-bold text-white">{client.name}</span>
                                            <span className="text-[10px] text-gray-500 line-clamp-1">{client.description}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-xs">
                                            {client.websiteUrl}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-center space-x-2 space-x-reverse">
                                        <button onClick={() => onEdit(client)} className="text-xs text-pharaohGold bg-pharaohGold/10 px-3 py-1.5 rounded-full hover:bg-pharaohGold hover:text-[#0A192F] transition cursor-pointer">
                                            تعديل
                                        </button>
                                        <button onClick={() => onDelete(client.id)} className="text-xs text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full hover:bg-red-400 hover:text-white transition cursor-pointer">
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
