'use client';

import { useId, useRef, useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { uploadMedia } from '@/app/actions/dashboard/upload';
import { isMediaVideo } from '@/lib/mediaHelper';

export type MediaAccept = 'image' | 'media' | 'icon';

const ACCEPT_MAP: Record<MediaAccept, string> = {
  image: 'image/jpeg,image/png,image/webp,image/gif,image/avif',
  icon: 'image/svg+xml,image/png,image/webp,image/x-icon,image/vnd.microsoft.icon,.svg,.ico',
  media: 'image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4,video/webm,video/quicktime',
};

const HINT_MAP: Record<MediaAccept, string> = {
  image: 'JPG, PNG, WebP, GIF, AVIF حتى 8 ميجابايت',
  icon: 'SVG أو PNG شفاف (يفضل مربع) حتى 8 ميجابايت',
  media: 'صورة (JPG, PNG, WebP) أو فيديو (MP4, WebM) حتى 25 ميجابايت',
};

interface MediaUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: MediaAccept;
  required?: boolean;
  hint?: string;
  /** Tailwind classes for the preview box, e.g. "h-32". */
  previewClassName?: string;
  /** Smaller inline layout for icons. */
  compact?: boolean;
  disabled?: boolean;
}

/**
 * The single way an admin provides an image/video/icon in the dashboard:
 * pick a file from the device, it is uploaded to Cloudinary, and the resulting URL is
 * handed back through `onChange`. No URL typing.
 */
export function MediaUploadField({
  label, value, onChange, accept = 'image', required = false, hint,
  previewClassName, compact = false, disabled = false,
}: MediaUploadFieldProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('يجب تسجيل الدخول أولاً.');
      const token = await user.getIdToken();
      const fd = new FormData();
      fd.append('file', file);
      const res = await uploadMedia(token, fd);
      if (!res.success || !res.url) throw new Error(res.error || 'تعذر رفع الملف.');
      onChange(res.url);
    } catch (err) {
      setError((err as Error).message || 'تعذر رفع الملف.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const hasValue = Boolean(value);
  const isVideo = hasValue && isMediaVideo(value);

  const preview = hasValue ? (
    isVideo ? (
      <video src={value} muted playsInline className="w-full h-full object-cover" />
    ) : (
      <img src={value} alt="" className={compact ? 'w-full h-full object-contain p-1.5' : 'w-full h-full object-cover'} />
    )
  ) : (
    <div className="flex flex-col items-center justify-center gap-1 text-slate-400 dark:text-gray-500">
      <svg className={compact ? 'w-5 h-5' : 'w-7 h-7'} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {!compact && <span className="text-[10px]">لا يوجد ملف مرفوع</span>}
    </div>
  );

  return (
    <div className={compact ? 'flex items-center gap-3' : 'space-y-2'}>
      {!compact && (
        <label htmlFor={inputId} className="block text-xs font-bold text-slate-700 dark:text-gray-300">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`relative overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0A192F] flex items-center justify-center shrink-0 ${
          compact ? 'w-14 h-14' : (previewClassName || 'w-full h-36')
        }`}
      >
        {preview}
        {uploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[11px] font-bold gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {!compact && 'جاري الرفع...'}
          </div>
        )}
      </div>

      <div className={compact ? 'flex-1 min-w-0 space-y-1' : 'flex flex-wrap items-center gap-2'}>
        {compact && (
          <span className="block text-[11px] font-bold text-slate-700 dark:text-gray-300 truncate">
            {label} {required && <span className="text-red-500">*</span>}
          </span>
        )}
        <div className="flex items-center gap-2">
          <label
            className={`inline-flex items-center gap-1.5 cursor-pointer bg-pharaohGold text-[#0A192F] px-3.5 py-2 rounded-lg text-[11px] font-black hover:bg-amber-400 transition shadow-sm ${
              (uploading || disabled) ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {hasValue ? 'تغيير الملف' : 'رفع من الجهاز'}
            <input
              ref={inputRef}
              id={inputId}
              type="file"
              accept={ACCEPT_MAP[accept]}
              onChange={handleFile}
              disabled={uploading || disabled}
              className="hidden"
            />
          </label>
          {hasValue && !disabled && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-[11px] font-bold text-red-600 dark:text-red-400 hover:underline cursor-pointer"
            >
              إزالة
            </button>
          )}
        </div>
        {error ? (
          <p className="text-[10px] text-red-600 dark:text-red-400">{error}</p>
        ) : (
          <p className="text-[10px] text-slate-500 dark:text-gray-500">{hint || HINT_MAP[accept]}</p>
        )}
      </div>
    </div>
  );
}
