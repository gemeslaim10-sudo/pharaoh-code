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
        iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#C5A16F] group-hover:text-[#0A192F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`
    },
    {
        title: t("workflow.step2Title"),
        description: t("workflow.step2Desc"),
        iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#C5A16F] group-hover:text-[#0A192F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>`
    },
    {
        title: t("workflow.step3Title"),
        description: t("workflow.step3Desc"),
        iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#C5A16F] group-hover:text-[#0A192F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`
    },
    {
        title: t("workflow.step4Title"),
        description: t("workflow.step4Desc"),
        iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#C5A16F] group-hover:text-[#0A192F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>`
    }
  ];

  const stepsToRender = (data?.steps && data.steps.length > 0 && data.steps[0].iconSvg) ? data.steps : defaultSteps;

  return (
    <section id="project-steps" className="relative py-24 bg-[#0A192F] overflow-hidden" dir={direction}>
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" stroke="#C5A16F" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-24">
                <h2 className="text-[#C5A16F] font-bold tracking-[0.4em] uppercase text-xs mb-4">
                    {data?.subtitle || t("workflow.subtitle")}
                </h2>
                <h3 className="text-4xl md:text-6xl font-black text-white">
                    {t("workflow.titlePart1")} <span className="text-[#C5A16F]">{t("workflow.titlePart2")}</span>
                </h3>
            </div>

            <div className="relative">
                <div className="absolute right-8 md:right-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C5A16F]/0 via-[#C5A16F]/50 to-[#C5A16F]/0 hidden md:block"></div>

                {stepsToRender.map((step: SectionItem, index: number) => {
                    const isEven = index % 2 === 1;
                    const stepTitle = getDynamicText(step, 'title', language) || step.title || '';
                    const stepDesc = getDynamicText(step, 'description', language) || step.description || '';
                    
                    return (
                        <div key={index} className="relative flex flex-col md:flex-row items-center justify-between mb-24 group">
                            {isEven ? (
                                <>
                                    <div className="md:w-[45%] order-1"></div>
                                    <div className="relative z-20 my-6 md:my-0 order-1 md:order-2">
                                        <div className="w-16 h-16 bg-[#0A192F] border-2 border-[#C5A16F] rounded-2xl flex items-center justify-center transform group-hover:rotate-[360deg] transition-all duration-1000 shadow-[0_0_20px_rgba(197,161,111,0.2)]">
                                            <div className="w-12 h-12 bg-[#C5A16F]/10 rounded-xl flex items-center justify-center group-hover:bg-[#C5A16F] transition-colors">
                                                <div className="text-[#C5A16F] group-hover:text-[#0A192F]" dangerouslySetInnerHTML={{ __html: stripSvgColors(step.iconSvg || '') }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-[45%] text-right md:text-left order-2 md:order-3">
                                        <h4 className="text-[#C5A16F] text-xl font-black mb-3">{stepTitle}</h4>
                                        <p className="text-gray-400 leading-relaxed">{stepDesc}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="md:w-[45%] text-right order-2 md:order-1">
                                        <h4 className="text-[#C5A16F] text-xl font-black mb-3">{stepTitle}</h4>
                                        <p className="text-gray-400 leading-relaxed">{stepDesc}</p>
                                    </div>
                                    <div className="relative z-20 my-6 md:my-0 order-1 md:order-2">
                                        <div className="w-16 h-16 bg-[#0A192F] border-2 border-[#C5A16F] rounded-2xl flex items-center justify-center transform group-hover:rotate-[360deg] transition-all duration-1000 shadow-[0_0_20px_rgba(197,161,111,0.2)]">
                                            <div className="w-12 h-12 bg-[#C5A16F]/10 rounded-xl flex items-center justify-center group-hover:bg-[#C5A16F] transition-colors">
                                                <div className="text-[#C5A16F] group-hover:text-[#0A192F]" dangerouslySetInnerHTML={{ __html: stripSvgColors(step.iconSvg || '') }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-[45%] order-3"></div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
  );
}
