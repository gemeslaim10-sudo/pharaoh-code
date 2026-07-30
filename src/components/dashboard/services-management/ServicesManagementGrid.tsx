'use client';

interface Props {
    services: any[];
    onEdit: (service: any) => void;
    onDelete: (id: string) => void;
    loading: boolean;
}

export default function ServicesManagementGrid({ services, onEdit, onDelete, loading }: Props) {
    return (
        <div className="border-t border-white/5 pt-16">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-2 h-6 bg-pharaohGold rounded-full"></div>
                <h4 className="text-2xl font-black text-white">سجلات الخدمات المضافة حالياً</h4>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-400">جاري تحميل الخدمات...</div>
            ) : services.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-[#112240] rounded-[2rem] border border-white/5">
                    لا توجد خدمات مضافة حالياً.
                </div>
            ) : (
                <div id="services-grid-display" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map(service => (
                        <div key={service.id} className="bg-[#112240] border border-white/5 rounded-3xl p-6 shadow-xl relative group hover:border-pharaohGold/30 transition-all duration-300">
                            {/* Controls */}
                            <div className="absolute top-4 left-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <button onClick={() => onEdit(service)} className="text-pharaohGold/60 hover:text-pharaohGold hover:bg-pharaohGold/10 p-2 rounded-lg transition" title="تعديل الخدمة">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button onClick={() => onDelete(service.id)} className="text-red-400/60 hover:text-red-400 hover:bg-red-400/10 p-2 rounded-lg transition" title="حذف الخدمة">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            {/* Service Badge & Image/Icon */}
                            {service.image ? (
                                <img src={service.image} alt={service.title} className="w-full h-40 object-cover rounded-2xl mb-4 border border-white/5" />
                            ) : service.icon ? (
                                <div className="w-12 h-12 bg-pharaohGold/10 rounded-2xl flex items-center justify-center mb-4 text-pharaohGold">
                                    <div dangerouslySetInnerHTML={{ __html: service.icon }} className="w-6 h-6 flex items-center justify-center" />
                                </div>
                            ) : null}

                            {/* Service Header Info */}
                            <div className="flex gap-2 flex-wrap mb-3">
                                {service.type && (
                                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-full font-bold">
                                        {service.type}
                                    </span>
                                )}
                                {service.badge && (
                                    <span className="text-[10px] bg-pharaohGold/10 text-pharaohGold px-2.5 py-1 rounded-full font-bold">
                                        {service.badge}
                                    </span>
                                )}
                                {service.price && (
                                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-bold">
                                        {service.price}
                                    </span>
                                )}
                            </div>

                            <h4 className="text-white font-bold text-lg mb-2 pl-16 line-clamp-1">{service.title}</h4>
                            <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">{service.desc}</p>
                            
                            {service.btnText && (
                                <div className="text-xs text-pharaohGold border border-pharaohGold/20 px-3 py-1.5 rounded-lg inline-block font-bold">
                                    {service.btnText}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
