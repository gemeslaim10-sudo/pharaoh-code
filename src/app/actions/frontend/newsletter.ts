'use server';

import { createHash } from 'node:crypto';
import { db } from '@/lib/firebase/admin';
import { sanitizeInput } from './utils';
import { enforcePublicRateLimit } from './rateLimit';

export async function subscribeNewsletter(formData: FormData) {
    try {
        await enforcePublicRateLimit('newsletter');
        const email = sanitizeInput(formData.get('email') as string, 120).toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { success: false, error: 'invalid_email' };
        }

        const id = createHash('sha256').update(email).digest('hex');
        const ref = db.collection('newsletter_subscribers').doc(id);
        const existing = await ref.get();
        if (existing.exists) {
            return { success: true, alreadySubscribed: true };
        }

        const timestamp = new Date().toISOString();
        const batch = db.batch();
        batch.set(ref, { email, createdAt: timestamp, source: 'footer' });
        batch.set(db.collection('notifications').doc(), {
            type: 'اشتراك جديد في النشرة',
            title: `اشترك "${email}" في النشرة البريدية.`,
            createdAt: timestamp,
            style: 'blue'
        });
        await batch.commit();

        return { success: true, alreadySubscribed: false };
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        return { success: false, error: 'server_error' };
    }
}
