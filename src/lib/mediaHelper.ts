export function isMediaVideo(url?: string): boolean {
    if (!url || typeof url !== 'string') return false;
    const cleanUrl = url.toLowerCase().split('?')[0];
    if (!cleanUrl) return false;
    return (
        cleanUrl.endsWith('.mp4') ||
        cleanUrl.endsWith('.webm') ||
        cleanUrl.endsWith('.mov') ||
        cleanUrl.endsWith('.ogg') ||
        cleanUrl.includes('/video/upload/') ||
        cleanUrl.includes('/video/')
    );
}
