// TEMPORARY diagnostics endpoint (remove after the hosting issue is resolved).
// Reports only booleans, versions and error messages — never secret values.
export const dynamic = 'force-dynamic';

async function probe(name: string, fn: () => Promise<unknown>) {
  const started = Date.now();
  try {
    const value = await fn();
    return { name, ok: true, ms: Date.now() - started, value };
  } catch (error: any) {
    return { name, ok: false, ms: Date.now() - started, error: `${error?.code || ''} ${error?.message || String(error)}`.trim(), stack: String(error?.stack || '').split('\n').slice(0, 4) };
  }
}

export async function GET() {
  const env = {
    node: process.version,
    platform: process.platform,
    cwd: process.cwd(),
    FIREBASE_SERVICE_ACCOUNT: Boolean(process.env.FIREBASE_SERVICE_ACCOUNT),
    FIREBASE_PROJECT_ID: Boolean(process.env.FIREBASE_PROJECT_ID),
    FIREBASE_CLIENT_EMAIL: Boolean(process.env.FIREBASE_CLIENT_EMAIL),
    FIREBASE_PRIVATE_KEY: Boolean(process.env.FIREBASE_PRIVATE_KEY),
    FIREBASE_PRIVATE_KEY_len: (process.env.FIREBASE_PRIVATE_KEY || '').length,
    CLOUDINARY: Boolean(process.env.CLOUDINARY_API_SECRET),
    VERCEL_REGION: process.env.VERCEL_REGION || null,
  };

  const results = [];
  results.push(await probe('import firebase-admin/app', () => import('firebase-admin/app').then(m => Object.keys(m).length)));
  results.push(await probe('import isomorphic-dompurify', () => import('isomorphic-dompurify').then(m => typeof (m.default as any)?.sanitize)));
  results.push(await probe('sanitizeSvg("<svg/>")', () => import('@/lib/sanitizeSvg').then(m => m.sanitizeSvg('<svg viewBox="0 0 1 1"></svg>'))));
  results.push(await probe('import lib/firebase/admin', () => import('@/lib/firebase/admin').then(m => Object.keys(m))));
  results.push(await probe('firestore read services(limit 1)', () => import('@/lib/firebase/admin').then(m => m.db.collection('services').limit(1).get().then(s => s.size))));
  results.push(await probe('auth().getUser (permissions)', () => import('@/lib/firebase/admin').then(m => m.admin.auth().listUsers(1).then(r => r.users.length))));

  return Response.json({ env, results }, { headers: { 'Cache-Control': 'no-store' } });
}
