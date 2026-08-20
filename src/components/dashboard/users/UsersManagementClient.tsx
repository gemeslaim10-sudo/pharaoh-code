'use client';

import { useState, useTransition } from 'react';
import { RegisteredUser, getRegisteredUsersAction, deleteRegisteredUserAction } from '@/app/actions/dashboard/users';
import { auth } from '@/lib/firebase/config';

interface UsersManagementClientProps {
  initialUsers: RegisteredUser[];
  initialStats: {
    totalUsers: number;
    adminCount: number;
    memberCount: number;
    activeRecentCount: number;
  };
}

export default function UsersManagementClient({
  initialUsers,
  initialStats,
}: UsersManagementClientProps) {
  const [users, setUsers] = useState<RegisteredUser[]>(initialUsers);
  const [stats, setStats] = useState(initialStats);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'member'>('all');
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Filter users based on search and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.uid?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (roleFilter === 'admin') return user.isAdmin;
    if (roleFilter === 'member') return !user.isAdmin;
    return true;
  });

  const handleRefresh = () => {
    startTransition(async () => {
      const res = await getRegisteredUsersAction();
      if (res.success) {
        setUsers(res.users);
        setStats(res.stats);
      }
    });
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (!confirm(`هل أنت متأكد من حذف سجل المستخدم (${userEmail}) من قاعدة البيانات؟`)) {
      return;
    }

    setDeletingId(userId);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        alert('يرجى تسجيل الدخول مجدداً لتنفيذ هذا الإجراء');
        return;
      }

      const res = await deleteRegisteredUserAction(token, userId);
      if (res.success) {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        setStats((prev) => ({
          ...prev,
          totalUsers: Math.max(0, prev.totalUsers - 1),
        }));
      } else {
        alert(res.error || 'فشل حذف المستخدم');
      }
    } catch (err: any) {
      alert(err.message || 'حدث خطأ غير متوقع');
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportCSV = () => {
    if (filteredUsers.length === 0) {
      alert('لا توجد بيانات للتصدير');
      return;
    }

    const headers = ['الاسم', 'البريد الإلكتروني', 'الرتبة', 'المزود', 'تاريخ التسجيل', 'آخر تسجيل دخول', 'معرف المستخدم (UID)'];
    const rows = filteredUsers.map((u) => [
      `"${u.displayName || ''}"`,
      `"${u.email || ''}"`,
      `"${u.isAdmin ? 'مدير النظام' : 'عضو'}"`,
      `"${u.provider || 'google'}"`,
      `"${u.createdAt ? new Date(u.createdAt).toLocaleDateString('ar-EG') : 'غير متوفر'}"`,
      `"${u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString('ar-EG') : 'غير متوفر'}"`,
      `"${u.uid || u.id}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `registered_users_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-pharaohCard p-6 rounded-2xl border border-pharaohGold/15 shadow-xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#C5A16F]/10 border border-[#C5A16F]/30 flex items-center justify-center text-[#C5A16F]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span>بيانات المستخدمين والعملاء المسجلين</span>
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            متابعة وإدارة حسابات العملاء والمستخدمين الذين سجلوا دخولهم في المنصة
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={handleRefresh}
            disabled={isPending}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-pharaohGold/40 text-gray-200 hover:text-pharaohGold text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <svg
              className={`w-4 h-4 ${isPending ? 'animate-spin text-pharaohGold' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{isPending ? 'جاري التحديث...' : 'تحديث القائمة'}</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-pharaohGold/10 border border-pharaohGold/30 hover:bg-pharaohGold hover:text-[#0A192F] text-pharaohGold text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>تصدير CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Users */}
        <div className="bg-pharaohCard p-4 sm:p-5 rounded-2xl border border-white/5 shadow-lg relative overflow-hidden group hover:border-pharaohGold/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-pharaohGold/5 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs text-gray-400 font-bold block mb-1">إجمالي المسجلين</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{stats.totalUsers}</span>
            <div className="w-8 h-8 rounded-xl bg-pharaohGold/10 text-pharaohGold flex items-center justify-center">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Admins */}
        <div className="bg-pharaohCard p-4 sm:p-5 rounded-2xl border border-white/5 shadow-lg relative overflow-hidden group hover:border-pharaohGold/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs text-gray-400 font-bold block mb-1">مدراء النظام</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-pharaohGold tracking-tight">{stats.adminCount}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Members */}
        <div className="bg-pharaohCard p-4 sm:p-5 rounded-2xl border border-white/5 shadow-lg relative overflow-hidden group hover:border-pharaohGold/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs text-gray-400 font-bold block mb-1">العملاء والأعضاء</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-blue-400 tracking-tight">{stats.memberCount}</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Recent */}
        <div className="bg-pharaohCard p-4 sm:p-5 rounded-2xl border border-white/5 shadow-lg relative overflow-hidden group hover:border-pharaohGold/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs text-gray-400 font-bold block mb-1">نشطون مؤخراً</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">{stats.activeRecentCount}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-pharaohCard p-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shadow-lg">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم أو البريد الإلكتروني أو المعرف..."
            className="w-full bg-[#0A192F] text-white border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-pharaohGold transition-colors pr-10"
          />
          <svg
            className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Role Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#0A192F] p-1 rounded-xl border border-white/10 shrink-0">
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              roleFilter === 'all'
                ? 'bg-pharaohGold text-[#0A192F] shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            الكل ({users.length})
          </button>
          <button
            onClick={() => setRoleFilter('admin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              roleFilter === 'admin'
                ? 'bg-pharaohGold text-[#0A192F] shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>المدراء</span>
            <span>({stats.adminCount})</span>
          </button>
          <button
            onClick={() => setRoleFilter('member')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              roleFilter === 'member'
                ? 'bg-pharaohGold text-[#0A192F] shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>الأعضاء</span>
            <span>({stats.memberCount})</span>
          </button>
        </div>
      </div>

      {/* Users Table / List */}
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
                {filteredUsers.map((user) => {
                  const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();

                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* User Avatar & Name */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-[#C5A16F] via-[#DFB77D] to-[#9E7D47] shrink-0 shadow-md">
                            <div className="w-full h-full rounded-full overflow-hidden bg-[#0A192F] flex items-center justify-center">
                              {user.photoURL ? (
                                <img
                                  src={user.photoURL}
                                  alt={user.displayName}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <span className="font-serif font-black text-xs text-pharaohGold">
                                  {initial}
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="font-bold text-white block group-hover:text-pharaohGold transition-colors">
                              {user.displayName || 'مستخدم بدون اسم'}
                            </span>
                            <span className="text-[10px] text-gray-500 font-mono block">
                              UID: {user.uid ? user.uid.slice(0, 12) + '...' : user.id.slice(0, 12)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-gray-300 dir-ltr text-xs">
                            {user.email}
                          </span>
                          <button
                            onClick={() => handleCopyEmail(user.email)}
                            title="نسخ البريد الإلكتروني"
                            className="text-gray-500 hover:text-pharaohGold transition-colors p-1 cursor-pointer"
                          >
                            {copiedEmail === user.email ? (
                              <span className="text-emerald-400 text-[10px] font-bold">تم!</span>
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
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-pharaohGold/15 text-pharaohGold border border-pharaohGold/30 shadow-sm">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>مدير النظام</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>عضو</span>
                          </span>
                        )}
                      </td>

                      {/* Member Since */}
                      <td className="py-4 px-4 sm:px-6 text-gray-400 text-xs">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString('ar-EG', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : '—'}
                      </td>

                      {/* Last Login */}
                      <td className="py-4 px-4 sm:px-6 text-gray-300 text-xs font-mono">
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
                          className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center mx-auto cursor-pointer disabled:opacity-50"
                        >
                          {deletingId === user.id ? (
                            <svg className="w-3.5 h-3.5 animate-spin text-red-400" fill="none" viewBox="0 0 24 24">
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
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
