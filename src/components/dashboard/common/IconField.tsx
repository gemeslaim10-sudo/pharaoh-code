'use client';

import { useState } from 'react';
import { MediaUploadField } from './MediaUploadField';
import { SmartIcon } from '@/components/common/SmartIcon';
import { isMediaUrl, isSvgMarkup } from '@/lib/svgHelper';

interface IconFieldProps {
  label: string;
  /** Uploaded icon URL (preferred) or legacy inline SVG markup. */
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  /** Optional preset SVGs the admin can pick from. */
  presets?: { name: string; svg: string }[];
}

/**
 * Icon input for CMS records. Primary path: upload an SVG/PNG from the device (Cloudinary).
 * Secondary paths (collapsed): pick a preset, or paste raw SVG code for advanced users.
 */
export function IconField({ label, value, onChange, required = false, presets }: IconFieldProps) {
  const [showAdvanced, setShowAdvanced] = useState(() => isSvgMarkup(value));

  return (
    <div className="space-y-3">
      <MediaUploadField
        label={label}
        value={isMediaUrl(value) ? value : ''}
        onChange={onChange}
        accept="icon"
        required={required}
        compact
      />

      {isSvgMarkup(value) && (
        <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-gray-400">
          <SmartIcon value={value} className="w-6 h-6 text-amber-800 dark:text-pharaohGold [&_svg]:w-6 [&_svg]:h-6" />
          <span>الأيقونة الحالية عبارة عن كود SVG. ارفع ملفًا من الجهاز لاستبدالها.</span>
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowAdvanced(v => !v)}
        className="text-[11px] font-bold text-slate-500 dark:text-gray-400 hover:text-amber-800 dark:hover:text-pharaohGold cursor-pointer"
      >
        {showAdvanced ? '▲ إخفاء الخيارات المتقدمة' : '▼ خيارات متقدمة (أيقونات جاهزة / كود SVG)'}
      </button>

      {showAdvanced && (
        <div className="space-y-3 bg-slate-50 dark:bg-[#0A192F] p-3 rounded-xl border border-slate-200 dark:border-white/10">
          {presets && presets.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {presets.map((preset, i) => {
                const selected = value === preset.svg;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => onChange(preset.svg)}
                    className={`p-2 rounded-lg border text-right text-[11px] flex items-center gap-2 cursor-pointer transition ${
                      selected
                        ? 'bg-amber-500/20 dark:bg-pharaohGold/25 border-amber-500 dark:border-pharaohGold text-amber-900 dark:text-pharaohGold font-bold'
                        : 'bg-white dark:bg-[#112240] border-slate-200 dark:border-white/5 text-slate-700 dark:text-gray-300 hover:border-amber-400'
                    }`}
                  >
                    <SmartIcon value={preset.svg} className="w-5 h-5 shrink-0 text-amber-800 dark:text-pharaohGold [&_svg]:w-5 [&_svg]:h-5" />
                    <span className="truncate">{preset.name}</span>
                  </button>
                );
              })}
            </div>
          )}
          <div>
            <label className="block text-[11px] font-medium text-slate-600 dark:text-gray-400 mb-1">كود SVG مخصص (للمطورين)</label>
            <textarea
              rows={2}
              value={isSvgMarkup(value) ? value : ''}
              onChange={e => onChange(e.target.value)}
              placeholder="<svg viewBox='0 0 24 24'>...</svg>"
              className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-[11px] font-mono text-slate-900 dark:text-white resize-none focus:border-pharaohGold outline-none"
              dir="ltr"
            />
          </div>
        </div>
      )}
    </div>
  );
}
