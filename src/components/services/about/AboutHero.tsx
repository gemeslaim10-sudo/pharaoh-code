'use client';
import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { motion } from 'framer-motion';

export default function AboutHero({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  if (!data) return null;

  return (
    <section id="about-us" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 bg-[#050D1A] overflow-hidden" dir={direction}>
      {/* Rich layered background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(ellipse at 80% 0%, rgba(197,161,111,0.1) 0%, transparent 55%), radial-gradient(ellipse at 20% 100%, rgba(59,130,246,0.05) 0%, transparent 55%)' }} />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: 'linear-gradient(rgba(197,161,111,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,161,111,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A16F]/20 to-transparent" />
      </div>

      {/* Decorative glyphs */}
      <div className="absolute top-12 right-[6%] opacity-[0.05] text-[#C5A16F] text-[9rem] select-none pointer-events-none leading-none font-serif">𓂀</div>
      <div className="absolute bottom-20 left-[3%] opacity-[0.04] text-[#C5A16F] text-[7rem] select-none pointer-events-none leading-none font-serif">𓋹</div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* ── Image side ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: direction === 'rtl' ? 30 : -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-5/12 relative group flex-shrink-0"
          >
            {/* Ghost frame */}
            <div className="absolute inset-0 border-2 border-[#C5A16F]/20 rounded-tr-[5rem] rounded-bl-[5rem] translate-x-4 translate-y-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-all duration-700 pointer-events-none" />

            <div className="relative overflow-hidden rounded-tr-[5rem] rounded-bl-[5rem] border border-[#C5A16F]/25 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] group-hover:shadow-[0_40px_100px_-20px_rgba(197,161,111,0.2)] transition-shadow duration-700">
              <img
                src={data.imageUrl || 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000'}
                alt="About Pharaoh Code"
                className="w-full h-[500px] object-cover transition-transform duration-1000 scale-105 group-hover:scale-100"
              />

              {/* Rotating icon badge */}
              <div className="absolute bottom-6 right-6 w-20 h-20 bg-white dark:bg-[#050D1A]/95 border-2 border-[#8A5800] dark:border-[#C5A16F] rounded-2xl flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-1000 shadow-[0_10px_30px_rgba(15,23,42,0.15)] dark:shadow-[0_0_40px_rgba(197,161,111,0.5)] z-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-[#8A5800] dark:text-[#C5A16F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>

              {/* Top badge */}
              <div className="absolute top-5 left-5 bg-[#8A5800] dark:bg-[#C5A16F] text-white dark:text-[#050D1A] text-[10px] font-black tracking-[0.25em] px-3 py-1.5 rounded-full uppercase shadow-lg">
                Since 2020
              </div>
            </div>
          </motion.div>

          {/* ── Text side ── */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="w-full lg:w-7/12 space-y-8"
          >
            {/* Label */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-gradient-to-r from-[#C5A16F] to-transparent" />
              <span className="text-[#C5A16F] font-bold tracking-[0.4em] uppercase text-[11px] bg-[#C5A16F]/8 px-4 py-1.5 rounded-full border border-[#C5A16F]/20">
                {getDynamicText(data, 'subtitle', language) || t('about.heroSubtitle')}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1]">
              {getDynamicText(data, 'titlePart1', language) || t('about.heroTitlePart1')}
              <br />
              <span className="bg-gradient-to-r from-[#C5A16F] via-[#E8C97E] to-[#C5A16F] bg-clip-text text-transparent">
                {getDynamicText(data, 'titlePart2', language) || t('about.heroTitlePart2')}
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
              {getDynamicText(data, 'description', language) || t('about.heroDescription')}
            </p>

            {/* Feature grid with stagger animation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.features?.map((feature: SectionItem, index: number) => {
                const featTitle = getDynamicText(feature, 'title', language);
                const featDesc = getDynamicText(feature, 'description', language);
                const hasValidSvg = feature.iconSvg && feature.iconSvg.includes('<svg');

                return (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-start gap-4 p-4 bg-gradient-to-b from-[#0F1E38]/80 to-[#081222]/80 rounded-2xl border border-white/6 hover:border-[#C5A16F]/40 transition-all duration-300 group/feat overflow-hidden"
                  >
                    {/* Top micro-beam */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A16F]/60 to-transparent opacity-0 group-hover/feat:opacity-100 transition-opacity" />

                    <div className="w-10 h-10 bg-[#C5A16F]/10 rounded-xl flex-shrink-0 flex items-center justify-center group-hover/feat:bg-[#C5A16F] transition-colors duration-300 relative">
                      {hasValidSvg ? (
                        <div className="text-[#C5A16F] group-hover/feat:text-[#0A192F] w-5 h-5 flex items-center justify-center transition-colors [&_svg]:w-5 [&_svg]:h-5" dangerouslySetInnerHTML={{ __html: feature.iconSvg }} />
                      ) : (
                        <svg className="w-5 h-5 text-[#C5A16F] group-hover/feat:text-[#0A192F] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-bold text-sm mb-0.5">{featTitle}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{featDesc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <motion.a
                href={data.buttonLink || '/portfolio'}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#C5A16F] to-[#B8960A] text-[#050D1A] px-8 py-4 rounded-2xl font-black hover:shadow-[0_0_50px_rgba(197,161,111,0.5)] transition-shadow duration-400 group/btn shadow-[0_0_30px_rgba(197,161,111,0.25)] text-sm"
              >
                {getDynamicText(data, 'buttonText', language) || t('about.exploreWorld')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
