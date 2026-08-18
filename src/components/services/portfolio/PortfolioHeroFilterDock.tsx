'use client';

import { motion } from 'framer-motion';

export interface PortfolioFilterItem {
  label: string;
  filter: string;
  count: number;
}

interface PortfolioHeroFilterDockProps {
  filterOptions: PortfolioFilterItem[];
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  isLight: boolean;
}

export function PortfolioHeroFilterDock({
  filterOptions,
  activeFilter,
  onSelectFilter,
  isLight,
}: PortfolioHeroFilterDockProps) {
  return (
    <div className="flex justify-center mb-8 sm:mb-10">
      <div className={`inline-flex flex-wrap items-center justify-center p-1 rounded-xl sm:rounded-full border backdrop-blur-xl transition-all shadow-md gap-1 relative ${
        isLight
          ? 'bg-slate-100/90 border-slate-200/90 shadow-slate-200/50'
          : 'bg-[#091528]/85 border-white/10 shadow-black/20'
      }`}>
        {filterOptions.map(({ label, filter, count }) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => onSelectFilter(filter)}
              data-active={isActive ? "true" : "false"}
              className={`filter-btn portfolio-filter-btn relative px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-full text-xs font-bold transition-colors duration-200 flex items-center gap-1.5 select-none ${
                isActive
                  ? 'active !text-[#070F1E] font-black'
                  : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="portfolioActivePill"
                  className="absolute inset-0 bg-gradient-to-r from-[#C5A16F] via-[#DFB77D] to-[#C5A16F] rounded-lg sm:rounded-full shadow-[0_2px_10px_rgba(197,161,111,0.35)]"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className={`relative z-10 ${isActive ? "!text-[#070F1E] font-black" : ""}`}>{label}</span>
              {count > 0 && (
                <span className={`relative z-10 count-badge text-[9px] px-1.5 py-0.2 rounded-full font-mono font-black transition-colors ${
                  isActive
                    ? 'bg-[#070F1E]/15 !text-[#070F1E]'
                    : isLight
                      ? 'bg-slate-200/80 text-slate-700'
                      : 'bg-white/10 text-gray-400'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
