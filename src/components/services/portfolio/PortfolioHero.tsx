'use client';
import { SectionData, SectionItem } from '@/types';
import { useEffect } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function PortfolioHero({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();

  useEffect(() => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && items.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const target = e.currentTarget as HTMLElement;
          const filter = target.getAttribute('data-filter');

          filterBtns.forEach(b => b.classList.remove('active', 'bg-[#C5A16F]', 'text-[#0A192F]'));
          target.classList.add('active', 'bg-[#C5A16F]', 'text-[#0A192F]');

          items.forEach((element) => {
            const item = element as HTMLElement;
            if (filter === 'all' || item.classList.contains(filter!)) {
              item.style.opacity = '0';
              item.style.display = 'block';
              setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 20);
            } else {
              item.style.opacity = '0';
              item.style.transform = 'translateY(10px)';
              setTimeout(() => { item.style.display = 'none'; }, 400);
            }
          });
        });
      });
    }
  }, []);

  if (!data) return null;

  return (
    <>
      <style>{`
        .portfolio-item { transition: opacity 0.4s ease, transform 0.4s ease; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .portfolio-card-img { transition: transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease; }
        .portfolio-item:hover .portfolio-card-img { transform: scale(1.07); }
      `}</style>

      <section id="portfolio" className="py-20 bg-[#0A192F] relative overflow-hidden" dir={direction}>
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A16F]/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/4 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#C5A16F]" />
              <span className="text-[#C5A16F] font-bold tracking-[0.35em] uppercase text-[11px]">
                {getDynamicText(data, 'subtitle', language) || t('portfolio.subtitle')}
              </span>
              <div className="w-8 h-[2px] bg-[#C5A16F]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              {getDynamicText(data, 'titlePart1', language) || t('portfolio.titlePart1')}
              {' '}
              <span className="text-[#C5A16F] italic relative">
                {getDynamicText(data, 'titlePart2', language) || t('portfolio.titlePart2')}
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C5A16F] to-transparent rounded-full" />
              </span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              {getDynamicText(data, 'description', language) || t('portfolio.subtitle')}
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {[
              { label: t('portfolio.filterAll'), filter: 'all', active: true },
              { label: t('portfolio.filterWeb'), filter: 'web' },
              { label: t('portfolio.filterApp'), filter: 'app' },
              { label: t('portfolio.filterMotion'), filter: 'motion' },
            ].map(({ label, filter, active }) => (
              <button
                key={filter}
                className={`filter-btn px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border ${
                  active
                    ? 'active bg-[#C5A16F] text-[#0A192F] border-[#C5A16F] shadow-[0_0_20px_rgba(197,161,111,0.3)]'
                    : 'border-[#C5A16F]/25 text-[#C5A16F] hover:border-[#C5A16F] hover:bg-[#C5A16F]/10'
                }`}
                data-filter={filter}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Portfolio grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="portfolio-grid">
            {data.items?.map((item: SectionItem, index: number) => {
              const itemTitle = getDynamicText(item, 'title', language) || item.title;
              const itemDesc = getDynamicText(item, 'description', language) || getDynamicText(item, 'desc', language) || item.description;
              const categoryText = item.filterClass === 'web' ? t('portfolio.filterWeb') : item.filterClass === 'app' ? t('portfolio.filterApp') : item.filterClass === 'motion' ? t('portfolio.filterMotion') : item.category;

              return (
                <div
                  key={index}
                  className={`portfolio-item ${item.filterClass} group relative bg-[#112240] rounded-2xl overflow-hidden border border-white/5 hover:border-[#C5A16F]/40 transition-all duration-500 shadow-xl hover:shadow-[0_20px_60px_-15px_rgba(197,161,111,0.2)] hover:-translate-y-2`}
                >
                  {/* Top glowing beam on hover */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.imageUrl || item.image}
                      className="portfolio-card-img w-full h-full object-cover"
                      alt={categoryText}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/20 to-transparent" />
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
                          <a href={item.link} target="_blank" rel="noopener noreferrer"
                            className="text-xs font-bold text-[#C5A16F] bg-[#C5A16F]/10 hover:bg-[#C5A16F] hover:text-[#0A192F] px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1">
                            <span>{language === 'ar' ? 'الموقع الحي' : 'Live Site'}</span>
                            <span>↗</span>
                          </a>
                        )}
                        {item.appLink && (
                          <a href={item.appLink} target="_blank" rel="noopener noreferrer"
                            className="text-xs font-bold text-green-400 bg-green-500/10 hover:bg-green-500/20 px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1">
                            <span>{language === 'ar' ? 'تحميل التطبيق' : 'Download App'}</span>
                            <span>📱</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
