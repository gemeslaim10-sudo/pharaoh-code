'use client';

import UnifiedContactForm from '@/components/shared/UnifiedContactForm';

export default function WebDevForm() {
    return (
        <section id="project-form" className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
            <UnifiedContactForm 
                badgeText="🚀 نموذج حجز المشاريع المعتمدة"
                title="ابدأ مشروعك الفاخر معنا الآن"
                subtitle="احصل فوراً وبشكل تلقائي بمجرد ملء الاستمارة على الاستشارة المجانية الشاملة + خارطة الطريق الاستراتيجية (Project Roadmap) لموقع شركتك الجديد."
                buttonText="🚀 إرسال طلب المشروع وحجز المقعد"
            />
        </section>
    );
}
