'use server';

import { db, serializeData } from '@/lib/firebase/admin';
import { authenticateAdmin } from './auth';

export async function getDashboardStats(idToken: string) {
  await authenticateAdmin(idToken);

  try {
    const ordersSnap = await db.collection('orders').get();
    
    // If database is empty, return zeroes instead of fallback mock data
    if (ordersSnap.empty) {
      return {
        totalOrders: 0,
        pendingLeads: 0,
        activeProjects: 0,
        generalMessages: 0
      };
    }

    let totalOrders = 0;
    let pendingLeads = 0;
    let activeProjects = 0;
    let generalMessages = 0; 

    ordersSnap.forEach(doc => {
      const data = doc.data();
      
      if (data.type === 'contact_message') {
          generalMessages++;
      } else {
          totalOrders++;
          if (data.status === 'pending') {
            pendingLeads++;
          } else if (data.status === 'contacted' || data.status === 'in_progress') {
            activeProjects++;
          }
      }
    });

    return {
      totalOrders,
      pendingLeads,
      activeProjects,
      generalMessages
    };

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw new Error('Failed to fetch dashboard stats.');
  }
}

export async function getRecentOrders(idToken: string) {
  await authenticateAdmin(idToken);

  try {
    const snapshot = await db.collection('orders').orderBy('date', 'desc').limit(10).get();
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map(doc => serializeData({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    throw new Error('Failed to fetch recent orders.');
  }
}

export async function updateOrderStatus(idToken: string, orderId: string, status: string) {
  await authenticateAdmin(idToken);

  try {
    await db.collection('orders').doc(orderId).update({ status });
    return { success: true };
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status.');
  }
}

export async function deleteOrder(idToken: string, orderId: string) {
  await authenticateAdmin(idToken);

  try {
    await db.collection('orders').doc(orderId).delete();
    return { success: true };
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new Error('Failed to delete order.');
  }
}

export async function getDashboardChartsData(idToken: string) {
  await authenticateAdmin(idToken);

  try {
    const ordersSnap = await db.collection('orders').get();
    
    // If no orders, return empty chart data
    if (ordersSnap.empty) {
      return {
        lineChartData: [0, 0, 0, 0, 0, 0, 0],
        pieChartData: [0, 0, 0, 0]
      };
    }

    // Dynamic processing
    let appCount = 0;
    let erpCount = 0;
    let webCount = 0;
    let seoCount = 0;

    // For simplicity, we just distribute based on total orders if we don't parse real dates
    // In a real app, we parse doc.data().date and group by month.
    // Let's do a simple grouping for Pie chart
    ordersSnap.forEach(doc => {
        const data = doc.data();
        const service = data.service || '';
        
        if (service.includes('تطبيق') || service.includes('جوال')) appCount++;
        else if (service.includes('ERP') || service.includes('سيستم')) erpCount++;
        else if (service.includes('موقع') || service.includes('ويب')) webCount++;
        else seoCount++;
    });

    // If counts are zero, return empty arrays
    if (appCount === 0 && erpCount === 0 && webCount === 0 && seoCount === 0) {
        return {
            lineChartData: [0, 0, 0, 0, 0, 0, 0],
            pieChartData: [0, 0, 0, 0]
        };
    }

    // const total = appCount + erpCount + webCount + seoCount;
    return {
        // Just return zeros for line chart until dates are parsed
        lineChartData: [0, 0, 0, 0, 0, 0, 0],
        pieChartData: [
            appCount, 
            erpCount, 
            webCount, 
            seoCount
        ]
    };
  } catch (error) {
    console.error('Error fetching charts data:', error);
    throw new Error('Failed to fetch charts data.');
  }
}

export async function getProjectRequests(idToken: string) {
  await authenticateAdmin(idToken);

  try {
    const snapshot = await db.collection('orders')
      .where('type', '==', 'project_request')
      .orderBy('createdAt', 'desc')
      .get();
      
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map(doc => serializeData({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error: any) {
    console.error('Error fetching project requests:', error);
    throw new Error(error.message || 'Failed to fetch project requests.');
  }
}
