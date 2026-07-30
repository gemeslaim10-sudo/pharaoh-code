'use client';
import { SectionData, SectionItem } from '@/types';
import { useEffect } from 'react';

export default function PortfolioHero({ data }: { data: SectionData }) {
  useEffect(() => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

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

  if (!data) return null;

  return (
    <>
      <style>{`
        .portfolio-item {
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
      `}</style>
      <section id="portfolio" className="py-24 bg-pharaohNavy relative overflow-hidden" dir="rtl">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-pharaohGold rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                  <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">
                      {data.titlePart1 || "إرثنا من"} <span className="text-pharaohGold italic underline decoration-1 underline-offset-8">{data.titlePart2 || "الإبداع"}</span>
                  </h3>
                  <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
                      {data.description || "نحول الرؤى الطموحة إلى واقع رقمي ملموس عبر استراتيجيات تقنية مبتكرة."}
                  </p>
                  <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-pharaohGold to-transparent mx-auto mt-6 rounded-full"></div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-20">
                  <button className="filter-btn active px-8 py-3 rounded-full font-bold transition-all border-2 border-pharaohGold bg-pharaohGold text-pharaohNavy shadow-[0_0_20px_rgba(197,161,111,0.3)]" data-filter="all">الكل</button>
                  <button className="filter-btn px-8 py-3 rounded-full font-bold transition-all border-2 border-pharaohGold/20 text-pharaohGold hover:border-pharaohGold" data-filter="web">تطوير الويب</button>
                  <button className="filter-btn px-8 py-3 rounded-full font-bold transition-all border-2 border-pharaohGold/20 text-pharaohGold hover:border-pharaohGold" data-filter="app">تطبيقات الهواتف</button>
                  <button className="filter-btn px-8 py-3 rounded-full font-bold transition-all border-2 border-pharaohGold/20 text-pharaohGold hover:border-pharaohGold" data-filter="motion">موشن جرافيك</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="portfolio-grid">
                  {data.items?.map((item: SectionItem, index: number) => (
                      <div key={index} className={`portfolio-item ${item.filterClass} group relative bg-[#112240] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-pharaohGold/40 transition-all duration-500 shadow-2xl`}>
                          <div className="relative aspect-video overflow-hidden">
                              <img src={(item.imageUrl || item.image)} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={item.category} />
                              <div className="absolute inset-0 bg-gradient-to-t from-pharaohNavy via-transparent to-transparent opacity-60"></div>
                          </div>
                          <div className="p-8">
                              <span className="text-[10px] font-bold tracking-[3px] text-pharaohGold uppercase bg-pharaohGold/10 px-3 py-1 rounded-lg">
                                  {item.category}
                              </span>
                              <h4 className="text-white text-2xl font-bold mt-3 group-hover:text-pharaohGold transition">{item.title}</h4>
                              <p className="text-gray-400 text-sm mt-3 line-clamp-2">{item.description}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>
    </>
  );
}
