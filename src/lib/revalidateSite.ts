import 'server-only';
import { revalidatePath } from 'next/cache';

/**
 * Purges the whole site cache after any CMS write.
 * Most public pages are statically rendered (no `revalidate` export or a 1h ISR window),
 * and the shared (frontend) layout reads identity/social/system settings, so a single
 * root-layout revalidation is the only way to make dashboard changes appear everywhere
 * (including /team/[id], /clients/[id], /services/[id]) right away.
 */
export function revalidateSite() {
  revalidatePath('/', 'layout');
}
