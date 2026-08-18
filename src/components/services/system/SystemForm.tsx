'use client';

import UnifiedContactForm from '@/components/shared/UnifiedContactForm';

export default function SystemForm() {
    return (
        <section id="project-form" className="py-14 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
            <UnifiedContactForm 
                badgeText="🚀 نموذج حجز الأنظمة المعتمدة"
                title="ابدأ مشروع نظامك الفاخر معنا الآن"
                subtitle="احصل فوراً وبشكل تلقائي بمجرد ملء الاستمارة على جلسة الاستشارة الهندسية المجانية + مستند مخطط هيكل وتدفق النظام البرمجي (System SRS)."
                buttonText="🚀 إرسال طلب النظام وحجز مقعد الأتمتة"
            />
        </section>
    );
}
