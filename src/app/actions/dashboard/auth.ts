import { admin } from '@/lib/firebase/admin';

// Admin emails list
export const ADMIN_EMAILS = [
  'cubsacademy29@gmail.com',
  'gemeslaim10@gmail.com',
  'ai3048192@gmail.com',
];

/**
 * Helper to authenticate server action requests
 */
export async function authenticateAdmin(idToken: string) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (!decodedToken.email || !ADMIN_EMAILS.includes(decodedToken.email)) {
      throw new Error('Unauthorized: User is not an admin.');
    }
    return decodedToken;
  } catch (error) {
    throw new Error('Unauthorized: Invalid or expired token.');
  }
}
