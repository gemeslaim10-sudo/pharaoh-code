'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { motion } from 'framer-motion';
import { TechStackSidebar } from './TechStackSidebar';
import { TechStackCard, TechCardItem } from './TechStackCard';

interface TechCardData {
  title?: string;
  desc?: string;
  description?: string;
}

interface ServicesTechStackData {
  subtitle?: string;
  title1?: string;
  title2?: string;
  description?: string;
  cleanArch?: string;
  aesEncrypt?: string;
  cards?: TechCardData[];
}

export default function ServicesTechStack({ data }: { data?: ServicesTechStackData }) {
  const { t, language, direction } = useTranslation();

  const subtitle = getDynamicText(data, 'subtitle', language) || t('techStack.subtitle');
  const title1 = getDynamicText(data, 'title1', language) || t('techStack.title1');
  const title2 = getDynamicText(data, 'title2', language) || t('techStack.title2');
  const desc = getDynamicText(data, 'description', language) || t('techStack.desc');
  const cleanArch = getDynamicText(data, 'cleanArch', language) || t('techStack.cleanArch');
  const aesEncrypt = getDynamicText(data, 'aesEncrypt', language) || t('techStack.aesEncrypt');

  const cards = data?.cards || [];

  const techCards: TechCardItem[] = [
    {
      title: getDynamicText(cards[0], 'title', language) || t('techStack.backendTitle') || (language === 'ar' ? 'البنية الخلفية والسيرفرات' : 'Backend & Edge API'),
      desc: getDynamicText(cards[0], 'desc', language) || getDynamicText(cards[0], 'description', language) || t('techStack.backendDesc') || (language === 'ar' ? 'أنظمة سريعة الاستجابة بأحدث معايير الأمان وقابلية التوسع.' : 'Ultra-low latency architectures built with sovereign resilience.'),
      icon: (
        <path strokeWidth="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
      )
    },
    {
      title: getDynamicText(cards[1], 'title', language) || t('techStack.mobileTitle') || (language === 'ar' ? 'تطبيقات الهواتف الذكية' : 'Mobile Ecosystems'),
      desc: getDynamicText(cards[1], 'desc', language) || getDynamicText(cards[1], 'description', language) || t('techStack.mobileDesc') || (language === 'ar' ? 'تطبيقات iOS و Android أصلية بأداء فائق وتجربة سلسة.' : 'Native iOS & Android apps built for performance and scale.'),
      icon: (
        <path strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      )
    },
    {
      title: getDynamicText(cards[2], 'title', language) || t('techStack.dbTitle') || (language === 'ar' ? 'قواعد البيانات السحابية' : 'Cloud Databases'),
      desc: getDynamicText(cards[2], 'desc', language) || getDynamicText(cards[2], 'description', language) || t('techStack.dbDesc') || (language === 'ar' ? 'معالجة فورية وتخزين آمن للبيانات الضخمة بأعلى اعتمادية.' : 'Real-time synchronization and sovereign enterprise data storage.'),
      icon: (
        <path strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      )
    },
    {
      title: getDynamicText(cards[3], 'title', language) || t('techStack.cloudTitle') || (language === 'ar' ? 'البنية السحابية وDevOps' : 'Cloud Infrastructure'),
      desc: getDynamicText(cards[3], 'desc', language) || getDynamicText(cards[3], 'description', language) || t('techStack.cloudDesc') || (language === 'ar' ? 'نشر سحابي ذكي واستقرار متواصل مع حماية سيادية.' : 'Global edge deployments with zero downtime and auto-scaling.'),
      icon: (
        <path strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      )
    },
    {
      title: getDynamicText(cards[4], 'title', language) || t('techStack.uiTitle') || (language === 'ar' ? 'واجهات المستخدم والتجربة' : 'Luxury UX / UI'),
      desc: getDynamicText(cards[4], 'desc', language) || getDynamicText(cards[4], 'description', language) || t('techStack.uiDesc') || (language === 'ar' ? 'تصاميم فريدة وفاخرة ترتقي بتجربة عملائك إلى أعلى المستويات.' : 'Bespoke UI/UX crafted to convert users and elevate brand value.'),
      icon: (
        <path strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      )
    },
    {
      title: getDynamicText(cards[5], 'title', language) || t('techStack.securityTitle') || (language === 'ar' ? 'الأمان والتشفير السيادي' : 'Sovereign Security'),
      desc: getDynamicText(cards[5], 'desc', language) || getDynamicText(cards[5], 'description', language) || t('techStack.securityDesc') || (language === 'ar' ? 'بروتوكولات تشفير معقدة وحماية متكاملة ضد كافة الثغرات.' : 'Enterprise-grade encryption and multi-tier proactive protection.'),
      icon: (
        <path strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
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
    <section className="py-20 sm:py-24 bg-[#050B14] text-white relative overflow-hidden select-none border-t border-white/5" dir={direction}>
      {/* Ambient lighting */}
      <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-[#C5A16F]/6 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <TechStackSidebar
            subtitle={subtitle}
            title1={title1}
            title2={title2}
            desc={desc}
            cleanArch={cleanArch}
            aesEncrypt={aesEncrypt}
            direction={direction}
          />

          {/* Right Tech Cards Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 w-full"
          >
            {techCards.map((card, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <TechStackCard card={card} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
