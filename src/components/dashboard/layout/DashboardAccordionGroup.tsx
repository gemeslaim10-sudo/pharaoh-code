'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { DashboardSettingsGroup } from '@/types/dashboardLayout';

interface DashboardAccordionGroupProps {
  group: DashboardSettingsGroup;
  isOpen: boolean;
  onToggle: () => void;
}

export function DashboardAccordionGroup({
  group,
  isOpen,
  onToggle,
}: DashboardAccordionGroupProps) {
  return (
    <div className={`
      dashboard-accordion rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm
      ${isOpen
        ? 'bg-white dark:bg-pharaohCard/95 border-pharaohGold/40 dark:border-pharaohGold/30 shadow-[0_8px_25px_rgba(197,161,111,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]'
        : 'bg-white dark:bg-[#0B1728]/80 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 hover:bg-slate-50/50 dark:hover:bg-[#0E1E36]'
      }
    `}>
      {/* Accordion Header */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggle(); }}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none text-right transition-colors"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Icon or Status Indicator */}
          {group.icon ? (
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
              isOpen
                ? 'bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold border-pharaohGold/40 shadow-sm'
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 border-slate-200 dark:border-white/10'
            }`}>
              {group.icon}
            </div>
          ) : (
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 transition-colors ${
              isOpen ? 'bg-pharaohGold shadow-[0_0_8px_#C5A16F]' : 'bg-slate-300 dark:bg-gray-600'
            }`} />
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`text-sm sm:text-base font-black tracking-tight ${
                isOpen ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-gray-200'
              }`}>
                {group.title}
              </h3>
              {group.badge && (
                <span className="inline-flex items-center leading-none px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/10">
                  {group.badge}
                </span>
              )}
            </div>
            {group.description && (
              <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 truncate max-w-xl">
                {group.description}
              </p>
            )}
          </div>
        </div>

        {/* Right side controls: Actions + Chevron */}
        <div className="flex items-center gap-2 shrink-0">
          {group.actions && (
            <div onClick={(e) => e.stopPropagation()}>
              {group.actions}
            </div>
          )}

          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isOpen ? 'bg-pharaohGold/15 text-amber-800 dark:text-pharaohGold rotate-180 border border-pharaohGold/30' : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 border border-slate-200 dark:border-transparent'
          }`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Accordion Collapsible Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-200 dark:border-white/5"
          >
            <div className="p-4 sm:p-6 bg-slate-50/60 dark:bg-[#070F1E]/40 space-y-6">
              {group.children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
