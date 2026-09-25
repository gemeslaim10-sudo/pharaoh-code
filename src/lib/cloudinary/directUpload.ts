import { getSignedUploadParams } from '@/app/actions/dashboard/upload';

const VIDEO_EXT = /\.(mp4|webm|mov|ogv)$/i;

export const MAX_DIRECT_IMAGE_BYTES = 10 * 1024 * 1024;  // Cloudinary free-plan image limit
export const MAX_DIRECT_VIDEO_BYTES = 100 * 1024 * 1024; // Cloudinary free-plan video limit

export type DirectUploadResult = { url: string; resourceType: 'image' | 'video' };

/**
 * Uploads a file from the browser straight to Cloudinary with a server-signed request,
 * so the file never passes through our serverless functions (request body cap ~4.5 MB).
 */
export async function uploadFileDirect(
  token: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<DirectUploadResult> {
  const resourceType = file.type.startsWith('video/') || VIDEO_EXT.test(file.name) ? 'video' : 'image';
  const max = resourceType === 'video' ? MAX_DIRECT_VIDEO_BYTES : MAX_DIRECT_IMAGE_BYTES;
  if (file.size === 0) throw new Error(`«${file.name}» ملف فارغ.`);
  if (file.size > max) {
    throw new Error(`«${file.name}» أكبر من الحد المسموح (${Math.round(max / 1024 / 1024)} ميجابايت).`);
  }

  const signed = await getSignedUploadParams(token, resourceType);

  const body = new FormData();
  body.append('file', file);
  body.append('api_key', signed.apiKey);
  body.append('timestamp', String(signed.timestamp));
  body.append('folder', signed.folder);
  body.append('allowed_formats', signed.allowedFormats);
  body.append('signature', signed.signature);

  return new Promise<DirectUploadResult>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${signed.cloudName}/${resourceType}/upload`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && res.secure_url) resolve({ url: res.secure_url, resourceType });
        else reject(new Error(res?.error?.message || `تعذر رفع «${file.name}».`));
      } catch {
        reject(new Error(`تعذر رفع «${file.name}».`));
      }
    };
    xhr.onerror = () => reject(new Error(`انقطع الاتصال أثناء رفع «${file.name}».`));
    xhr.send(body);
  });
}
