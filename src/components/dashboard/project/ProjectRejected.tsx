export default function ProjectRejected({ projects }: { projects: any[] }) {
    return (
        <section className="bg-pharaohCard p-5 md:p-7 rounded-3xl border border-white/5 shadow-2xl space-y-6">
            <div className="border-b border-white/5 pb-5">
                <h4 className="font-black text-base md:text-lg text-red-400 flex items-center gap-2.5">
                    <span className="text-xl">🗑️</span> أرشيف الطلبات المرفوضة وأسباب الحذف
                </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map(project => (
                    <div key={project.id} className="bg-red-500/5 p-5 rounded-2xl border border-red-500/20 flex flex-col justify-between min-h-[200px] opacity-75 grayscale hover:grayscale-0 transition-all">
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h5 className="text-sm font-black text-white line-through decoration-red-500">{project.name}</h5>
                                    <p className="text-[10px] text-red-400 mt-0.5">مرفوض ومؤرشف</p>
                                </div>
                                <span className="bg-red-500/10 text-red-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-red-500/20">{project.service}</span>
                            </div>
                            <div className="bg-red-500/10 p-3 rounded-xl border border-red-500/20 space-y-1">
                                <span className="text-[10px] font-bold text-red-300 block">سبب الرفض المسجل:</span>
                                <p className="text-xs text-white leading-relaxed">{project.rejectReason || 'لم يتم تحديد سبب'}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-500">لا توجد طلبات مرفوضة في الأرشيف.</div>
                )}
            </div>
        </section>
    );
}

