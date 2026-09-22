import DOMPurify from 'isomorphic-dompurify';

/** Sanitize at the rendering boundary, including legacy content already in Firestore. */
export function sanitizeSvg(value: unknown): string {
  if (typeof value !== 'string' || value.length > 100_000) return '';
  return DOMPurify.sanitize(value, {
    USE_PROFILES: { svg: true, svgFilters: true },
    FORBID_TAGS: ['style', 'foreignObject', 'image', 'use', 'a', 'animate', 'set', 'animateTransform'],
    FORBID_ATTR: ['style', 'href', 'xlink:href'],
    ALLOW_DATA_ATTR: false,
  });
}
