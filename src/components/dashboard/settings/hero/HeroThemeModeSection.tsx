'use client';
import { HERO_PRESETS } from './heroPresets';
import { MediaUploadField } from '@/components/dashboard/common/MediaUploadField';

interface HeroThemeModeSectionProps {
  mode: 'dark' | 'light';
  title: string;
  slide1Media: string;
  setSlide1Media: (val: string) => void;
  slide2Media: string;
  setSlide2Media: (val: string) => void;
  selectedPreset: string;
  onSelectPreset: (presetId: string) => void;
}

export function HeroThemeModeSection({
  mode,
  title,
  slide1Media,
  setSlide1Media,
  slide2Media,
  setSlide2Media,
  selectedPreset,
  onSelectPreset,
}: HeroThemeModeSectionProps) {
  return (
    <div className="bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-2xl p-6 space-y-6 shadow-xs">
      <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
        {title}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MediaUploadField
          label="ميديا السلايد الأول (صورة 🖼️ أو فيديو 🎬)"
          value={slide1Media}
          onChange={setSlide1Media}
          accept="media"
          previewClassName="w-full h-40"
          hint="ارفع صورة أو فيديو MP4 من جهازك. لو تركته فارغًا تُستخدم الخلفية الافتراضية."
        />
        <MediaUploadField
          label="ميديا السلايد الثاني (صورة 🖼️ أو فيديو 🎬)"
          value={slide2Media}
          onChange={setSlide2Media}
          accept="media"
          previewClassName="w-full h-40"
          hint="ارفع صورة أو فيديو MP4 من جهازك. لو تركته فارغًا تُستخدم الخلفية الافتراضية."
        />
      </div>

      {/* Color Scheme Presets */}
      <div>
        <label className="block text-xs font-bold text-amber-800 dark:text-pharaohGold mb-3">
          قالب ألوان النصوص والأزرار في الوضع {mode === 'dark' ? 'الداكن' : 'الفاتح'}:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HERO_PRESETS.map(preset => (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className={`cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between space-y-2 ${
                selectedPreset === preset.id
                  ? 'bg-amber-500/10 dark:bg-[#0A192F] border-pharaohGold shadow-md shadow-amber-500/10 dark:shadow-pharaohGold/10'
                  : 'bg-slate-50 dark:bg-[#0A192F]/50 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">{preset.name}</span>
                {selectedPreset === preset.id && <span className="text-amber-800 dark:text-pharaohGold text-xs font-bold">محدد 🟢</span>}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-gray-400">{preset.desc}</p>
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-white/5 text-[10px]">
                <span className="w-3 h-3 rounded-full inline-block border border-slate-300 dark:border-white/20" style={{ backgroundColor: preset.titleColor }} />
                <span className="text-slate-600 dark:text-gray-400">عنوان الرئيسي</span>
                <span className="w-3 h-3 rounded-full inline-block border border-slate-300 dark:border-white/20 ml-2" style={{ backgroundColor: preset.accentColor }} />
                <span className="text-slate-600 dark:text-gray-400">اللون البارز</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
