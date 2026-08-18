'use client';

interface FilterOption {
  label: string;
  filter: string;
}

interface HomePortfolioFilterBarProps {
  filterOptions: FilterOption[];
  activeFilter: string;
  onSelectFilter: (filter: string) => void;
  direction: 'rtl' | 'ltr';
}

export function HomePortfolioFilterBar({
  filterOptions,
  activeFilter,
  onSelectFilter,
  direction,
}: HomePortfolioFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((tab) => (
          <button
            key={tab.filter}
            onClick={() => onSelectFilter(tab.filter)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
              activeFilter === tab.filter
                ? 'bg-[#C5A16F] text-[#050B14] shadow-md shadow-[#C5A16F]/20'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button 
          aria-label="Previous Projects"
          className="portfolio-swiper-prev w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A16F] text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#050B14] transition-all flex items-center justify-center cursor-pointer shadow-md disabled:opacity-30 disabled:pointer-events-none"
        >
          <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          aria-label="Next Projects"
          className="portfolio-swiper-next w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A16F] text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#050B14] transition-all flex items-center justify-center cursor-pointer shadow-md disabled:opacity-30 disabled:pointer-events-none"
        >
          <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
