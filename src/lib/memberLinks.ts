import { type MemberLink } from '@/types/team';

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);

/** Adds https:// when the admin typed a bare domain such as "linkedin.com/in/name". */
export function normalizeLinkUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, '')}`;
}

function safeLinkUrl(value: unknown): string {
  if (typeof value !== 'string') return '';
  try {
    const parsed = new URL(normalizeLinkUrl(value));
    return ALLOWED_PROTOCOLS.has(parsed.protocol) ? parsed.toString() : '';
  } catch {
    return '';
  }
}

/** Cleans the `links` array stored on a team member: keeps only entries with a safe URL and an icon. */
export function normalizeMemberLinks(raw: unknown): MemberLink[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((entry) => {
    if (!entry || typeof entry !== 'object') return [];
    const { url, icon, label } = entry as Record<string, unknown>;
    const safeUrl = safeLinkUrl(url);
    if (!safeUrl || typeof icon !== 'string' || !icon.trim()) return [];
    return [{ url: safeUrl, icon, label: typeof label === 'string' ? label.trim() : '' }];
  });
}
