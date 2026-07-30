

interface HomeWorkflowStepProps {
    number: string;
    title: string;
    description: string;
    iconPath: string;
    align: 'left' | 'right';
    isLast?: boolean;
}

export default function HomeWorkflowStep({ number, title, description, iconPath, align, isLast }: HomeWorkflowStepProps) {
    const isRight = align === 'right';

    return (
        <div className={`relative flex flex-col md:flex-row items-center justify-between group ${!isLast ? 'mb-24' : ''}`}>
            
            {isRight ? (
                <div className="md:w-[45%] text-right order-2 md:order-1">
                    <h4 className="text-[#C5A16F] text-xl font-black mb-3">{number}. {title}</h4>
                    <p className="text-gray-400 leading-relaxed">{description}</p>
                </div>
            ) : (
                <div className="md:w-[45%] order-1"></div>
            )}

            <div className="relative z-20 my-6 md:my-0 order-1 md:order-2">
                <div className="w-16 h-16 bg-[#0A192F] border-2 border-[#C5A16F] rounded-2xl flex items-center justify-center transform group-hover:rotate-[360deg] transition-all duration-1000 shadow-[0_0_20px_rgba(197,161,111,0.2)]">
                    <div className="w-12 h-12 bg-[#C5A16F]/10 rounded-xl flex items-center justify-center group-hover:bg-[#C5A16F] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#C5A16F] group-hover:text-[#0A192F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
                        </svg>
                    </div>
                </div>
            </div>

            {isRight ? (
                <div className="md:w-[45%] order-3"></div>
            ) : (
                <div className="md:w-[45%] text-right md:text-left order-2 md:order-3">
                    <h4 className="text-[#C5A16F] text-xl font-black mb-3">{number}. {title}</h4>
                    <p className="text-gray-400 leading-relaxed">{description}</p>
                </div>
            )}

        </div>
    );
}
