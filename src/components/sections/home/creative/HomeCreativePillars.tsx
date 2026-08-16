'use client';
import { SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { stripSvgColors, PILLAR_METRICS } from './creativeHelpers';

interface HomeCreativePillarsProps {
  items: SectionItem[];
  activePillar: number;
  onHoverPillar: (index: number) => void;
}

export function HomeCreativePillars({
  items,
  activePillar,
  onHoverPillar,
}: HomeCreativePillarsProps) {
  const { language } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {items.map((item: SectionItem, index: number) => {
        const isHovered = activePillar === index;
        const itemTitle = getDynamicText(item, 'title', language) || item.title || '';
        const itemDesc = getDynamicText(item, 'description', language) || item.description || '';
        const metricData = PILLAR_METRICS[index % PILLAR_METRICS.length] || { metric: '100%', labelAr: 'دقة هندسية', labelEn: 'Precision' };

        return (
          <div
            key={index}
            onMouseEnter={() => onHoverPillar(index)}
            className={`relative group rounded-2xl p-5 sm:p-7 transition-all duration-400 flex flex-col justify-between overflow-hidden border cursor-default ${
              isHovered
                ? 'bg-gradient-to-b from-[#0F1E38] via-[#0A162B] to-[#070F1E] border-[#C5A16F]/40 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(197,161,111,0.15)] -translate-y-1'
                : 'bg-[#081222]/80 border-white/5 hover:border-white/15'
            }`}
          >
            {/* Top Glowing Beam */}
            <div
              className={`absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent transition-opacity duration-400 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Top Header inside Card */}
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-400 ${
                    isHovered
                      ? 'bg-gradient-to-br from-[#C5A16F] to-[#9E7D47] text-[#040810] shadow-[0_6px_20px_rgba(197,161,111,0.3)] rotate-2'
                      : 'bg-white/5 text-[#C5A16F] group-hover:bg-[#C5A16F]/20'
                  }`}
                >
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: stripSvgColors(item.iconSvg || '') }}
                  />
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono text-[#C5A16F] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md bg-[#C5A16F]/10 border border-[#C5A16F]/20">
                    {language === 'ar' ? metricData.labelAr : metricData.labelEn}
                  </span>
                </div>
              </div>

              <h4 className="text-base sm:text-xl font-bold text-white mb-2 group-hover:text-white transition-colors duration-300">
                {itemTitle}
              </h4>
              <p className="text-gray-300 sm:text-gray-400 text-xs sm:text-sm leading-relaxed font-light mb-4 sm:mb-6">
                {itemDesc}
              </p>
            </div>

            {/* Bottom Metric & Accent Line */}
            <div className="relative z-10 pt-3.5 sm:pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black text-[#C5A16F] font-mono">
                  {metricData.metric}
                </span>
                <span className="text-[11px] text-gray-400 font-medium">
                  {language === 'ar' ? metricData.labelAr : metricData.labelEn}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className={`h-[2px] transition-all duration-400 ${isHovered ? 'w-8 bg-[#C5A16F]' : 'w-4 bg-white/10'}`} />
                <span className="w-1 h-1 rounded-full bg-[#C5A16F]" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
