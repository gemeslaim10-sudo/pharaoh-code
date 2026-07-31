'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

interface Props {
    service: any;
}

export default function ServiceDetailOverview({ service }: Props) {
    const { language, direction } = useTranslation();

    const subtitle = getDynamicText(service, 'overviewSubtitle', language) || 'SERVICE OVERVIEW';
    const title = getDynamicText(service, 'overviewTitle', language) || (language === 'ar' ? `نظرة عامة على الخدمة` : `Service Overview`);
    const desc = getDynamicText(service, 'overviewDesc', language) || getDynamicText(service, 'description', language) || getDynamicText(service, 'desc', language) || (language === 'ar' ? 'نحن نضمن تقديم هذه الخدمة بأعلى درجات الاحترافية مع الالتزام التام بالجودة والمعايير العالمية.' : 'We guarantee delivering this service with highest professional standards.');

    const defaultFeatures = [
        {
            title: language === 'ar' ? 'تنفيذ عالي الدقة والاحترافية:' : 'High-Precision Execution:',
            desc: language === 'ar' ? 'نلتزم بأعلى معايير الجودة لتقديم نتائج تفوق التوقعات.' : 'We adhere to highest quality standards for optimal results.'
        },
        {
            title: language === 'ar' ? 'حلول مخصصة ومتكاملة:' : 'Customized Integrated Solutions:',
            desc: language === 'ar' ? 'نصمم وننفذ حلولاً تناسب متطلبات نشاطك وهدفك بدقة.' : 'Tailored solutions matching your business requirements.'
        },
        {
            title: language === 'ar' ? 'دعم ومتابعة مستمرة:' : 'Continuous Support & Follow-up:',
            desc: language === 'ar' ? 'فريق عمل متأهب لدعمك ومتابعة تنفيذ كافة التفاصيل أولاً بأول.' : 'Dedicated team for continuous support and execution tracking.'
        }
    ];

    const features = service?.features?.length > 0 ? service.features : defaultFeatures;

    return (
        <section id="overview" className="py-20 border-t border-white/5 bg-[#09162a]" dir={direction}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    <div className="lg:col-span-7">
                        <span className="text-[#C5A16F] font-bold tracking-widest text-xs uppercase block mb-2">{subtitle}</span>
                        <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">{title}</h3>
                        <p className="text-gray-400 text-sm md:text-base font-medium mb-6 leading-relaxed">
                            {desc}
                        </p>
                        <div className="space-y-4 text-gray-400 text-sm md:text-base font-medium">
                            {features.map((feat: any, idx: number) => {
                                const fTitle = getDynamicText(feat, 'title', language) || feat.title;
                                const fDesc = getDynamicText(feat, 'desc', language) || getDynamicText(feat, 'description', language) || feat.desc;
                                return (
                                    <div key={idx} className="flex items-start gap-3">
                                        <span className="text-[#C5A16F] font-bold mt-0.5">✔</span>
                                        <p><strong className="text-white font-bold">{fTitle} </strong>{fDesc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:col-span-5 p-8 bg-[#112240] rounded-2xl border border-white/5 shadow-2xl relative">
                        <h4 className="text-white font-bold text-lg mb-4">💎 {language === 'ar' ? 'القيمة المضافة والضمان' : 'Added Value & Guarantee'}</h4>
                        <p className="text-gray-400 text-xs md:text-sm font-medium mb-6 leading-relaxed">
                            {language === 'ar' ? 'الحصول على هذه الخدمة يشمل مزايا واعدة موجهة لضمان نجاح مشروعك:' : 'Ordering this service includes guaranteed advantages:'}
                        </p>
                        <div className="space-y-4 text-xs md:text-sm">
                            <div className="p-4 bg-[#0A192F] rounded-xl border border-[#C5A16F]/20">
                                <div className="text-[#C5A16F] font-bold mb-1 flex items-center gap-2">✨ {language === 'ar' ? 'تحليل وتخطيط متكامل' : 'Comprehensive Discovery & Strategy'}</div>
                                <div className="text-gray-400 leading-relaxed">{language === 'ar' ? 'جلسة تحليل تفصيلية لتحديد المتطلبات الدقيقة ورسم خطة التنفيذ المثالية.' : 'Detailed discovery session to specify requirements and timeline.'}</div>
                            </div>
                            <div className="p-4 bg-[#0A192F] rounded-xl border border-[#C5A16F]/20">
                                <div className="text-[#C5A16F] font-bold mb-1 flex items-center gap-2">🗺️ {language === 'ar' ? 'تسليم احترافي مع الدعم' : 'Professional Delivery & Support'}</div>
                                <div className="text-gray-400 leading-relaxed">{language === 'ar' ? 'تسليم كامل مخرجات الخدمة مع توفير المتابعة والدعم الفني المباشر.' : 'Complete handover of deliverables with dedicated support.'}</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
