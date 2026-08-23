export default function ProjectRejected({ projects }: { projects: any[] }) {
    return (
        <section className="bg-white dark:bg-[#112240] p-5 md:p-7 rounded-3xl border border-slate-200 dark:border-white/5 shadow-md dark:shadow-2xl space-y-6">
            <div className="border-b border-slate-200 dark:border-white/5 pb-5">
                <h4 className="font-black text-base md:text-lg text-red-600 dark:text-red-400 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                    <span>أرشيف الطلبات المرفوضة وأسباب الحذف</span>
                </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map(project => (
                    <div key={project.id} className="bg-red-500/5 p-5 rounded-2xl border border-red-500/20 flex flex-col justify-between min-h-[200px] opacity-75 grayscale hover:grayscale-0 transition-all">
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h5 className="text-sm font-black text-slate-900 dark:text-white line-through decoration-red-500">{project.name}</h5>
                                    <p className="text-[10px] text-red-600 dark:text-red-400 mt-0.5 font-bold">مرفوض ومؤرشف</p>
                                </div>
                                <span className="bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-red-500/20 inline-flex items-center justify-center leading-none">{project.service}</span>
                            </div>
                            <div className="bg-red-500/10 p-3 rounded-xl border border-red-500/20 space-y-1">
                                <span className="text-[10px] font-bold text-red-700 dark:text-red-300 block">سبب الرفض المسجل:</span>
                                <p className="text-xs text-slate-800 dark:text-white leading-relaxed">{project.rejectReason || 'لم يتم تحديد سبب'}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <div className="col-span-full text-center py-10 text-slate-500 dark:text-gray-500">لا توجد طلبات مرفوضة في الأرشيف.</div>
                )}
            </div>
        </section>
    );
}

