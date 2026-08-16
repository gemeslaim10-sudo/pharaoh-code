'use client';
import { SectionData, SectionItem } from '@/types';

function stripSvgColors(svg: string): string {
  if (!svg) return '';
  return svg
    .replace(/\s*(?:group-hover:|group-active:)?text-\[#[^\]]+\]/g, '')
    .replace(/\s*(?:group-hover:|group-active:)?stroke-\[#[^\]]+\]/g, '')
    .replace(/stroke="#[a-fA-F0-9]{3,6}"/g, 'stroke="currentColor"')
    .replace(/fill="#[a-fA-F0-9]{3,6}"/g, 'fill="currentColor"')
    .replace(/stroke:#[a-fA-F0-9]{3,6}/g, 'stroke:currentColor')
    .replace(/fill:#[a-fA-F0-9]{3,6}/g, 'fill:currentColor');
}

import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function HomeWorkflow({ data }: { data?: SectionData }) {
  const { t, language, direction } = useTranslation();

  const defaultSteps = [
    {
      title: t("workflow.step1Title"),
      description: t("workflow.step1Desc"),
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`
    },
    {
      title: t("workflow.step2Title"),
      description: t("workflow.step2Desc"),
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>`
    },
    {
      title: t("workflow.step3Title"),
      description: t("workflow.step3Desc"),
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`
    },
    {
      title: t("workflow.step4Title"),
      description: t("workflow.step4Desc"),
      iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>`
    }
  ];

  const stepsToRender = (data?.steps && data.steps.length > 0 && data.steps[0].iconSvg) ? data.steps : defaultSteps;

  return (
    <section id="project-steps" className="relative py-14 sm:py-20 bg-[#060D1A] overflow-hidden select-none" dir={direction}>
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#C5A16F]/8 blur-[150px] rounded-full pointer-events-none" />

      {/* Cyber Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-2.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping" />
            <h2 className="text-[#C5A16F] font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
              {data?.subtitle || t("workflow.subtitle")}
            </h2>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {t("workflow.titlePart1")}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
              {t("workflow.titlePart2")}
            </span>
          </h3>
        </div>

        {/* Responsive Timeline / Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {stepsToRender.map((step: SectionItem, index: number) => {
            const stepTitle = getDynamicText(step, 'title', language) || step.title || '';
            const stepDesc = getDynamicText(step, 'description', language) || step.description || '';
            
            return (
              <div 
                key={index} 
                className="group relative rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050B14] border border-white/5 hover:border-[#C5A16F]/40 transition-all duration-400 hover:-translate-y-1 shadow-lg flex flex-col justify-between overflow-hidden"
              >
                {/* Top Subtle Edge Highlight */}
                <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 shadow-[0_0_10px_#C5A16F]" />

                <div>
                  {/* Step Header with Number + Icon */}
                  <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#C5A16F]/40 group-hover:bg-[#C5A16F] flex items-center justify-center transition-all duration-400 shadow-md">
                      <div 
                        className="text-[#C5A16F] group-hover:text-[#060D1A] transition-colors duration-400" 
                        dangerouslySetInnerHTML={{ __html: stripSvgColors(step.iconSvg || '') }} 
                      />
                    </div>

                    <span className="font-mono text-xs font-bold text-[#C5A16F]/60 group-hover:text-[#C5A16F] px-2 py-0.5 rounded bg-white/5 border border-white/5">
                      0{index + 1}
                    </span>
                  </div>

                  <h4 className="text-white text-base font-bold mb-1.5 group-hover:text-[#C5A16F] transition-colors">
                    {stepTitle}
                  </h4>
                  <p className="text-gray-300 sm:text-gray-400 text-xs leading-relaxed font-light line-clamp-3">
                    {stepDesc}
                  </p>
                </div>

                {/* Bottom Progress Accent */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F]/40 group-hover:bg-[#C5A16F] transition-colors" />
                  <div className="h-0.5 flex-1 mx-2 bg-white/5 group-hover:bg-[#C5A16F]/30 rounded-full transition-colors" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F]/40 group-hover:bg-[#C5A16F] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
