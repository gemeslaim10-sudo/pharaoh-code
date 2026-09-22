/** True when an icon/media value is a URL (Cloudinary, local asset or data URI) rather than inline SVG markup. */
export function isMediaUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const v = value.trim();
  return /^(https?:)?\/\//i.test(v) || v.startsWith('/') || v.startsWith('data:');
}

/** True when the value looks like inline <svg> markup. */
export function isSvgMarkup(value: unknown): value is string {
  return typeof value === 'string' && /<svg[\s>]/i.test(value);
}

/**
 * Removes hardcoded fill/stroke colors (and gradients) from inline SVG so the icon inherits
 * `currentColor` from its container. Shared by all home/portfolio icon renderers.
 */
export function stripSvgColors(svg: string): string {
  if (!svg) return '';
  return svg
    .replace(/\s(fill|stroke)=["'](?!none)[^"']*["']/gi, ' $1="currentColor"')
    .replace(/\sstyle=["'][^"']*["']/gi, '')
    .replace(/<(linearGradient|radialGradient)[\s\S]*?<\/\1>/gi, '')
    .replace(/\sclass=["'][^"']*["']/gi, '');
}
