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
      rounded-2xl border transition-all duration-300 overflow-hidden shadow-lg
      ${isOpen
        ? 'bg-pharaohCard/95 border-pharaohGold/30 shadow-[0_10px_30px_rgba(0,0,0,0.35)]'
        : 'bg-[#0B1728]/80 border-white/5 hover:border-white/15'
      }
    `}>
      {/* Accordion Header */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggle(); }}
        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none text-right"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Icon or Status Indicator */}
          {group.icon ? (
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
              isOpen
                ? 'bg-pharaohGold/15 text-pharaohGold border-pharaohGold/40 shadow-sm'
                : 'bg-white/5 text-gray-400 border-white/10'
            }`}>
              {group.icon}
            </div>
          ) : (
            <div className={`w-2.5 h-2.5 rounded-full shrink-0 transition-colors ${
              isOpen ? 'bg-pharaohGold shadow-[0_0_8px_#C5A16F]' : 'bg-gray-600'
            }`} />
          )}

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`text-sm sm:text-base font-black tracking-tight ${
                isOpen ? 'text-white' : 'text-gray-200'
              }`}>
                {group.title}
              </h3>
              {group.badge && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/10 text-gray-300 border border-white/10">
                  {group.badge}
                </span>
              )}
            </div>
            {group.description && (
              <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xl">
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
            isOpen ? 'bg-pharaohGold/15 text-pharaohGold rotate-180' : 'bg-white/5 text-gray-400'
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
            className="overflow-hidden border-t border-white/5"
          >
            <div className="p-4 sm:p-6 bg-[#070F1E]/40 space-y-6">
              {group.children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
