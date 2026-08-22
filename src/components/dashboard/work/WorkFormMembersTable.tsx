'use client';

import { TeamMember } from './workFormTypes';
export type { TeamMember };

interface WorkFormMembersTableProps {
    loading: boolean;
    members: TeamMember[];
    onEdit: (member: TeamMember) => void;
    onDelete: (id: string) => void;
}

export default function WorkFormMembersTable({
    loading,
    members,
    onEdit,
    onDelete
}: WorkFormMembersTableProps) {
    return (
        <div className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 hover:border-pharaohGold/30 shadow-md dark:shadow-2xl transition-all duration-500 mt-10">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/5 pb-4 mb-6">
                <div className="w-2 h-6 bg-pharaohGold rounded-full"></div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">أعضاء الفريق الحاليين</h4>
            </div>

            {loading ? (
                <div className="text-center text-amber-800 dark:text-pharaohGold py-10 font-bold">جاري تحميل أعضاء الفريق...</div>
            ) : members.length === 0 ? (
                <div className="text-center text-slate-500 dark:text-gray-500 py-10">لا يوجد أعضاء في قاعدة البيانات حالياً.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm text-slate-600 dark:text-gray-400">
                        <thead className="text-xs uppercase bg-slate-100 dark:bg-pharaohNavy text-amber-800 dark:text-pharaohGold font-bold border-b border-slate-200 dark:border-white/10">
                            <tr>
                                <th className="px-6 py-4">العضو</th>
                                <th className="px-6 py-4">المسمى الوظيفي</th>
                                <th className="px-6 py-4 text-center">التحكم والتعديل</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member.id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-amber-500/30 dark:border-pharaohGold/30 shrink-0" />
                                        <div>
                                            <span className="font-bold text-slate-900 dark:text-white block">{member.name || member.name_ar}</span>
                                            {member.name_en && (
                                                <span className="text-[11px] text-slate-400 font-mono" dir="ltr">{member.name_en}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-slate-800 dark:text-gray-200 block">{member.role || member.role_ar}</span>
                                        {member.role_en && (
                                            <span className="text-[11px] text-slate-400 font-mono" dir="ltr">{member.role_en}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center space-x-2 space-x-reverse">
                                        <button onClick={() => onEdit(member)} className="text-xs text-amber-800 dark:text-pharaohGold bg-amber-500/10 dark:bg-[#112240] border border-amber-500/30 dark:border-pharaohGold/30 px-3 py-1.5 rounded-full hover:bg-pharaohGold hover:text-[#0A192F] transition cursor-pointer font-bold">
                                            تعديل
                                        </button>
                                        <button onClick={() => onDelete(member.id)} className="text-xs text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full hover:bg-red-500 hover:text-white transition cursor-pointer font-bold">
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
