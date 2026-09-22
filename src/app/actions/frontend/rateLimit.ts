import 'server-only';
import { createHash } from 'node:crypto';
import { headers } from 'next/headers';
import { db } from '@/lib/firebase/admin';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

export async function enforcePublicRateLimit(action: string): Promise<void> {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get('x-vercel-forwarded-for')
    || requestHeaders.get('x-forwarded-for')
    || requestHeaders.get('x-real-ip');
  const clientIp = forwarded?.split(',')[0]?.trim();
  if (!clientIp) return;

  const key = createHash('sha256').update(`${action}:${clientIp}`).digest('hex');
  const ref = db.collection('_rate_limits').doc(key);
  const now = Date.now();

  await db.runTransaction(async transaction => {
    const snapshot = await transaction.get(ref);
    const data = snapshot.data();
    const resetAt = typeof data?.resetAt === 'number' ? data.resetAt : 0;
    const count = resetAt > now && typeof data?.count === 'number' ? data.count : 0;
    if (count >= MAX_REQUESTS) throw new Error('Too many requests');
    transaction.set(ref, {
      action,
      count: count + 1,
      resetAt: resetAt > now ? resetAt : now + WINDOW_MS,
      updatedAt: now,
    });
  });
}
