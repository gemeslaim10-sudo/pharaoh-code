'use client';

interface HomeWorkflowHeaderProps {
  subtitle: string;
  titlePart1: string;
  titlePart2: string;
  desc: string;
  isLight: boolean;
  direction: 'rtl' | 'ltr';
}

export function HomeWorkflowHeader({
  subtitle,
  titlePart1,
  titlePart2,
  desc,
  isLight,
  direction,
}: HomeWorkflowHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A16F]/10 border border-[#C5A16F]/30 backdrop-blur-md mb-4 sm:mb-5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A16F] animate-ping shrink-0" />
          <h2 className="text-[#C5A16F] font-bold tracking-[0.15em] uppercase text-[11px] sm:text-xs leading-normal">
            {subtitle}
          </h2>
        </div>
        
        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-normal leading-[1.3] pt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          {titlePart1}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E0B5] via-[#C5A16F] to-[#9E7D47] italic">
            {titlePart2}
          </span>
        </h3>

        <p className={`mt-2 text-xs sm:text-sm md:text-base leading-relaxed font-light ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
          {desc}
        </p>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-2">
        <button 
          aria-label="Previous Steps"
          className="workflow-swiper-prev w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A16F] text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#050B14] transition-all flex items-center justify-center cursor-pointer shadow-md disabled:opacity-30 disabled:pointer-events-none"
        >
          <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          aria-label="Next Steps"
          className="workflow-swiper-next w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#C5A16F] text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#050B14] transition-all flex items-center justify-center cursor-pointer shadow-md disabled:opacity-30 disabled:pointer-events-none"
        >
          <svg className={`w-4 h-4 ${direction === 'rtl' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
