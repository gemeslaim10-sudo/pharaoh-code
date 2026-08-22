'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { DashboardSectionLayoutProps } from '@/types/dashboardLayout';
import { DashboardSectionNavbar } from './DashboardSectionNavbar';
import { DashboardAccordionGroup } from './DashboardAccordionGroup';
import { DashboardAccordionToolbar } from './DashboardAccordionToolbar';
import { useDashboardSectionLayout } from './useDashboardSectionLayout';

export function DashboardSectionLayout({
  title,
  subtitle,
  badge,
  actions,
  sections,
  activeSectionId,
  defaultSectionId,
  onSectionChange,
  showExpandCollapseAll = true,
}: DashboardSectionLayoutProps) {
  const {
    activeId,
    currentSection,
    groups,
    openCount,
    handleSelectSection,
    isGroupOpen,
    toggleGroup,
    handleExpandAll,
    handleCollapseAll,
  } = useDashboardSectionLayout(sections, activeSectionId, defaultSectionId, onSectionChange);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 text-right" dir="rtl">
      {/* ── 1. PAGE HEADER & GENERAL ACTIONS ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {title}
            </h1>
            {badge && (
              <span className="px-3 py-1 rounded-full text-xs font-black bg-pharaohGold/15 text-pharaohGold border border-pharaohGold/30 shadow-sm">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-gray-400 text-sm mt-1.5 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {actions}
          </div>
        )}
      </div>

      {/* ── 2. TOP SECTION NAVBAR (SECTIONS NAVIGATION ONLY) ── */}
      {sections.length > 1 && (
        <DashboardSectionNavbar
          sections={sections}
          activeSectionId={activeId}
          onSelectSection={handleSelectSection}
        />
      )}

      {/* ── 3. ACTIVE SECTION CONTENT (SINGLE SOURCE OF TRUTH) ── */}
      <AnimatePresence mode="wait">
        {currentSection && (
          <motion.div
            key={currentSection.id}
            id={`section-panel-${currentSection.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentSection.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Optional Section Description */}
            {currentSection.description && (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-400 flex items-center gap-2">
                <span className="text-pharaohGold font-bold">ℹ️ ملاحظة:</span>
                <span>{currentSection.description}</span>
              </div>
            )}

            {/* Direct Section Content */}
            {currentSection.content}

            {/* Accordion Groups (if provided) */}
            {groups.length > 0 && (
              <div className="space-y-4">
                {showExpandCollapseAll && (
                  <DashboardAccordionToolbar
                    totalGroups={groups.length}
                    openCount={openCount}
                    onExpandAll={handleExpandAll}
                    onCollapseAll={handleCollapseAll}
                  />
                )}

                {groups.map((group) => (
                  <DashboardAccordionGroup
                    key={group.id}
                    group={group}
                    isOpen={isGroupOpen(group.id, group.defaultOpen ?? true)}
                    onToggle={() => toggleGroup(group.id, group.defaultOpen ?? true)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
