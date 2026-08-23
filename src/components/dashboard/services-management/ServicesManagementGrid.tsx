'use client';

interface Props {
  services: any[];
  onEdit: (service: any) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

export default function ServicesManagementGrid({ services, onEdit, onDelete, loading }: Props) {
  return (
    <div className="pt-2">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-6 bg-pharaohGold rounded-full" />
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            سجلات الخدمات وباقات التسعير المنشورة
          </h4>
        </div>
        <span className="text-xs font-mono font-bold text-slate-500 dark:text-gray-400">
          إجمالي {services.length} خدمة
        </span>
      </div>

      {loading ? (
        <div className="text-center py-16 text-slate-500 dark:text-gray-400 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-3 border-pharaohGold border-t-transparent rounded-full animate-spin" />
          <span>جاري تحميل الخدمات من قاعدة البيانات...</span>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-16 text-slate-600 dark:text-gray-400 bg-slate-100 dark:bg-[#112240] rounded-3xl border border-slate-200 dark:border-white/5">
          <p className="font-bold text-base mb-1">لا توجد خدمات مضافة حالياً.</p>
          <p className="text-xs text-slate-500 dark:text-gray-500">يمكنك استخدام الفورم أعلاه لإضافة أول خدمة برمجية مع باقاتها.</p>
        </div>
      ) : (
        <div id="services-grid-display" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-[#112240] border border-slate-200 dark:border-white/5 rounded-3xl p-5 sm:p-6 shadow-sm dark:shadow-xl relative flex flex-col justify-between hover:border-pharaohGold/40 dark:hover:border-pharaohGold/30 transition-all duration-300 group"
            >
              <div>
                {/* Service Image / Icon Header */}
                {service.image ? (
                  <div className="relative w-full h-44 rounded-2xl mb-4 overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-black/20">
                    <img
                      src={service.image}
                      alt={service.title || 'خدمة'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : service.icon ? (
                  <div className="w-14 h-14 bg-amber-500/10 dark:bg-pharaohGold/10 rounded-2xl flex items-center justify-center mb-4 text-amber-800 dark:text-pharaohGold border border-amber-500/20 dark:border-pharaohGold/20">
                    <div dangerouslySetInnerHTML={{ __html: service.icon }} className="w-7 h-7 flex items-center justify-center" />
                  </div>
                ) : (
                  <div className="w-14 h-14 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-4 text-2xl border border-slate-200 dark:border-white/10">
                    ⚡
                  </div>
                )}

                {/* Badges Row */}
                <div className="flex gap-1.5 flex-wrap mb-3">
                  {service.type && (
                    <span className="text-[10px] bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full font-bold inline-flex items-center justify-center leading-none">
                      {service.type}
                    </span>
                  )}
                  {service.badge && (
                    <span className="text-[10px] bg-amber-500/10 text-amber-800 dark:text-pharaohGold border border-amber-500/20 dark:border-pharaohGold/30 px-2.5 py-1 rounded-full font-bold inline-flex items-center justify-center leading-none">
                      {service.badge}
                    </span>
                  )}
                  {service.price && (
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold inline-flex items-center justify-center leading-none">
                      {service.price}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h4 className="text-slate-900 dark:text-white font-black text-base sm:text-lg mb-2 line-clamp-1">
                  {service.title || service.title_ar}
                </h4>
                {service.title_en && (
                  <p className="text-[11px] font-mono text-slate-500 dark:text-gray-400 mb-2 truncate" dir="ltr">
                    {service.title_en}
                  </p>
                )}
                <p className="text-slate-600 dark:text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">
                  {service.desc || service.desc_ar || 'لا يوجد وصف مختصر'}
                </p>

                {/* Packages / Features Indicator */}
                <div className="flex items-center gap-2 mb-4 text-[11px] text-slate-500 dark:text-gray-400 bg-slate-100/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 px-3 py-1.5 rounded-xl">
                  <span className="text-amber-800 dark:text-pharaohGold font-bold">📦 الباقات:</span>
                  <span>{Array.isArray(service.packages) ? service.packages.length : 3} باقات تسعير</span>
                </div>
              </div>

              {/* Action Buttons Footer (Prominent & Clear) */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(service)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-500/10 dark:bg-pharaohGold/15 hover:bg-pharaohGold text-amber-900 dark:text-pharaohGold hover:text-[#0A192F] font-bold text-xs border border-amber-500/30 dark:border-pharaohGold/30 transition-all duration-200 cursor-pointer shadow-xs"
                  title="تعديل كافة بيانات وباقات الخدمة"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>تعديل الخدمة</span>
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(service.id)}
                  className="py-2.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-600 dark:text-red-400 hover:text-white font-bold text-xs border border-red-500/20 transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                  title="حذف الخدمة نهائياً"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="hidden sm:inline">حذف</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
