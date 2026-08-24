'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { motion } from 'framer-motion';
import { ClientsGridHeader } from './ClientsGridHeader';
import { ClientsGridCard } from './ClientsGridCard';
import { ClientItem } from '@/types/client';
export type { ClientItem };

export default function ClientsGrid({ clients }: { clients: ClientItem[] }) {
  const { t, language, direction } = useTranslation();

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
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 bg-[#050D1A] overflow-hidden min-h-screen" dir={direction}>
      {/* Rich background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(ellipse at 80% 20%, rgba(197,161,111,0.07) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(59,130,246,0.04) 0%, transparent 50%)' }} />
        <div className="absolute inset-0 opacity-[0.012]"
          style={{ backgroundImage: 'linear-gradient(rgba(197,161,111,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,161,111,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ClientsGridHeader
          subtitle={t('clients.subtitle')}
          titlePart1={t('clients.titlePart1')}
          titlePart2={t('clients.titlePart2')}
          desc={language === 'ar'
            ? 'نحن فخورون بالتعاون مع نخبة من الشركاء والمؤسسات لبناء حلول رقمية تقود المستقبل.'
            : 'We are proud to collaborate with elite partners and institutions building future-proof digital solutions.'}
        />

        {/* Empty state */}
        {clients.length === 0 ? (
          <div className="text-center text-gray-500 py-20 bg-[#0F1E38] rounded-3xl border border-white/5">
            {language === 'ar' ? 'لا يوجد شركاء مضافين حالياً.' : 'No partners added at the moment.'}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {clients.map((client) => {
              const nameText = getDynamicText(client, 'name', language) || client.name || '';
              const descText = getDynamicText(client, 'description', language) || getDynamicText(client, 'desc', language) || client.description || '';


              return (
                <motion.div
                  key={client.id}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="h-full"
                >
                  <ClientsGridCard
                    client={client}
                    nameText={nameText}
                    descText={descText}
                    language={language}
                    direction={direction}
                    projectDetailsText={t('clients.projectDetails')}
                    visitWebsiteText={t('clients.visitWebsite')}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
