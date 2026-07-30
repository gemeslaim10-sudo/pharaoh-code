'use server';

import { db } from '@/lib/firebase/admin';
import { sanitizeInput } from './utils';

export async function submitProjectRequest(formData: FormData) {
    try {
        const name = sanitizeInput(formData.get('name') as string, 100);
        const phone = sanitizeInput(formData.get('phone') as string, 20);
        const service = sanitizeInput(formData.get('service') as string, 100);
        const details = sanitizeInput(formData.get('details') as string, 2000);

        if (!name || !phone || !service) {
            throw new Error('جميع الحقول مطلوبة');
        }

        const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const timestamp = new Date().toISOString();

        const batch = db.batch();

        // 1. Add to orders
        const orderRef = db.collection('orders').doc();
        batch.set(orderRef, {
            name,
            phone,
            email: 'تم الإرسال من الواتساب', // Fallback since start-project doesn't have email
            service,
            details,
            date,
            status: 'pending',
            createdAt: timestamp,
            revenue: 0,
            type: 'project_request'
        });

        // 2. Add to notifications
        const notifRef = db.collection('notifications').doc();
        batch.set(notifRef, {
            type: 'طلب تسعيرة فوري',
            title: `عميل جديد "${name}" يطلب ${service}.`,
            createdAt: timestamp,
            style: 'amber' // For UI coloring
        });

        await batch.commit();
        return { success: true };
    } catch (error) {
        console.error('Error submitting project request:', error);
        return { success: false, error: 'حدث خطأ أثناء إرسال الطلب.' };
    }
}
