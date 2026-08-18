'use client';
import Link from 'next/link';
import { SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { stripSvgColors } from './homeServicesHelpers';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeServicesSpotlightProps {
  activeItem: SectionItem;
  activeTitle: string;
  activeDesc: string;
  activeUrl: string;
  activeTags: string[];
}

export function HomeServicesSpotlight({
  activeItem,
  activeTitle,
  activeDesc,
  activeUrl,
  activeTags,
}: HomeServicesSpotlightProps) {
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="md:col-span-5 flex flex-col">
      <div className={`relative rounded-2xl p-6 sm:p-7 border shadow-xl flex flex-col justify-between overflow-hidden group h-full transition-all duration-300 ${
        isLight
          ? 'bg-white border-slate-200/90 shadow-slate-200/50'
          : 'bg-gradient-to-br from-[#0F1F3D] via-[#091427] to-[#050B14] border-[#C5A16F]/35'
      }`}>
        {/* Background Luxury Glow Orb */}
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-[#C5A16F]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Bar: Icon + Enterprise Badge */}
        <div className="relative z-10 flex items-start justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTitle + 'icon'}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C5A16F] via-[#D4AF37] to-[#9E7D47] text-[#050B14] flex items-center justify-center p-2.5 shadow-md"
            >
              <div
                className="w-6 h-6 flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: stripSvgColors(activeItem?.iconSvg || '') }}
              />
            </motion.div>
          </AnimatePresence>
          
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono ${
            isLight
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {language === 'ar' ? 'حل سيادي معتمد' : 'Enterprise Ready'}
          </span>
        </div>

        {/* Middle: Title, Description & Tech Tags with AnimatePresence */}
        <div className="relative z-10 my-4 min-h-[140px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <h4 className={`text-xl sm:text-2xl font-bold mb-2 leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {activeTitle}
              </h4>
              <p className={`text-xs sm:text-sm leading-relaxed mb-4 font-light line-clamp-3 ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>
                {activeDesc}
              </p>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-1.5">
                {activeTags.map((tag, i) => (
                  <span 
                    key={i} 
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-lg border ${
                      isLight
                        ? 'bg-slate-100 border-slate-200 text-slate-700'
                        : 'bg-white/5 border-white/10 text-gray-300'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA Button */}
        <div className={`relative z-10 pt-3 border-t ${isLight ? 'border-slate-100' : 'border-white/10'}`}>
          <Link
            href={activeUrl}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C5A16F] via-[#D4AF37] to-[#C5A16F] text-[#050B14] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02] active:scale-98"
          >
            <span>{t("services.exploreBtn") || (language === 'ar' ? 'استكشف كافة التفاصيل' : 'Explore Details')}</span>
            <svg
              className={`w-3.5 h-3.5 shrink-0 ${direction === 'rtl' ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
