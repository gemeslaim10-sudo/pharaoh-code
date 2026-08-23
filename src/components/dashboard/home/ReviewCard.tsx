
interface Review {
    id: string;
    name: string;
    phone?: string;
    initials: string;
    text: string;
    status: string;
    date: string;
}

interface ReviewCardProps {
    review: Review;
    onWhatsApp: (name: string, phone: string, text: string) => void;
    onApprove: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function ReviewCard({ review, onWhatsApp, onApprove, onDelete }: ReviewCardProps) {
    return (
        <div className={`review-card relative bg-white dark:bg-[#112240] p-6 rounded-[2rem] border shadow-sm dark:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[280px] ${review.status === 'pending' ? 'border-orange-500/30' : 'border-green-500/30'}`}>
            <div>
                {review.status === 'pending' ? (
                    <span className="status-badge absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-10 inline-flex items-center justify-center leading-none">بإنتظار المراجعة</span>
                ) : (
                    <span className="status-badge absolute top-4 left-4 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-10 inline-flex items-center justify-center leading-none">منشور على الموقع</span>
                )}
                <div className="flex items-center gap-3 mb-4 mt-2 pl-[90px] relative z-0">
                    <div className="w-11 h-11 bg-amber-500/10 dark:bg-pharaohGold/10 rounded-xl flex items-center justify-center font-bold text-amber-800 dark:text-pharaohGold border border-amber-500/20 dark:border-pharaohGold/20 text-base shrink-0">
                        {review.initials || "ع"}
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-slate-900 dark:text-white font-bold text-sm md:text-base truncate client-name">{review.name}</h4>
                        {review.phone && (
                            <p className="text-slate-500 dark:text-gray-500 text-[11px] font-mono mt-0.5" dir="ltr" style={{textAlign: 'right'}}>{review.phone.replace('+', '')}+</p>
                        )}
                    </div>
                </div>
                <p className="review-text text-slate-700 dark:text-gray-300 text-xs md:text-sm leading-relaxed mb-6">
                    {review.text}
                </p>
            </div>
            <div className="space-y-2.5">
                {review.phone && (
                    <button
                        onClick={() => onWhatsApp(review.name, review.phone!, review.text)}
                        className="whatsapp-connect-btn w-full bg-green-600/10 hover:bg-green-600 text-green-700 dark:text-green-400 hover:text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 border border-green-600/20 shadow-xs cursor-pointer"
                    >
                        💬 تواصل مع العميل عبر واتساب
                    </button>
                )}
                <div className="flex gap-2">
                    {review.status === 'pending' && (
                        <button
                            onClick={() => onApprove(review.id)}
                            className="approve-btn flex-1 text-xs bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl transition-all font-bold shadow-md shadow-emerald-900/20 cursor-pointer"
                        >
                            موافقة ونشر
                        </button>
                    )}
                    <button
                        onClick={() => onDelete(review.id)}
                        className="delete-btn flex-1 text-xs bg-red-600/10 hover:bg-red-600 text-red-600 dark:text-red-400 hover:text-white py-2.5 rounded-xl transition-all font-bold border border-red-600/20 cursor-pointer"
                    >
                        حذف التعليق
                    </button>
                </div>
            </div>
        </div>
    );
}
