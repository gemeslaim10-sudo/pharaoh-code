'use client';

interface DashboardAccordionToolbarProps {
  totalGroups: number;
  openCount: number;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export function DashboardAccordionToolbar({
  totalGroups,
  openCount,
  onExpandAll,
  onCollapseAll,
}: DashboardAccordionToolbarProps) {
  if (totalGroups <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-3 px-1 py-1.5 text-xs text-gray-400 select-none">
      <span className="flex items-center gap-1.5 font-medium">
        <span className="w-2 h-2 rounded-full bg-pharaohGold/60" />
        <span>مجموعات الإعدادات:</span>
        <span className="font-mono font-bold text-white">{openCount}/{totalGroups} مفتوح</span>
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onExpandAll}
          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-pharaohGold/15 hover:text-pharaohGold border border-white/10 transition-colors cursor-pointer text-[11px] font-bold"
        >
          توسيع الكل ▾
        </button>
        <button
          type="button"
          onClick={onCollapseAll}
          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors cursor-pointer text-[11px] font-bold"
        >
          طي الكل ▸
        </button>
      </div>
    </div>
  );
}
