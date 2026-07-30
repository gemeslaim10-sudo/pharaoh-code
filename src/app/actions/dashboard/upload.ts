'use server';

import { cloudinary } from '@/lib/cloudinary/config';
import { admin } from '@/lib/firebase/admin';

export async function uploadImage(token: string, formData: FormData) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) throw new Error('Unauthorized');

        const file = formData.get('file') as File;
        if (!file) throw new Error('No file provided');

        // Convert File to base64 string
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(base64String, {
            folder: 'pharaoh_code/assets',
        });

        return { success: true, url: uploadResponse.secure_url };
    } catch (error: any) {
        console.error('Upload error:', error);
        return { success: false, error: 'حدث خطأ أثناء رفع الصورة.' };
    }
}
