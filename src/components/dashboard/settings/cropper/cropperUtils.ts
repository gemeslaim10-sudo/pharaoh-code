export interface CropBox {
  x: number;      // % 0..100
  y: number;      // % 0..100
  width: number;  // % 0..100
  height: number; // % 0..100
}

export type DragHandle = 'move' | 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'w' | 'e' | null;

export function autoDetectTrim(img: HTMLImageElement, w: number, h: number): CropBox | null {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

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
      const padX = Math.round(w * 0.015);
      const padY = Math.round(h * 0.015);

      const finalMinX = Math.max(0, minX - padX);
      const finalMinY = Math.max(0, minY - padY);
      const finalMaxX = Math.min(w, maxX + padX);
      const finalMaxY = Math.min(h, maxY + padY);

      return {
        x: (finalMinX / w) * 100,
        y: (finalMinY / h) * 100,
        width: ((finalMaxX - finalMinX) / w) * 100,
        height: ((finalMaxY - finalMinY) / h) * 100
      };
    }
    return null;
  } catch (err) {
    console.error("Auto trim detection fallback:", err);
    return null;
  }
}

export function generateCroppedBlob(
  img: HTMLImageElement,
  box: CropBox,
  onComplete: (blob: Blob | null) => void
) {
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
  ctx.drawImage(img, cropPixelX, cropPixelY, cropPixelW, cropPixelH, 0, 0, cropPixelW, cropPixelH);
  canvas.toBlob(onComplete, 'image/png', 1.0);
}
