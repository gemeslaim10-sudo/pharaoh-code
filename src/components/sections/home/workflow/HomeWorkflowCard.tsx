'use client';

import { SectionItem } from '@/types';

function stripSvgColors(svg: string): string {
  if (!svg) return '';
  return svg
    .replace(/\s*(?:group-hover:|group-active:)?text-\[#[^\]]+\]/g, '')
    .replace(/\s*(?:group-hover:|group-active:)?stroke-\[#[^\]]+\]/g, '')
    .replace(/stroke="#[a-fA-F0-9]{3,6}"/g, 'stroke="currentColor"')
    .replace(/fill="#[a-fA-F0-9]{3,6}"/g, 'fill="currentColor"')
    .replace(/stroke:#[a-fA-F0-9]{3,6}/g, 'stroke:currentColor')
    .replace(/fill:#[a-fA-F0-9]{3,6}/g, 'fill:currentColor');
}

interface HomeWorkflowCardProps {
  step: SectionItem;
  index: number;
  stepTitle: string;
  stepDesc: string;
  isLight: boolean;
}

export function HomeWorkflowCard({
  step,
  index,
  stepTitle,
  stepDesc,
  isLight,
}: HomeWorkflowCardProps) {
  return (
    <div 
      className={`group relative rounded-2xl p-5 sm:p-6 border transition-all duration-400 shadow-xl flex flex-col justify-between overflow-hidden h-full hover:-translate-y-2 select-none ${
        isLight
          ? 'bg-white border-slate-200/90 hover:border-[#C5A16F] hover:shadow-[0_20px_40px_-10px_rgba(197,161,111,0.3)]'
          : 'bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050B14] border-white/10 hover:border-[#C5A16F]/70 hover:shadow-[0_20px_45px_-10px_rgba(197,161,111,0.3)]'
      }`}
    >
      {/* Top Subtle Edge Highlight */}
      <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_12px_#C5A16F] z-30" />

      {/* Shimmer Light Sweep on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30" />

      <div className="relative z-10">
        {/* Step Header with Number + Icon */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-400 shadow-md group-hover:scale-108 ${
            isLight
              ? 'bg-slate-100 border-slate-200 group-hover:bg-[#C5A16F] group-hover:border-[#C5A16F]'
              : 'bg-white/5 border-white/10 group-hover:bg-[#C5A16F] group-hover:border-[#C5A16F]'
          }`}>
            <div 
              className={`transition-colors duration-400 group-hover:text-[#050B14] ${
                isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]'
              }`}
              dangerouslySetInnerHTML={{ __html: stripSvgColors(step.iconSvg || '') }} 
            />
          </div>

          <span className={`font-mono text-xs font-black px-2.5 py-1 rounded-lg border transition-all duration-300 shadow-sm ${
            isLight
              ? 'bg-amber-50/80 border-[#C5A16F]/30 text-[#8A5800] group-hover:bg-[#C5A16F] group-hover:text-[#050B14]'
              : 'bg-white/5 border-[#C5A16F]/30 text-[#C5A16F] group-hover:bg-[#C5A16F] group-hover:text-[#050B14]'
          }`}>
            0{index + 1}
          </span>
        </div>

        <h4 className={`text-base sm:text-lg font-black mb-2 transition-colors duration-300 ${
          isLight
            ? 'text-slate-900 group-hover:text-[#8A5800]'
            : 'text-white group-hover:text-[#C5A16F]'
        }`}>
          {stepTitle}
        </h4>
        <p className={`text-xs leading-relaxed font-light line-clamp-3 ${
          isLight ? 'text-slate-600' : 'text-gray-300'
        }`}>
          {stepDesc}
        </p>
      </div>

      {/* Bottom Progress Accent */}
      <div className={`mt-5 pt-3.5 border-t flex items-center justify-between relative z-10 ${
        isLight ? 'border-slate-100' : 'border-white/5'
      }`}>
        <span className="w-2 h-2 rounded-full bg-[#C5A16F]/50 group-hover:bg-[#C5A16F] group-hover:shadow-[0_0_8px_#C5A16F] transition-all" />
        <div className="h-0.5 flex-1 mx-2.5 bg-white/5 group-hover:bg-[#C5A16F]/40 rounded-full transition-all duration-500" />
        <span className="w-2 h-2 rounded-full bg-[#C5A16F]/50 group-hover:bg-[#C5A16F] group-hover:shadow-[0_0_8px_#C5A16F] transition-all" />
      </div>
    </div>
  );
}
