'use client';
import Link from 'next/link';
import { SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
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
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="md:hidden space-y-3.5">
      {/* Active Service Showcase Card for Mobile */}
      <div className={`relative rounded-2xl p-4 sm:p-5 border shadow-xl overflow-hidden ${
        isLight
          ? 'bg-white border-slate-200 shadow-slate-200/50'
          : 'bg-gradient-to-br from-[#0F1F3D] via-[#091427] to-[#050B14] border-[#C5A16F]/40'
      }`}>
        <div className="absolute top-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent shadow-[0_0_10px_#C5A16F]" />
        
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C5A16F] via-[#D4AF37] to-[#9E7D47] text-[#050B14] flex items-center justify-center p-2 shadow-md">
            <div
              className="w-5 h-5 flex items-center justify-center [&_svg]:w-5 [&_svg]:h-5"
              dangerouslySetInnerHTML={{ __html: stripSvgColors(activeItem?.iconSvg || '') }}
            />
          </div>
          <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono ${
            isLight
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}>
            {language === 'ar' ? `خدمة 0${selectedIndex + 1}` : `Service 0${selectedIndex + 1}`}
          </span>
        </div>

        <h4 className={`text-lg font-black mb-1.5 leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
          {activeTitle}
        </h4>
        <p className={`text-xs leading-relaxed mb-3 font-light ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>
          {activeDesc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {activeTags.map((tag, i) => (
            <span 
              key={i} 
              className={`px-2 py-0.5 text-[10px] font-medium rounded-md border ${
                isLight
                  ? 'bg-amber-50 text-[#8A5800] border-amber-200/80'
                  : 'bg-white/5 border-white/10 text-[#C5A16F]'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Direct Action Link */}
        <Link
          href={activeUrl}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C5A16F] via-[#D4AF37] to-[#C5A16F] text-[#050B14] font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
        >
          <span>{t("services.exploreBtn") || (language === 'ar' ? 'استكشف كافة التفاصيل' : 'Explore Details')}</span>
          <svg
            className={`w-3.5 h-3.5 shrink-0 ${direction === 'rtl' ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>

      {/* Mobile Horizontal Pill / Tab Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
        {items.map((item: SectionItem, index: number) => {
          const isSelected = selectedIndex === index;
          const titleText = getDynamicText(item, 'title', language) || item.title || '';

          return (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`snap-start shrink-0 px-3.5 py-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-[#C5A16F] text-[#050B14] border-[#C5A16F] shadow-md shadow-[#C5A16F]/20'
                  : isLight
                    ? 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 shadow-sm'
                    : 'bg-[#0B1528] text-gray-300 border-white/10 hover:border-white/20'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 flex items-center justify-center [&_svg]:w-3.5 [&_svg]:h-3.5 ${
                  isSelected ? 'text-[#050B14]' : isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]'
                }`}
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
