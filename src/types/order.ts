export type OrderStatus = 'pending' | 'contacted' | 'in_progress' | 'completed' | 'cancelled' | 'rejected';
export type OrderType = 'project_request' | 'contact_message';

export interface OrderItem {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  goal?: string;
  budget?: string;
  source?: string;
  details?: string;
  date?: string;
  status: OrderStatus | string;
  revenue?: number;
  type?: OrderType | string;
  createdAt?: string;
  [key: string]: any;
}

export interface DashboardStatsData {
  totalOrders: number;
  pendingLeads: number;
  activeProjects: number;
  generalMessages: number;
}

export interface DashboardChartsPayload {
  lineChartData: number[];
  pieChartData: number[];
  totalOrdersCount: number;
  activeOrdersCount: number;
}
