'use client';

interface UsersHeaderProps {
  handleRefresh: () => void;
  handleExportCSV: () => void;
  isPending: boolean;
}

export function UsersHeader({ handleRefresh, handleExportCSV, isPending }: UsersHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-pharaohCard p-6 rounded-2xl border border-slate-200 dark:border-pharaohGold/15 shadow-md dark:shadow-xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-[#C5A16F]/10 border border-amber-500/30 dark:border-[#C5A16F]/30 flex items-center justify-center text-amber-800 dark:text-[#C5A16F]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <span>بيانات المستخدمين والعملاء المسجلين</span>
        </h1>
        <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
          متابعة وإدارة حسابات العملاء والمستخدمين الذين سجلوا دخولهم في المنصة
        </p>
      </div>

      <div className="flex items-center gap-2 self-stretch sm:self-auto">
        <button
          onClick={handleRefresh}
          disabled={isPending}
          className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-amber-500/40 dark:hover:border-pharaohGold/40 text-slate-700 dark:text-gray-200 hover:text-amber-800 dark:hover:text-pharaohGold text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <svg
            className={`w-4 h-4 ${isPending ? 'animate-spin text-amber-800 dark:text-pharaohGold' : ''}`}
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
          className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500/10 dark:bg-pharaohGold/10 border border-amber-500/30 dark:border-pharaohGold/30 hover:bg-amber-600 dark:hover:bg-pharaohGold hover:text-white dark:hover:text-[#0A192F] text-amber-800 dark:text-pharaohGold text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>تصدير CSV</span>
        </button>
      </div>
    </div>
  );
}
