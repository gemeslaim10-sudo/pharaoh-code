'use client';

import { useTranslation } from '@/contexts/LanguageContext';

export default function PrivacyDetailsList() {
  const { language, direction } = useTranslation();

  const privacyItems = [
    {
      num: '01',
      titleAr: 'نوعية البيانات التي نجمعها',
      titleEn: 'Data We Collect',
      descAr: 'تقتصر البيانات التي نطلبها في Pharaoh Code على البيانات الفنية والتعاقدية الأساسية، والتي تشمل: معلومات الاتصال المؤسسية والبيانات المتعلقة بالبنية التحتية للمشروع لضمان دقة التنفيذ البرمجي.',
      descEn: 'Data requested at Pharaoh Code is limited to essential technical and contractual information, including corporate contact details and project infrastructure specifications ensuring flawless engineering execution.'
    },
    {
      num: '02',
      titleAr: 'تأمين البيئات البرمجية (Environments)',
      titleEn: 'Securing Engineering Environments',
      descAr: 'نحن نطبق تدابير أمنية صارمة أثناء مرحلة التطوير والإنتاج. يتم حماية لوحات التحكم والملفات الحساسة عبر جدران حماية برمجية متطورة مع تشفير مفاتيح الـ APIs.',
      descEn: 'We enforce strict security protocols during development and production phases. Control panels and sensitive assets are safeguarded by advanced firewalls and encrypted API keys.'
    },
    {
      num: '03',
      titleAr: 'سرية الشيفرة المصدرية (Source Code)',
      titleEn: 'Source Code Confidentiality',
      descAr: 'إن الشيفرات البرمجية والأكواد المصدرية التي يتم تطويرها لبناء تطبيقاتكم هي ملكية فكرية مطلقة وحصرية لكم فور إتمام التعاقد. نلتزم التزاماً أبدياً بعدم إعادة استخدامها.',
      descEn: 'Source code developed for your applications remains your exclusive intellectual property upon contract execution. Pharaoh Code strictly commits to never re-using custom codebases.'
    },
    {
      num: '04',
      titleAr: 'اتفاقية سرية الموظفين والمهندسين',
      titleEn: 'Engineer Non-Disclosure Agreements',
      descAr: 'يخضع جميع المهندسين والمبرمجين لاتفاقيات داخلية صارمة وموثقة قانوناً لعدم إفشاء الأسرار (NDAs) لمنع مشاركة أي بيانات خارج النطاق السحابي الخاص بالشركة.',
      descEn: 'All software engineers and system architects are bound by legally binding NDAs, preventing unauthorized sharing or offsite storage of client intellectual assets.'
    },
    {
      num: '05',
      titleAr: 'ملفات تعريف الارتباط والتحليلات',
      titleEn: 'Cookies & Analytics',
      descAr: 'نستخدم تكنولوجيات تتبع آمنة وملفات تعريف الارتباط (Cookies) بهدف تحليل الأداء الرقمي للمنصة وتحسين السلوك التفاعلي للمستخدم دون ربطها بأي هوية شخصية.',
      descEn: 'We utilize secure analytical cookies to evaluate digital performance and optimize user experience, without linking metrics to personal identities.'
    },
    {
      num: '06',
      titleAr: 'حظر مشاركة البيانات مع جهات خارجية',
      titleEn: 'Zero Third-Party Data Sharing',
      descAr: 'تتعهد Pharaoh Code بشكل قاطع بعدم بيع أو تأجير بيانات عملائها أو شركائها مع أي جهات خارجية لأغراض ترويجية تحت أي ظرف.',
      descEn: 'Pharaoh Code categorically pledges to never sell, rent, or share client data with third-party networks for promotional purposes.'
    }
  ];

  return (
    <section className="pb-24 relative overflow-hidden" dir={direction}>
        <div className="absolute inset-x-0 top-1/3 flex items-center justify-center pointer-events-none select-none opacity-[0.012] z-0">
            <span className="text-[12vw] font-black tracking-[0.15em] text-pharaohGold">PHARAOH</span>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10" style={{ marginTop: '40px' }}>

            <div className="p-8 rounded-[2rem] bg-[#112240]/40 border border-white/5 backdrop-blur-sm mb-12">
                <p className="text-base leading-relaxed text-gray-300">
                    {language === 'ar' ? (
                        <>تعتبر وثيقة الخصوصية وسرية المعلومات هذه بمثابة اتفاقية ملزمة ومنظمة لكافة الممارسات الرقمية التي تتم داخل صرح <span className="text-white font-bold mx-1">Pharaoh Code</span> للبرمجيات. إن ثقة عملائنا هي حجر الأساس الذي شُيدت عليه مشاريعنا؛ لذا، نلتزم بحماية الأصول الفكرية والبيانات بأعلى درجات المسئولية والشفافية.</>
                    ) : (
                        <>This Privacy & Confidentiality document serves as a binding agreement governing all digital practices within <span className="text-white font-bold mx-1">Pharaoh Code</span>. Client trust is the cornerstone of our software house; thus, we guarantee intellectual asset protection with absolute engineering transparency.</>
                    )}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {privacyItems.map((item, idx) => (
                    <div key={idx} className="group p-8 rounded-[2rem] bg-[#112240] border border-white/5 hover:border-[#C5A16F]/30 transition-all duration-500 shadow-xl flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-12 h-12 bg-[#C5A16F]/10 rounded-2xl flex items-center justify-center text-[#C5A16F] font-black border border-[#C5A16F]/20 group-hover:bg-[#C5A16F] group-hover:text-[#0A192F] transition-all duration-500 text-lg">
                                    {item.num}
                                </div>
                                <h3 className="text-white text-xl font-bold">
                                    {language === 'ar' ? item.titleAr : item.titleEn}
                                </h3>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {language === 'ar' ? item.descAr : item.descEn}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center pt-16 border-t border-white/5 mt-16">
                <p className="text-sm text-gray-500">
                    {language === 'ar' ? 'تم صياغة وتحديث هذه السياسة رسمياً لتتوافق مع معايير حماية البيانات العالمية لعام 2026.' : 'Officially updated in compliance with global data protection standards for 2026.'}
                </p>
                <a href="/contact" className="inline-block mt-4 text-[#C5A16F] font-bold hover:text-white transition-colors">
                    {language === 'ar' ? 'تواصل مع قطاع الأمان والامتثال البرمجي لـ Pharaoh Code ←' : 'Contact Pharaoh Code Security & Compliance Team →'}
                </a>
            </div>

        </div>
    </section>
  );
}
