'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { CropBox, DragHandle, autoDetectTrim, generateCroppedBlob } from './cropperUtils';

export function useLogoCropper(
  imageSrc: string | null,
  isOpen: boolean,
  onCropComplete: (croppedFile: File, previewUrl: string) => void,
  onClose: () => void
) {
  const [imgDimensions, setImgDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [cropBox, setCropBox] = useState<CropBox>({ x: 0, y: 0, width: 100, height: 100 });
  const [activeHandle, setActiveHandle] = useState<DragHandle>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number; initialBox: CropBox }>({
    x: 0, y: 0, initialBox: { x: 0, y: 0, width: 100, height: 100 }
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updatePreview = useCallback((img: HTMLImageElement, box: CropBox) => {
    generateCroppedBlob(img, box, (blob) => {
      if (blob) setPreviewUrl(URL.createObjectURL(blob));
    });
  }, []);

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

        const detected = autoDetectTrim(img, w, h);
        const box = detected || { x: 2, y: 2, width: 96, height: 96 };
        setCropBox(box);
        updatePreview(img, box);
      };
    }
  }, [isOpen, imageSrc, updatePreview]);

  const startDrag = (clientX: number, clientY: number, handle: DragHandle) => {
    setActiveHandle(handle);
    setDragStart({ x: clientX, y: clientY, initialBox: { ...cropBox } });
  };

  const doMove = (clientX: number, clientY: number) => {
    if (!activeHandle || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const deltaX = ((clientX - dragStart.x) / rect.width) * 100;
    const deltaY = ((clientY - dragStart.y) / rect.height) * 100;
    const init = dragStart.initialBox;
    let newBox = { ...cropBox };
    const minSize = 2;

    if (activeHandle === 'move') {
      let newX = Math.max(0, Math.min(100 - init.width, init.x + deltaX));
      let newY = Math.max(0, Math.min(100 - init.height, init.y + deltaY));
      newBox = { ...init, x: newX, y: newY };
    } else {
      if (activeHandle.includes('w')) {
        const maxW = init.x + init.width - minSize;
        const newX = Math.max(0, Math.min(maxW, init.x + deltaX));
        newBox.width = init.x + init.width - newX;
        newBox.x = newX;
      }
      if (activeHandle.includes('e')) newBox.width = Math.max(minSize, Math.min(100 - init.x, init.width + deltaX));
      if (activeHandle.includes('n')) {
        const maxH = init.y + init.height - minSize;
        const newY = Math.max(0, Math.min(maxH, init.y + deltaY));
        newBox.height = init.y + init.height - newY;
        newBox.y = newY;
      }
      if (activeHandle.includes('s')) newBox.height = Math.max(minSize, Math.min(100 - init.y, init.height + deltaY));
    }

    setCropBox(newBox);
    if (imageRef.current) updatePreview(imageRef.current, newBox);
  };

  const handleApplyCrop = () => {
    if (!imageRef.current) return;
    generateCroppedBlob(imageRef.current, cropBox, (blob) => {
      if (blob) {
        const file = new File([blob], 'trimmed-logo.png', { type: 'image/png' });
        const url = URL.createObjectURL(file);
        onCropComplete(file, url);
        onClose();
      }
    });
  };

  const runAutoTrim = () => {
    if (imageRef.current) {
      const detected = autoDetectTrim(imageRef.current, imgDimensions.width, imgDimensions.height);
      if (detected) {
        setCropBox(detected);
        updatePreview(imageRef.current, detected);
      }
    }
  };

  return {
    imgDimensions, cropBox, previewUrl, containerRef, startDrag, doMove, setActiveHandle, handleApplyCrop, runAutoTrim
  };
}
