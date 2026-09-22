import 'server-only';
import { admin } from '@/lib/firebase/admin';
import { OWNER_EMAIL, normalizeEmail } from '@/lib/authPolicy';

export async function authenticateUser(idToken: string) {
  if (typeof idToken !== 'string' || !idToken.trim()) {
    throw new Error('Unauthorized');
  }
  // Reject revoked sessions and disabled accounts as well as expired tokens.
  return admin.auth().verifyIdToken(idToken, true);
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
