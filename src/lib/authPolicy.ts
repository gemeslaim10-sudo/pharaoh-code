// The existing owner is permanent; other administrators are managed in Firestore.
export const OWNER_EMAIL = 'cubsacademy29@gmail.com';

export function normalizeEmail(email: unknown): string {
  return typeof email === 'string' ? email.trim().toLowerCase() : '';
}
