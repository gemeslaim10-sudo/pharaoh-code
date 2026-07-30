'use server';

import { db } from '@/lib/firebase/admin';
import { authenticateAdmin } from './auth';

export async function getDashboardStats(idToken: string) {
  await authenticateAdmin(idToken);

  try {
    const ordersSnap = await db.collection('orders').get();
    
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

export async function getDashboardChartsData(idToken: string) {
  await authenticateAdmin(idToken);

  try {
    const ordersSnap = await db.collection('orders').get();
    
    if (ordersSnap.empty) {
      return {
        lineChartData: [0, 0, 0, 0, 0, 0, 0],
        pieChartData: [0, 0, 0, 0]
      };
    }

    let appCount = 0;
    let erpCount = 0;
    let webCount = 0;
    let seoCount = 0;

    ordersSnap.forEach(doc => {
        const data = doc.data();
        const service = data.service || '';
        
        if (service.includes('تطبيق') || service.includes('جوال')) appCount++;
        else if (service.includes('ERP') || service.includes('سيستم')) erpCount++;
        else if (service.includes('موقع') || service.includes('ويب')) webCount++;
        else seoCount++;
    });

    if (appCount === 0 && erpCount === 0 && webCount === 0 && seoCount === 0) {
        return {
            lineChartData: [0, 0, 0, 0, 0, 0, 0],
            pieChartData: [0, 0, 0, 0]
        };
    }

    return {
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
