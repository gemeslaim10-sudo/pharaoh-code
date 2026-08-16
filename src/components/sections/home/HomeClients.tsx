'use client';

import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { ClientItem, HomeClientCard } from './clients/HomeClientCard';

export default function HomeClients({ clients = [] }: { clients?: ClientItem[] }) {
  const { t, language, direction } = useTranslation();

  if (clients.length === 0) return null;

  const displayedClients = clients.slice(0, 6);

  return (
    <section 
      id="our-clients" 
      className="relative py-14 sm:py-20 bg-[#050B14] overflow-hidden text-white select-none" 
      dir={direction}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-[#C5A16F]/8 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] bg-blue-600/8 blur-[150px] rounded-full pointer-events-none" />

      {/* Cyber Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with View All Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-2.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping" />
              <h2 className="text-[#C5A16F] font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
                {t("clients.subtitle")}
              </h2>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-2.5 tracking-tight">
              {t("clients.titlePart1")}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
                {t("clients.titlePart2")}
              </span>
            </h3>

            <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-light">
              {language === 'ar' 
                ? 'فخورون بتمكين كبرى المؤسسات والعلامات التجارية الرائدة بحلول برمجية سيادية.' 
                : 'Proud to empower leading enterprises and visionary brands with sovereign software architectures.'}
            </p>
          </div>

          <div>
            <Link
              href="/clients"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-[#C5A16F] text-gray-300 hover:text-[#050B14] font-bold text-xs border border-white/10 hover:border-[#C5A16F] transition-all duration-300 group shadow-md"
            >
              <span>{t("clients.viewAllClients") || (language === 'ar' ? 'عرض كافة الشركاء' : 'View All Partners')}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* High-End Partners Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedClients.map((client) => (
            <HomeClientCard key={client.id} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}
