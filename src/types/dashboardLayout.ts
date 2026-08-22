import { ReactNode } from 'react';

export interface DashboardSettingsGroup {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  badge?: string | number;
  defaultOpen?: boolean;
  actions?: ReactNode;
  children: ReactNode;
}

export interface DashboardSectionConfig {
  id: string;
  label: string;
  labelEn?: string;
  icon?: ReactNode;
  badge?: string | number;
  description?: string;
  groups?: DashboardSettingsGroup[];
  content?: ReactNode;
}

export interface DashboardSectionLayoutProps {
  title: string;
  subtitle?: string;
  badge?: string;
  actions?: ReactNode;
  sections: DashboardSectionConfig[];
  activeSectionId?: string;
  defaultSectionId?: string;
  onSectionChange?: (sectionId: string) => void;
  showExpandCollapseAll?: boolean;
}
