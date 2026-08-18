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
      className={`group relative rounded-3xl p-5 sm:p-6 border transition-all duration-500 flex flex-col justify-between overflow-hidden h-full hover:-translate-y-2.5 select-none ${
        isLight
          ? 'bg-gradient-to-b from-white via-slate-50/90 to-amber-50/20 border-slate-200/90 hover:border-[#C5A16F] shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_-8px_rgba(197,161,111,0.3)]'
          : 'bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050C18] border-white/10 hover:border-[#C5A16F]/70 shadow-[0_12px_35px_rgba(0,0,0,0.45)] hover:shadow-[0_22px_50px_-10px_rgba(197,161,111,0.35)]'
      }`}
    >
      {/* Top Golden Light Flare */}
      <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 shadow-[0_0_14px_#C5A16F] z-30" />

      {/* Shimmer Light Sweep on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30" />

      {/* Background Ambient Radial Glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#C5A16F]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

      <div>
        {/* Client Logo Showcase Banner */}
        <Link href={`/clients/${client.id}`} className="block relative z-10">
          <div className={`relative w-full h-36 sm:h-40 rounded-2xl overflow-hidden mb-4 border flex items-center justify-center p-6 transition-all duration-500 shadow-inner group/banner ${
            isLight 
              ? 'bg-white border-slate-200/90 group-hover:border-[#C5A16F]/50 shadow-slate-100 group-hover:shadow-[0_8px_25px_rgba(197,161,111,0.15)]' 
              : 'bg-[#061020]/90 border-white/8 group-hover:border-[#C5A16F]/50 group-hover:bg-[#08152B] shadow-black/40 group-hover:shadow-[0_8px_25px_rgba(197,161,111,0.15)]'
          }`}>
            {/* Subtle center spot glow */}
            <div className="absolute inset-0 bg-radial from-[#C5A16F]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Top Floating Badge */}
            <div className={`absolute top-2.5 ${direction === 'rtl' ? 'right-2.5' : 'left-2.5'} px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase border shadow-sm backdrop-blur-md z-20 ${
              isLight 
                ? 'bg-amber-50/95 text-[#8A5800] border-[#C5A16F]/30' 
                : 'bg-[#050D1A]/90 text-[#C5A16F] border-[#C5A16F]/30'
            }`}>
              {language === 'ar' ? 'شريك نجاح' : 'Partner'}
            </div>

            {client.logo ? (
              <img 
                src={client.logo} 
                className="max-h-full max-w-full object-contain transition-all duration-500 group-hover:scale-110 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]" 
                alt={clientName} 
                loading="lazy"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-[#C5A16F]/10 border border-[#C5A16F]/25 flex items-center justify-center text-2xl font-black text-[#C5A16F]">
                {clientName.charAt(0) || '✦'}
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
      <div className={`pt-3.5 border-t flex items-center justify-between relative z-10 ${
        isLight ? 'border-slate-200/80' : 'border-white/10'
      }`}>
        <Link 
          href={`/clients/${client.id}`} 
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-black text-xs transition-all duration-300 shadow-sm border ${
            isLight
              ? 'bg-amber-50/90 border-[#C5A16F]/40 text-[#8A5800] hover:bg-gradient-to-r hover:from-[#C5A16F] hover:via-[#DFB77D] hover:to-[#C5A16F] hover:text-[#050B14] hover:shadow-[0_4px_16px_rgba(197,161,111,0.35)]'
              : 'bg-[#C5A16F]/10 border-[#C5A16F]/30 text-[#C5A16F] hover:bg-gradient-to-r hover:from-[#C5A16F] hover:via-[#DFB77D] hover:to-[#C5A16F] hover:text-[#050B14] hover:shadow-[0_4px_20px_rgba(197,161,111,0.4)]'
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
            className={`inline-flex items-center gap-1 text-xs font-bold transition-all py-1.5 px-2.5 rounded-lg border border-transparent ${
              isLight 
                ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-200' 
                : 'text-gray-400 hover:text-[#C5A16F] hover:bg-white/5 hover:border-white/10'
            }`}
          >
            <span>{t("clients.visitWebsite") || (language === 'ar' ? 'الموقع' : 'Website')}</span>
            <svg className="w-3 h-3 opacity-70 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
