'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { motion } from 'framer-motion';

interface Props {
    service: any;
}

export default function ServiceDetailRoadmap({ service }: Props) {
    const { language, direction } = useTranslation();

    const title = getDynamicText(service, 'roadmapTitle', language) || (language === 'ar' ? 'مراحل وخطوات تنفيذ الخدمة' : 'Service Execution Roadmap');
    const desc = getDynamicText(service, 'roadmapDesc', language) || (language === 'ar' ? 'خطوات منهجية واضحة ومدروسة تضمن تسليم الخدمة بأعلى درجات الدقة والاحترافية.' : 'Clear methodological steps ensuring your service is delivered with highest accuracy.');

    const defaultSteps = [
        {
            number: '01',
            title: language === 'ar' ? 'التحليل والتخطيط' : 'Analysis & Planning',
            desc: language === 'ar' ? 'دراسة المتطلبات بالتفصيل، وتحديد خطة العمل والجدول الزمني لتنفيذ الخدمة.' : 'Detailed requirement study, setting execution plan and timeline.'
        },
        {
            number: '02',
            title: language === 'ar' ? 'التنفيذ والإعداد' : 'Execution & Preparation',
            desc: language === 'ar' ? 'البدء الفعلي في تنفيذ مخرجات الخدمة وفقاً لأرقى المعايير والمواصفات.' : 'Core execution of service deliverables adhering to high standards.'
        },
        {
            number: '03',
            title: language === 'ar' ? 'المراجعة واختبار الجودة' : 'Review & Quality Audit',
            desc: language === 'ar' ? 'إجراء مراجعات واختبارات دقيقة للتأكد من خلو الخدمة من أية ملاحظات.' : 'Rigorous testing and review to guarantee top quality deliverables.'
        },
        {
            number: '04',
            title: language === 'ar' ? 'التسليم والدعم الفني' : 'Handover & Support',
            desc: language === 'ar' ? 'تسليم كامل المخرجات والملفات النهائية مع توفير المتابعة والدعم اللازم.' : 'Final delivery with ongoing support and follow-up.'
        }
    ];

    const steps = service?.roadmapSteps?.length > 0 ? service.roadmapSteps : defaultSteps;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25, scale: 0.96 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.45,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <section id="roadmap" className="py-20 bg-[#09162a] border-t border-white/5" dir={direction}>
            <div className="max-w-7xl mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter">{title}</h3>
                    <p className="text-gray-400 text-sm md:text-base font-medium max-w-xl mx-auto">{desc}</p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {steps.map((step: any, idx: number) => {
                        const sNum = step.number || `0${idx + 1}`;
                        const sTitle = getDynamicText(step, 'title', language) || step.title;
                        const sDesc = getDynamicText(step, 'desc', language) || getDynamicText(step, 'description', language) || step.desc;

                        return (
                            <motion.div 
                                key={idx} 
                                variants={itemVariants}
                                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                                className="bg-[#112240] p-6 rounded-2xl border border-white/5 relative group hover:border-[#C5A16F]/40 transition-colors duration-300 shadow-lg"
                            >
                                <div className="text-4xl font-black text-[#C5A16F]/20 group-hover:text-[#C5A16F] transition-colors mb-4">{sNum}</div>
                                <h4 className="text-white font-bold text-lg mb-2">{sTitle}</h4>
                                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{sDesc}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
