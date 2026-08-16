'use client';
import { SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { stripSvgColors } from './homeServicesHelpers';

interface HomeServicesGridProps {
  items: SectionItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function HomeServicesGrid({
  items,
  selectedIndex,
  onSelect,
}: HomeServicesGridProps) {
  const { language, direction } = useTranslation();

  return (
    <div className="md:col-span-7 grid grid-cols-2 gap-3.5">
      {items.map((item: SectionItem, index: number) => {
        const isSelected = selectedIndex === index;
        const titleText = getDynamicText(item, 'title', language) || item.title || '';
        const descText = getDynamicText(item, 'description', language) || item.description || '';

        return (
          <div
            key={index}
            onClick={() => onSelect(index)}
            className={`p-4.5 rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
              isSelected
                ? 'bg-gradient-to-br from-[#122345] to-[#0A162B] border-[#C5A16F] shadow-lg'
                : 'bg-[#0B1528]/80 border-white/5 hover:border-white/15'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#C5A16F] text-[#050B14] shadow-sm'
                    : 'bg-white/5 text-[#C5A16F]'
                }`}
              >
                <div
                  className="w-4.5 h-4.5 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: stripSvgColors(item.iconSvg || '') }}
                />
              </div>
            </div>

            <div>
              <h5
                className={`text-base font-bold transition-colors mb-1 line-clamp-1 ${
                  isSelected ? 'text-white' : 'text-gray-300'
                }`}
              >
                {titleText}
              </h5>
              <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed font-light">
                {descText}
              </p>
            </div>

            {/* Micro Footer Indicator */}
            <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between text-[11px]">
              <span className={`font-medium ${isSelected ? 'text-[#C5A16F]' : 'text-gray-500'}`}>
                {isSelected 
                  ? (language === 'ar' ? 'معروض ✦' : 'Active ✦') 
                  : (language === 'ar' ? 'معاينة' : 'Preview')}
              </span>
              <svg 
                className={`w-3 h-3 ${isSelected ? 'text-[#C5A16F]' : 'text-gray-600'} ${direction === 'rtl' ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
