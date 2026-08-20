import { useAuth } from '@/contexts/AuthContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface SidebarFooterActionsProps {
    clearingCache: boolean;
    onClearCache: () => void;
}

export default function SidebarFooterActions({
    clearingCache,
    onClearCache
}: SidebarFooterActionsProps) {
    const { logout } = useAuth();

    return (
        <div className="p-4 border-t border-pharaohGold/10 bg-[#0A192F]/60 shrink-0 space-y-2.5">
          {/* Quick Theme & Language Row */}
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="text-[11px] text-gray-400 font-bold pr-1">المظهر واللغة:</span>
            <div className="flex items-center gap-1.5">
              <ThemeSwitcher className="!w-8 !h-8 !rounded-lg" />
              <LanguageSwitcher iconOnly={true} className="!h-8 !rounded-lg" />
            </div>
          </div>

          <button 
            onClick={onClearCache}
            disabled={clearingCache}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-orange-500/5 hover:bg-orange-500/10 border border-orange-500/10 hover:border-orange-500/30 transition-all duration-300 group disabled:opacity-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-pharaohNavy font-black flex items-center justify-center shadow-md transition-all duration-300">
                {clearingCache ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                ) : (
                    <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs text-orange-400/80 font-bold group-hover:text-orange-400 transition-colors duration-300">
                  {clearingCache ? "جاري التفريغ..." : "تفريغ الذاكرة المؤقتة"}
                </p>
              </div>
            </div>
          </button>

          <button 
            onClick={logout}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 group-hover:bg-red-500 group-hover:text-pharaohNavy font-black flex items-center justify-center shadow-md transition-all duration-300">
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
              </div>
              <div className="text-right">
                <p className="text-xs text-red-400/80 font-bold group-hover:text-red-400 transition-colors duration-300">
                  تسجيل الخروج
                </p>
              </div>
            </div>
          </button>
        </div>
    );
}
