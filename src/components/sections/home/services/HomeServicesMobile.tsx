'use client';
import Link from 'next/link';
import { SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { stripSvgColors } from './homeServicesHelpers';

interface HomeServicesMobileProps {
  items: SectionItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  activeItem: SectionItem;
  activeTitle: string;
  activeDesc: string;
  activeUrl: string;
  activeTags: string[];
}

export function HomeServicesMobile({
  items,
  selectedIndex,
  onSelect,
  activeItem,
  activeTitle,
  activeDesc,
  activeUrl,
  activeTags,
}: HomeServicesMobileProps) {
  const { t, language, direction } = useTranslation();

  return (
    <div className="md:hidden space-y-4">
      {/* Active Service Showcase Card for Mobile */}
      <div className="relative rounded-2xl p-5 bg-gradient-to-br from-[#0F1F3D] via-[#091427] to-[#050B14] border border-[#C5A16F]/40 shadow-2xl overflow-hidden">
        <div className="absolute top-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent shadow-[0_0_10px_#C5A16F]" />
        
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C5A16F] via-[#D4AF37] to-[#9E7D47] text-[#050B14] flex items-center justify-center p-2.5 shadow-lg shadow-[#C5A16F]/20">
            <div
              className="w-6 h-6 flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: stripSvgColors(activeItem?.iconSvg || '') }}
            />
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
            {language === 'ar' ? `خدمة 0${selectedIndex + 1}` : `Service 0${selectedIndex + 1}`}
          </span>
        </div>

        <h4 className="text-xl font-black text-white mb-2 leading-tight">
          {activeTitle}
        </h4>
        <p className="text-gray-300 text-xs leading-relaxed mb-4 font-light">
          {activeDesc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {activeTags.map((tag, i) => (
            <span 
              key={i} 
              className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-white/5 border border-white/10 text-[#C5A16F]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Direct Action Link */}
        <Link
          href={activeUrl}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C5A16F] via-[#D4AF37] to-[#C5A16F] text-[#050B14] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#C5A16F]/20 active:scale-95 transition-all"
        >
          <span>{t("services.exploreBtn") || (language === 'ar' ? 'استكشف كافة التفاصيل' : 'Explore Details')}</span>
          <svg
            className={`w-4 h-4 shrink-0 ${direction === 'rtl' ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>

      {/* Mobile Horizontal Pill / Tab Selector with Smooth Scrolling */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
        {items.map((item: SectionItem, index: number) => {
          const isSelected = selectedIndex === index;
          const titleText = getDynamicText(item, 'title', language) || item.title || '';

          return (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`snap-start shrink-0 px-4 py-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-[#C5A16F] text-[#050B14] border-[#C5A16F] shadow-lg shadow-[#C5A16F]/20'
                  : 'bg-[#0B1528] text-gray-300 border-white/10 hover:border-white/20'
              }`}
            >
              <div
                className={`w-4 h-4 flex items-center justify-center ${isSelected ? 'text-[#050B14]' : 'text-[#C5A16F]'}`}
                dangerouslySetInnerHTML={{ __html: stripSvgColors(item.iconSvg || '') }}
              />
              <span>{titleText}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
