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
        <section id="active-projects-section" className="bg-pharaohCard p-5 md:p-7 rounded-3xl border border-white/5 shadow-2xl space-y-6 scroll-mt-6">
            <div className="border-b border-white/5 pb-5">
                <h4 className="font-black text-base md:text-lg text-white flex items-center gap-2.5">
                    <span className="text-xl">🚀</span> المشاريع الجارية قيد التنفيذ
                </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map(project => (
                    <div key={project.id} className="project-active-card bg-[#0A192F] p-5 rounded-2xl border border-emerald-500/30 flex flex-col justify-between min-h-[360px] shadow-lg">
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h5 className="active-client-title text-sm font-black text-white">{project.name}</h5>
                                    <p className="text-[10px] text-emerald-400 font-mono mt-0.5">🟢 حالة المشروع: جاري العمل</p>
                                </div>
                                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-500/25">{project.service}</span>
                            </div>
                            <div className="bg-pharaohCard/60 p-3 rounded-xl border border-white/5 space-y-2 text-xs">
                                <div className="flex justify-between items-center"><span className="text-gray-400">الميزانية المعتمدة:</span><span className="font-black text-emerald-400 font-mono">{project.budget}</span></div>
                                <div className="flex justify-between items-center"><span className="text-gray-400">الخطة الزمنية:</span><span className="font-bold text-white">غير محدد</span></div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[11px] font-bold text-gray-400 block">تفاصيل المواصفات المعتمدة:</span>
                                <p className="text-xs text-gray-300 leading-relaxed bg-pharaohCard/30 p-2.5 rounded-xl border border-white/5 line-clamp-3">{project.details}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-5">
                            <button onClick={() => handleWhatsApp(project.phone, project.name)} className="w-full flex-1 bg-green-600/10 hover:bg-green-600 text-green-400 hover:text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 border border-green-600/20">
                                💬 متابعة سير العمل عبر واتساب
                            </button>
                            {onDelete && (
                                <button onClick={() => onDelete(project)} className="project-delete-btn flex-none bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 font-bold px-3 py-2.5 rounded-xl text-xs transition-all border border-red-500/20 hover:border-red-500/40" title="حذف نهائي">
                                    🗑️
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-400">لا توجد مشاريع جارية حالياً.</div>
                )}
            </div>
        </section>
    );
}

