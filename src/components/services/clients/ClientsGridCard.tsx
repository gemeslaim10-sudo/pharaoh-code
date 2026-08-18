'use client';

import Link from 'next/link';

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
  return (
    <div className="group relative bg-gradient-to-b from-[#0F1E38] to-[#081222] rounded-3xl border border-white/6 hover:border-[#C5A16F]/50 transition-colors duration-300 overflow-hidden shadow-2xl flex flex-col h-full">
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
            {projectDetailsText}
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
              {visitWebsiteText} ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
