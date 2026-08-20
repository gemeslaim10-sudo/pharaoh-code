'use client';

import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

export interface ClientItem {
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

interface ClientsGridCardProps {
  client: ClientItem;
  nameText: string;
  descText: string;
  language: string;
  direction: 'rtl' | 'ltr';
  projectDetailsText: string;
  visitWebsiteText: string;
}

export function ClientsGridCard({
  client,
  nameText,
  descText,
  language,
  direction,
  projectDetailsText,
  visitWebsiteText,
}: ClientsGridCardProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className={`group relative rounded-3xl border transition-colors duration-300 overflow-hidden shadow-2xl flex flex-col h-full ${
      isLight
        ? 'bg-white border-slate-300 hover:border-[#8A5800]'
        : 'bg-gradient-to-b from-[#0F1E38] to-[#081222] border-white/6 hover:border-[#C5A16F]/50'
    }`}>
      {/* Top glowing beam */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.025] to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C5A16F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none" />

      {/* Logo / image */}
      <Link href={`/clients/${client.id}`} className="block relative z-10">
        <div className={`relative h-48 overflow-hidden rounded-t-3xl border-b flex items-center justify-center p-6 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#061020] border-white/5'
        }`}>
          <img
            src={client.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300'}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            alt={nameText}
            loading="lazy"
          />
          {/* Floating badge */}
          <div className={`absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border shadow-sm ${
            isLight
              ? 'bg-amber-50 text-[#8A5800] border-[#8A5800]/30'
              : 'bg-[#C5A16F]/15 border-[#C5A16F]/30 text-[#C5A16F] backdrop-blur-sm'
          }`}>
            {language === 'ar' ? 'شريك نجاح' : 'Success Partner'}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col flex-1">
        <Link href={`/clients/${client.id}`} className="block mb-3">
          <h4 className={`text-xl font-black transition-colors flex items-center gap-2 ${
            isLight ? 'text-slate-900 hover:text-[#8A5800]' : 'text-white hover:text-[#C5A16F]'
          }`}>
            {nameText}
          </h4>
          <div className="w-0 h-[2px] bg-gradient-to-r from-[#C5A16F] to-transparent group-hover:w-16 transition-all duration-500 mt-1.5 rounded-full" />
        </Link>

        <p className={`text-xs leading-relaxed line-clamp-3 flex-1 mb-5 font-normal ${
          isLight ? 'text-slate-800' : 'text-gray-400'
        }`}>
          {descText}
        </p>

        {/* Footer */}
        <div className={`pt-4 border-t flex justify-between items-center ${
          isLight ? 'border-slate-200' : 'border-white/5'
        }`}>
          <Link
            href={`/clients/${client.id}`}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 border shadow-sm ${
              isLight
                ? 'bg-amber-50 border-[#8A5800]/40 text-[#8A5800] hover:bg-[#8A5800] hover:text-white'
                : 'text-[#C5A16F] bg-[#C5A16F]/10 hover:bg-[#C5A16F] hover:text-[#0A192F] border-[#C5A16F]/20 hover:border-transparent'
            }`}
          >
            <span>{projectDetailsText || (language === 'ar' ? 'التفاصيل' : 'Details')}</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 shrink-0 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
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
              target="_blank" rel="noopener noreferrer"
              className={`text-xs font-bold flex items-center gap-1 transition-colors py-2 px-2.5 rounded-lg border ${
                isLight
                  ? 'text-slate-800 hover:text-slate-950 hover:bg-slate-100 border-slate-300'
                  : 'text-gray-300 hover:text-[#C5A16F] hover:bg-white/5 border-white/10'
              }`}
            >
              <span>{visitWebsiteText || (language === 'ar' ? 'زيارة' : 'Visit')}</span>
              <svg className="w-3 h-3 opacity-80 group-hover:opacity-100 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
