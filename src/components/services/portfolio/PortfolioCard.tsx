'use client';
import { SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';

interface PortfolioCardProps {
  item: SectionItem;
}

export function PortfolioCard({ item }: PortfolioCardProps) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const itemTitle = getDynamicText(item, 'title', language) || item.title || '';
  const itemDesc = getDynamicText(item, 'description', language) || getDynamicText(item, 'desc', language) || item.description || '';
  const categoryKey = (item.filterClass || item.category || 'web').toLowerCase();

  const categoryLabel = categoryKey.includes('web')
    ? (t('portfolio.filterWeb') || 'ويب')
    : categoryKey.includes('app')
      ? (t('portfolio.filterApp') || 'تطبيق')
      : categoryKey.includes('motion')
        ? (t('portfolio.filterMotion') || 'موشن')
        : (item.category || 'مشروع');

  const imageUrl = item.imageUrl || item.image || '/images/default-project.jpg';
  const liveUrl = item.link && item.link !== '#' ? item.link : null;
  const appUrl = item.appLink && item.appLink !== '#' ? item.appLink : null;

  return (
    <article
      className={`group relative rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-2 flex flex-col h-full border ${
        isLight
          ? 'bg-white border-slate-200/90 shadow-sm hover:border-[#C5A16F] hover:shadow-[0_20px_40px_-10px_rgba(197,161,111,0.3)]'
          : 'bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050C18] border-white/10 hover:border-[#C5A16F]/70 shadow-lg hover:shadow-[0_20px_45px_-10px_rgba(197,161,111,0.3)]'
      }`}
    >
      {/* Top golden shimmer accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30 shadow-[0_0_12px_#C5A16F]" />

      {/* Shimmer Light Sweep on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30" />

      {/* Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <img
          src={imageUrl}
          alt={itemTitle}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
          loading="lazy"
        />

        {/* Ambient Dark Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/90 via-transparent to-black/30 pointer-events-none" />

        {/* Category Pill Badge with Glow */}
        <div className="absolute top-3 start-3 z-20">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md text-[10px] font-black uppercase tracking-wider border shadow-md transition-transform duration-300 group-hover:scale-105 ${
            isLight
              ? 'bg-white/95 border-[#C5A16F]/40 text-[#8A5800]'
              : 'bg-[#050B14]/85 border-[#C5A16F]/40 text-[#C5A16F]'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping" />
            <span>{categoryLabel}</span>
          </div>
        </div>

        {/* Quick Action Overlay on Hover */}
        <div className="absolute inset-0 bg-[#050B14]/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2.5 z-20">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={language === 'ar' ? 'معاينة الموقع' : 'Visit Live Site'}
              aria-label="Visit Live Site"
              className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-[#C5A16F] hover:text-[#050B14] hover:border-[#C5A16F] hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}

          {appUrl && (
            <a
              href={appUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={language === 'ar' ? 'تحميل التطبيق' : 'Download App'}
              aria-label="Download App"
              className="w-9 h-9 rounded-xl bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </a>
          )}
        </div>
      </div>

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

          <p className={`mt-1.5 text-xs leading-relaxed line-clamp-2 font-light ${
            isLight ? 'text-slate-600' : 'text-gray-300'
          }`}>
            {itemDesc}
          </p>
        </div>

        {/* Footer / CTA Bar */}
        <div className={`mt-4 pt-3 border-t flex items-center justify-between gap-2 text-xs ${
          isLight ? 'border-slate-100' : 'border-white/5'
        }`}>
          {/* Status Dot */}
          <div className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className={`text-[11px] font-semibold ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>
              {language === 'ar' ? 'مشروع معتمد' : 'Verified'}
            </span>
          </div>

          {/* Action Button */}
          {(liveUrl || appUrl) ? (
            <a
              href={liveUrl || appUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg font-bold text-xs transition-all duration-300 border shadow-sm ${
                isLight 
                  ? 'bg-amber-50/80 border-[#C5A16F]/40 text-[#8A5800] hover:bg-[#C5A16F] hover:text-[#050B14]' 
                  : 'bg-[#C5A16F]/10 border-[#C5A16F]/30 text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#050B14]'
              }`}
            >
              <span>{language === 'ar' ? 'عرض المشروع' : 'View Project'}</span>
              <span className={`transition-transform duration-300 ${direction === 'rtl' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}>
                ↗
              </span>
            </a>
          ) : (
            <span className={`text-[11px] font-mono italic ${isLight ? 'text-slate-400' : 'text-gray-500'}`}>
              {language === 'ar' ? 'سيادي ✦' : 'Enterprise ✦'}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default PortfolioCard;
