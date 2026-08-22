export default function ProjectActive({ projects, onDelete }: { projects: any[], onDelete?: (p: any) => void }) {
    const handleWhatsApp = (phone: string, name: string) => {
        let numericPhone = (phone || '').replace(/\D/g, '');
        
        if (numericPhone.startsWith('00')) {
            numericPhone = numericPhone.substring(2);
        } else if (numericPhone.startsWith('01') && numericPhone.length === 11) {
            numericPhone = '2' + numericPhone;
        } else if (numericPhone.length === 10 && ['10', '11', '12', '15'].includes(numericPhone.substring(0, 2))) {
            numericPhone = '20' + numericPhone;
        }

        const message = encodeURIComponent(`أهلاً بك أ/ ${name}، نتواصل معك من فريق صرح فرعون بخصوص مشروعك.`);
        window.open(`https://wa.me/${numericPhone}?text=${message}`, '_blank');
    };

    return (
        <section id="active-projects-section" className="bg-white dark:bg-[#112240] p-5 md:p-7 rounded-3xl border border-slate-200 dark:border-white/5 shadow-md dark:shadow-2xl space-y-6 scroll-mt-6">
            <div className="border-b border-slate-200 dark:border-white/5 pb-5">
                <h4 className="font-black text-base md:text-lg text-slate-900 dark:text-white flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span>المشاريع الجارية قيد التنفيذ</span>
                </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map(project => (
                    <div key={project.id} className="project-active-card bg-slate-50 dark:bg-[#0A192F] p-5 rounded-2xl border border-emerald-500/30 flex flex-col justify-between min-h-[360px] shadow-sm">
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h5 className="active-client-title text-sm font-black text-slate-900 dark:text-white">{project.name}</h5>
                                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 flex items-center gap-1 font-bold">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span>حالة المشروع: جاري العمل</span>
                                    </p>
                                </div>
                                <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-500/25">{project.service}</span>
                            </div>
                            <div className="bg-white dark:bg-[#112240]/60 p-3 rounded-xl border border-slate-200 dark:border-white/5 space-y-2 text-xs">
                                <div className="flex justify-between items-center"><span className="text-slate-500 dark:text-gray-400">الميزانية المعتمدة:</span><span className="font-black text-emerald-700 dark:text-emerald-400 font-mono">{project.budget}</span></div>
                                <div className="flex justify-between items-center"><span className="text-slate-500 dark:text-gray-400">الخطة الزمنية:</span><span className="font-bold text-slate-900 dark:text-white">غير محدد</span></div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[11px] font-bold text-slate-700 dark:text-gray-400 block">تفاصيل المواصفات المعتمدة:</span>
                                <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed bg-white/70 dark:bg-black/20 p-2.5 rounded-xl border border-slate-200 dark:border-white/5 line-clamp-3">{project.details}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-5">
                            <button onClick={() => handleWhatsApp(project.phone, project.name)} className="w-full flex-1 bg-green-600/10 hover:bg-green-600 text-green-700 dark:text-green-400 hover:text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 border border-green-600/20 cursor-pointer">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.836.815 2.796.815 3.183 0 5.768-2.586 5.769-5.766.001-3.182-2.585-5.769-5.769-5.769zm3.435 8.167c-.145.409-.844.757-1.181.808-.337.051-.772.072-2.453-.585-2.022-.79-3.328-2.85-3.429-2.986-.1-.137-.819-1.089-.819-2.077 0-.987.519-1.474.703-1.677.185-.203.404-.254.538-.254.135 0 .27.001.387.007.124.006.29-.047.452.342.166.399.569 1.388.619 1.489.05.102.083.221.016.356-.067.135-.1.22-.2.338-.1.119-.21.265-.3.356-.1.102-.205.213-.088.414.117.202.52 8.57 1.272 1.529.967.863 1.782 1.131 2.036 1.258.254.127.404.11.554-.067.15-.178.643-.746.813-1.002.17-.254.34-.213.573-.127.234.085 1.482.699 1.736.826.254.127.424.19.487.297.063.107.063.621-.082 1.03z"/>
                                </svg>
                                <span>متابعة سير العمل عبر واتساب</span>
                            </button>
                            {onDelete && (
                                <button onClick={() => onDelete(project)} className="project-delete-btn flex-none bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-bold px-3 py-2.5 rounded-xl text-xs transition-all border border-red-500/20 hover:border-red-500/40 cursor-pointer" title="حذف نهائي">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <div className="col-span-full text-center py-10 text-slate-500 dark:text-gray-400">لا توجد مشاريع جارية حالياً.</div>
                )}
            </div>
        </section>
    );
}

