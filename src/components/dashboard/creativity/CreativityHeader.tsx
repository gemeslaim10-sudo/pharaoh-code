import { CreativityType } from '@/types/creativity';

interface Props {
    activeTab: CreativityType;
    setActiveTab: (tab: CreativityType) => void;
}

export default function CreativityHeader({ activeTab, setActiveTab }: Props) {
    const activeClasses = "bg-amber-500/10 dark:bg-[#112240] text-amber-800 dark:text-white border-amber-500/40 dark:border-pharaohGold shadow-sm";
    const inactiveClasses = "text-slate-600 dark:text-gray-400 border-slate-200 dark:border-transparent hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-transparent";

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">مرحباً بك في <span className="text-amber-800 dark:text-pharaohGold">محراب الإبداع</span></h1>
                <p className="text-slate-600 dark:text-gray-400 text-sm mt-2">قم بإنشاء، تنصيب، وتعديل السجلات والمحتوى الإبداعي لصالون الويب الفرعوني.</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
                <button 
                    onClick={() => setActiveTab('portfolio')}
                    className={`px-5 py-3 rounded-xl font-bold text-xs border tracking-wide transition-all cursor-pointer ${activeTab === 'portfolio' ? activeClasses : inactiveClasses}`}
                >
                    إدارة المشاريع
                </button>
                <button 
                    onClick={() => setActiveTab('philosophy')}
                    className={`px-5 py-3 rounded-xl font-bold text-xs border tracking-wide transition-all cursor-pointer ${activeTab === 'philosophy' ? activeClasses : inactiveClasses}`}
                >
                    جوهر أعمالنا
                </button>
                <button 
                    onClick={() => setActiveTab('services')}
                    className={`px-5 py-3 rounded-xl font-bold text-xs border tracking-wide transition-all cursor-pointer ${activeTab === 'services' ? activeClasses : inactiveClasses}`}
                >
                    خدمات العرش
                </button>
            </div>
        </div>
    );
}
