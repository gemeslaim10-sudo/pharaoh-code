'use client';
import { useTranslation } from '@/contexts/LanguageContext';

const STEPS = [
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'from-[#C5A16F]/20 to-[#C5A16F]/5',
    borderColor: 'border-[#C5A16F]/30 hover:border-[#C5A16F]',
    titleKey: 'team.processStep1Title',
    descKey: 'team.processStep1Desc',
  },
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: 'from-blue-500/15 to-blue-500/5',
    borderColor: 'border-blue-500/20 hover:border-blue-400',
    titleKey: 'team.processStep2Title',
    descKey: 'team.processStep2Desc',
  },
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    color: 'from-emerald-500/15 to-emerald-500/5',
    borderColor: 'border-emerald-500/20 hover:border-emerald-400',
    titleKey: 'team.processStep3Title',
    descKey: 'team.processStep3Desc',
  },
];

export default function TeamProcess() {
  const { t, direction } = useTranslation();

  return (
    <section id="our-process" className="py-14 sm:py-24 bg-[#050D1A] relative overflow-hidden" dir={direction}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(ellipse at 50% 100%, rgba(197,161,111,0.06) 0%, transparent 60%)' }} />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A16F]/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
            <div className="w-6 sm:w-10 h-[2px] bg-gradient-to-r from-transparent to-[#C5A16F]" />
            <span className="text-[#C5A16F] font-bold tracking-[0.2em] sm:tracking-[0.4em] uppercase text-[10px] sm:text-[11px] bg-[#C5A16F]/8 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#C5A16F]/20">
              {t('team.processSubtitle')}
            </span>
            <div className="w-6 sm:w-10 h-[2px] bg-gradient-to-l from-transparent to-[#C5A16F]" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
            {t('team.processTitle1')}{' '}
            <span className="bg-gradient-to-r from-[#C5A16F] via-[#E8C97E] to-[#C5A16F] bg-clip-text text-transparent">
              {t('team.processTitle2')}
            </span>
            <br />
            <span className="text-white">{t('team.processTitle3')}</span>
          </h2>
        </div>

        {/* Steps — responsive timeline */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className={`hidden lg:block absolute top-14 h-[2px] ${direction === 'rtl' ? 'right-[calc(16.67%+2rem)] left-[calc(16.67%+2rem)]' : 'left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)]'} bg-gradient-to-r from-[#C5A16F]/40 via-[#C5A16F]/20 to-[#C5A16F]/40`} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-10">
            {STEPS.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group relative">
                {/* Icon circle */}
                <div className={`relative w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br ${step.color} border-2 ${step.borderColor} flex items-center justify-center mb-5 sm:mb-8 text-[#C5A16F] transition-all duration-500 group-hover:scale-110 shadow-xl group-hover:shadow-[0_0_40px_rgba(197,161,111,0.25)] z-10 bg-[#0A192F]`}>
                  {step.icon}
                  <div className="absolute inset-0 rounded-full border-2 border-[#C5A16F]/20 scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                </div>

                {/* Card below */}
                <div className={`relative w-full bg-gradient-to-b from-[#0F1E38] to-[#081222] rounded-2xl sm:rounded-3xl border border-white/6 ${step.borderColor} p-5 sm:p-7 transition-all duration-500 overflow-hidden shadow-xl group-hover:-translate-y-1.5`}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#C5A16F] transition-colors duration-300">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                    {t(step.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
