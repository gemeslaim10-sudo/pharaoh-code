'use client';

import { RegisteredUser } from '@/types/user';
import { UsersTableRow } from './UsersTableRow';

interface UsersTableProps {
  filteredUsers: RegisteredUser[];
  searchQuery: string;
  copiedEmail: string | null;
  deletingId: string | null;
  handleCopyEmail: (email: string) => void;
  handleDeleteUser: (userId: string, userEmail: string) => void;
}

export function UsersTable({
  filteredUsers,
  searchQuery,
  copiedEmail,
  deletingId,
  handleCopyEmail,
  handleDeleteUser,
}: UsersTableProps) {
  return (
    <div className="bg-pharaohCard rounded-2xl border border-white/5 shadow-xl overflow-hidden">
      {filteredUsers.length === 0 ? (
        <div className="text-center py-16 px-4">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A16F]">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-white mb-1">لا توجد نتائج مطابقة</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            {searchQuery ? `لم يتم العثور على أي مستخدم يطابق "${searchQuery}"` : 'لا توجد بيانات مستخدمين مسجلة حتى الآن'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-black text-gray-400 uppercase tracking-wider">
                <th className="py-4 px-4 sm:px-6">المستخدم</th>
                <th className="py-4 px-4 sm:px-6">البريد الإلكتروني</th>
                <th className="py-4 px-4 sm:px-6">الرتبة</th>
                <th className="py-4 px-4 sm:px-6">تاريخ الانضمام</th>
                <th className="py-4 px-4 sm:px-6">آخر تسجيل دخول</th>
                <th className="py-4 px-4 sm:px-6 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
              {filteredUsers.map((user) => (
                <UsersTableRow
                  key={user.id}
                  user={user}
                  copiedEmail={copiedEmail}
                  deletingId={deletingId}
                  handleCopyEmail={handleCopyEmail}
                  handleDeleteUser={handleDeleteUser}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
