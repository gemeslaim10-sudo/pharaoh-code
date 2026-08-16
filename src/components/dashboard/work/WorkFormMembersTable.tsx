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
        <div className="bg-[#112240] p-8 rounded-[2.5rem] border border-white/5 hover:border-pharaohGold/20 shadow-2xl transition-all duration-500 mt-10">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                <div className="w-2 h-6 bg-pharaohGold rounded-full"></div>
                <h4 className="text-xl font-bold text-white">خبراء الصرح الحاليين 📜</h4>
            </div>

            {loading ? (
                <div className="text-center text-pharaohGold py-10 font-bold">جاري تحميل كتيبة العمل... 𓂀</div>
            ) : members.length === 0 ? (
                <div className="text-center text-gray-500 py-10">لا يوجد أعضاء في قاعدة البيانات حالياً.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm text-gray-400">
                        <thead className="text-xs uppercase bg-pharaohNavy text-pharaohGold font-bold border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4">العضو</th>
                                <th className="px-6 py-4">المسمى الوظيفي</th>
                                <th className="px-6 py-4 text-center">التحكم والتعديل</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-pharaohGold/30" />
                                        <span className="font-bold text-white">{member.name}</span>
                                    </td>
                                    <td className="px-6 py-4">{member.role}</td>
                                    <td className="px-6 py-4 text-center space-x-2 space-x-reverse">
                                        <button onClick={() => onEdit(member)} className="text-xs text-pharaohGold bg-[#112240] border border-pharaohGold/30 px-3 py-1.5 rounded-full hover:bg-pharaohGold hover:text-[#0A192F] transition">
                                            تعديل ✏️
                                        </button>
                                        <button onClick={() => onDelete(member.id)} className="text-xs text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full hover:bg-red-400 hover:text-white transition">
                                            حذف ❌
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
