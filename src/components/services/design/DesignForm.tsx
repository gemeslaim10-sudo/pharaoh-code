'use client';

import UnifiedContactForm from '@/components/shared/UnifiedContactForm';

export default function DesignForm() {
    return (
        <section id="project-form" className="py-20 max-w-3xl mx-auto px-6">
            <UnifiedContactForm 
                badgeText="🚀 نموذج حجز المشاريع المعتمدة"
                title="ابدأ مشروع تصميم هويتك الفاخرة معنا الآن"
                subtitle="احصل فوراً وبشكل تلقائي بمجرد ملء الاستمارة على ورشة التحليل والاستشارة المجانية الشاملة + تسليم الملفات المصدرية المفتوحة بالكامل."
                buttonText="🚀 إرسال طلب المشروع وحجز المقعد"
            />
        </section>
    );
}
