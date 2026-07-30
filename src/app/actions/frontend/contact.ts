'use server';

import { db } from '@/lib/firebase/admin';
import { sanitizeInput } from './utils';

export async function submitContactMessage(formData: FormData) {
    try {
        const name = sanitizeInput(formData.get('name') as string, 100);
        const email = sanitizeInput(formData.get('email') as string, 100);
        const phone = sanitizeInput(formData.get('phone') as string, 50);
        const goal = sanitizeInput(formData.get('goal') as string, 100);
        const budget = sanitizeInput(formData.get('budget') as string, 100);
        const source = sanitizeInput(formData.get('source') as string, 50);
        const details = sanitizeInput(formData.get('details') as string, 2000);

        if (!name || !email) {
            throw new Error('الاسم والبريد الإلكتروني مطلوبان');
        }

        const date = new Date().toISOString().split('T')[0];
        const timestamp = new Date().toISOString();

        const batch = db.batch();

        const isProjectRequest = !!goal || !!budget;

        // Add to orders as a contact message or project request
        const orderRef = db.collection('orders').doc();
        batch.set(orderRef, {
            name,
            phone: phone || 'رسالة إيميل',
            email,
            service: goal || 'استفسار عام',
            budget: budget || 'غير محدد',
            source: source || 'غير محدد',
            details,
            date,
            status: 'pending',
            createdAt: timestamp,
            revenue: 0,
            type: isProjectRequest ? 'project_request' : 'contact_message'
        });

        // Add to notifications
        const notifRef = db.collection('notifications').doc();
        batch.set(notifRef, {
            type: isProjectRequest ? 'طلب مشروع جديد' : 'رسالة اتصل بنا',
            title: isProjectRequest ? `العميل "${name}" يطلب ${goal}.` : `العميل "${name}" ترك رسالة استفسار.`,
            createdAt: timestamp,
            style: isProjectRequest ? 'amber' : 'blue' // For UI coloring
        });

        await batch.commit();
        return { success: true };
    } catch (error) {
        console.error('Error submitting contact message:', error);
        return { success: false, error: 'حدث خطأ أثناء إرسال الرسالة.' };
    }
}
