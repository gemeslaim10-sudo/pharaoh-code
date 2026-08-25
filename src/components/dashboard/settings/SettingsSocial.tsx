'use client';

import { useState, useEffect } from 'react';
import { getSocialLinks, addSocialPlatform, updateSocialPlatform, deleteSocialPlatform } from '@/app/actions/dashboard/settings';
import { SocialPlatform } from '@/types/settings';
import { auth } from '@/lib/firebase/config';
import { DynamicSocialIcon } from '@/components/common/DynamicSocialIcon';
import { SocialPlatformModal } from './social/SocialPlatformModal';
import { uploadImage } from '@/app/actions/dashboard/upload';

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

export default function SettingsSocial() {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<SocialPlatform | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New platform form state
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('facebook');
  const [iconSvg, setIconSvg] = useState('');
  const [color, setColor] = useState('#1877F2');
  const [iconType, setIconType] = useState<'preset' | 'upload' | 'svg'>('preset');
  const [uploading, setUploading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getSocialLinks();
      setPlatforms(Array.isArray(data.items) ? data.items : []);
    } catch (error) {
      console.error("Failed to load social platforms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const user = auth.currentUser;
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
        alert(res.error || 'فشل رفع الصورة');
      }
    } catch (err: any) {
      alert(err.message || 'حدث خطأ أثناء الرفع');
    } finally {
      setUploading(false);
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) {
      alert('يرجى إدخال اسم المنصة ورابطها');
      return;
    }

    setAdding(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();

      await addSocialPlatform(token, {
        name: name.trim(),
        url: url.trim(),
        icon: iconType === 'svg' ? '' : icon,
        iconSvg: iconType === 'svg' ? iconSvg : '',
        color: color.trim() || '#C5A16F',
      });

      setName('');
      setUrl('');
      setIcon('facebook');
      setIconSvg('');
      setColor('#1877F2');
      setIconType('preset');

      await loadData();
      alert('تمت إضافة المنصة بنجاح وتحديث الموقع فوراً!');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'حدث خطأ أثناء إضافة المنصة');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string, platformName: string) => {
    if (!confirm(`هل أنت متأكد من حذف منصة "${platformName}" نهائياً من الموقع؟`)) return;

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();

      await deleteSocialPlatform(token, id);
      await loadData();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'حدث خطأ أثناء الحذف');
    }
  };

  const handleSaveModal = async (updated: SocialPlatform) => {
    const user = auth.currentUser;
    if (!user) throw new Error('Not authenticated');
    const token = await user.getIdToken();

    await updateSocialPlatform(token, updated.id, updated);
    await loadData();
  };

  return (
    <div className="space-y-8">
      {/* 1. Add New Social Platform Form */}
      <div className="bg-white dark:bg-[#112240] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-amber-800 dark:text-pharaohGold flex items-center gap-2">
              <span>🌐</span>
              <span>إضافة منصة تواصل اجتماعي جديدة</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
              أضف أي منصة مع اسم ورابط وأيقونة مخصصة تظهر فوراً في الفوتر وصفحة تواصل معنا
            </p>
          </div>
        </div>

        <form onSubmit={handleAddSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">
                اسم المنصة (مثال: TikTok, Behance, فيسبوك)
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسم المنصة..."
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:border-pharaohGold outline-none"
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300 mb-2">
                رابط المنصة المباشر (URL)
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
          </div>

          {/* Icon Mode Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 dark:text-gray-300">
                أيقونة المنصة
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIconType('preset')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                    iconType === 'preset'
                      ? 'bg-pharaohGold text-[#0A192F]'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400'
                  }`}
                >
                  منصة جاهزة
                </button>
                <button
                  type="button"
                  onClick={() => setIconType('upload')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                    iconType === 'upload'
                      ? 'bg-pharaohGold text-[#0A192F]'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400'
                  }`}
                >
                  رفع صورة/أيقونة
                </button>
                <button
                  type="button"
                  onClick={() => setIconType('svg')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                    iconType === 'svg'
                      ? 'bg-pharaohGold text-[#0A192F]'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400'
                  }`}
                >
                  كود SVG
                </button>
              </div>
            </div>

            {iconType === 'preset' && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2.5 pt-1">
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
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                        isSelected
                          ? 'border-pharaohGold bg-pharaohGold/15 text-pharaohGold scale-105 shadow-md'
                          : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0A192F] text-slate-600 dark:text-gray-400 hover:border-amber-500/40'
                      }`}
                    >
                      <DynamicSocialIcon icon={item.key} className="w-5 h-5" />
                      <span className="text-[10px] font-bold truncate max-w-full">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {iconType === 'upload' && (
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 dark:bg-[#0A192F] p-4 rounded-xl border border-slate-200 dark:border-white/10">
                <div className="w-14 h-14 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#112240] flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                  {icon.startsWith('http') ? (
                    <img src={icon} alt="Preview" className="w-9 h-9 object-contain" />
                  ) : (
                    <span className="text-xs text-slate-400">معاينة</span>
                  )}
                </div>
                <div className="flex-1 space-y-1 w-full">
                  <label className="inline-flex items-center gap-2 cursor-pointer bg-pharaohGold text-[#0A192F] px-4 py-2 rounded-lg text-xs font-bold hover:bg-white transition shadow-sm">
                    {uploading ? 'جاري الرفع...' : '📁 اختيار ورفع ملف أيقونة'}
                    <input
                      type="file"
                      accept="image/*,.svg"
                      disabled={uploading}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400">يدعم PNG, SVG, JPG, WebP</p>
                </div>
              </div>
            )}

            {iconType === 'svg' && (
              <textarea
                rows={3}
                value={iconSvg}
                onChange={(e) => setIconSvg(e.target.value)}
                placeholder="<svg viewBox='0 0 24 24'>...</svg>"
                className="w-full bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-mono focus:border-pharaohGold outline-none"
                dir="ltr"
              />
            )}
          </div>

          {/* Color & Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label className="text-xs font-bold text-slate-700 dark:text-gray-400">لون التأثير (Hover):</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs font-mono text-slate-500 dark:text-gray-400">{color}</span>
            </div>

            <button
              type="submit"
              disabled={adding || uploading}
              className="w-full sm:w-auto bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
            >
              {adding ? 'جاري الإضافة...' : '+ إضافة المنصة للموقع'}
            </button>
          </div>
        </form>
      </div>

      {/* 2. Configured Platforms List */}
      <div className="bg-white dark:bg-[#112240] p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>📊</span>
              <span>المنصات النشطة حالياً في الموقع ({platforms.length})</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
              جميع المنصات المعروضة في الفوتر وصفحة تواصل معنا مع إمكانية التعديل والحذف
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-pharaohGold font-bold text-sm">جاري تحميل المنصات...</div>
        ) : platforms.length === 0 ? (
          <div className="py-12 text-center bg-slate-50 dark:bg-[#0A192F] rounded-2xl border border-slate-200 dark:border-white/5 space-y-2">
            <div className="text-3xl">🌐</div>
            <p className="text-sm font-bold text-slate-700 dark:text-gray-300">لا توجد منصات تواصل مضافة حالياً.</p>
            <p className="text-xs text-slate-500 dark:text-gray-400">استخدم النموذج أعلاه لإضافة أول منصة تواصل اجتماعي للموقع.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 dark:bg-[#0A192F] border border-slate-200 dark:border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-pharaohGold/40 transition shadow-sm"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 text-white"
                    style={{ backgroundColor: item.color || '#C5A16F' }}
                  >
                    <DynamicSocialIcon
                      name={item.name}
                      icon={item.icon}
                      iconSvg={item.iconSvg}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base truncate">
                      {item.name}
                    </h3>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-800 dark:text-pharaohGold hover:underline truncate block mt-0.5"
                      dir="ltr"
                    >
                      {item.url}
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/5 text-xs">
                  <span className="flex items-center gap-1.5 text-slate-500 dark:text-gray-400 font-mono text-[11px]">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color || '#C5A16F' }} />
                    {item.color || '#C5A16F'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPlatform(item);
                        setIsModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg font-bold transition cursor-pointer"
                    >
                      تعديل
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.name)}
                      className="px-3 py-1.5 bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white rounded-lg font-bold transition cursor-pointer"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <SocialPlatformModal
          platform={editingPlatform}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPlatform(null);
          }}
          onSave={handleSaveModal}
        />
      )}
    </div>
  );
}
