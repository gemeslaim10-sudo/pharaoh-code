'use client';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { TestimonialItem } from './HomeTestimonialsData';

interface HomeTestimonialsListProps {
  items: TestimonialItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function HomeTestimonialsList({
  items,
  activeIndex,
  onSelect,
}: HomeTestimonialsListProps) {
  const { language } = useTranslation();

  return (
    <div className="lg:col-span-5 flex flex-col justify-between gap-2.5">
      {items.map((item, idx) => {
        const isSelected = activeIndex === idx;
        const name = getDynamicText(item, 'name', language) || item.name || '';
        const text = getDynamicText(item, 'content', language) || getDynamicText(item, 'text', language) || item.content || item.text || '';
        const img = item.imageUrl || item.image || '';

        return (
          <div
            key={idx}
            onClick={() => onSelect(idx)}
            onMouseEnter={() => onSelect(idx)}
            className={`p-3.5 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 border flex items-center gap-3 ${
              isSelected
                ? 'bg-[#10203C] border-[#C5A16F] shadow-[0_8px_20px_rgba(197,161,111,0.15)] -translate-y-0.5'
                : 'bg-[#091427]/70 hover:bg-[#0E1E38]/80 border-white/5 hover:border-white/15'
            }`}
          >
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs ${
              isSelected ? 'bg-[#C5A16F] text-[#050B14]' : 'bg-[#112240] text-gray-300 border border-white/10'
            }`}>
              {img ? (
                <img src={img} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span>{name.charAt(0) || '✦'}</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <h5 className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                  {name}
                </h5>
              </div>
              <p className="text-gray-400 text-[11px] truncate font-light">
                {text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
