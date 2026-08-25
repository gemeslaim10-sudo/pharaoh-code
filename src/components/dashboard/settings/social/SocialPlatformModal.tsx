'use client';

import { useState } from 'react';
import { SocialPlatform } from '@/types/settings';
import { DynamicSocialIcon } from '@/components/common/DynamicSocialIcon';
import { uploadImage } from '@/app/actions/dashboard/upload';
import { useAuth } from '@/contexts/AuthContext';

const PRESET_ICONS = [
  { key: 'facebook', name: 'Facebook', color: '#1877F2' },
  { key: 'instagram', name: 'Instagram', color: '#E4405F' },
  { key: 'whatsapp', name: 'WhatsApp', color: '#25D366' },
  { key: 'x', name: 'X (Twitter)', color: '#000000' },
  { key: 'linkedin', name: 'LinkedIn', color: '#0A66C2' },
  { key: 'youtube', name: 'YouTube', color: '#FF0000' },
  { key: 'tiktok', name: 'TikTok', color: '#000000' },
  { key: 'telegram', name: 'Telegram', color: '#26A5E4' },
  { key: 'github', name: 'GitHub', color: '#24292e' },
  { key: 'behance', name: 'Behance', color: '#1769FF' },
  { key: 'snapchat', name: 'Snapchat', color: '#FFFC00' },
  { key: 'pinterest', name: 'Pinterest', color: '#E60023' },
  { key: 'dribbble', name: 'Dribbble', color: '#EA4C89' },
];

interface SocialPlatformModalProps {
  platform: SocialPlatform | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (platform: SocialPlatform) => Promise<void>;
}

