import { SectionData, SectionItem } from '@/types';
interface HomeTeamGridProps {
    data?: SectionData;
}

export default function HomeTeamGrid({ data }: HomeTeamGridProps) {
    if (!data) return null;

    return (
    <section id="our-team"
        className="relative py-24 bg-[#0A192F] overflow-hidden" dir="rtl">

        <div
            className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
            <svg width="100%" height="100%"
                xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="pharaoh-pattern" x="0" y="0" width="100"
                        height="100" patternUnits="userSpaceOnUse">
                        <text x="0" y="50" fontFamily="serif"
                            fontSize="20" fill="#C5A16F">✦</text>
                    </pattern>
                </defs>
                <rect width="100%" height="100%"
                    fill="url(#pharaoh-pattern)" />
            </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-right">

            <div className="mb-20">
                <h2
                    className="text-[#C5A16F] font-bold tracking-[0.4em] uppercase text-xs mb-4">{data.subtitle}</h2>
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight">{data.titlePart1} <span className="text-[#C5A16F]">{data.titlePart2}</span></h3>
                <p
                    className="text-gray-300 dark:text-gray-400 mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed border-r-4 border-[#C5A16F] pr-4 sm:pr-6 font-normal">
                    {data.description}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" id="home-team-grid">
                {data.members?.map((member: SectionItem, idx: number) => (
                    <div key={idx} className="team-card bg-[#112240] p-6 rounded-[2rem] border border-white/5 hover:border-[#C5A16F]/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(197,161,111,0.2)] group text-center"
                        data-name={member.name}
                        data-role={member.role}
                        data-img={member.image}
                        data-desc={member.description}
                        data-skill1-name={member.skills?.[0]?.name}
                        data-skill1-val={member.skills?.[0]?.value}
                        data-skill2-name={member.skills?.[1]?.name}
                        data-skill2-val={member.skills?.[1]?.value}
                        data-skill3-name={member.skills?.[2]?.name}
                        data-skill3-val={member.skills?.[2]?.value}
                        data-stat1={member.stats?.[0]?.value}
                        data-stat1-lbl={member.stats?.[0]?.label}
                        data-stat2={member.stats?.[1]?.value}
                        data-stat2-lbl={member.stats?.[1]?.label}
                        data-fb={member.social?.facebook}
                        data-insta={member.social?.instagram}>
                        
                        <div className="relative mx-auto mb-3.5 mt-1 w-32 h-32 sm:w-36 sm:h-36">
                            <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-[#C5A16F]/40 via-[#DFB77D]/25 to-[#9E7D47]/40 blur-md opacity-40 group-hover:opacity-100 group-hover:blur-lg transition-all duration-700 pointer-events-none" />
                            <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-tr from-[#C5A16F] via-[#DFB77D] to-[#9E7D47] group-hover:rotate-180 transition-transform duration-1000 ease-out shadow-xl">
                                <div className="w-full h-full rounded-full p-1 overflow-hidden bg-[#081222]">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full transition-transform duration-700 ease-out transform group-hover:scale-115 group-hover:brightness-105" />
                                </div>
                            </div>
                            <div className="absolute bottom-0.5 end-0.5 z-10 w-8 h-8 rounded-full border-2 bg-[#070F1E] border-[#C5A16F] text-[#C5A16F] flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:rotate-12 transition-all duration-300">
                                <span className="text-sm font-serif leading-none font-bold select-none drop-shadow-[0_0_4px_rgba(197,161,111,0.6)]">
                                    ✦
                                </span>
                            </div>
                        </div>
                        <h4 className="text-base font-bold text-white mb-1 group-hover:text-[#C5A16F] transition-colors">{member.name}</h4>
                        <span className="inline-flex items-center leading-none text-[#C5A16F] text-[10px] font-bold uppercase tracking-wider bg-[#C5A16F]/10 py-0.5 px-2.5 rounded-full border border-[#C5A16F]/20">{member.role}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
