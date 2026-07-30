

interface HomeCreativeCardProps {
    title: string;
    description: string;
    iconPath: string;
    linkText: string;
    rotateClass: string;
}

export default function HomeCreativeCard({ title, description, iconPath, linkText, rotateClass }: HomeCreativeCardProps) {
    return (
        <div className="group relative pt-12">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A16F]/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative bg-[#112240] p-10 rounded-tr-[5rem] rounded-bl-[5rem] rounded-tl-2xl rounded-br-2xl border-r-4 border-t-4 border-[#C5A16F]/20 group-hover:border-[#C5A16F] transition-all duration-500 shadow-2xl">
                <div className={`absolute -top-8 right-10 w-20 h-20 bg-[#0A192F] border-2 border-[#C5A16F] rounded-2xl flex items-center justify-center transform ${rotateClass} transition-transform duration-500 shadow-xl`}>
                    <div className="w-14 h-14 bg-[#C5A16F]/10 rounded-xl flex items-center justify-center group-hover:bg-[#C5A16F] transition-colors duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#C5A16F] group-hover:text-[#0A192F] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
                        </svg>
                    </div>
                </div>
                <h4 className="text-white text-2xl font-black mt-8 mb-4">{title}</h4>
                <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
                <div className="mt-8 flex items-center gap-3 text-[#C5A16F] font-bold text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{linkText}</span>
                    <div className="w-12 h-[1px] bg-[#C5A16F]"></div>
                </div>
            </div>
        </div>
    );
}
