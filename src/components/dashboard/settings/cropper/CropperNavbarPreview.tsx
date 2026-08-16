'use client';

interface CropperNavbarPreviewProps {
  previewUrl: string | null;
}

export function CropperNavbarPreview({ previewUrl }: CropperNavbarPreviewProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-pharaohGold">
        👀 معاينة حية لظهور الشعار في الناف بار بعد إزالة الهوامش الفارغة:
      </label>
      <div className="bg-[#0A192F] border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-inner">
        <div className="h-10 px-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
          {previewUrl ? (
            <img src={previewUrl} alt="Trimmed Logo Navbar Preview" className="h-8 w-auto object-contain transition-all" />
          ) : (
            <span className="text-xs text-gray-500">معاينة الشعار</span>
          )}
        </div>

        <div className="flex items-center gap-4 text-[11px] text-gray-300">
          <span className="hover:text-pharaohGold">الرئيسية</span>
          <span className="hover:text-pharaohGold">خدماتنا</span>
          <span className="hover:text-pharaohGold">عن الشركة</span>
          <button type="button" className="bg-pharaohGold text-pharaohNavy font-bold px-3 py-1 rounded-lg text-[10px]">
            تواصل معنا
          </button>
        </div>
      </div>
    </div>
  );
}
