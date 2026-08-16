'use client';

import React, { RefObject } from 'react';
import { CropBox, DragHandle } from './cropperUtils';

interface CropperWorkspaceProps {
  containerRef: RefObject<HTMLDivElement | null>;
  imageSrc: string;
  cropBox: CropBox;
  imgDimensions: { width: number; height: number };
  onMouseDown: (e: React.MouseEvent, handle: DragHandle) => void;
  onTouchStart: (e: React.TouchEvent, handle: DragHandle) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onEnd: () => void;
}

export function CropperWorkspace({
  containerRef,
  imageSrc,
  cropBox,
  imgDimensions,
  onMouseDown,
  onTouchStart,
  onMouseMove,
  onTouchMove,
  onEnd,
}: CropperWorkspaceProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-gray-300">
        اسحب زوايا الإطار بالألوان الذهبية لتحديد حدود الرسمة بالضبط وحذف أي فراغات زائدة:
      </label>
      
      <div className="w-full bg-[#030C1C] rounded-2xl border border-white/10 p-4 flex items-center justify-center min-h-[220px]">
        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onMouseUp={onEnd}
          onMouseLeave={onEnd}
          onTouchMove={onTouchMove}
          onTouchEnd={onEnd}
          style={{
            aspectRatio: imgDimensions.width > 0 && imgDimensions.height > 0
              ? `${imgDimensions.width} / ${imgDimensions.height}`
              : 'auto'
          }}
          className="relative max-h-72 max-w-full mx-auto overflow-hidden rounded-lg select-none shadow-2xl"
        >
          <img
            src={imageSrc}
            alt="Full Original Logo"
            className="w-full h-full object-fill pointer-events-none block"
          />

          <div
            style={{
              left: `${cropBox.x}%`,
              top: `${cropBox.y}%`,
              width: `${cropBox.width}%`,
              height: `${cropBox.height}%`
            }}
            onMouseDown={(e) => onMouseDown(e, 'move')}
            onTouchStart={(e) => onTouchStart(e, 'move')}
            className="absolute border-2 border-pharaohGold shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] cursor-move z-20"
          >
            <div className="w-full h-full border border-pharaohGold/20 grid grid-cols-3 grid-rows-3 pointer-events-none">
              <div className="border-r border-b border-pharaohGold/20" />
              <div className="border-r border-b border-pharaohGold/20" />
              <div className="border-b border-pharaohGold/20" />
              <div className="border-r border-b border-pharaohGold/20" />
              <div className="border-r border-b border-pharaohGold/20" />
              <div className="border-b border-pharaohGold/20" />
              <div className="border-r border-pharaohGold/20" />
              <div className="border-r border-pharaohGold/20" />
              <div />
            </div>

            {/* 8 Resize Handles */}
            <div onMouseDown={(e) => onMouseDown(e, 'nw')} onTouchStart={(e) => onTouchStart(e, 'nw')} className="absolute -top-2 -left-2 w-4 h-4 bg-pharaohGold border-2 border-pharaohNavy rounded-full cursor-nwse-resize z-30" />
            <div onMouseDown={(e) => onMouseDown(e, 'ne')} onTouchStart={(e) => onTouchStart(e, 'ne')} className="absolute -top-2 -right-2 w-4 h-4 bg-pharaohGold border-2 border-pharaohNavy rounded-full cursor-nesw-resize z-30" />
            <div onMouseDown={(e) => onMouseDown(e, 'sw')} onTouchStart={(e) => onTouchStart(e, 'sw')} className="absolute -bottom-2 -left-2 w-4 h-4 bg-pharaohGold border-2 border-pharaohNavy rounded-full cursor-nesw-resize z-30" />
            <div onMouseDown={(e) => onMouseDown(e, 'se')} onTouchStart={(e) => onTouchStart(e, 'se')} className="absolute -bottom-2 -right-2 w-4 h-4 bg-pharaohGold border-2 border-pharaohNavy rounded-full cursor-nwse-resize z-30" />

            <div onMouseDown={(e) => onMouseDown(e, 'n')} onTouchStart={(e) => onTouchStart(e, 'n')} className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-3 bg-pharaohGold rounded-full cursor-ns-resize z-30" />
            <div onMouseDown={(e) => onMouseDown(e, 's')} onTouchStart={(e) => onTouchStart(e, 's')} className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-3 bg-pharaohGold rounded-full cursor-ns-resize z-30" />
            <div onMouseDown={(e) => onMouseDown(e, 'w')} onTouchStart={(e) => onTouchStart(e, 'w')} className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-8 bg-pharaohGold rounded-full cursor-ew-resize z-30" />
            <div onMouseDown={(e) => onMouseDown(e, 'e')} onTouchStart={(e) => onTouchStart(e, 'e')} className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-8 bg-pharaohGold rounded-full cursor-ew-resize z-30" />
          </div>
        </div>
      </div>
    </div>
  );
}
