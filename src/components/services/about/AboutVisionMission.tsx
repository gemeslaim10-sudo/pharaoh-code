'use client';
import { SectionData } from '@/types';

export default function AboutVisionMission({ data }: { data: SectionData }) {
  if (!data) return null;

  return (
    <section id="vision-mission" className="relative py-32 bg-[#0A192F] overflow-hidden" dir="rtl">
        <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-1/4 left-10 text-7xl rotate-12 floating-icon">𓂀</div>
            <div className="absolute bottom-1/4 right-10 text-5xl -rotate-12 opacity-20">𓋹</div>
            <div className="absolute top-1/2 left-1/3 text-xs font-mono opacity-20">101011010110</div>
            <div className="absolute bottom-1/3 right-1/4 text-xs font-mono opacity-20">001101001011</div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="group relative">
                    <div className="absolute inset-0 bg-[#112240] rounded-tr-[4rem] rounded-bl-[4rem] border-r-4 border-[#C5A16F] transform group-hover:scale-[1.02] transition-all duration-500 shadow-2xl"></div>

                    <div className="relative p-12">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-16 h-16 bg-[#0A192F] border-2 border-[#C5A16F] rounded-2xl flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-all duration-500 shadow-lg">
                                <svg className="w-8 h-8 text-[#C5A16F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-black text-white">{data.visionTitle || "رؤيتنا"}</h3>
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed italic">
                            "{data.visionText || "أن نعيد كتابة تاريخ التكنولوجيا بأيادٍ مصرية، لنحول كل فكرة معقدة إلى صرح رقمي شامخ يناطح السحاب ويخلد في ذاكرة المستخدمين."}"
                        </p>
                    </div>
                </div>

                <div className="group relative">
                    <div className="absolute inset-0 bg-[#112240] rounded-tl-[4rem] rounded-br-[4rem] border-l-4 border-[#C5A16F] transform group-hover:scale-[1.02] transition-all duration-500 shadow-2xl"></div>

                    <div className="relative p-12">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-16 h-16 bg-[#0A192F] border-2 border-[#C5A16F] rounded-2xl flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-all duration-500 shadow-lg">
                                <svg className="w-8 h-8 text-[#C5A16F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-black text-white">{data.missionTitle || "رسالتنا"}</h3>
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed italic">
                            "{data.missionText || "تمكين طموحات عملائنا عبر تقديم حلول برمجية ذكية، آمنة، وفائقة السرعة، مع الالتزام بأعلى معايير الجودة العالمية في كل سطر كود نكتبه."}"
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-20 text-center opacity-30">
                <div className="flex justify-center gap-4 text-[#C5A16F] text-2xl">
                    <span>𓉐</span> <span>𓉔</span> <span>𓉀</span> <span>𓉐</span>
                </div>
                <p className="text-xs text-white/50 mt-4 tracking-[1rem] uppercase">The Egyptian Standard</p>
            </div>
        </div>
    </section>
  );
}
