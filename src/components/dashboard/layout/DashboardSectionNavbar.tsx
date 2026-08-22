'use client';

import { motion } from 'framer-motion';
import { DashboardSectionConfig } from '@/types/dashboardLayout';

interface DashboardSectionNavbarProps {
  sections: DashboardSectionConfig[];
  activeSectionId: string;
  onSelectSection: (sectionId: string) => void;
}

export function DashboardSectionNavbar({
  sections,
  activeSectionId,
  onSelectSection,
}: DashboardSectionNavbarProps) {
  return (
    <nav
      aria-label="Page Sections Navigation"
      className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 pt-1 border-b border-slate-200 dark:border-white/10 select-none"
    >
      {sections.map((section, idx) => {
        const isActive = activeSectionId === section.id;
        const indexNumber = String(idx + 1).padStart(2, '0');

        return (
          <button
            key={section.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`section-panel-${section.id}`}
            onClick={() => onSelectSection(section.id)}
            className={`
              relative px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer
              ${isActive
                ? 'bg-white dark:bg-[#112240] text-amber-800 dark:text-pharaohGold border border-pharaohGold/60 shadow-[0_2px_12px_rgba(197,161,111,0.15)] dark:shadow-[0_0_15px_rgba(197,161,111,0.2)]'
                : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-200/60 dark:hover:bg-white/[0.06]'
              }
            `}
          >
            {/* Active Highlight Glow Bar */}
            {isActive && (
              <motion.div
                layoutId="activeSectionIndicator"
                className="absolute inset-0 rounded-xl bg-pharaohGold/10 border border-pharaohGold/40 pointer-events-none"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}

            {/* Index Badge or Icon */}
            {section.icon ? (
              <span className="shrink-0">{section.icon}</span>
            ) : (
              <span className={`text-[10px] font-mono font-black ${isActive ? 'text-amber-800 dark:text-pharaohGold' : 'text-slate-400 dark:text-gray-500'}`}>
                {indexNumber}.
              </span>
            )}

            {/* Label */}
            <span className="relative z-10">{section.label}</span>

            {/* Optional Counter / Badge */}
            {section.badge !== undefined && (
              <span className={`
                px-2 py-0.5 rounded-full text-[10px] font-mono font-bold
                ${isActive ? 'bg-amber-100 dark:bg-pharaohGold/20 text-amber-800 dark:text-pharaohGold' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-gray-400'}
              `}>
                {section.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
