'use client';

import { UsersStats } from './useUsersManagement';

interface UsersStatsGridProps {
  stats: UsersStats;
}

export function UsersStatsGrid({ stats }: UsersStatsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* Total Users */}
      <div className="bg-white dark:bg-pharaohCard p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-lg relative overflow-hidden group hover:border-amber-500/30 dark:hover:border-pharaohGold/30 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 dark:bg-pharaohGold/5 rounded-full blur-2xl pointer-events-none" />
        <span className="text-xs text-slate-600 dark:text-gray-400 font-bold block mb-1">إجمالي المسجلين</span>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stats.totalUsers}</span>
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-pharaohGold/10 text-amber-800 dark:text-pharaohGold flex items-center justify-center">
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Admins */}
      <div className="bg-white dark:bg-pharaohCard p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-lg relative overflow-hidden group hover:border-amber-500/30 dark:hover:border-pharaohGold/30 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        <span className="text-xs text-slate-600 dark:text-gray-400 font-bold block mb-1">مدراء النظام</span>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-black text-amber-800 dark:text-pharaohGold tracking-tight">{stats.adminCount}</span>
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Members */}
      <div className="bg-white dark:bg-pharaohCard p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-lg relative overflow-hidden group hover:border-amber-500/30 dark:hover:border-pharaohGold/30 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
        <span className="text-xs text-slate-600 dark:text-gray-400 font-bold block mb-1">العملاء والأعضاء</span>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tight">{stats.memberCount}</span>
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Active Recent */}
      <div className="bg-white dark:bg-pharaohCard p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-lg relative overflow-hidden group hover:border-amber-500/30 dark:hover:border-pharaohGold/30 transition-all">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
        <span className="text-xs text-slate-600 dark:text-gray-400 font-bold block mb-1">نشطون مؤخراً</span>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">{stats.activeRecentCount}</span>
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
