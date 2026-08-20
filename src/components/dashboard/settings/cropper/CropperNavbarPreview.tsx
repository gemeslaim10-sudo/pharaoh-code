'use client';

interface CropperNavbarPreviewProps {
  previewUrl: string | null;
  target?: 'dark' | 'light' | null;
}

export function CropperNavbarPreview({ previewUrl, target = 'dark' }: CropperNavbarPreviewProps) {
  const isLight = target === 'light';

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-pharaohGold">
        👀 معاينة حية لظهور الشعار في الناف بار ({isLight ? 'الوضع الفاتح ☀️' : 'الوضع الداكن 🌙'}) بعد إزالة الهوامش الفارغة:
      </label>
      <div className={`border rounded-2xl p-4 flex items-center justify-between shadow-inner transition-colors ${
        isLight
          ? 'bg-white border-gray-200 text-slate-800'
          : 'bg-[#0A192F] border-white/10 text-gray-300'
      }`}>
        <div className={`h-10 px-3 rounded-xl border flex items-center justify-center overflow-hidden ${
          isLight ? 'bg-gray-50 border-gray-200' : 'bg-white/5 border-white/10'
        }`}>
          {previewUrl ? (
            <img src={previewUrl} alt="Trimmed Logo Navbar Preview" className="h-8 w-auto object-contain transition-all" />
          ) : (
            <span className={`text-xs ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>معاينة الشعار</span>
          )}
        </div>

        <div className={`flex items-center gap-4 text-[11px] font-medium ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>
          <span className="hover:text-pharaohGold cursor-pointer">الرئيسية</span>
          <span className="hover:text-pharaohGold cursor-pointer">خدماتنا</span>
          <span className="hover:text-pharaohGold cursor-pointer">عن الشركة</span>
          <button type="button" className="bg-pharaohGold text-pharaohNavy font-bold px-3 py-1 rounded-lg text-[10px]">
            تواصل معنا
          </button>
        </div>
      </div>
    </div>
  );
}
