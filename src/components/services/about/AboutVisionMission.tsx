'use client';
import { SectionData } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { motion } from 'framer-motion';

export default function AboutVisionMission({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  if (!data) return null;

  const cards = [
    {
      key: 'vision',
      title: getDynamicText(data, 'visionTitle', language) || t('about.visionTitle'),
      text: getDynamicText(data, 'visionText', language) || t('about.visionText'),
      icon: (
        <svg className="w-7 h-7 text-[#C5A16F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      glyph: '𓂀',
      accent: 'rounded-tr-[4rem] rounded-bl-[4rem]',
    },
    {
      key: 'mission',
      title: getDynamicText(data, 'missionTitle', language) || t('about.missionTitle'),
      text: getDynamicText(data, 'missionText', language) || t('about.missionText'),
      icon: (
        <svg className="w-7 h-7 text-[#C5A16F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      glyph: '𓋹',
      accent: 'rounded-tl-[4rem] rounded-br-[4rem]',
    },
  ];

  return (
    <section id="vision-mission" className="relative py-20 bg-[#0A192F] overflow-hidden" dir={direction}>
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#C5A16F]/20 to-transparent" />

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute top-1/4 left-10 text-7xl text-[#C5A16F]">𓂀</div>
        <div className="absolute bottom-1/4 right-10 text-5xl text-[#C5A16F]">𓋹</div>
        <div className="absolute top-1/2 left-1/3 text-xs font-mono text-white">101011010110</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, idx) => (
            <motion.div 
              key={card.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`group relative ${card.accent} overflow-hidden`}
            >
              {/* Card background */}
              <div className={`absolute inset-0 bg-[#112240] ${card.accent} border border-white/5 group-hover:border-[#C5A16F]/35 transition-all duration-500 shadow-2xl`} />

              {/* Top glowing beam */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

              {/* Ambient glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C5A16F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Glyph watermark */}
              <div className="absolute bottom-4 right-6 text-6xl text-[#C5A16F]/5 select-none pointer-events-none group-hover:text-[#C5A16F]/10 transition-colors duration-500">
                {card.glyph}
              </div>

              <div className="relative p-10 z-10">
                {/* Icon */}
                <div className="flex items-center gap-5 mb-7">
                  <div className="w-14 h-14 bg-[#0A192F] border border-[#C5A16F]/40 rounded-2xl flex items-center justify-center group-hover:bg-[#C5A16F]/10 group-hover:border-[#C5A16F]/70 transition-all duration-500 shadow-lg flex-shrink-0">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    {card.title}
                  </h3>
                </div>

                {/* Quote marks */}
                <div className="relative">
                  <span className="absolute -top-3 -left-1 text-4xl text-[#C5A16F]/20 font-serif leading-none">&ldquo;</span>
                  <p className="text-gray-400 text-base leading-relaxed italic pl-4 pt-2">
                    {card.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom egyptian divider */}
        <div className="mt-16 text-center opacity-20">
          <div className="flex justify-center gap-5 text-[#C5A16F] text-xl">
            <span>𓉐</span><span>𓉔</span><span>𓉀</span><span>𓉐</span>
          </div>
          <p className="text-xs text-white/40 mt-3 tracking-[0.8rem] uppercase">{t('about.egyptianStandard')}</p>
        </div>
      </div>
    </section>
  );
}
