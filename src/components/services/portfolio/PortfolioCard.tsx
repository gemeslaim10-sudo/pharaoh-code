'use client';
import { SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

interface PortfolioCardProps {
  item: SectionItem;
}

export function PortfolioCard({ item }: PortfolioCardProps) {
  const { t, language } = useTranslation();
  const itemTitle = getDynamicText(item, 'title', language) || item.title;
  const itemDesc = getDynamicText(item, 'description', language) || getDynamicText(item, 'desc', language) || item.description;
  const categoryText = item.filterClass === 'web' 
    ? t('portfolio.filterWeb') 
    : item.filterClass === 'app' 
      ? t('portfolio.filterApp') 
      : item.filterClass === 'motion' 
        ? t('portfolio.filterMotion') 
        : item.category;

  return (
    <div
      className={`portfolio-item ${item.filterClass || 'web'} group relative bg-[#112240] rounded-2xl overflow-hidden border border-white/5 hover:border-[#C5A16F]/40 transition-all duration-500 shadow-xl hover:shadow-[0_20px_60px_-15px_rgba(197,161,111,0.2)] hover:-translate-y-2`}
    >
      {/* Top glowing beam on hover */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.imageUrl || item.image}
          className="portfolio-card-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={categoryText}
        />
        {/* Category badge on image */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold tracking-[2px] text-[#0A192F] uppercase bg-[#C5A16F] px-2.5 py-1 rounded-lg shadow">
            {categoryText}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h4 className="text-white text-lg font-bold mb-2 group-hover:text-[#C5A16F] transition-colors">
          {itemTitle}
        </h4>
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">{itemDesc}</p>

        {(item.link || item.appLink) && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
            {item.link && (
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#C5A16F] bg-[#C5A16F]/10 hover:bg-[#C5A16F] hover:text-[#0A192F] px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1"
              >
                <span>{language === 'ar' ? 'الموقع الحي' : 'Live Site'}</span>
                <span>↗</span>
              </a>
            )}
            {item.appLink && (
              <a 
                href={item.appLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-green-400 bg-green-500/10 hover:bg-green-500/20 px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1"
              >
                <span>{language === 'ar' ? 'تحميل التطبيق' : 'Download App'}</span>
                <span>📱</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
