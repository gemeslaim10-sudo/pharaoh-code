'use client';
import { SectionData } from '@/types';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function ContactSection({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  if (!data) return null;

  return (
    <section id="contact" className="py-20 bg-[#0A192F] relative overflow-hidden" dir={direction}>
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A16F]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/4 blur-[120px] rounded-full pointer-events-none" />

      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] bg-gradient-to-r from-transparent via-[#C5A16F]/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-[2px] bg-[#C5A16F]" />
            <span className="text-[#C5A16F] font-bold tracking-[0.35em] uppercase text-[11px]">
              {getDynamicText(data, 'subtitle', language) || t('contact.getInTouch')}
            </span>
            <div className="w-6 h-[2px] bg-[#C5A16F]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            {getDynamicText(data, 'titlePart1', language) || t('contact.mainTitle1')}
            {' '}
            <span className="text-[#C5A16F]">
              {getDynamicText(data, 'titlePart2', language) || t('contact.mainTitle2')}
            </span>
            {' '}
            {getDynamicText(data, 'titlePart3', language) || t('contact.mainTitle3')}
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            {getDynamicText(data, 'description', language) || t('contact.mainDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <ContactInfo data={data} />
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
