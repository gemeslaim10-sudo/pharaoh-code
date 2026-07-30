'use client';

import UnifiedContactForm from '@/components/shared/UnifiedContactForm';

export default function MobileAppsForm() {
    return (
        <section id="project-form" className="py-20 max-w-3xl mx-auto px-6">
            <UnifiedContactForm 
                badgeText="🚀 نموذج حجز المشاريع المعتمدة"
                title="ابدأ مشروع تطبيقك الفاخر معنا الآن"
                subtitle="احصل فوراً وبشكل تلقائي بمجرد ملء الاستمارة على الاستشارة المجانية الشاملة + مستند الهيكل الفني للتطبيق (Technical SRS)."
                buttonText="🚀 إرسال طلب المشروع وحجز المقعد"
            />
        </section>
    );
}
