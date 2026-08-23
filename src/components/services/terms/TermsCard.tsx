'use client';
import { TermItem } from './termsData';
import { useTranslation } from '@/contexts/LanguageContext';

interface TermsCardProps {
  item: TermItem;
}

export function TermsCard({ item }: TermsCardProps) {
  const { language } = useTranslation();

  return (
    <div className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/30 transition-all duration-500 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] font-black border border-[#C5A16F]/20 group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-500 text-lg">
            {item.num}
          </div>
          <h3 className="text-white text-xl font-bold">
            {language === 'ar' ? (item.titleAr || item.title) : (item.titleEn || item.title)}
          </h3>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          {language === 'ar' ? (item.descAr || item.desc) : (item.descEn || item.desc)}
        </p>
      </div>
    </div>
  );
}
