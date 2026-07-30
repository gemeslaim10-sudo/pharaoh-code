'use client';

import { useEffect, useState } from 'react';
import { getReviews, approveReview, deleteReview } from '@/app/actions/dashboard';
import { auth } from '@/lib/firebase/config';
import ReviewCard from './ReviewCard';

interface Review {
    id: string;
    name: string;
    phone: string;
    initials: string;
    text: string;
    status: string;
    date: string;
}

export default function DashboardReviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const token = await user.getIdToken();
                    const data = await getReviews(token);
                    setReviews(data as Review[]);
                } catch (error) {
                    console.error("Failed to fetch reviews:", error);
                }
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleApprove = async (reviewId: string) => {
        try {
            const user = auth.currentUser;
            if (!user) return;
            const token = await user.getIdToken();
            await approveReview(token, reviewId);
            setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'approved' } : r));
            window.alert('تم نشر التعليق بنجاح على الموقع!');
        } catch (error) {
            console.error("Failed to approve review:", error);
            window.alert('حدث خطأ أثناء الموافقة على التعليق.');
        }
    };

    const handleDelete = async (reviewId: string) => {
        if (!window.confirm('هل أنت متأكد من رغبتك في حذف هذا التعليق؟')) return;

        try {
            const user = auth.currentUser;
            if (!user) return;
            const token = await user.getIdToken();
            await deleteReview(token, reviewId);
            setReviews(prev => prev.filter(r => r.id !== reviewId));
            window.alert('تم حذف التعليق بنجاح وإزالته من لوحة التحكم!');
        } catch (error) {
            console.error("Failed to delete review:", error);
            window.alert('حدث خطأ أثناء حذف التعليق.');
        }
    };

    const handleWhatsApp = (name: string, phone: string, text: string) => {
        let numericPhone = (phone || '').replace(/\D/g, '');
        
        if (numericPhone.startsWith('00')) {
            numericPhone = numericPhone.substring(2);
        } else if (numericPhone.startsWith('01') && numericPhone.length === 11) {
            numericPhone = '2' + numericPhone;
        } else if (numericPhone.length === 10 && ['10', '11', '12', '15'].includes(numericPhone.substring(0, 2))) {
            numericPhone = '20' + numericPhone;
        }

        const messageText = `مرحباً أ/ ${name}، معك فريق عمل Pharaoh Code. لقد تلقينا تعليقك واستفسارك الكريم: "${text}".. يسعدنا جداً التواصل معك لمناقشة كافة التفاصيل الفنية وتلبية طلبك بأعلى جودة.`;
        const encodedMessage = encodeURIComponent(messageText);
        window.open(`https://api.whatsapp.com/send?phone=${numericPhone}&text=${encodedMessage}`, '_blank');
    };

    const pendingCount = reviews.filter(r => r.status === 'pending').length;
    const approvedCount = reviews.filter(r => r.status === 'approved').length;

    return (
        <section className="py-16 bg-[#0A192F] border-t border-white/5 relative overflow-hidden mt-6" dir="rtl">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b border-white/5 pb-6">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-white">لوحة تحكم تعليقات العملاء</h3>
                        <p className="text-gray-400 text-sm mt-1">تواصل مباشر مع أصحاب التعليقات عبر واتساب، واقبل أو احذف الآراء بنقرة واحدة.</p>
                    </div>
                    <div className="flex gap-3 text-xs font-bold select-none">
                        <span id="pending-counter" className="bg-orange-500/10 text-orange-400 px-4 py-2 rounded-xl border border-orange-500/20 transition-all">
                            بإنتظار المراجعة ({pendingCount})
                        </span>
                        <span id="approved-counter" className="bg-green-500/10 text-green-400 px-4 py-2 rounded-xl border border-green-500/20 transition-all">
                            تم نشرها ({approvedCount})
                        </span>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-10 text-pharaohGold font-bold">جاري تحميل التعليقات...</div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">لا توجد تعليقات حتى الآن.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="admin-reviews-container">
                        {reviews.map(review => (
                            <ReviewCard 
                                key={review.id}
                                review={review}
                                onWhatsApp={handleWhatsApp}
                                onApprove={handleApprove}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
