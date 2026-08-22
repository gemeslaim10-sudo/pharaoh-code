'use client';

interface AdminItem {
  id: string;
  email: string;
}

interface AdminsTableProps {
  admins: AdminItem[];
  onDelete: (id: string) => void;
}

export function AdminsTable({ admins, onDelete }: AdminsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-right text-sm text-gray-400">
        <thead className="text-xs uppercase bg-[#0A192F] text-pharaohGold font-bold border-b border-white/10">
          <tr>
            <th className="px-6 py-4">البريد الإلكتروني</th>
            <th className="px-6 py-4 text-center">التحكم والتعديل</th>
          </tr>
        </thead>
        <tbody>
          {/* Master Admin */}
          <tr className="border-b border-white/5 hover:bg-white/5 transition">
            <td className="px-6 py-4 font-bold text-white">cubsacademy29@gmail.com</td>
            <td className="px-6 py-4 text-center">
              <span className="inline-flex items-center gap-1.5 text-xs text-pharaohGold bg-pharaohGold/10 px-3 py-1 rounded-full border border-pharaohGold/20">
                <svg className="w-3.5 h-3.5 text-pharaohGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>المالك الأساسي (Owner)</span>
              </span>
            </td>
          </tr>
          
          {/* Dynamic Admins */}
          {admins.map((admin) => (
            <tr key={admin.id} className="border-b border-white/5 hover:bg-white/5 transition">
              <td className="px-6 py-4 font-bold text-white">{admin.email}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onDelete(admin.id)}
                  className="text-xs text-red-400 bg-red-400/10 px-3 py-1 rounded-full hover:bg-red-400 hover:text-white transition cursor-pointer"
                >
                  إلغاء الصلاحية ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
