'use client';
import { SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { stripSvgColors } from './homeServicesHelpers';
import { motion } from 'framer-motion';

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
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="md:col-span-7 grid grid-cols-2 gap-3 sm:gap-3.5">
      {items.map((item: SectionItem, index: number) => {
        const isSelected = selectedIndex === index;
        const titleText = getDynamicText(item, 'title', language) || item.title || '';
        const descText = getDynamicText(item, 'description', language) || item.description || '';

        return (
          <motion.div
            key={index}
            onClick={() => onSelect(index)}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            className={`relative group p-4 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between border overflow-hidden select-none ${
              isSelected
                ? isLight
                  ? 'bg-white border-[#C5A16F] shadow-[0_12px_28px_-6px_rgba(197,161,111,0.3)]'
                  : 'bg-gradient-to-br from-[#122345] to-[#0A162B] border-[#C5A16F] shadow-[0_12px_28px_-6px_rgba(197,161,111,0.3)]'
                : isLight
                  ? 'bg-white border-slate-200/80 hover:border-[#C5A16F]/50 shadow-sm'
                  : 'bg-[#0B1528]/90 border-white/5 hover:border-white/20'
            }`}
          >
            {/* Top Glowing Beam */}
            <div className={`absolute top-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent transition-opacity duration-300 shadow-[0_0_10px_#C5A16F] ${
              isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`} />

            {/* Shimmer Light Sweep on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

            <div className="flex items-center justify-between gap-2 mb-2.5 relative z-10">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 shadow-sm group-hover:scale-108 ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#C5A16F] via-[#DFB77D] to-[#9E7D47] text-[#050B14] shadow-md'
                    : isLight
                      ? 'bg-slate-100 text-[#8A5800]'
                      : 'bg-white/5 text-[#C5A16F] group-hover:bg-[#C5A16F]/20'
                }`}
              >
                <div
                  className="w-4.5 h-4.5 flex items-center justify-center [&_svg]:w-4.5 [&_svg]:h-4.5"
                  dangerouslySetInnerHTML={{ __html: stripSvgColors(item.iconSvg || '') }}
                />
              </div>

              <span className={`inline-flex items-center leading-none text-[10px] font-mono font-black px-2 py-0.5 rounded-md border ${
                isSelected
                  ? isLight
                    ? 'bg-amber-50 text-[#8A5800] border-[#C5A16F]/40'
                    : 'bg-[#C5A16F]/10 text-[#C5A16F] border-[#C5A16F]/30'
                  : 'bg-white/5 border-white/5 text-gray-400'
              }`}>
                0{index + 1}
              </span>
            </div>

            <div className="relative z-10">
              <h5
                className={`text-sm sm:text-base font-black transition-colors mb-1 line-clamp-1 ${
                  isSelected 
                    ? isLight ? 'text-slate-900' : 'text-white'
                    : isLight ? 'text-slate-700 group-hover:text-slate-900' : 'text-gray-200 group-hover:text-white'
                }`}
              >
                {titleText}
              </h5>
              <p className={`text-xs line-clamp-2 leading-relaxed font-light ${
                isLight ? 'text-slate-500' : 'text-gray-400'
              }`}>
                {descText}
              </p>
            </div>

            {/* Micro Footer Indicator */}
            <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[11px] relative z-10 ${
              isLight ? 'border-slate-100' : 'border-white/5'
            }`}>
              <span className={`font-bold ${
                isSelected 
                  ? isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]' 
                  : isLight ? 'text-slate-400' : 'text-gray-500'
              }`}>
                {isSelected 
                  ? (language === 'ar' ? 'معروض ✦' : 'Active ✦') 
                  : (language === 'ar' ? 'معاينة' : 'Preview')}
              </span>
              <svg 
                className={`w-3.5 h-3.5 ${
                  isSelected 
                    ? isLight ? 'text-[#8A5800]' : 'text-[#C5A16F]' 
                    : isLight ? 'text-slate-400' : 'text-gray-500'
                } ${direction === 'rtl' ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
