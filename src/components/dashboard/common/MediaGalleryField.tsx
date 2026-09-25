'use client';

import { useId, useRef, useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { uploadFileDirect } from '@/lib/cloudinary/directUpload';

type GalleryKind = 'image' | 'video';

const ACCEPT_MAP: Record<GalleryKind, string> = {
  image: 'image/jpeg,image/png,image/webp,image/gif,image/avif,image/svg+xml',
  video: 'video/mp4,video/webm,video/quicktime',
};

const HINT_MAP: Record<GalleryKind, string> = {
  image: 'يمكنك اختيار أكثر من صورة مرة واحدة — JPG, PNG, WebP, GIF, SVG حتى 15 ميجابايت للصورة',
  video: 'يمكنك اختيار أكثر من فيديو — MP4, WebM, MOV حتى 100 ميجابايت للفيديو',
};

interface MediaGalleryFieldProps {
  label: string;
  description?: string;
  kind: GalleryKind;
  value: string[];
  onChange: (urls: string[]) => void;
  /** Lets the parent block submit while files are still uploading. */
  onUploadingChange?: (uploading: boolean) => void;
}

/**
 * Multi-file uploader for project galleries: images (designs, logos, screenshots) or videos.
 * Files go straight to Cloudinary (signed), then the list of URLs is handed back via `onChange`.
 */
export function MediaGalleryField({ label, description, kind, value, onChange, onUploadingChange }: MediaGalleryFieldProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<{ name: string; percent: number; index: number; total: number } | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const uploading = progress !== null;

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (inputRef.current) inputRef.current.value = '';
    if (files.length === 0) return;

    setErrors([]);
    onUploadingChange?.(true);
    const uploaded: string[] = [];
    const failed: string[] = [];
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('يجب تسجيل الدخول أولاً.');
      const token = await user.getIdToken();

      for (let i = 0; i < files.length; i++) {
        const file = files[i]!;
        const isRightKind = kind === 'video' ? file.type.startsWith('video/') : file.type.startsWith('image/');
        if (!isRightKind) {
          failed.push(`"${file.name}" ليس ${kind === 'video' ? 'فيديو' : 'صورة'}.`);
          continue;
        }
        setProgress({ name: file.name, percent: 0, index: i + 1, total: files.length });
        try {
          const res = await uploadFileDirect(token, file, percent =>
            setProgress({ name: file.name, percent, index: i + 1, total: files.length })
          );
          uploaded.push(res.url);
          // Publish each finished file right away so a later failure doesn't lose earlier uploads.
          onChange([...value, ...uploaded]);
        } catch (err) {
          failed.push((err as Error).message);
        }
      }
    } catch (err) {
      failed.push((err as Error).message || 'تعذر رفع الملفات.');
    } finally {
      setProgress(null);
      setErrors(failed);
      onUploadingChange?.(false);
    }
  };

  const removeAt = (index: number) => onChange(value.filter((_, i) => i !== index));

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target]!, next[index]!];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <label htmlFor={inputId} className="block text-xs font-bold text-amber-800 dark:text-pharaohGold uppercase tracking-wider">
            {label} <span className="text-slate-500 dark:text-gray-400 normal-case font-medium">({value.length})</span>
          </label>
          {description && <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-1">{description}</p>}
        </div>
        <label
          className={`inline-flex items-center gap-1.5 cursor-pointer bg-pharaohGold text-[#0A192F] px-3.5 py-2 rounded-lg text-[11px] font-black hover:bg-amber-400 transition shadow-sm ${
            uploading ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          {kind === 'video' ? 'إضافة فيديوهات' : 'إضافة صور'}
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            multiple
            accept={ACCEPT_MAP[kind]}
            onChange={handleFiles}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {progress && (
        <div className="bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-700 dark:text-gray-300 gap-3">
            <span className="truncate">جاري رفع {progress.index} من {progress.total}: {progress.name}</span>
            <span className="font-mono font-bold shrink-0">{progress.percent}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
            <div className="h-full bg-pharaohGold transition-all duration-200" style={{ width: `${progress.percent}%` }} />
          </div>
        </div>
      )}

      {errors.length > 0 && (
        <ul className="text-[11px] text-red-600 dark:text-red-400 space-y-0.5">
          {errors.map((err, i) => <li key={i}>• {err}</li>)}
        </ul>
      )}

      {value.length > 0 ? (
        <div className={`grid gap-3 ${kind === 'video' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
          {value.map((url, i) => (
            <div key={`${url}-${i}`} className="group relative rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#0A192F]">
              <div className={kind === 'video' ? 'aspect-video' : 'aspect-square'}>
                {kind === 'video' ? (
                  <video src={url} controls preload="metadata" playsInline className="w-full h-full object-cover bg-black" />
                ) : (
                  <img src={url} alt="" loading="lazy" className="w-full h-full object-contain p-1" />
                )}
              </div>
              <div className="flex items-center justify-between gap-1 px-2 py-1.5 bg-white/95 dark:bg-[#112240]/95 border-t border-slate-200 dark:border-white/10">
                <span className="text-[10px] font-bold text-slate-500 dark:text-gray-400">#{i + 1}</span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} title="تقديم" className="w-6 h-6 rounded-md text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-30 cursor-pointer text-xs">→</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} title="تأخير" className="w-6 h-6 rounded-md text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-30 cursor-pointer text-xs">←</button>
                  <button type="button" onClick={() => removeAt(i)} title="حذف" className="w-6 h-6 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer text-xs">✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !uploading && (
          <div className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl py-8 text-center text-[11px] text-slate-500 dark:text-gray-500">
            {kind === 'video' ? 'لم تتم إضافة فيديوهات بعد' : 'لم تتم إضافة صور بعد'}
          </div>
        )
      )}

      <p className="text-[10px] text-slate-500 dark:text-gray-500">{HINT_MAP[kind]}</p>
    </div>
  );
}
