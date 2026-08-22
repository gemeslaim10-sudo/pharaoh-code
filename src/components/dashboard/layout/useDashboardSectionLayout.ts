'use client';

import { useState, useMemo } from 'react';
import { DashboardSectionConfig } from '@/types/dashboardLayout';

export function useDashboardSectionLayout(
  sections: DashboardSectionConfig[],
  controlledActiveId?: string,
  defaultSectionId?: string,
  onSectionChange?: (sectionId: string) => void
) {
  const initialId = defaultSectionId || (sections.length > 0 && sections[0] ? sections[0].id : '');
  const [internalActiveId, setInternalActiveId] = useState(initialId);
  const activeId = controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  const handleSelectSection = (sectionId: string) => {
    setInternalActiveId(sectionId);
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  const currentSection = useMemo(() => {
    return sections.find((s) => s.id === activeId) || sections[0];
  }, [sections, activeId]);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const groups = currentSection?.groups || [];

  const isGroupOpen = (groupId: string, defaultOpen: boolean = true) => {
    return openGroups[groupId] !== undefined ? openGroups[groupId] : defaultOpen;
  };

  const toggleGroup = (groupId: string, defaultOpen: boolean = true) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !isGroupOpen(groupId, defaultOpen),
    }));
  };

  const handleExpandAll = () => {
    const next: Record<string, boolean> = { ...openGroups };
    groups.forEach((g) => { next[g.id] = true; });
    setOpenGroups(next);
  };

  const handleCollapseAll = () => {
    const next: Record<string, boolean> = { ...openGroups };
    groups.forEach((g) => { next[g.id] = false; });
    setOpenGroups(next);
  };

  const openCount = groups.filter((g) => isGroupOpen(g.id, g.defaultOpen ?? true)).length;

  return {
    activeId,
    currentSection,
    groups,
    openCount,
    handleSelectSection,
    isGroupOpen,
    toggleGroup,
    handleExpandAll,
    handleCollapseAll,
  };
}
