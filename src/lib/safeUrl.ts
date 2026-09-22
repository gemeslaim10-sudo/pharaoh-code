const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

export function safeExternalUrl(value: unknown): string {
  if (typeof value !== 'string') return '#';
  const trimmed = value.trim();
  if (!trimmed) return '#';
  try {
    const parsed = new URL(trimmed);
    return ALLOWED_PROTOCOLS.has(parsed.protocol) ? parsed.toString() : '#';
  } catch {
    return '#';
  }
}
