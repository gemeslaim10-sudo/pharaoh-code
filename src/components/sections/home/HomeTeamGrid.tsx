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
                            fontSize="20" fill="#C5A16F">𓂀</text>
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
                <h3 className="text-4xl md:text-6xl font-black text-white">{data.titlePart1} <span className="text-[#C5A16F]">{data.titlePart2}</span></h3>
                <p
                    className="text-gray-400 mt-6 max-w-2xl text-lg leading-relaxed border-r-4 border-[#C5A16F] pr-6">
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
                        
                        <div className="w-32 h-32 mx-auto rounded-[1.5rem] overflow-hidden mb-6 border-2 border-[#C5A16F]/30 p-1 group-hover:border-[#C5A16F] transition-colors bg-[#0A192F]">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-[1.3rem] grayscale-[50%] group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                        <span className="text-[#C5A16F] text-xs font-medium uppercase tracking-wider block">{member.role}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
