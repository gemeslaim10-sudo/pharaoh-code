export interface NotificationItem {
  id?: string;
  type: string;
  title: string;
  createdAt: string;
  style?: string;
  [key: string]: any;
}
