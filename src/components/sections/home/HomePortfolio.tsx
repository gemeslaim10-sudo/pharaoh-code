'use client';
import { SectionData, SectionItem } from '@/types';
import { useEffect } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function HomePortfolio({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();

  useEffect(() => {
    const filterBtns = document.querySelectorAll('#portfolio .filter-btn');
    const items = document.querySelectorAll('#portfolio .portfolio-item');

    if (filterBtns.length > 0 && items.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                const filter = target.getAttribute('data-filter');
                
                filterBtns.forEach(b => b.classList.remove('active', 'bg-pharaohGold', 'text-pharaohNavy'));
                target.classList.add('active', 'bg-pharaohGold', 'text-pharaohNavy');

                items.forEach((element) => {
                    const item = element as HTMLElement;
                    if (filter === 'all' || item.classList.contains(filter!)) {
                        item.style.display = 'block';
                        setTimeout(() => item.style.opacity = '1', 10);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 500);
                    }
                });
            });
        });
    }
  }, []);

  const portfolioItems = data?.items || [];

  return (
    <section id="portfolio" className="relative py-24 bg-[#0A192F] overflow-hidden" dir={direction}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
                <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                    {t("portfolio.titlePart1")} <span className="text-pharaohGold italic">{t("portfolio.titlePart2")}</span>
                </h3>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                    {data?.subtitle || t("portfolio.subtitle")}
                </p>
                <div className="w-20 h-1 bg-pharaohGold mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-20">
                <button className="filter-btn active px-8 py-3 rounded-full font-bold transition-all border-2 border-pharaohGold bg-pharaohGold text-pharaohNavy shadow-[0_0_20px_rgba(197,161,111,0.3)]" data-filter="all">{t("portfolio.filterAll")}</button>
                <button className="filter-btn px-8 py-3 rounded-full font-bold transition-all border-2 border-pharaohGold/20 text-pharaohGold hover:border-pharaohGold" data-filter="web">{t("portfolio.filterWeb")}</button>
                <button className="filter-btn px-8 py-3 rounded-full font-bold transition-all border-2 border-pharaohGold/20 text-pharaohGold hover:border-pharaohGold" data-filter="app">{t("portfolio.filterApp")}</button>
                <button className="filter-btn px-8 py-3 rounded-full font-bold transition-all border-2 border-pharaohGold/20 text-pharaohGold hover:border-pharaohGold" data-filter="motion">{t("portfolio.filterMotion")}</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" id="portfolio-grid">
                {portfolioItems.map((item: SectionItem, index: number) => {
                    const itemTitle = getDynamicText(item, 'title', language) || item.title || '';
                    const itemDesc = getDynamicText(item, 'description', language) || item.description || '';

                    return (
                        <div key={index} className={`portfolio-item ${item.category || 'web'} group relative overflow-hidden rounded-[2rem] bg-[#112240] border border-white/5 hover:border-pharaohGold/30 transition-all duration-500 shadow-2xl`}>
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img src={(item.imageUrl || item.image)} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt={itemTitle} />
                                <div className="absolute inset-0 bg-pharaohNavy/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-5">
                                    <button className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-pharaohGold hover:text-pharaohNavy transform translate-y-10 group-hover:translate-y-0 transition-all duration-500 delay-75 shadow-xl" title={t("portfolio.viewProject")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                    {item.link && (
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-pharaohGold hover:text-pharaohNavy transform translate-y-10 group-hover:translate-y-0 transition-all duration-500 delay-150 shadow-xl" title={t("portfolio.viewProject")}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-pharaohGold text-xs font-bold tracking-widest px-3 py-1 bg-pharaohGold/10 rounded-md">
                                        {item.categoryLabel || item.category}
                                    </span>
                                </div>
                                <h4 className="text-white text-xl font-bold group-hover:text-pharaohGold transition">{itemTitle}</h4>
                                <p className="text-gray-400 text-sm mt-3 leading-relaxed">{itemDesc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
  );
}
