'use client';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';

export interface ClientItem {
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

interface HomeClientCardProps {
  client: ClientItem;
}

export function HomeClientCard({ client }: HomeClientCardProps) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const clientName = getDynamicText(client, 'name', language) || client.name || '';
  const clientDesc = getDynamicText(client, 'description', language) || client.description || '';

  return (
    <div 
      className={`group relative rounded-2xl p-5 sm:p-6 border transition-all duration-400 shadow-xl flex flex-col justify-between overflow-hidden h-full hover:-translate-y-2 select-none ${
        isLight
          ? 'bg-white border-slate-200/90 hover:border-[#C5A16F] hover:shadow-[0_20px_40px_-10px_rgba(197,161,111,0.3)]'
          : 'bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050B14] border-white/10 hover:border-[#C5A16F]/70 hover:shadow-[0_20px_45px_-10px_rgba(197,161,111,0.3)]'
      }`}
    >
      {/* Top Glowing Beam */}
      <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_12px_#C5A16F] z-30" />

      {/* Shimmer Light Sweep on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30" />

      <div>
        {/* Client Logo Showcase Banner */}
        <Link href={`/clients/${client.id}`} className="block relative z-10">
          <div className={`relative w-full h-36 sm:h-40 rounded-xl overflow-hidden mb-4 border flex items-center justify-center p-5 transition-all duration-500 shadow-inner group/banner ${
            isLight 
              ? 'bg-slate-50/80 border-slate-200 group-hover:border-[#C5A16F]/40 group-hover:bg-amber-50/20' 
              : 'bg-[#081222] border-white/10 group-hover:border-[#C5A16F]/40 group-hover:bg-[#0B172E]'
          }`}>
            <div className="absolute inset-0 bg-radial from-[#C5A16F]/12 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {client.logo ? (
              <img 
                src={client.logo} 
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110 filter drop-shadow-md" 
                alt={clientName} 
                loading="lazy"
              />
            ) : (
              <div className="text-2xl font-black text-[#C5A16F]">
                {clientName}
              </div>
            )}
          </div>
        </Link>

        {/* Title & Pharaoh Icon */}
        <Link href={`/clients/${client.id}`} className="block mb-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[#C5A16F] text-base font-serif drop-shadow-[0_0_6px_rgba(197,161,111,0.5)]">𓂀</span>
            <h4 className={`text-base sm:text-lg font-black tracking-tight transition-colors duration-300 line-clamp-1 ${
              isLight ? 'text-slate-900 group-hover:text-[#8A5800]' : 'text-white group-hover:text-[#C5A16F]'
            }`}>
              {clientName}
            </h4>
          </div>
        </Link>

        <p className={`text-xs sm:text-sm leading-relaxed font-light line-clamp-2 sm:line-clamp-3 mb-4 relative z-10 ${
          isLight ? 'text-slate-600' : 'text-gray-300'
        }`}>
          {clientDesc}
        </p>
      </div>

      {/* Bottom Action Footer */}
      <div className={`pt-3 border-t flex items-center justify-between relative z-10 ${
        isLight ? 'border-slate-100' : 'border-white/5'
      }`}>
        <Link 
          href={`/clients/${client.id}`} 
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all duration-300 shadow-sm border ${
            isLight
              ? 'bg-amber-50/80 border-[#C5A16F]/40 text-[#8A5800] hover:bg-[#C5A16F] hover:text-[#050B14]'
              : 'bg-[#C5A16F]/10 border-[#C5A16F]/30 text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#050B14] hover:shadow-[0_0_15px_rgba(197,161,111,0.4)]'
          }`}
        >
          <span>{t("clients.projectDetails") || (language === 'ar' ? 'تفاصيل المشروع' : 'Project Details')}</span>
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
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
            className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors py-1.5 px-2 rounded-lg ${
              isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{t("clients.visitWebsite") || (language === 'ar' ? 'الموقع' : 'Website')}</span>
            <svg className="w-3 h-3 opacity-60 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
