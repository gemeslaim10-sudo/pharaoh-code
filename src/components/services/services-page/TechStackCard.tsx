'use client';

import { ReactNode } from 'react';

export interface TechCardItem {
  title: string;
  desc: string;
  icon: ReactNode;
}

interface TechStackCardProps {
  card: TechCardItem;
}

export function TechStackCard({ card }: TechStackCardProps) {
  return (
    <div className="group relative rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050B14] border border-white/5 hover:border-[#C5A16F]/40 transition-colors duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden h-full">
      {/* Top Glowing Beam */}
      <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 shadow-[0_0_10px_#C5A16F]" />

      <div>
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#C5A16F]/40 group-hover:bg-[#C5A16F] flex items-center justify-center mb-4 transition-all duration-400 shadow-md">
          <svg className="w-6 h-6 text-[#C5A16F] group-hover:text-[#050B14] transition-colors duration-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {card.icon}
          </svg>
        </div>

        <h4 className="text-white font-bold text-base sm:text-lg mb-2 group-hover:text-[#C5A16F] transition-colors">
          {card.title}
        </h4>

        <p className="text-gray-400 text-xs leading-relaxed font-light">
          {card.desc}
        </p>
      </div>

      {/* Bottom dash */}
      <div className="w-6 h-0.5 bg-[#C5A16F]/20 group-hover:w-10 group-hover:bg-[#C5A16F] rounded-full mt-4 transition-all duration-400" />
    </div>
  );
}
