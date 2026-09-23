import sanitizeHtml from 'sanitize-html';

/**
 * Sanitizes inline SVG markup coming from the CMS before it is injected with dangerouslySetInnerHTML.
 *
 * Implemented with `sanitize-html` (pure CommonJS, htmlparser2 based) instead of DOMPurify + jsdom:
 * the jsdom dependency chain requires `require()` of ES modules, which the hosting runtime rejects
 * and which took down every server action and dynamic route in production.
 *
 * Policy: a strict allow-list of static SVG drawing elements/attributes. Scripts, event handlers,
 * external references (href/xlink:href/url()), style, foreignObject, image, use and animation
 * elements are all dropped.
 */

const SVG_TAGS = [
  'svg', 'g', 'path', 'circle', 'ellipse', 'rect', 'line', 'polyline', 'polygon',
  'defs', 'linearGradient', 'radialGradient', 'stop', 'clipPath', 'mask', 'symbol', 'marker', 'pattern',
  'text', 'tspan', 'title', 'desc',
];

const PRESENTATION_ATTRS = [
  'fill', 'fill-opacity', 'fill-rule', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin',
  'stroke-miterlimit', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-opacity', 'opacity',
  'transform', 'clip-path', 'clip-rule', 'mask', 'color', 'display', 'visibility', 'vector-effect',
  'font-size', 'font-family', 'font-weight', 'text-anchor', 'dominant-baseline', 'letter-spacing',
  'class', 'id', 'aria-hidden', 'aria-label', 'role', 'focusable',
];

const GEOMETRY_ATTRS = [
  'd', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry', 'width', 'height', 'points',
  'pathLength', 'viewBox', 'preserveAspectRatio', 'xmlns', 'xmlns:xlink', 'version',
  'offset', 'stop-color', 'stop-opacity', 'gradientUnits', 'gradientTransform', 'spreadMethod',
  'clipPathUnits', 'maskUnits', 'maskContentUnits', 'patternUnits', 'patternContentUnits',
  'markerWidth', 'markerHeight', 'refX', 'refY', 'orient', 'dx', 'dy', 'rotate', 'textLength', 'lengthAdjust',
];

const ALLOWED_ATTRIBUTES: Record<string, string[]> = Object.fromEntries(
  SVG_TAGS.map(tag => [tag, [...PRESENTATION_ATTRS, ...GEOMETRY_ATTRS]]),
);

// Attribute values may reference other nodes only through a same-document fragment (#id),
// e.g. fill="url(#gradient)" or clip-path="url(#clip)". Anything else (external URLs, javascript:) is removed.
const SAFE_VALUE = /^(?!.*(javascript:|data:|expression\(|https?:|\/\/))[^<>]*$/i;
const URL_FUNC = /url\(\s*(['"]?)(?!#)[^)]*\1\s*\)/i;
const ALLOWED_NAMESPACES = new Set(['http://www.w3.org/2000/svg', 'http://www.w3.org/1999/xlink']);

export function sanitizeSvg(value: unknown): string {
  if (typeof value !== 'string' || value.length > 100_000) return '';
  const trimmed = value.trim();
  if (!/<svg[\s>]/i.test(trimmed)) return '';

  return sanitizeHtml(trimmed, {
    allowedTags: SVG_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: [],
    allowedSchemesByTag: {},
    allowProtocolRelative: false,
    disallowedTagsMode: 'discard',
    // Drop the text content of these removed elements too (not just the tags).
    nonTextTags: ['script', 'style', 'textarea', 'option', 'noscript', 'iframe', 'foreignObject', 'image', 'use', 'a'],
    parser: { lowerCaseTags: false, lowerCaseAttributeNames: false, xmlMode: true },
    exclusiveFilter: frame => {
      // Drop any element that survived with an event handler or forbidden reference.
      return Object.entries(frame.attribs || {}).some(([name, val]) => {
        if (/^xmlns(:xlink)?$/i.test(name)) return !ALLOWED_NAMESPACES.has(val);
        return /^on/i.test(name) || /href/i.test(name) || !SAFE_VALUE.test(val) || URL_FUNC.test(val);
      });
    },
  });
}
