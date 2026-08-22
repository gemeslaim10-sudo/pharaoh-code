'use client';

import { RegisteredUser } from '@/types/user';

interface UsersTableRowProps {
  user: RegisteredUser;
  copiedEmail: string | null;
  deletingId: string | null;
  handleCopyEmail: (email: string) => void;
  handleDeleteUser: (userId: string, userEmail: string) => void;
}

export function UsersTableRow({
  user,
  copiedEmail,
  deletingId,
  handleCopyEmail,
  handleDeleteUser,
}: UsersTableRowProps) {
  const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();

  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
      {/* User Avatar & Name */}
      <td className="py-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-[#C5A16F] via-[#DFB77D] to-[#9E7D47] shrink-0 shadow-md">
            <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-[#0A192F] flex items-center justify-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="font-serif font-black text-xs text-amber-800 dark:text-pharaohGold">
                  {initial}
                </span>
              )}
            </div>
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white block group-hover:text-amber-800 dark:group-hover:text-pharaohGold transition-colors">
              {user.displayName || 'مستخدم بدون اسم'}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-gray-500 font-mono block">
              UID: {user.uid ? user.uid.slice(0, 12) + '...' : user.id.slice(0, 12)}
            </span>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="py-4 px-4 sm:px-6">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-slate-700 dark:text-gray-300 dir-ltr text-xs">
            {user.email}
          </span>
          <button
            onClick={() => handleCopyEmail(user.email)}
            title="نسخ البريد الإلكتروني"
            className="text-slate-400 dark:text-gray-500 hover:text-amber-800 dark:hover:text-pharaohGold transition-colors p-1 cursor-pointer"
          >
            {copiedEmail === user.email ? (
              <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">تم!</span>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </td>

      {/* Role */}
      <td className="py-4 px-4 sm:px-6">
        {user.isAdmin ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-800 dark:text-pharaohGold border border-amber-500/30 dark:border-pharaohGold/30 shadow-sm">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>مدير النظام</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>عضو</span>
          </span>
        )}
      </td>

      {/* Member Since */}
      <td className="py-4 px-4 sm:px-6 text-slate-600 dark:text-gray-400 text-xs">
        {user.createdAt
          ? new Date(user.createdAt).toLocaleDateString('ar-EG', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          : '—'}
      </td>

      {/* Last Login */}
      <td className="py-4 px-4 sm:px-6 text-slate-700 dark:text-gray-300 text-xs font-mono">
        {user.lastLoginAt
          ? new Date(user.lastLoginAt).toLocaleString('ar-EG', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '—'}
      </td>

      {/* Actions */}
      <td className="py-4 px-4 sm:px-6 text-center">
        <button
          onClick={() => handleDeleteUser(user.id, user.email)}
          disabled={deletingId === user.id}
          title="حذف سجل المستخدم"
          className="w-7 h-7 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center mx-auto cursor-pointer disabled:opacity-50"
        >
          {deletingId === user.id ? (
            <svg className="w-3.5 h-3.5 animate-spin text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
        </button>
      </td>
    </tr>
  );
}
