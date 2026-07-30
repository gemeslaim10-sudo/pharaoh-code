'use server';

import { db, serializeData } from '@/lib/firebase/admin';
import { sanitizeInput } from './utils';

export async function submitComment(formData: FormData) {
    try {
        const name = sanitizeInput(formData.get('name') as string, 100);
        const email = sanitizeInput(formData.get('email') as string, 100);
        const phone = sanitizeInput(formData.get('phone') as string, 50) || '';
        const comment = sanitizeInput(formData.get('comment') as string, 2000);

        if (!name || !email || !comment) {
            throw new Error('جميع الحقول مطلوبة');
        }

        const date = new Date().toISOString().split('T')[0];
        const timestamp = new Date().toISOString();

        // Generate initials safely
        const nameParts = name.trim().split(' ').filter(Boolean);
        let initials = 'ع'; // Fallback
        if (nameParts.length > 1) {
            initials = `${nameParts[0]?.charAt(0) || ''} ${nameParts[1]?.charAt(0) || ''}`.trim();
        } else if (nameParts.length === 1) {
            initials = nameParts[0]?.substring(0, 2) || '';
        }

        const batch = db.batch();

        // Add to reviews collection
        const reviewRef = db.collection('reviews').doc();
        batch.set(reviewRef, {
            name,
            email,
            phone,
            initials,
            text: comment,
            date,
            status: 'approved',
            createdAt: timestamp
        });

        // Add to notifications
        const notifRef = db.collection('notifications').doc();
        batch.set(notifRef, {
            type: 'تعليق جديد',
            title: `ترك "${name}" أثراً رقمياً وتعليقاً جديداً.`,
            createdAt: timestamp,
            style: 'green' // For UI coloring
        });

        await batch.commit();
        return { success: true };
    } catch (error) {
        console.error('Error submitting comment:', error);
        return { success: false, error: 'حدث خطأ أثناء إرسال التعليق.' };
    }
}

export async function getApprovedReviews() {
    try {
        const snapshot = await db.collection('reviews')
            .where('status', '==', 'approved')
            .orderBy('createdAt', 'desc')
            .get();
        
        if (snapshot.empty) {
            return [];
        }

        return snapshot.docs.map(doc => serializeData({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching approved reviews:', error);
        return []; // Fail gracefully for public frontend
    }
}
