'use client';
import { useTranslation } from '@/contexts/LanguageContext';

interface HomeTestimonialsCardProps {
  activeName: string;
  activeRole: string;
  activeContent: string;
  activeCompany?: string;
  activeImg?: string;
}

export function HomeTestimonialsCard({
  activeName,
  activeRole,
  activeContent,
  activeCompany,
  activeImg,
}: HomeTestimonialsCardProps) {
  const { language, direction } = useTranslation();

  return (
    <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#0F1E38] via-[#091528] to-[#050B14] border border-[#C5A16F]/30 shadow-[0_15px_40px_rgba(0,0,0,0.7)] relative overflow-hidden group">
      {/* Top Glowing Beam */}
      <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent shadow-[0_0_10px_#C5A16F]" />

      {/* Giant Luxury Quote Mark Watermark */}
      <span className={`absolute -top-3 ${direction === 'rtl' ? 'left-4' : 'right-4'} font-serif text-7xl sm:text-8xl font-black text-[#C5A16F]/[0.05] select-none pointer-events-none`}>
        “
      </span>

      {/* Top Stars & Verified Status */}
      <div className="flex items-center justify-between relative z-10 mb-5">
        <div className="flex items-center gap-0.5 text-[#C5A16F] text-sm sm:text-base">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="drop-shadow-[0_0_6px_rgba(197,161,111,0.5)]">★</span>
          ))}
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/20 text-[#C5A16F] text-[10px] sm:text-[11px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F]" />
          {language === 'ar' ? 'شريك موثق' : 'Verified Partner'}
        </span>
      </div>

      {/* Quote Content */}
      <div className="relative z-10 my-2">
        <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-normal italic">
          "{activeContent}"
        </p>
      </div>

      {/* Author Details Footer */}
      <div className="relative z-10 pt-5 mt-5 border-t border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-[#112240] border border-[#C5A16F]/40 shrink-0 shadow-md">
            {activeImg ? (
              <img src={activeImg} alt={activeName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-base text-[#C5A16F]">
                {activeName.charAt(0) || '✦'}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-white text-base sm:text-lg font-bold">
              {activeName}
            </h4>
            <p className="text-gray-400 text-xs font-light">
              {activeRole} {activeCompany && <span className="text-[#C5A16F]">@ {activeCompany}</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
