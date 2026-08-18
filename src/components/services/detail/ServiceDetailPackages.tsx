'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { motion } from 'framer-motion';
import { ServiceDetailPackageCard, PackageItem } from './ServiceDetailPackageCard';

interface ServiceDetailData {
  packagesTitle?: string;
  packagesDesc?: string;
  price?: string | number;
  packages?: PackageItem[];
  [key: string]: unknown;
}

interface Props {
  service?: ServiceDetailData | null;
}

export default function ServiceDetailPackages({ service }: Props) {
  const { language, direction } = useTranslation();

  const title = getDynamicText(service, 'packagesTitle', language) || (language === 'ar' ? 'باقات ومستويات الخدمة' : 'Service Investment Packages');
  const desc = getDynamicText(service, 'packagesDesc', language) || (language === 'ar' ? 'اختر الباقة المناسبة لنطاق وحجم العمل المطلوب.' : 'Select the package matching your project scope.');

  const servicePrice = service?.price ? `${service.price}` : (language === 'ar' ? 'حسب نطاق العمل' : 'Custom Quote');

  const defaultPackages: PackageItem[] = [
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

  const packages = (service?.packages && service.packages.length > 0) ? service.packages : defaultPackages;

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
          {packages.map((pkg, idx: number) => (
            <ServiceDetailPackageCard
              key={idx}
              pkg={pkg}
              language={language}
              itemVariants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
