import { SectionData, SectionItem } from '@/types';
interface TermsContentProps {
    data?: SectionData;
}

export default function TermsContent({ data }: TermsContentProps) {
    if (!data) return null;

    return (
        <section className="pb-24 relative overflow-hidden text-right" dir="rtl">
            <div className="absolute inset-x-0 top-1/4 flex items-center justify-center pointer-events-none select-none opacity-[0.012] z-0">
                <span className="text-[12vw] font-black tracking-[0.15em] text-pharaohGold">PHARAOH</span>
            </div>
            <div className="absolute inset-x-0 bottom-1/4 flex items-center justify-center pointer-events-none select-none opacity-[0.012] z-0">
                <span className="text-[12vw] font-black tracking-[0.15em] text-pharaohGold">CODE</span>
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10" style={{ marginTop: "40px" }}>

                <div className="p-8 rounded-[2rem] bg-[#112240]/40 border border-white/5 backdrop-blur-sm mb-12">
                    <p className="text-base leading-relaxed text-gray-300">
                        {data.intro}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.sections?.map((section: SectionItem, idx: number) => {
                        const numberStr = `٠${idx + 1}`.slice(-2).replace('1', '١').replace('2', '٢').replace('3', '٣').replace('4', '٤').replace('5', '٥').replace('6', '٦').replace('7', '٧').replace('8', '٨').replace('9', '٩').replace('0', '٠');
                        
                        return (
                            <div key={idx} className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/30 transition-all duration-500 shadow-xl flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="w-12 h-12 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] font-black border border-[#C5A16F]/20 group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-500 text-lg">{numberStr}</div>
                                        <h3 className="text-white text-xl font-bold">{section.title}</h3>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {section.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="text-center pt-16 border-t border-white/5 mt-16">
                    <p className="text-sm text-gray-500">{data.footerText}</p>
                    <a href="/contact" className="inline-block mt-4 text-[#C5A16F] font-bold hover:text-white transition-colors">{data.footerLinkText}</a>
                </div>

            </div>
        </section>
    );
}
