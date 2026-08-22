'use client';

interface UsersSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  roleFilter: 'all' | 'admin' | 'member';
  setRoleFilter: (role: 'all' | 'admin' | 'member') => void;
  totalCount: number;
  adminCount: number;
  memberCount: number;
}

export function UsersSearchBar({
  searchQuery,
  setSearchQuery,
  roleFilter,
  setRoleFilter,
  totalCount,
  adminCount,
  memberCount,
}: UsersSearchBarProps) {
  return (
    <div className="bg-white dark:bg-pharaohCard p-4 rounded-2xl border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shadow-sm dark:shadow-lg">
      {/* Search */}
      <div className="relative flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="بحث بالاسم أو البريد الإلكتروني أو المعرف..."
          className="w-full bg-slate-50 dark:bg-[#0A192F] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-pharaohGold transition-colors pr-10 placeholder:text-slate-400 dark:placeholder:text-gray-500"
        />
        <svg
          className="w-4 h-4 text-slate-400 dark:text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white text-xs cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {/* Role Filter Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#0A192F] p-1 rounded-xl border border-slate-200 dark:border-white/10 shrink-0">
        <button
          onClick={() => setRoleFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            roleFilter === 'all'
              ? 'bg-pharaohGold text-[#0A192F] shadow-sm'
              : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          الكل ({totalCount})
        </button>
        <button
          onClick={() => setRoleFilter('admin')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            roleFilter === 'admin'
              ? 'bg-pharaohGold text-[#0A192F] shadow-sm'
              : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>المدراء</span>
          <span>({adminCount})</span>
        </button>
        <button
          onClick={() => setRoleFilter('member')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            roleFilter === 'member'
              ? 'bg-pharaohGold text-[#0A192F] shadow-sm'
              : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>الأعضاء</span>
          <span>({memberCount})</span>
        </button>
      </div>
    </div>
  );
}
