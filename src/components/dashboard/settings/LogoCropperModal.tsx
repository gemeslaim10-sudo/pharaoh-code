'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface LogoCropperModalProps {
    imageSrc: string | null;
    isOpen: boolean;
    onClose: () => void;
    onCropComplete: (croppedFile: File, previewUrl: string) => void;
}

interface CropBox {
    x: number;      // % 0..100
    y: number;      // % 0..100
    width: number;  // % 0..100
    height: number; // % 0..100
}

type DragHandle = 'move' | 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'w' | 'e' | null;

export default function LogoCropperModal({
    imageSrc,
    isOpen,
    onClose,
    onCropComplete
}: LogoCropperModalProps) {
    const [imgDimensions, setImgDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const [cropBox, setCropBox] = useState<CropBox>({ x: 0, y: 0, width: 100, height: 100 });
    const [activeHandle, setActiveHandle] = useState<DragHandle>(null);
    const [dragStart, setDragStart] = useState<{ x: number; y: number; initialBox: CropBox }>({
        x: 0,
        y: 0,
        initialBox: { x: 0, y: 0, width: 100, height: 100 }
    });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const imageRef = useRef<HTMLImageElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Initialize image and run smart auto-trim
    useEffect(() => {
        if (isOpen && imageSrc) {
            setPreviewUrl(null);
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = imageSrc;
            img.onload = () => {
                imageRef.current = img;
                const w = img.naturalWidth || img.width || 100;
                const h = img.naturalHeight || img.height || 100;
                setImgDimensions({ width: w, height: h });

                // Try auto-detecting logo content bounding box
                autoDetectTrim(img, w, h);
            };
        }
    }, [isOpen, imageSrc]);

    // Smart Auto-Detect & Trim Empty Whitespace / Transparent Margins
    const autoDetectTrim = (img: HTMLImageElement, w: number, h: number) => {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                resetCropBox(img);
                return;
            }

            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, w, h);
            const data = imgData.data;

            // Sample background from top-left corner
            const bgR = data[0] ?? 255;
            const bgG = data[1] ?? 255;
            const bgB = data[2] ?? 255;
            const bgA = data[3] ?? 0;

            const isBgTransparent = bgA < 15;
            const isBgWhite = bgR > 240 && bgG > 240 && bgB > 240;

            let minX = w;
            let minY = h;
            let maxX = 0;
            let maxY = 0;
            let foundContent = false;

            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    const idx = (y * w + x) * 4;
                    const r = data[idx] ?? 0;
                    const g = data[idx + 1] ?? 0;
                    const b = data[idx + 2] ?? 0;
                    const a = data[idx + 3] ?? 0;

                    let isContent = false;
                    if (a > 15) {
                        if (isBgTransparent) {
                            isContent = true;
                        } else if (isBgWhite) {
                            const diff = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);
                            if (diff > 35) isContent = true;
                        } else {
                            const diff = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);
                            if (diff > 30) isContent = true;
                        }
                    }

                    if (isContent) {
                        foundContent = true;
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }

            if (foundContent && maxX > minX && maxY > minY) {
                // Add 1.5% padding margin around detected logo bounds
                const padX = Math.round(w * 0.015);
                const padY = Math.round(h * 0.015);

                const finalMinX = Math.max(0, minX - padX);
                const finalMinY = Math.max(0, minY - padY);
                const finalMaxX = Math.min(w, maxX + padX);
                const finalMaxY = Math.min(h, maxY + padY);

                const trimmedBox: CropBox = {
                    x: (finalMinX / w) * 100,
                    y: (finalMinY / h) * 100,
                    width: ((finalMaxX - finalMinX) / w) * 100,
                    height: ((finalMaxY - finalMinY) / h) * 100
                };

                setCropBox(trimmedBox);
                updatePreview(img, trimmedBox);
            } else {
                resetCropBox(img);
            }
        } catch (err) {
            console.error("Auto trim detection fallback:", err);
            resetCropBox(img);
        }
    };

    const resetCropBox = (img: HTMLImageElement) => {
        const fullBox: CropBox = { x: 2, y: 2, width: 96, height: 96 };
        setCropBox(fullBox);
        updatePreview(img, fullBox);
    };

    // Render current crop box onto preview canvas
    const updatePreview = useCallback((img: HTMLImageElement, box: CropBox) => {
        if (!img) return;

        const w = img.naturalWidth || img.width || 100;
        const h = img.naturalHeight || img.height || 100;

        const cropPixelX = Math.round((box.x / 100) * w);
        const cropPixelY = Math.round((box.y / 100) * h);
        const cropPixelW = Math.max(1, Math.round((box.width / 100) * w));
        const cropPixelH = Math.max(1, Math.round((box.height / 100) * h));

        const canvas = document.createElement('canvas');
        canvas.width = cropPixelW;
        canvas.height = cropPixelH;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            img,
            cropPixelX,
            cropPixelY,
            cropPixelW,
            cropPixelH,
            0,
            0,
            cropPixelW,
            cropPixelH
        );

        setPreviewUrl(canvas.toDataURL('image/png'));
    }, []);

    // Dragging & Resizing Crop Box Handlers
    const startDrag = (clientX: number, clientY: number, handle: DragHandle) => {
        setActiveHandle(handle);
        setDragStart({
            x: clientX,
            y: clientY,
            initialBox: { ...cropBox }
        });
    };

    const handleMouseDown = (e: React.MouseEvent, handle: DragHandle) => {
        e.stopPropagation();
        e.preventDefault();
        startDrag(e.clientX, e.clientY, handle);
    };

    const handleTouchStart = (e: React.TouchEvent, handle: DragHandle) => {
        e.stopPropagation();
        if (e.touches && e.touches[0]) {
            startDrag(e.touches[0].clientX, e.touches[0].clientY, handle);
        }
    };

    const doMove = (clientX: number, clientY: number) => {
        if (!activeHandle || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const deltaX = ((clientX - dragStart.x) / rect.width) * 100;
        const deltaY = ((clientY - dragStart.y) / rect.height) * 100;

        const init = dragStart.initialBox;
        let newBox = { ...cropBox };

        const minSize = 2; // Minimum 2% crop box size

        if (activeHandle === 'move') {
            let newX = init.x + deltaX;
            let newY = init.y + deltaY;

            if (newX < 0) newX = 0;
            if (newY < 0) newY = 0;
            if (newX + init.width > 100) newX = 100 - init.width;
            if (newY + init.height > 100) newY = 100 - init.height;

            newBox = { ...init, x: newX, y: newY };
        } else {
            if (activeHandle.includes('w')) {
                const maxW = init.x + init.width - minSize;
                const newX = Math.max(0, Math.min(maxW, init.x + deltaX));
                newBox.width = init.x + init.width - newX;
                newBox.x = newX;
            }
            if (activeHandle.includes('e')) {
                const maxW = 100 - init.x;
                newBox.width = Math.max(minSize, Math.min(maxW, init.width + deltaX));
            }
            if (activeHandle.includes('n')) {
                const maxH = init.y + init.height - minSize;
                const newY = Math.max(0, Math.min(maxH, init.y + deltaY));
                newBox.height = init.y + init.height - newY;
                newBox.y = newY;
            }
            if (activeHandle.includes('s')) {
                const maxH = 100 - init.y;
                newBox.height = Math.max(minSize, Math.min(maxH, init.height + deltaY));
            }
        }

        setCropBox(newBox);
        if (imageRef.current) {
            updatePreview(imageRef.current, newBox);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        doMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches && e.touches[0]) {
            doMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    const handleEnd = () => {
        setActiveHandle(null);
    };

    // Confirm Crop & Generate Final Trimmed Image File
    const handleApplyCrop = () => {
        if (!imageRef.current) return;
        const img = imageRef.current;
        const w = img.naturalWidth || img.width || 100;
        const h = img.naturalHeight || img.height || 100;

        const cropPixelX = Math.round((cropBox.x / 100) * w);
        const cropPixelY = Math.round((cropBox.y / 100) * h);
        const cropPixelW = Math.max(1, Math.round((cropBox.width / 100) * w));
        const cropPixelH = Math.max(1, Math.round((cropBox.height / 100) * h));

        const canvas = document.createElement('canvas');
        canvas.width = cropPixelW;
        canvas.height = cropPixelH;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            img,
            cropPixelX,
            cropPixelY,
            cropPixelW,
            cropPixelH,
            0,
            0,
            cropPixelW,
            cropPixelH
        );

        canvas.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], 'trimmed-logo.png', { type: 'image/png' });
                const url = URL.createObjectURL(file);
                onCropComplete(file, url);
                onClose();
            }
        }, 'image/png', 1.0);
    };

    if (!isOpen || !imageSrc) return null;

    // Calculate real pixel dimensions of cropped box
    const croppedWidthPx = Math.round((cropBox.width / 100) * imgDimensions.width);
    const croppedHeightPx = Math.round((cropBox.height / 100) * imgDimensions.height);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn" dir="rtl">
            <div className="bg-[#0A192F] border border-pharaohGold/30 rounded-3xl max-w-3xl w-full p-6 lg:p-8 shadow-2xl space-y-6 relative overflow-hidden text-white">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                        <span className="p-2.5 bg-pharaohGold/10 rounded-xl text-pharaohGold text-lg">
                            ✂️
                        </span>
                        <div>
                            <h3 className="text-base font-bold text-white">أداة إزالة المساحات الفارغة وقص الشعار (Logo Margin Trimmer)</h3>
                            <p className="text-xs text-gray-400">حدد إطار القص حول الرسمة فقط لحذف الأطراف الشفافة/الفارغة ويظهر اللوجو بحجم ممتاز في الناف بار</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Dimensions Info & Quick Auto-Trim Action */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 text-xs">
                    <div className="flex items-center gap-4 text-gray-300">
                        <div>
                            <span className="text-gray-400 block text-[10px]">حجم الصورة الأصلية:</span>
                            <span className="font-bold text-white">{imgDimensions.width} × {imgDimensions.height}px</span>
                        </div>
                        <div className="h-6 w-px bg-white/10"></div>
                        <div>
                            <span className="text-gray-400 block text-[10px]">حجم الشعار بعد القص:</span>
                            <span className="font-bold text-pharaohGold">{croppedWidthPx} × {croppedHeightPx}px</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            if (imageRef.current) {
                                autoDetectTrim(imageRef.current, imgDimensions.width, imgDimensions.height);
                            }
                        }}
                        className="px-4 py-2 bg-pharaohGold/15 hover:bg-pharaohGold hover:text-pharaohNavy text-pharaohGold border border-pharaohGold/30 font-bold rounded-xl transition-all flex items-center gap-2"
                    >
                        <span>🪄 قص الحواف والمسافات الفارغة تلقائياً</span>
                    </button>
                </div>

                {/* Workspace Canvas with Aspect-Ratio Matching Container */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-300">
                        اسحب زوايا الإطار بالألوان الذهبية لتحديد حدود الرسمة بالضبط وحذف أي فراغات زائدة:
                    </label>
                    
                    <div className="w-full bg-[#030C1C] rounded-2xl border border-white/10 p-4 flex items-center justify-center min-h-[220px]">
                        <div
                            ref={containerRef}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleEnd}
                            onMouseLeave={handleEnd}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleEnd}
                            style={{
                                aspectRatio: imgDimensions.width > 0 && imgDimensions.height > 0
                                    ? `${imgDimensions.width} / ${imgDimensions.height}`
                                    : 'auto'
                            }}
                            className="relative max-h-72 max-w-full mx-auto overflow-hidden rounded-lg select-none shadow-2xl"
                        >
                            {/* Base Image rendered in 100% aspect ratio */}
                            <img
                                src={imageSrc}
                                alt="Full Original Logo"
                                className="w-full h-full object-fill pointer-events-none block"
                            />

                            {/* Active Draggable Crop Box Overlay with Shadow Dimming */}
                            <div
                                style={{
                                    left: `${cropBox.x}%`,
                                    top: `${cropBox.y}%`,
                                    width: `${cropBox.width}%`,
                                    height: `${cropBox.height}%`
                                }}
                                onMouseDown={(e) => handleMouseDown(e, 'move')}
                                onTouchStart={(e) => handleTouchStart(e, 'move')}
                                className="absolute border-2 border-pharaohGold shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] cursor-move z-20"
                            >
                                {/* Grid lines inside crop box */}
                                <div className="w-full h-full border border-pharaohGold/20 grid grid-cols-3 grid-rows-3 pointer-events-none">
                                    <div className="border-r border-b border-pharaohGold/20"></div>
                                    <div className="border-r border-b border-pharaohGold/20"></div>
                                    <div className="border-b border-pharaohGold/20"></div>
                                    <div className="border-r border-b border-pharaohGold/20"></div>
                                    <div className="border-r border-b border-pharaohGold/20"></div>
                                    <div className="border-b border-pharaohGold/20"></div>
                                    <div className="border-r border-pharaohGold/20"></div>
                                    <div className="border-r border-pharaohGold/20"></div>
                                    <div></div>
                                </div>

                                {/* 8 Resize Handles */}
                                <div onMouseDown={(e) => handleMouseDown(e, 'nw')} onTouchStart={(e) => handleTouchStart(e, 'nw')} className="absolute -top-2 -left-2 w-4 h-4 bg-pharaohGold border-2 border-pharaohNavy rounded-full cursor-nwse-resize z-30"></div>
                                <div onMouseDown={(e) => handleMouseDown(e, 'ne')} onTouchStart={(e) => handleTouchStart(e, 'ne')} className="absolute -top-2 -right-2 w-4 h-4 bg-pharaohGold border-2 border-pharaohNavy rounded-full cursor-nesw-resize z-30"></div>
                                <div onMouseDown={(e) => handleMouseDown(e, 'sw')} onTouchStart={(e) => handleTouchStart(e, 'sw')} className="absolute -bottom-2 -left-2 w-4 h-4 bg-pharaohGold border-2 border-pharaohNavy rounded-full cursor-nesw-resize z-30"></div>
                                <div onMouseDown={(e) => handleMouseDown(e, 'se')} onTouchStart={(e) => handleTouchStart(e, 'se')} className="absolute -bottom-2 -right-2 w-4 h-4 bg-pharaohGold border-2 border-pharaohNavy rounded-full cursor-nwse-resize z-30"></div>

                                <div onMouseDown={(e) => handleMouseDown(e, 'n')} onTouchStart={(e) => handleTouchStart(e, 'n')} className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-3 bg-pharaohGold rounded-full cursor-ns-resize z-30"></div>
                                <div onMouseDown={(e) => handleMouseDown(e, 's')} onTouchStart={(e) => handleTouchStart(e, 's')} className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-3 bg-pharaohGold rounded-full cursor-ns-resize z-30"></div>
                                <div onMouseDown={(e) => handleMouseDown(e, 'w')} onTouchStart={(e) => handleTouchStart(e, 'w')} className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-8 bg-pharaohGold rounded-full cursor-ew-resize z-30"></div>
                                <div onMouseDown={(e) => handleMouseDown(e, 'e')} onTouchStart={(e) => handleTouchStart(e, 'e')} className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-8 bg-pharaohGold rounded-full cursor-ew-resize z-30"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Website Navbar Preview */}
                <div className="space-y-2">
                    <label className="block text-xs font-bold text-pharaohGold">
                        👀 معاينة حية لظهور الشعار في الناف بار بعد إزالة الهوامش الفارغة:
                    </label>
                    <div className="bg-[#0A192F] border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-inner">
                        {/* Mock Navbar Logo Space */}
                        <div className="h-10 px-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Trimmed Logo Navbar Preview" className="h-8 w-auto object-contain transition-all" />
                            ) : (
                                <span className="text-xs text-gray-500">معاينة الشعار</span>
                            )}
                        </div>

                        {/* Mock Navigation Bar links */}
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

                {/* Footer Action Buttons */}
                <div className="flex justify-end items-center gap-3 border-t border-white/10 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
                    >
                        إلغاء
                    </button>
                    <button
                        type="button"
                        onClick={handleApplyCrop}
                        className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-pharaohGold to-amber-600 text-pharaohNavy shadow-lg hover:opacity-90 transition"
                    >
                        ✓ اعتماد القص الحقيقي وحفظ الشعار
                    </button>
                </div>

            </div>
        </div>
    );
}
