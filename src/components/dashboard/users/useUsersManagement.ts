'use client';

import { useState, useTransition, useEffect, useCallback } from 'react';
import { type RegisteredUser } from '@/types/user';
import { getRegisteredUsersAction, deleteRegisteredUserAction } from '@/app/actions/dashboard/users';
import { auth } from '@/lib/firebase/config';

export interface UsersStats {
  totalUsers: number;
  adminCount: number;
  memberCount: number;
  activeRecentCount: number;
}

export function useUsersManagement(initialUsers: RegisteredUser[], initialStats: UsersStats) {
  const [users, setUsers] = useState<RegisteredUser[]>(initialUsers);
  const [stats, setStats] = useState<UsersStats>(initialStats);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'member'>('all');
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [error, setError] = useState('');

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

  const handleRefresh = useCallback(() => {
    startTransition(async () => {
      setError('');
      try {
        const token = await auth.currentUser?.getIdToken();
        if (!token) throw new Error('Unauthorized');
        const res = await getRegisteredUsersAction(token);
        if (!res.success) throw new Error('Failed to load users');
        setUsers(res.users);
        setStats(res.stats);
      } catch {
        setUsers([]);
        setStats({ totalUsers: 0, adminCount: 0, memberCount: 0, activeRecentCount: 0 });
        setError('تعذر تحميل المستخدمين. تحقق من صلاحياتك ثم أعد المحاولة.');
      }
    });
  }, []);

  useEffect(() => { handleRefresh(); }, [handleRefresh]);

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
        handleRefresh();
      } else {
        alert(res.error || 'فشل حذف المستخدم');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      alert(message);
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

  return {
    error,
    users,
    stats,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    isPending,
    deletingId,
    copiedEmail,
    filteredUsers,
    handleRefresh,
    handleCopyEmail,
    handleDeleteUser,
    handleExportCSV,
  };
}
