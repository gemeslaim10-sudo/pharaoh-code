export default function ProjectRequests({ projects, onAccept, onReject, onDelete }: { projects: any[], onAccept: (p: any) => void, onReject: (p: any) => void, onDelete?: (p: any) => void }) {
    return (
        <section className="bg-pharaohCard p-5 md:p-7 rounded-3xl border border-white/5 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-5">
                <div className="space-y-1">
                    <h4 className="font-black text-base md:text-lg text-white flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-pharaohGold/10 text-pharaohGold flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <span>طلبات المشاريع الواردة (Project Requests)</span>
                    </h4>
                </div>
                <span className="bg-amber-500/10 text-amber-400 text-xs font-black px-4 py-2 rounded-xl border border-amber-500/20">
                    إجمالي الطلبات الجديدة: {projects.length} طلبات
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map(project => (
                    <div key={project.id} className="project-request-card bg-[#0A192F] p-5 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[360px] transform hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-pharaohGold/5 group">
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h5 className="client-title text-sm font-black text-white group-hover:text-pharaohGold transition-colors">{project.name}</h5>
                                    <p className="text-[10px] text-gray-400 mt-0.5" dir="ltr">{project.date}</p>
                                </div>
                                <span className="project-type-badge bg-pharaohGold/10 text-pharaohGold text-[10px] font-bold px-2.5 py-1 rounded-lg border border-pharaohGold/20">{project.service}</span>
                            </div>
                            <div className="bg-pharaohCard/60 p-3 rounded-xl border border-white/5 space-y-2 text-xs">
                                <div className="flex justify-between items-center"><span className="text-gray-400">الميزانية المطروحة:</span><span className="project-budget font-black text-amber-500 font-mono">{project.budget}</span></div>
                                <div className="flex justify-between items-center"><span className="text-gray-400">المصدر:</span><span className="font-bold text-white">{project.source}</span></div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[11px] font-bold text-gray-400 block">تفاصيل الفكرة:</span>
                                <p className="project-desc-text text-xs text-gray-300 leading-relaxed line-clamp-3">{project.details}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-5">
                            <button onClick={() => onAccept(project)} className="project-accept-btn flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1 cursor-pointer">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>قبول للتنفيذ</span>
                            </button>
                            <button onClick={() => onReject(project)} className="project-reject-btn flex-1 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 font-bold py-2.5 rounded-xl text-xs transition-all border border-white/5 hover:border-red-500/30 cursor-pointer">
                                <span>رفض مؤقت</span>
                            </button>
                            {onDelete && (
                                <button onClick={() => onDelete(project)} className="project-delete-btn flex-none bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 font-bold px-3 py-2.5 rounded-xl text-xs transition-all border border-red-500/20 hover:border-red-500/40 cursor-pointer" title="حذف نهائي">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-400">لا توجد طلبات مشاريع جديدة حالياً.</div>
                )}
            </div>
        </section>
    );
}
