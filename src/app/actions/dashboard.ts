'use server';

import { getDashboardStats as _getDashboardStats, getRecentOrders as _getRecentOrders, updateOrderStatus as _updateOrderStatus, getDashboardChartsData as _getDashboardChartsData } from './dashboard/orders';
import { getReviews as _getReviews, approveReview as _approveReview, deleteReview as _deleteReview } from './dashboard/reviews';
import { getRecentNotifications as _getRecentNotifications } from './dashboard/notifications';
import { seedDashboardData as _seedDashboardData } from './dashboard/seed';
import { getServices as _getServices, addService as _addService, updateService as _updateService, deleteService as _deleteService } from './dashboard/services';
import { getClients as _getClients, addClient as _addClient, updateClient as _updateClient, deleteClient as _deleteClient } from './dashboard/clients';
import { getStatsContent as _getStatsContent, updateStatsContent as _updateStatsContent } from './dashboard/stats';

export async function getDashboardStats(idToken: string) { return _getDashboardStats(idToken); }
export async function getRecentOrders(idToken: string) { return _getRecentOrders(idToken); }
export async function updateOrderStatus(idToken: string, orderId: string, status: string) { return _updateOrderStatus(idToken, orderId, status); }
export async function getDashboardChartsData(idToken: string) { return _getDashboardChartsData(idToken); }

export async function getReviews(idToken: string) { return _getReviews(idToken); }
export async function approveReview(idToken: string, reviewId: string) { return _approveReview(idToken, reviewId); }
export async function deleteReview(idToken: string, reviewId: string) { return _deleteReview(idToken, reviewId); }

export async function getRecentNotifications(idToken: string) { return _getRecentNotifications(idToken); }
export async function seedDashboardData(idToken: string) { return _seedDashboardData(idToken); }

export async function getServices() { return _getServices(); }
export async function addService(idToken: string, serviceData: any) { return _addService(idToken, serviceData); }
export async function updateService(idToken: string, id: string, serviceData: any) { return _updateService(idToken, id, serviceData); }
export async function deleteService(idToken: string, id: string) { return _deleteService(idToken, id); }

export async function getClients() { return _getClients(); }
export async function addClient(idToken: string, clientData: any) { return _addClient(idToken, clientData); }
export async function updateClient(idToken: string, id: string, clientData: any) { return _updateClient(idToken, id, clientData); }
export async function deleteClient(idToken: string, id: string) { return _deleteClient(idToken, id); }

export async function getStatsContent() { return _getStatsContent(); }
export async function updateStatsContent(idToken: string, statsData: any) { return _updateStatsContent(idToken, statsData); }

