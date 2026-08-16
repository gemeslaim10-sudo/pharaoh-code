'use client';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

interface ClientItem {
  id: string;
  name: string;
  name_ar?: string;
  name_en?: string;
  description?: string;
  description_ar?: string;
  description_en?: string;
  desc?: string;
  desc_ar?: string;
  desc_en?: string;
  logo?: string;
  websiteUrl?: string;
}

export default function ClientsGrid({ clients }: { clients: ClientItem[] }) {
  const { t, language, direction } = useTranslation();

  return (
    <section className="relative py-24 bg-[#050D1A] overflow-hidden min-h-screen" dir={direction}>
      {/* Rich background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(197,161,111,0.07) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(59,130,246,0.04) 0%, transparent 50%)' }} />
        <div className="absolute inset-0 opacity-[0.012]"
          style={{ backgroundImage: 'linear-gradient(rgba(197,161,111,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,161,111,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-10 h-[2px] bg-gradient-to-r from-transparent to-[#C5A16F]" />
            <span className="text-[#C5A16F] font-bold tracking-[0.4em] uppercase text-[11px] bg-[#C5A16F]/8 px-4 py-1.5 rounded-full border border-[#C5A16F]/20">
              {t('clients.subtitle')}
            </span>
            <div className="w-10 h-[2px] bg-gradient-to-l from-transparent to-[#C5A16F]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
            {t('clients.titlePart1')}
            {' '}
            <span className="bg-gradient-to-r from-[#C5A16F] via-[#E8C97E] to-[#C5A16F] bg-clip-text text-transparent">
              {t('clients.titlePart2')}
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            {language === 'ar'
              ? 'نحن فخورون بالتعاون مع نخبة من الشركاء والمؤسسات لبناء حلول رقمية تقود المستقبل.'
              : 'We are proud to collaborate with elite partners and institutions building future-proof digital solutions.'}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent mx-auto mt-5 rounded-full shadow-[0_0_15px_rgba(197,161,111,0.4)]" />
        </div>

        {/* Empty state */}
        {clients.length === 0 ? (
          <div className="text-center text-gray-500 py-20 bg-[#0F1E38] rounded-3xl border border-white/5">
            {language === 'ar' ? 'لا يوجد شركاء مضافين حالياً.' : 'No partners added at the moment.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => {
              const nameText = getDynamicText(client, 'name', language) || client.name;
              const descText = getDynamicText(client, 'description', language) || getDynamicText(client, 'desc', language) || client.description || '';

              return (
                <div
                  key={client.id}
                  className="group relative bg-gradient-to-b from-[#0F1E38] to-[#081222] rounded-3xl border border-white/6 hover:border-[#C5A16F]/50 transition-all duration-500 overflow-hidden shadow-2xl hover:-translate-y-3 hover:shadow-[0_30px_80px_-20px_rgba(197,161,111,0.25)] flex flex-col"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
                >
                  {/* Top glowing beam */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.025] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C5A16F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none" />

                  {/* Logo / image */}
                  <Link href={`/clients/${client.id}`} className="block relative z-10">
                    <div className="relative h-48 overflow-hidden rounded-t-3xl bg-[#061020] border-b border-white/5 flex items-center justify-center p-6">
                      <img
                        src={client.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300'}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        alt={nameText}
                        loading="lazy"
                      />
                      {/* Floating badge */}
                      <div className="absolute top-4 left-4 bg-[#C5A16F]/15 border border-[#C5A16F]/30 text-[#C5A16F] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">
                        {language === 'ar' ? 'شريك نجاح' : 'Success Partner'}
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="relative z-10 p-6 flex flex-col flex-1">
                    <Link href={`/clients/${client.id}`} className="block mb-3">
                      <h4 className="text-white text-xl font-black hover:text-[#C5A16F] transition-colors flex items-center gap-2">
                        {nameText}
                        <span className="text-[#C5A16F]/40 group-hover:text-[#C5A16F] transition-colors text-base">𓂀</span>
                      </h4>
                      <div className="w-0 h-[2px] bg-gradient-to-r from-[#C5A16F] to-transparent group-hover:w-16 transition-all duration-500 mt-1.5 rounded-full" />
                    </Link>

                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 flex-1 mb-5">
                      {descText}
                    </p>

                    {/* Footer */}
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                      <Link
                        href={`/clients/${client.id}`}
                        className="text-xs text-[#C5A16F] font-bold bg-[#C5A16F]/10 hover:bg-[#C5A16F] hover:text-[#0A192F] px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 border border-[#C5A16F]/20 hover:border-transparent"
                      >
                        {t('clients.projectDetails')}
                        <span className={`transition-transform duration-300 ${direction === 'rtl' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                          {direction === 'rtl' ? '←' : '→'}
                        </span>
                      </Link>
                      {client.websiteUrl && (
                        <a
                          href={client.websiteUrl}
                          target="_blank" rel="noopener noreferrer"
                          className="text-xs text-gray-500 font-bold flex items-center gap-1 hover:text-[#C5A16F] transition-colors py-2 px-2"
                        >
                          {t('clients.visitWebsite')} ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
