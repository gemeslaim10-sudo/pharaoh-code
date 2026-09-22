'use server';

import { authenticateAdmin } from './auth';

import { cloudinary } from '@/lib/cloudinary/config';

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'image/svg+xml', 'image/x-icon', 'image/vnd.microsoft.icon'];
const VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg'];
const IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'svg', 'ico'];
const VIDEO_FORMATS = ['mp4', 'webm', 'mov', 'ogv'];

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;   // 8 MB
const MAX_VIDEO_BYTES = 25 * 1024 * 1024;  // 25 MB (must stay under next.config serverActions.bodySizeLimit)

const UPLOAD_FOLDER = 'pharaoh_code/assets';

type UploadResult = { success: boolean; url?: string; resourceType?: 'image' | 'video'; error?: string };

async function uploadBuffer(file: File, resourceType: 'image' | 'video'): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

    const uploadResponse = await cloudinary.uploader.upload(base64String, {
        folder: UPLOAD_FOLDER,
        resource_type: resourceType,
        allowed_formats: resourceType === 'video' ? VIDEO_FORMATS : IMAGE_FORMATS,
    });
    return uploadResponse.secure_url;
}

/**
 * Uploads an image (jpg/png/webp/gif/avif/svg/ico) to Cloudinary.
 * Kept for backwards compatibility with existing dashboard hooks.
 */
export async function uploadImage(token: string, formData: FormData): Promise<UploadResult> {
    try {
        await authenticateAdmin(token);

        const file = formData.get('file');
        if (!(file instanceof File)) throw new Error('لم يتم اختيار ملف.');
        if (!IMAGE_TYPES.includes(file.type)) throw new Error('صيغة الصورة غير مدعومة. المسموح: JPG, PNG, WebP, GIF, AVIF, SVG, ICO.');
        if (file.size === 0 || file.size > MAX_IMAGE_BYTES) throw new Error('حجم الصورة يجب أن يكون أقل من 8 ميجابايت.');

        const url = await uploadBuffer(file, 'image');
        return { success: true, url, resourceType: 'image' };
    } catch (error: any) {
        console.error('Upload error:', error);
        const detailMessage = error?.message || error?.error?.message || 'حدث خطأ أثناء رفع الصورة.';
        return { success: false, error: detailMessage };
    }
}

/**
 * Uploads an image OR a video to Cloudinary (used by the shared MediaUploadField).
 */
export async function uploadMedia(token: string, formData: FormData): Promise<UploadResult> {
    try {
        await authenticateAdmin(token);

        const file = formData.get('file');
        if (!(file instanceof File)) throw new Error('لم يتم اختيار ملف.');

        const isVideo = VIDEO_TYPES.includes(file.type);
        const isImage = IMAGE_TYPES.includes(file.type);
        if (!isVideo && !isImage) throw new Error('صيغة الملف غير مدعومة. المسموح: صور (JPG, PNG, WebP, GIF, AVIF, SVG, ICO) أو فيديو (MP4, WebM, MOV).');

        if (file.size === 0) throw new Error('الملف فارغ.');
        if (isVideo && file.size > MAX_VIDEO_BYTES) throw new Error('حجم الفيديو يجب أن يكون أقل من 25 ميجابايت.');
        if (isImage && file.size > MAX_IMAGE_BYTES) throw new Error('حجم الصورة يجب أن يكون أقل من 8 ميجابايت.');

        const url = await uploadBuffer(file, isVideo ? 'video' : 'image');
        return { success: true, url, resourceType: isVideo ? 'video' : 'image' };
    } catch (error: any) {
        console.error('Upload error:', error);
        const detailMessage = error?.message || error?.error?.message || 'حدث خطأ أثناء رفع الملف.';
        return { success: false, error: detailMessage };
    }
}
