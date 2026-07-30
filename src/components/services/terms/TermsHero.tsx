import { SectionData } from '@/types';
interface TermsHeroProps {
    data?: SectionData;
}

export default function TermsHero({ data }: TermsHeroProps) {
    if (!data) return null;

    return (
        <section className="relative pt-40 pb-12 overflow-hidden text-right">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.02] z-0 overflow-hidden">
                <span className="text-[16vw] font-black tracking-widest text-white">PHARAOH</span>
            </div>

            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#C5A16F]/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <h2 className="text-[#C5A16F] font-bold tracking-[0.2em] uppercase text-xs mb-3">{data.subtitle}</h2>
                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                    {data.titlePart1} <span className="text-[#C5A16F] italic">{data.titlePart2}</span>
                </h1>
                <div className="w-20 h-1.5 bg-[#C5A16F] mt-6 rounded-full shadow-[0_0_15px_rgba(197,161,111,0.3)]"></div>
            </div>
        </section>
    );
}
