'use client';
import { useTranslation } from '@/contexts/LanguageContext';

export function HomeCreativeBanner() {
  const { language } = useTranslation();

  return (
    <div className="mt-10 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#0F1E38]/50 via-[#0A162B]/70 to-[#0F1E38]/50 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
      <div className="flex items-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
        <p className="text-xs sm:text-sm text-gray-300 font-light">
          {language === 'ar' 
            ? 'كل سطر برمجي نصنعه يخضع لاختبارات أداء وأمان قياسية لضمان أقصى كفاءة.'
            : 'Every line of code undergoes rigorous performance benchmarks and security audits.'}
        </p>
      </div>
      <span className="text-[10px] font-mono font-bold tracking-wider text-[#C5A16F] uppercase px-2.5 py-1 rounded-md bg-[#C5A16F]/10 border border-[#C5A16F]/20 shrink-0">
        PHARAOH ARCHITECTURE
      </span>
    </div>
  );
}
