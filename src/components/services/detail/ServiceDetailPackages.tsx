'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { motion } from 'framer-motion';

interface Props {
    service: any;
}

export default function ServiceDetailPackages({ service }: Props) {
    const { language, direction } = useTranslation();

    const title = getDynamicText(service, 'packagesTitle', language) || (language === 'ar' ? 'باقات ومستويات الخدمة' : 'Service Investment Packages');
    const desc = getDynamicText(service, 'packagesDesc', language) || (language === 'ar' ? 'اختر الباقة المناسبة لنطاق وحجم العمل المطلوب.' : 'Select the package matching your project scope.');

    const servicePrice = service?.price ? `${service.price}` : (language === 'ar' ? 'حسب نطاق العمل' : 'Custom Quote');

    const defaultPackages = [
        {
            badge: language === 'ar' ? 'المستوى الأول' : 'Level 1',
            title: language === 'ar' ? 'الباقة الأساسية' : 'Starter Package',
            price: servicePrice,
            period: language === 'ar' ? '/ نطاق محدد' : '/ Standard Scope',
            desc: language === 'ar' ? 'تغطي المتطلبات الأساسية للخدمة بجودة عالية وسرعة إنجاز.' : 'Covers fundamental requirements with high quality and speed.',
            features: [
                language === 'ar' ? 'تنفيذ كامل مخرجات الخدمة الأساسية' : 'Complete execution of core deliverables',
                language === 'ar' ? 'تصميم وتنفيذ احترافي مطابق للهوية' : 'Professional implementation aligned with brand',
                language === 'ar' ? 'مراجعة وتعديل حتى نيل الرضا الكامل' : 'Revisions until full satisfaction',
                language === 'ar' ? 'دعم وتسليم منظم للملفات والمخرجات' : 'Organized file handover and support'
            ],
            isPopular: false
        },
        {
            badge: language === 'ar' ? 'المستوى الثاني (الأكثر طلباً)' : 'Level 2 (Most Popular)',
            title: language === 'ar' ? 'الباقة المتقدمة الشاملة' : 'Advanced Comprehensive Package',
            price: servicePrice,
            period: language === 'ar' ? '/ نطاق متكامل' : '/ Comprehensive Scope',
            desc: language === 'ar' ? 'الحل الشامل والاحترافي للتنفيذ المتقدم لكافة المزايا ومتطلبات الخدمة.' : 'Comprehensive solution covering advanced features and requirements.',
            features: [
                language === 'ar' ? 'يشمل جميع ميزات الباقة الأساسية +' : 'Includes all Starter features +',
                language === 'ar' ? 'إضافات ومزايا متقدمة مخصصة' : 'Advanced custom enhancements',
                language === 'ar' ? 'أولوية في التنفيذ والدعم والمتابعة' : 'Priority execution and support',
                language === 'ar' ? 'ضمان ومتابعة ممتدة بعد التسليم' : 'Extended warranty and follow-up'
            ],
            isPopular: true
        },
        {
            badge: language === 'ar' ? 'المستوى الثالث' : 'Level 3 Enterprise',
            title: language === 'ar' ? 'الباقة الخاصة للمؤسسات' : 'Enterprise Custom Package',
            price: language === 'ar' ? 'حسب الاتفاق' : 'Custom Quote',
            period: language === 'ar' ? '/ مواصفات خاصة' : '/ Custom Specifications',
            desc: language === 'ar' ? 'تنفيذ حصري بمواصفات وشروط خاصة ومساحة عمل مخصصة بالكامل.' : 'Dedicated execution with exclusive custom specifications.',
            features: [
                language === 'ar' ? 'حلول خاصة غير محدودة +' : 'Unlimited custom solutions +',
                language === 'ar' ? 'فريق عمل مخصص بالكامل لمشروعك' : 'Dedicated team for your project',
                language === 'ar' ? 'دعم فني استثنائي على مدار الساعة' : 'Dedicated 24/7 technical support'
            ],
            isPopular: false
        }
    ];

    const packages = service?.packages?.length > 0 ? service.packages : defaultPackages;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <section id="packages" className="py-20 relative bg-[#0A192F]" dir={direction}>
            <div className="max-w-7xl mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h3 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter">{title}</h3>
                    <p className="text-gray-400 text-sm md:text-base font-medium max-w-xl mx-auto">{desc}</p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-3 gap-8 items-stretch"
                >
                    {packages.map((pkg: any, idx: number) => {
                        const pBadge = getDynamicText(pkg, 'badge', language) || pkg.badge;
                        const pTitle = getDynamicText(pkg, 'title', language) || pkg.title;
                        const pPrice = getDynamicText(pkg, 'price', language) || pkg.price;
                        const pPeriod = getDynamicText(pkg, 'period', language) || pkg.period;
                        const pDesc = getDynamicText(pkg, 'desc', language) || getDynamicText(pkg, 'description', language) || pkg.desc;

                        return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                                className={`bg-[#112240] rounded-2xl p-8 flex flex-col justify-between relative transition-colors duration-300 ${
                                    pkg.isPopular ? 'border-2 border-[#C5A16F] shadow-2xl scale-105' : 'border border-white/5 hover:border-[#C5A16F]/30'
                                }`}
                            >
                                {pkg.isPopular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C5A16F] text-[#0A192F] font-bold text-[10px] tracking-widest px-4 py-1 rounded-full uppercase shadow-md">
                                        {language === 'ar' ? 'الأكثر طلباً ومبيعاً' : 'MOST POPULAR'}
                                    </div>
                                )}
                                <div>
                                    <div className="text-gray-400 font-bold text-xs uppercase mb-1">{pBadge}</div>
                                    <h4 className="text-white font-bold text-xl mb-2">{pTitle}</h4>

                                    <div className="my-4">
                                        <span className="text-[#C5A16F] font-black text-3xl tracking-tight">{pPrice}</span>
                                        <span className="text-gray-400 font-medium text-xs"> {pPeriod}</span>
                                    </div>

                                    <p className="text-gray-400 text-xs md:text-sm font-medium mb-6 leading-relaxed">{pDesc}</p>
                                    <div className="h-px bg-white/5 mb-6"></div>
                                    <ul className="space-y-3 text-gray-300 text-xs md:text-sm font-medium">
                                        {Array.isArray(pkg.features) && pkg.features.map((f: any, fIdx: number) => {
                                            const fText = typeof f === 'string' ? f : (getDynamicText(f, 'title', language) || f.title || f.text);
                                            return (
                                                <li key={fIdx} className="flex items-center gap-2">
                                                    <span className="text-[#C5A16F]">✔</span>
                                                    <span>{fText}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <motion.a
                                    href="#start-project-form"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className={`mt-8 block text-center font-bold py-3.5 rounded-xl transition-colors text-sm ${
                                        pkg.isPopular
                                            ? 'bg-[#C5A16F] text-[#0A192F] hover:bg-white shadow-lg shadow-[#C5A16F]/10'
                                            : 'bg-white/5 hover:bg-[#C5A16F] hover:text-[#0A192F] text-white'
                                    }`}
                                >
                                    {language === 'ar' ? 'اختيار هذه الباقة' : 'Select This Package'}
                                </motion.a>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
