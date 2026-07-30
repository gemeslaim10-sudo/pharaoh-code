import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using environment variables
// It will automatically pick up the CLOUDINARY_URL environment variable if set
// Alternatively, we configure it explicitly:
cloudinary.config({
  cloud_name: process.env['NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME'] as string,
  api_key: process.env['NEXT_PUBLIC_CLOUDINARY_API_KEY'] as string,
  api_secret: process.env['CLOUDINARY_API_SECRET'] as string,
  secure: true
});

export { cloudinary };
