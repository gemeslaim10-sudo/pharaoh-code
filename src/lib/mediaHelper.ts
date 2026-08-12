export function isMediaVideo(url?: string): boolean {
    if (!url) return false;
    const cleanUrl = url.toLowerCase().split('?')[0];
    return (
        cleanUrl.endsWith('.mp4') ||
        cleanUrl.endsWith('.webm') ||
        cleanUrl.endsWith('.mov') ||
        cleanUrl.endsWith('.ogg') ||
        cleanUrl.includes('/video/upload/') ||
        cleanUrl.includes('/video/')
    );
}
