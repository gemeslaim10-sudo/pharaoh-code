import { CreativityType } from '@/app/actions/dashboard/creativity';

interface Props {
    activeTab: CreativityType;
    setActiveTab: (tab: CreativityType) => void;
}

export default function CreativityHeader({ activeTab, setActiveTab }: Props) {
    const activeClasses = "bg-[#112240] text-white border-pharaohGold shadow-lg shadow-pharaohGold/5";
    const inactiveClasses = "text-gray-400 border-transparent hover:text-white";

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">مرحباً بك في <span className="text-pharaohGold">محراب الإبداع</span></h1>
                <p className="text-gray-400 text-sm mt-2">قم بإنشاء، تنصيب، وتعديل السجلات والمحتوى الإبداعي لصالون الويب الفرعوني.</p>
            </div>
            <div className="flex gap-3">
                <button 
                    onClick={() => setActiveTab('portfolio')}
                    className={`px-5 py-3 rounded-xl font-bold text-xs border tracking-wide transition-all ${activeTab === 'portfolio' ? activeClasses : inactiveClasses}`}
                >
                    إدارة المشاريع
                </button>
                <button 
                    onClick={() => setActiveTab('philosophy')}
                    className={`px-5 py-3 rounded-xl font-bold text-xs border tracking-wide transition-all ${activeTab === 'philosophy' ? activeClasses : inactiveClasses}`}
                >
                    جوهر أعمالنا
                </button>
                <button 
                    onClick={() => setActiveTab('services')}
                    className={`px-5 py-3 rounded-xl font-bold text-xs border tracking-wide transition-all ${activeTab === 'services' ? activeClasses : inactiveClasses}`}
                >
                    خدمات العرش
                </button>
            </div>
        </div>
    );
}
