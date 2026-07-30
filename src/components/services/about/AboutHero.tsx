'use client';
import { SectionData, SectionItem } from '@/types';

export default function AboutHero({ data }: { data: SectionData }) {
  if (!data) return null;

  return (
    <section id="about-us" className="relative py-24 bg-[#0A192F] overflow-hidden" dir="rtl">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
            <div className="absolute top-10 right-[10%] animate-pulse duration-[4000ms]">
                <svg className="w-16 h-16 text-[#C5A16F]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="1" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </div>
            <div className="absolute bottom-20 left-[5%] rotate-12 opacity-40">
                <svg className="w-24 h-24 text-[#C5A16F]/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            </div>
            <div className="absolute top-1/3 left-[15%] -rotate-12">
                <svg className="w-12 h-12 text-[#C5A16F]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="1" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
            </div>
            <div className="absolute bottom-10 right-[20%] opacity-10 text-6xl text-[#C5A16F]">𓂀</div>

            <div className="absolute top-1/4 right-[5%] grid grid-cols-3 gap-2 opacity-30">
                <div className="w-1 h-1 bg-[#C5A16F] rounded-full"></div><div className="w-1 h-1 bg-[#C5A16F] rounded-full"></div><div className="w-1 h-1 bg-[#C5A16F] rounded-full"></div>
                <div className="w-1 h-1 bg-[#C5A16F] rounded-full"></div><div className="w-1 h-1 bg-[#C5A16F] rounded-full"></div><div className="w-1 h-1 bg-[#C5A16F] rounded-full"></div>
            </div>
        </div>

        <div className="absolute -left-20 top-1/2 -translate-y-1/2 rotate-90 opacity-[0.03] select-none pointer-events-none z-0">
            <span className="text-9xl font-black text-white">{data.establishedText || "ESTABLISHED 2026"}</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                <div className="w-full lg:w-1/2 relative group">
                    <div className="absolute inset-0 border-2 border-[#C5A16F]/30 rounded-tr-[5rem] rounded-bl-[5rem] translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700"></div>

                    <div className="relative overflow-hidden rounded-tr-[5rem] rounded-bl-[5rem] border-2 border-[#C5A16F]/50 shadow-2xl bg-[#112240]">
                        <img
                            src={data.imageUrl || "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000"}
                            alt="About Pharaoh Code"
                            className="w-full h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />

                        <div className="absolute bottom-8 right-8 w-24 h-24 bg-[#0A192F] border-2 border-[#C5A16F] rounded-3xl flex items-center justify-center transform rotate-12 group-hover:rotate-[360deg] transition-all duration-1000 shadow-2xl z-20">
                            <div className="w-16 h-16 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#C5A16F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 space-y-8">
                    <div className="inline-block border-r-4 border-[#C5A16F] pr-4">
                        <h2 className="text-[#C5A16F] font-bold tracking-[0.3em] uppercase text-xs">
                            {data.subtitle || "Legacy & Vision"}
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-black text-white mt-2 leading-tight">
                            {data.titlePart1 || "حيث يلتقي ذكاء الكود"} <br /> <span className="text-[#C5A16F]">{data.titlePart2 || "بعظمة الأجداد"}</span>
                        </h3>
                    </div>

                    <p className="text-gray-400 text-lg leading-relaxed">
                        {data.description || "في **Pharaoh Code**، نحن لا نكتفي ببرمجة تطبيقات؛ نحن نشيّد صروحاً رقمية. بدأت رحلتنا من شغف عميق بتغيير الخارطة التقنية، لنكون الجسر الذي يعبر به عملاؤنا من مجرد \"التواجد الرقمي\" إلى \"السيادة الرقمية\"."}
                    </p>

                    <div className="grid grid-cols-2 gap-8 pt-4">
                        {data.features?.map((feature: SectionItem, index: number) => (
                            <div key={index} className="flex items-start gap-4 group/item">
                                <div className="w-10 h-10 bg-[#C5A16F]/10 rounded-lg flex-shrink-0 flex items-center justify-center group-hover/item:bg-[#C5A16F] transition-colors duration-300">
                                    <div className="text-[#C5A16F] group-hover/item:text-[#0A192F]" dangerouslySetInnerHTML={{ __html: feature.iconSvg }} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{feature.title}</h4>
                                    <p className="text-gray-500 text-sm">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6">
                        <a href={data.buttonLink || "#contact"} className="inline-flex items-center gap-3 bg-[#C5A16F] text-[#0A192F] px-8 py-4 rounded-xl font-black hover:bg-white transition-all duration-500 group/btn shadow-[0_0_20px_rgba(197,161,111,0.3)]">
                            {data.buttonText || "استكشف عالمنا"}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover/btn:translate-x-[-5px] transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
