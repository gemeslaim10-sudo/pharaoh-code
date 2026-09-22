import 'server-only';
import { admin } from '@/lib/firebase/admin';
import { OWNER_EMAIL, normalizeEmail } from '@/lib/authPolicy';

/** Error codes that mean the token itself is bad, as opposed to the Admin API call failing. */
const TOKEN_REJECTION_CODES = new Set([
  'auth/id-token-revoked',
  'auth/id-token-expired',
  'auth/user-disabled',
  'auth/user-not-found',
  'auth/argument-error',
  'auth/invalid-id-token',
]);

export async function authenticateUser(idToken: string) {
  if (typeof idToken !== 'string' || !idToken.trim()) {
    throw new Error('Unauthorized');
  }

  // 1) Cryptographic verification (signature, audience, expiry). Needs no privileged API call.
  const decoded = await admin.auth().verifyIdToken(idToken);

  // 2) Best-effort revocation / disabled-account check. This requires the service account to
  //    have Firebase Authentication permissions; if the hosting environment's account lacks them
  //    (or the Auth API is unreachable) we must NOT lock every admin out, so only a definitive
  //    "revoked / disabled" answer is treated as a rejection.
  try {
    await admin.auth().verifyIdToken(idToken, true);
  } catch (error: any) {
    if (TOKEN_REJECTION_CODES.has(error?.code)) throw new Error('Unauthorized');
    console.warn('[auth] Revocation check skipped:', error?.code || error?.message);
  }

  return decoded;
}

export async function authenticateAdmin(idToken: string) {
  const user = await authenticateUser(idToken);
  if (!user.email || !user.email_verified) throw new Error('Unauthorized');

  const email = normalizeEmail(user.email);
  if (email === OWNER_EMAIL) return user;

  // Read on every request so removing an administrator takes effect immediately.
  const admins = await admin.firestore().collection('admins').get();
  if (!admins.docs.some(doc => normalizeEmail(doc.data().email) === email)) {
    throw new Error('Unauthorized');
  }
  return user;
}
