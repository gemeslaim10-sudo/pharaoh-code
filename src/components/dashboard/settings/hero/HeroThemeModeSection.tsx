'use client';
import { HERO_PRESETS } from './heroPresets';

interface HeroThemeModeSectionProps {
  mode: 'dark' | 'light';
  title: string;
  slide1Media: string;
  setSlide1Media: (val: string) => void;
  slide2Media: string;
  setSlide2Media: (val: string) => void;
  selectedPreset: string;
  onSelectPreset: (presetId: string) => void;
  uploadingField: string | null;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void;
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
  uploadingField,
  onFileUpload,
}: HeroThemeModeSectionProps) {
  const isVideo = (url: string) => /\.(mp4|webm|mov)(\?.*)?$/i.test(url);

  return (
    <div className="bg-[#112240] border border-white/10 rounded-2xl p-6 space-y-6">
      <h4 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
        {title}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Slide 1 Media */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-gray-300">ميديا السلايد الأول (صورة 🖼️ أو فيديو 🎬)</label>
            {slide1Media && (
              <span className="text-[10px] text-pharaohGold bg-pharaohGold/10 px-2 py-0.5 rounded-full font-bold">
                {isVideo(slide1Media) ? '🎬 فيديو' : '🖼️ صورة'}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={slide1Media}
              onChange={e => setSlide1Media(e.target.value)}
              placeholder="رابط صورة أو فيديو MP4..."
              className="flex-1 bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-xs text-white dir-ltr focus:border-pharaohGold outline-none"
            />
            <label className="cursor-pointer bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-4 py-3 rounded-xl border border-white/10 transition-colors flex items-center gap-1 shrink-0">
              <span>{uploadingField === `${mode}Slide1Media` ? 'جاري الرفع...' : 'رفع صورة/فيديو'}</span>
              <input type="file" accept="image/*,video/*" onChange={e => onFileUpload(e, `${mode}Slide1Media`)} className="hidden" />
            </label>
          </div>
        </div>

        {/* Slide 2 Media */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-gray-300">ميديا السلايد الثاني (صورة 🖼️ أو فيديو 🎬)</label>
            {slide2Media && (
              <span className="text-[10px] text-pharaohGold bg-pharaohGold/10 px-2 py-0.5 rounded-full font-bold">
                {isVideo(slide2Media) ? '🎬 فيديو' : '🖼️ صورة'}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={slide2Media}
              onChange={e => setSlide2Media(e.target.value)}
              placeholder="رابط صورة أو فيديو..."
              className="flex-1 bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-xs text-white dir-ltr focus:border-pharaohGold outline-none"
            />
            <label className="cursor-pointer bg-white/5 hover:bg-white/10 text-white text-xs font-bold px-4 py-3 rounded-xl border border-white/10 transition-colors flex items-center gap-1 shrink-0">
              <span>{uploadingField === `${mode}Slide2Media` ? 'جاري الرفع...' : 'رفع صورة/فيديو'}</span>
              <input type="file" accept="image/*,video/*" onChange={e => onFileUpload(e, `${mode}Slide2Media`)} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Color Scheme Presets */}
      <div>
        <label className="block text-xs font-bold text-pharaohGold mb-3">
          قالب ألوان النصوص والأزرار في الوضع {mode === 'dark' ? 'الداكن' : 'الفاتح'}:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HERO_PRESETS.map(preset => (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className={`cursor-pointer p-4 rounded-xl border transition-all flex flex-col justify-between space-y-2 ${
                selectedPreset === preset.id
                  ? 'bg-[#0A192F] border-pharaohGold shadow-lg shadow-pharaohGold/10'
                  : 'bg-[#0A192F]/50 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">{preset.name}</span>
                {selectedPreset === preset.id && <span className="text-pharaohGold text-xs font-bold">محدد 🟢</span>}
              </div>
              <p className="text-[11px] text-gray-400">{preset.desc}</p>
              <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-[10px]">
                <span className="w-3 h-3 rounded-full inline-block border border-white/20" style={{ backgroundColor: preset.titleColor }} />
                <span className="text-gray-400">عنوان الرئيسي</span>
                <span className="w-3 h-3 rounded-full inline-block border border-white/20 ml-2" style={{ backgroundColor: preset.accentColor }} />
                <span className="text-gray-400">اللون البارز</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
