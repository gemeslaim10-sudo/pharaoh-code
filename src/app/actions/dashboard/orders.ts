'use server';

import * as statsModule from './ordersStats';
import * as fetchersModule from './ordersFetchers';
import * as mutationsModule from './ordersMutations';

export async function getDashboardStats(idToken: string) {
  return statsModule.getDashboardStats(idToken);
}

export async function getDashboardChartsData(idToken: string) {
  return statsModule.getDashboardChartsData(idToken);
}

export async function getRecentOrders(idToken: string) {
  return fetchersModule.getRecentOrders(idToken);
}

export async function getProjectRequests(idToken: string) {
  return fetchersModule.getProjectRequests(idToken);
}

export async function updateOrderStatus(idToken: string, orderId: string, status: string) {
  return mutationsModule.updateOrderStatus(idToken, orderId, status);
}

export async function deleteOrder(idToken: string, orderId: string) {
  return mutationsModule.deleteOrder(idToken, orderId);
}
