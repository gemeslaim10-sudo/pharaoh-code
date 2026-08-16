'use client';

import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

interface ClientItem {
  id: string;
  name: string;
  name_ar?: string;
  name_en?: string;
  logo: string;
  description: string;
  description_ar?: string;
  description_en?: string;
  websiteUrl: string;
  category?: string;
}

export default function HomeClients({ clients = [] }: { clients?: ClientItem[] }) {
  const { t, language, direction } = useTranslation();

  if (clients.length === 0) return null;

  // Limit homepage to a maximum of 6 clients
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
          {displayedClients.map((client) => {
            const clientName = getDynamicText(client, 'name', language) || client.name || '';
            const clientDesc = getDynamicText(client, 'description', language) || client.description || '';

            return (
              <div 
                key={client.id} 
                className="group relative rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050B14] border border-white/5 hover:border-[#C5A16F]/40 transition-all duration-400 hover:-translate-y-1 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden"
              >
                {/* Top Glowing Beam */}
                <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 shadow-[0_0_10px_#C5A16F]" />

                <div>
                  {/* Client Logo Showcase Banner */}
                  <Link href={`/clients/${client.id}`} className="block">
                    <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden mb-4 bg-[#0B1528] border border-white/10 group-hover:border-[#C5A16F]/30 flex items-center justify-center p-4 transition-all duration-400 shadow-inner group/banner">
                      
                      {/* Ambient Logo Glow inside box */}
                      <div className="absolute inset-0 bg-radial from-[#C5A16F]/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {client.logo ? (
                        <img 
                          src={client.logo} 
                          className="max-h-full max-w-full object-contain filter brightness-90 contrast-125 group-hover:brightness-110 group-hover:scale-105 transition-all duration-500" 
                          alt={clientName} 
                          loading="lazy"
                        />
                      ) : (
                        <div className="text-2xl font-bold text-[#C5A16F]">
                          {clientName}
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Title & Pharaoh Icon */}
                  <Link href={`/clients/${client.id}`} className="block mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#C5A16F] text-base font-serif">𓂀</span>
                      <h4 className="text-white text-lg sm:text-xl font-bold tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#F3E0B5] transition-all line-clamp-1">
                        {clientName}
                      </h4>
                    </div>
                  </Link>

                  {/* Description */}
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light line-clamp-2 sm:line-clamp-3 mb-5">
                    {clientDesc}
                  </p>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between relative z-10">
                  <Link 
                    href={`/clients/${client.id}`} 
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C5A16F]/10 hover:bg-[#C5A16F] text-[#C5A16F] hover:text-[#050B14] font-bold text-[11px] border border-[#C5A16F]/30 hover:border-[#C5A16F] transition-all duration-300 shadow-sm"
                  >
                    <span>{t("clients.projectDetails") || (language === 'ar' ? 'تفاصيل المشروع' : 'Project Details')}</span>
                    <svg
                      className={`w-3 h-3 transition-transform duration-300 ${direction === 'rtl' ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  
                  {client.websiteUrl && (
                    <a 
                      href={client.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-white font-medium transition-colors py-1.5 px-1.5"
                    >
                      <span>{t("clients.visitWebsite") || (language === 'ar' ? 'الموقع' : 'Website')}</span>
                      <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
