'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { getDynamicText } from '@/lib/i18nHelper';

interface Props {
    service: any;
}

export default function ServiceDetailOverview({ service }: Props) {
    const { language, direction } = useTranslation();
    const { theme } = useTheme();
    const isLight = theme === 'light';

    const subtitle = getDynamicText(service, 'overviewSubtitle', language) || 'SERVICE OVERVIEW';
    const title = getDynamicText(service, 'overviewTitle', language) || (language === 'ar' ? 'نظرة عامة على الخدمة' : 'Service Overview');
    const desc = getDynamicText(service, 'overviewDesc', language) || getDynamicText(service, 'description', language) || getDynamicText(service, 'desc', language) || (language === 'ar' ? 'نحن نضمن تقديم هذه الخدمة بأعلى درجات الاحترافية مع الالتزام التام بالجودة والمعايير العالمية.' : 'We guarantee delivering this service with highest professional standards.');

    const defaultFeatures = [
        {
            title_ar: 'تنفيذ عالي الدقة والاحترافية:',
            title_en: 'High-Precision Execution:',
            desc_ar: 'نلتزم بأعلى معايير الجودة لتقديم نتائج تفوق التوقعات.',
            desc_en: 'We adhere to highest quality standards for optimal results.'
        },
        {
            title_ar: 'حلول مخصصة ومتكاملة:',
            title_en: 'Customized Integrated Solutions:',
            desc_ar: 'نصمم وننفذ حلولاً تناسب متطلبات نشاطك وهدفك بدقة.',
            desc_en: 'Tailored solutions matching your business requirements.'
        },
        {
            title_ar: 'دعم ومتابعة مستمرة:',
            title_en: 'Continuous Support & Follow-up:',
            desc_ar: 'فريق عمل متأهب لدعمك ومتابعة تنفيذ كافة التفاصيل أولاً بأول.',
            desc_en: 'Dedicated team for continuous support and execution tracking.'
        }
    ];

    const defaultGuarantees = [
        {
            icon: '✨',
            title_ar: 'تحليل وتخطيط متكامل',
            title_en: 'Comprehensive Discovery & Strategy',
            desc_ar: 'جلسة تحليل تفصيلية لتحديد المتطلبات الدقيقة ورسم خطة التنفيذ المثالية.',
            desc_en: 'Detailed discovery session to specify requirements and timeline.'
        },
        {
            icon: '🗺️',
            title_ar: 'تسليم احترافي مع الدعم',
            title_en: 'Professional Delivery & Support',
            desc_ar: 'تسليم كامل مخرجات الخدمة مع توفير المتابعة والدعم الفني المباشر.',
            desc_en: 'Complete handover of deliverables with dedicated support.'
        }
    ];

    const features = (Array.isArray(service?.features) && service.features.length > 0) ? service.features : defaultFeatures;
    const guarantees = (Array.isArray(service?.guarantees) && service.guarantees.length > 0) ? service.guarantees : defaultGuarantees;

    const rawAddedValueTitle = getDynamicText(service, 'addedValueTitle', language);
    const addedValueTitle = rawAddedValueTitle 
        ? rawAddedValueTitle 
        : (language === 'ar' ? 'القيمة المضافة والضمان' : 'Added Value & Guarantee');

    const addedValueSubtitle = getDynamicText(service, 'addedValueSubtitle', language) || 
        (language === 'ar' ? 'الحصول على هذه الخدمة يشمل مزايا واعدة موجهة لضمان نجاح مشروعك:' : 'Ordering this service includes guaranteed advantages:');

    return (
        <section 
            id="overview" 
            className={`py-20 border-t transition-colors duration-300 ${
                isLight ? 'bg-[#f8fafc] border-slate-200 text-slate-900' : 'bg-[#09162a] border-white/5 text-white'
            }`} 
            dir={direction}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Left/Main Column: Overview & All Features */}
                    <div className="lg:col-span-7 space-y-6">
                        <div>
                            <span className="text-[#C5A16F] font-bold tracking-widest text-xs uppercase block mb-2">{subtitle}</span>
                            <h3 className={`text-3xl md:text-5xl font-black mb-6 tracking-tighter ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                {title}
                            </h3>
                            <p className={`text-sm md:text-base font-medium leading-relaxed ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                                {desc}
                            </p>
                        </div>

                        <div className="space-y-4 pt-2">
                            {features.map((feat: any, idx: number) => {
                                const fTitle = getDynamicText(feat, 'title', language) || feat.title || '';
                                const fDesc = getDynamicText(feat, 'desc', language) || getDynamicText(feat, 'description', language) || feat.desc || '';
                                return (
                                    <div 
                                        key={idx} 
                                        className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all duration-200 ${
                                            isLight 
                                                ? 'bg-white/80 border-slate-200 shadow-xs hover:border-[#C5A16F]/40' 
                                                : 'bg-white/[0.02] border-white/5 hover:border-[#C5A16F]/30 hover:bg-white/[0.04]'
                                        }`}
                                    >
                                        <span className="text-[#C5A16F] font-black text-base mt-0.5 shrink-0">✔</span>
                                        <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
                                            {fTitle && <strong className={`font-bold mr-1.5 ml-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{fTitle}</strong>}
                                            {fDesc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Dynamic Added Value & Guarantee CMS Card */}
                    <div className={`lg:col-span-5 p-7 md:p-8 rounded-3xl border shadow-2xl relative transition-all duration-300 ${
                        isLight 
                            ? 'bg-white border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)]' 
                            : 'bg-[#112240] border-white/10 shadow-2xl'
                    }`}>
                        <div className="flex items-center gap-2.5 mb-3">
                            <span className="text-xl">💎</span>
                            <h4 className={`font-black text-lg md:text-xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                {addedValueTitle}
                            </h4>
                        </div>

                        <p className={`text-xs md:text-sm font-medium mb-6 leading-relaxed ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                            {addedValueSubtitle}
                        </p>

                        <div className="space-y-4 text-xs md:text-sm">
                            {guarantees.map((item: any, idx: number) => {
                                const itemIcon = item.icon || '✨';
                                const itemTitle = getDynamicText(item, 'title', language) || item.title || '';
                                const itemDesc = getDynamicText(item, 'desc', language) || getDynamicText(item, 'description', language) || item.desc || '';

                                return (
                                    <div 
                                        key={idx} 
                                        className={`p-4 rounded-2xl border transition-all duration-300 ${
                                            isLight 
                                                ? 'bg-slate-50 border-slate-200/90 hover:border-[#C5A16F]/50 shadow-xs' 
                                                : 'bg-[#0A192F] border-[#C5A16F]/20 hover:border-[#C5A16F]/40 shadow-inner'
                                        }`}
                                    >
                                        <div className="text-[#C5A16F] font-black mb-1.5 flex items-center gap-2 text-xs md:text-sm">
                                            <span className="text-base shrink-0">{itemIcon}</span>
                                            <span>{itemTitle}</span>
                                        </div>
                                        <div className={`leading-relaxed text-xs md:text-xs ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
                                            {itemDesc}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