export function SocialPlatformModal({
  platform,
  isOpen,
  onClose,
  onSave,
}: SocialPlatformModalProps) {
  const { user } = useAuth();
  const [name, setName] = useState(platform?.name || '');
  const [url, setUrl] = useState(platform?.url || '');
  const [icon, setIcon] = useState(platform?.icon || 'facebook');
  const [iconSvg, setIconSvg] = useState(platform?.iconSvg || '');
  const [color, setColor] = useState(platform?.color || '#C5A16F');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [iconType, setIconType] = useState<'preset' | 'upload' | 'svg'>(
    platform?.iconSvg ? 'svg' : (platform?.icon?.startsWith('http') ? 'upload' : 'preset')
  );

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);

    try {
      const token = await user.getIdToken();
      const fd = new FormData();
      fd.append('file', file);
      const res = await uploadImage(token, fd);
      if (res.success && res.url) {
        setIcon(res.url);
        setIconSvg('');
      } else {
        alert(res.error || 'فشل رفع الأيقونة');
      }
    } catch (err: any) {
      alert(err.message || 'حدث خطأ أثناء رفع الأيقونة');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) {
      alert('يرجى إدخال اسم المنصة والرابط');
      return;
    }

    setSaving(true);
    try {
      await onSave({
        id: platform?.id || `platform-${Date.now()}`,
        name: name.trim(),
        url: url.trim(),
        icon: iconType === 'svg' ? '' : icon,
        iconSvg: iconType === 'svg' ? iconSvg : '',
        color: color.trim(),
      });
      onClose();
    } catch (err: any) {
      alert(err.message || 'حدث خطأ أثناء الحفظ');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#112240] border border-amber-500/30 dark:border-pharaohGold/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-pharaohGold/10 flex items-center justify-center text-amber-800 dark:text-pharaohGold">
              <DynamicSocialIcon name={name} icon={icon} iconSvg={iconSvg} className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                {platform ? 'تعديل منصة التواصل' : 'إضافة منصة تواصل جديدة'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-gray-400">تحكم كامل باسم المنصة، أيقونتها ورابطها</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-gray-400 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Platform Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-1.5">
              اسم المنصة (Platform Name)
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: TikTok أو Behance أو صفحتنا على فيسبوك"
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none"
            />
          </div>

          {/* Platform URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-1.5">
              رابط المنصة (URL / Link)
            </label>
            <input
              type="text"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none"
              dir="ltr"
            />
          </div>

          {/* Icon Type Switcher */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">
              طريقة اختيار الأيقونة (Icon Mode)
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-[#0A192F] p-1.5 rounded-xl border border-slate-200 dark:border-white/5">
              <button
                type="button"
                onClick={() => setIconType('preset')}
                className={`py-2 text-xs font-bold rounded-lg transition ${
                  iconType === 'preset'
                    ? 'bg-pharaohGold text-[#0A192F] shadow-sm'
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                أيقونات جاهزة
              </button>
              <button
                type="button"
                onClick={() => setIconType('upload')}
                className={`py-2 text-xs font-bold rounded-lg transition ${
                  iconType === 'upload'
                    ? 'bg-pharaohGold text-[#0A192F] shadow-sm'
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                رفع صورة / SVG
              </button>
              <button
                type="button"
                onClick={() => setIconType('svg')}
                className={`py-2 text-xs font-bold rounded-lg transition ${
                  iconType === 'svg'
                    ? 'bg-pharaohGold text-[#0A192F] shadow-sm'
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                كود SVG
              </button>
            </div>
          </div>

          {/* 1. Preset Icons Grid */}
          {iconType === 'preset' && (
            <div className="space-y-2">
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-1 max-h-40 overflow-y-auto p-1">
                {PRESET_ICONS.map((item) => {
                  const isSelected = icon === item.key && !iconSvg;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => {
                        setIcon(item.key);
                        setColor(item.color);
                        setIconSvg('');
                        if (!name) setName(item.name);
                      }}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                        isSelected
                          ? 'border-pharaohGold bg-pharaohGold/15 text-pharaohGold scale-105 shadow-md'
                          : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0A192F] text-slate-600 dark:text-gray-400 hover:border-amber-500/40'
                      }`}
                    >
                      <DynamicSocialIcon icon={item.key} className="w-5 h-5" />
                      <span className="text-[9px] font-bold truncate max-w-full">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Upload Icon */}
          {iconType === 'upload' && (
            <div className="space-y-3 bg-slate-50 dark:bg-[#0A192F] p-4 rounded-xl border border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#112240] flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                  {icon.startsWith('http') ? (
                    <img src={icon} alt="Preview" className="w-9 h-9 object-contain" />
                  ) : (
                    <span className="text-xs text-slate-400">لا توجد</span>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <label className="inline-block cursor-pointer bg-pharaohGold text-[#0A192F] px-4 py-2 rounded-lg text-xs font-bold hover:bg-white transition shadow-sm">
                    {uploading ? 'جاري الرفع...' : '📁 رفع ملف أيقونة'}
                    <input
                      type="file"
                      accept="image/*,.svg"
                      disabled={uploading}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400">PNG, SVG, JPG, WebP بحجم مناسب</p>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-gray-400 mb-1">أو رابط مباشر لصورة الأيقونة (Image URL)</label>
                <input
                  type="url"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="https://example.com/icon.svg"
                  className="w-full bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/10 rounded-lg p-2 text-xs text-slate-900 dark:text-white outline-none"
                  dir="ltr"
                />
              </div>
            </div>
          )}

          {/* 3. Custom SVG */}
          {iconType === 'svg' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-1.5">
                كود SVG مخصص (&lt;svg ...&gt;&lt;/svg&gt;)
              </label>
              <textarea
                rows={3}
                value={iconSvg}
                onChange={(e) => setIconSvg(e.target.value)}
                placeholder="<svg viewBox='0 0 24 24'>...</svg>"
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-mono focus:border-pharaohGold outline-none"
                dir="ltr"
              />
            </div>
          )}

          {/* Optional Accent Color */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-1.5">
              لون التأثير للمنصة (Brand Accent Color)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color || '#C5A16F'}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#1877F2"
                className="flex-1 bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:border-pharaohGold outline-none font-mono"
                dir="ltr"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-white/10 transition"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="bg-pharaohGold text-[#0A192F] px-7 py-2.5 rounded-xl text-xs font-black hover:bg-white transition shadow-lg disabled:opacity-50"
            >
              {saving ? 'جاري الحفظ...' : (platform ? 'حفظ التعديلات' : '+ إضافة المنصة')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
