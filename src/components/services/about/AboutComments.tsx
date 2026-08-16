'use client';
import { SectionData } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { AboutCommentsForm } from './AboutCommentsForm';

export default function AboutComments({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();

  if (!data) return null;

  const formTitle = getDynamicText(data, 'formTitle', language) || t('about.addCommentTitle');

  return (
    <section id="comments-section" className="relative py-20 bg-[#0A192F] overflow-hidden border-t border-white/5" dir={direction}>
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#C5A16F]/4 blur-[120px] rounded-full pointer-events-none" />

      {/* Watermark */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.015] select-none">
        <span className="text-[16vw] font-black text-[#C5A16F] uppercase tracking-[2rem] font-mono">
          {data.backgroundText || 'PHARAOH'}
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-5 h-[2px] bg-[#C5A16F]" />
            <span className="text-[#C5A16F] font-bold tracking-[0.35em] uppercase text-[11px]">
              {getDynamicText(data, 'subtitle', language) || t('about.communityVoices')}
            </span>
            <div className="w-5 h-[2px] bg-[#C5A16F]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            {getDynamicText(data, 'titlePart1', language) || t('about.leaveDigitalMark')}
            {' '}
            <span className="text-[#C5A16F]">{getDynamicText(data, 'titlePart2', language) || ''}</span>
          </h2>
          <p className="text-gray-400 mt-2 text-sm max-w-md mx-auto">
            {getDynamicText(data, 'description', language) || t('about.commentsDesc')}
          </p>
        </div>

        {/* Form card */}
        <div className="relative group">
          {/* Top glowing beam */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-60 rounded-full z-10" />

          <div className="bg-[#112240]/70 backdrop-blur-md border border-white/5 hover:border-[#C5A16F]/25 p-8 rounded-2xl shadow-xl transition-all duration-500">
            <AboutCommentsForm formTitle={formTitle} />
          </div>
        </div>
      </div>
    </section>
  );
}
