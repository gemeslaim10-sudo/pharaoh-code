'use client';

import { RegisteredUser } from '@/types/user';
import { useUsersManagement, UsersStats } from './useUsersManagement';
import { UsersHeader } from './UsersHeader';
import { UsersStatsGrid } from './UsersStatsGrid';
import { UsersSearchBar } from './UsersSearchBar';
import { UsersTable } from './UsersTable';

interface UsersManagementClientProps {
  initialUsers: RegisteredUser[];
  initialStats: UsersStats;
}

export default function UsersManagementClient({
  initialUsers,
  initialStats,
}: UsersManagementClientProps) {
  const {
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
  } = useUsersManagement(initialUsers, initialStats);

  return (
    <div className="space-y-6 text-right" dir="rtl">
      {/* Top Header */}
      <UsersHeader
        handleRefresh={handleRefresh}
        handleExportCSV={handleExportCSV}
        isPending={isPending}
      />

      {/* KPI Stats Grid */}
      <UsersStatsGrid stats={stats} />

      {/* Filter and Search Bar */}
      <UsersSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        totalCount={users.length}
        adminCount={stats.adminCount}
        memberCount={stats.memberCount}
      />

      {/* Users Table / List */}
      <UsersTable
        filteredUsers={filteredUsers}
        searchQuery={searchQuery}
        copiedEmail={copiedEmail}
        deletingId={deletingId}
        handleCopyEmail={handleCopyEmail}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
}
