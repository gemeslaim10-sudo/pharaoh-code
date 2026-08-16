'use client';
import { SectionData, SectionItem } from '@/types';
import { useEffect } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { PortfolioCard } from './PortfolioCard';

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
            {data.items?.map((item: SectionItem, index: number) => (
              <PortfolioCard key={index} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
