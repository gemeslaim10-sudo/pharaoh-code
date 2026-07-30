'use client';
import { SectionData } from '@/types';

export default function PortfolioServices({ data }: { data?: SectionData }) {
  const itemsToRender = data?.items || [];

  return (
    <section className="py-24 bg-pharaohNavy relative overflow-hidden" dir="rtl">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 border-2 border-pharaohGold rounded-full animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                    {data?.titlePart1 || "خدمات"} <span className="text-pharaohGold">{data?.titlePart2 || "العرش"}</span> {data?.titlePart3 || "الرقمي"}
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto italic">
                    {data?.description || "نحن لا نقدم مجرد دعم، نحن نحرس إمبراطوريتك التقنية على مدار الساعة."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {itemsToRender.map((item: any, index: number) => (
                    <div key={index} className="group relative p-1 bg-gradient-to-b from-pharaohGold/20 to-transparent rounded-[2rem] transition-all duration-500 hover:scale-105">
                        <div className="bg-pharaohNavy/90 backdrop-blur-xl p-10 rounded-[1.9rem] h-full border border-white/5 group-hover:border-pharaohGold/50 transition-all">
                            <div className="w-16 h-16 bg-pharaohGold/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-pharaohGold transition-colors duration-500">
                                <div dangerouslySetInnerHTML={{ __html: item.iconSvg || item.icon }} className="w-8 h-8 text-pharaohGold group-hover:text-pharaohNavy transition-colors flex items-center justify-center" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{item.description || item.desc}</p>
                            <div className="mt-6 flex items-center text-pharaohGold font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.actionText || item.btnText || item.label}
                                <span className="ml-2">→</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
