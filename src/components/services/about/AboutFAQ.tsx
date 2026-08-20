'use client';
import { SectionData, SectionItem } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';
import { motion } from 'framer-motion';

export default function AboutFAQ({ data }: { data: SectionData }) {
  const { t, language, direction } = useTranslation();
  if (!data) return null;

  const faqs = (data?.faqs && data.faqs.length > 0) ? data.faqs : [
    {
      question_ar: 'ما هي الخدمات التي تقدمونها؟',
      question_en: 'What services do you offer?',
      answer_ar: 'نقدم خدمات تطوير الويب المتقدمة، تطبيقات الجوال عالية الأداء، وأنظمة إدارة المؤسسات والذكاء الاصطناعي.',
      answer_en: 'We offer advanced web development, high-performance mobile apps, enterprise systems, and AI integration.',
    },
    {
      question_ar: 'كم يستغرق بناء المشروعات؟',
      question_en: 'How long does a project take?',
      answer_ar: 'يعتمد ذلك على حجم ونطاق المشروع، وتتراوح المدة عادةً بين 4 إلى 12 أسبوعاً مع تسليم مرحلي ودوري.',
      answer_en: 'It depends on the scope of the project, usually ranging between 4 to 12 weeks with phased deliveries.',
    },
    {
      question_ar: 'كيف تضمنون جودة الكود والأمان؟',
      question_en: 'How do you ensure code quality and security?',
      answer_ar: 'نتبع أفضل معايير البرمجة النظيفة (Clean Code) مع اختبارات دقيقة وتشفير كامل للبيانات وأعلى معايير الأمان.',
      answer_en: 'We follow Clean Code best practices, rigorous testing, data encryption, and top security standards.',
    },
  ];

  return (
    <section id="faq" className="relative py-24 bg-[#0A192F] overflow-hidden" dir={direction}>
      {/* Rich background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C5A16F]/4 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/3 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#C5A16F]" />
            <span className="text-[#C5A16F] font-bold tracking-[0.4em] uppercase text-[11px] bg-[#C5A16F]/8 px-4 py-1.5 rounded-full border border-[#C5A16F]/20">
              {getDynamicText(data, 'subtitle', language) || t('about.knowledgeBase')}
            </span>
            <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-[#C5A16F]" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
            {getDynamicText(data, 'titlePart1', language) || t('about.faqTitle1')}
            <br />
            <span className="bg-gradient-to-r from-[#C5A16F] via-[#E8C97E] to-[#C5A16F] bg-clip-text text-transparent">
              {getDynamicText(data, 'titlePart2', language) || t('about.faqTitle2')}
            </span>
          </h2>
        </motion.div>

        {/* FAQ Accordion with Stagger */}
        <div className="space-y-3.5 sm:space-y-4">
          {faqs.map((faq: SectionItem, index: number) => {
            const questionText = getDynamicText(faq, 'question', language) || faq.question;
            const answerText = getDynamicText(faq, 'answer', language) || faq.answer;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative"
              >
                <details className="bg-gradient-to-b from-[#0F1E38] to-[#081222] border border-white/8 hover:border-[#C5A16F]/40 rounded-2xl overflow-hidden transition-all duration-400 shadow-xl group-hover:shadow-[0_10px_40px_-10px_rgba(197,161,111,0.2)]">
                  {/* Top beam */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <summary className="flex items-center justify-between p-4 sm:p-6 sm:p-7 cursor-pointer list-none outline-none select-none gap-3 sm:gap-4">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#C5A16F]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-open:bg-[#C5A16F] transition-colors duration-400 border border-[#C5A16F]/20">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5A16F] group-open:text-[#0A192F] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-white text-sm sm:text-base md:text-lg font-bold group-hover:text-[#C5A16F] transition-colors leading-snug">
                        {questionText}
                      </h3>
                    </div>

                    {/* Chevron */}
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl border border-[#C5A16F]/25 flex items-center justify-center flex-shrink-0 group-open:bg-[#C5A16F] group-open:border-[#C5A16F] transition-all duration-400">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A16F] group-open:text-[#0A192F] group-open:rotate-180 transition-all duration-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>

                  <div className="px-4 pb-4 sm:px-7 sm:pb-7 border-t border-white/5 pt-3.5 sm:pt-5">
                    <p className="text-gray-300 dark:text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                      {answerText}
                    </p>
                  </div>
                </details>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
