'use client';

import { SectionItem } from '@/types';
import { CategoryItem } from '@/types/category';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { getCategoryDisplayLabel } from '@/lib/categoryHelper';
import { PortfolioCardMedia } from './PortfolioCardMedia';

interface PortfolioCardProps {
  item: SectionItem;
  categories?: CategoryItem[];
}

export function PortfolioCard({ item, categories }: PortfolioCardProps) {
  const { language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const itemTitle = getDynamicText(item, 'title', language) || item.title || '';
  const itemDesc = getDynamicText(item, 'description', language) || getDynamicText(item, 'desc', language) || item.description || '';
  const categoryLabel = getCategoryDisplayLabel(item, categories, language);

  const imageUrl = item.imageUrl || item.image || '/images/default-project.jpg';
  const liveUrl = item.link && item.link !== '#' ? item.link : null;
  const appUrl = item.appLink && item.appLink !== '#' ? item.appLink : null;

  return (
    <article
      className={`group relative rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-2 flex flex-col h-full border ${
        isLight
          ? 'bg-white border-slate-300 shadow-sm hover:border-[#8A5800] hover:shadow-[0_20px_40px_-10px_rgba(138,88,0,0.2)]'
          : 'bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050C18] border-white/10 hover:border-[#C5A16F]/70 shadow-lg hover:shadow-[0_20px_45px_-10px_rgba(197,161,111,0.3)]'
      }`}
    >
      {/* Top golden shimmer accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 shadow-[0_0_12px_#C5A16F]" />

      {/* Shimmer Light Sweep on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30" />

      {/* Media Container */}
      <PortfolioCardMedia
        imageUrl={imageUrl}
        itemTitle={itemTitle}
        categoryLabel={categoryLabel}
        liveUrl={liveUrl}
        appUrl={appUrl}
        isLight={isLight}
        language={language}
      />

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between relative z-10">
        <div>
          <h3 className={`text-base sm:text-lg font-black leading-snug tracking-tight line-clamp-1 transition-colors duration-300 ${
            isLight
              ? 'text-slate-900 group-hover:text-[#8A5800]'
              : 'text-white group-hover:text-[#C5A16F]'
          }`}>
            {itemTitle}
          </h3>

          <p className={`mt-1.5 text-xs leading-relaxed line-clamp-2 ${
            isLight ? 'text-slate-800 font-normal' : 'text-gray-300 font-light'
          }`}>
            {itemDesc}
          </p>
        </div>

        {/* Footer / CTA Bar */}
        <div className={`mt-4 pt-3 border-t flex items-center justify-between gap-2 text-xs ${
          isLight ? 'border-slate-200' : 'border-white/5'
        }`}>
          {/* Status Dot */}
          <div className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className={`text-[11px] font-bold ${isLight ? 'text-slate-800' : 'text-gray-300'}`}>
              {language === 'ar' ? 'مشروع معتمد' : 'Verified'}
            </span>
          </div>

          {/* Action Button */}
          {(liveUrl || appUrl) ? (
            <a
              href={liveUrl || appUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all duration-300 border shadow-sm whitespace-nowrap shrink-0 ${
                isLight 
                  ? 'bg-amber-50/80 border-[#C5A16F]/40 text-[#8A5800] hover:bg-[#C5A16F] hover:text-[#050B14]' 
                  : 'bg-[#C5A16F]/10 border-[#C5A16F]/30 text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#050B14]'
              }`}
            >
              <span className="whitespace-nowrap shrink-0">{language === 'ar' ? 'عرض المشروع' : 'View Project'}</span>
              <span className={`shrink-0 transition-transform duration-300 ${direction === 'rtl' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}>
                ↗
              </span>
            </a>
          ) : (
            <span className={`text-[11px] font-mono italic whitespace-nowrap shrink-0 ${isLight ? 'text-slate-400' : 'text-gray-500'}`}>
              {language === 'ar' ? 'سيادي ✦' : 'Enterprise ✦'}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default PortfolioCard;
