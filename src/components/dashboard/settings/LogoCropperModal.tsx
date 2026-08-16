'use client';

import { CropperWorkspace } from './cropper/CropperWorkspace';
import { CropperNavbarPreview } from './cropper/CropperNavbarPreview';
import { useLogoCropper } from './cropper/useLogoCropper';

interface LogoCropperModalProps {
  imageSrc: string | null;
  isOpen: boolean;
  onClose: () => void;
  onCropComplete: (croppedFile: File, previewUrl: string) => void;
}

export default function LogoCropperModal({
  imageSrc,
  isOpen,
  onClose,
  onCropComplete
}: LogoCropperModalProps) {
  const {
    imgDimensions,
    cropBox,
    previewUrl,
    containerRef,
    startDrag,
    doMove,
    setActiveHandle,
    handleApplyCrop,
    runAutoTrim
  } = useLogoCropper(imageSrc, isOpen, onCropComplete, onClose);

  if (!isOpen || !imageSrc) return null;

  const croppedWidthPx = Math.round((cropBox.width / 100) * imgDimensions.width);
  const croppedHeightPx = Math.round((cropBox.height / 100) * imgDimensions.height);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" dir="rtl">
      <div className="bg-[#0A192F] border border-pharaohGold/30 rounded-3xl max-w-3xl w-full p-6 lg:p-8 shadow-2xl space-y-6 relative overflow-hidden text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-pharaohGold/10 rounded-xl text-pharaohGold text-lg">✂️</span>
            <div>
              <h3 className="text-base font-bold text-white">أداة إزالة المساحات الفارغة وقص الشعار (Logo Margin Trimmer)</h3>
              <p className="text-xs text-gray-400">حدد إطار القص حول الرسمة فقط لحذف الأطراف الشفافة/الفارغة</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition">✕</button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 text-xs">
          <div className="flex items-center gap-4 text-gray-300">
            <div>
              <span className="text-gray-400 block text-[10px]">حجم الصورة الأصلية:</span>
              <span className="font-bold text-white">{imgDimensions.width} × {imgDimensions.height}px</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div>
              <span className="text-gray-400 block text-[10px]">حجم الشعار بعد القص:</span>
              <span className="font-bold text-pharaohGold">{croppedWidthPx} × {croppedHeightPx}px</span>
            </div>
          </div>
          <button
            type="button"
            onClick={runAutoTrim}
            className="px-4 py-2 bg-pharaohGold/15 hover:bg-pharaohGold hover:text-pharaohNavy text-pharaohGold border border-pharaohGold/30 font-bold rounded-xl transition-all flex items-center gap-2"
          >
            🪄 قص الحواف والمسافات الفارغة تلقائياً
          </button>
        </div>

        <CropperWorkspace
          containerRef={containerRef} imageSrc={imageSrc} cropBox={cropBox} imgDimensions={imgDimensions}
          onMouseDown={(e, h) => { e.preventDefault(); e.stopPropagation(); startDrag(e.clientX, e.clientY, h); }}
          onTouchStart={(e, h) => { e.stopPropagation(); if (e.touches[0]) startDrag(e.touches[0].clientX, e.touches[0].clientY, h); }}
          onMouseMove={(e) => doMove(e.clientX, e.clientY)}
          onTouchMove={(e) => { if (e.touches[0]) doMove(e.touches[0].clientX, e.touches[0].clientY); }}
          onEnd={() => setActiveHandle(null)}
        />

        <CropperNavbarPreview previewUrl={previewUrl} />

        <div className="flex justify-end items-center gap-3 border-t border-white/10 pt-4">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition">إلغاء</button>
          <button type="button" onClick={handleApplyCrop} className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy shadow-lg hover:opacity-90 transition">✓ اعتماد القص الحقيقي وحفظ الشعار</button>
        </div>
      </div>
    </div>
  );
}
