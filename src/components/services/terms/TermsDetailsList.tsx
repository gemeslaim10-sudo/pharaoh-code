'use client';
import { TERMS_ITEMS } from './termsData';
import { TermsCard } from './TermsCard';
import { useTranslation } from '@/contexts/LanguageContext';

export default function TermsDetailsList() {
  const { language, direction } = useTranslation();

  return (
    <section className="pb-24 relative overflow-hidden" dir={direction}>
      <div className="absolute inset-x-0 top-1/4 flex items-center justify-center pointer-events-none select-none opacity-[0.012] z-0">
        <span className="text-[12vw] font-black tracking-[0.15em] text-pharaohGold">PHARAOH</span>
      </div>
      <div className="absolute inset-x-0 bottom-1/4 flex items-center justify-center pointer-events-none select-none opacity-[0.012] z-0">
        <span className="text-[12vw] font-black tracking-[0.15em] text-pharaohGold">CODE</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10" style={{ marginTop: '40px' }}>
        <div className="p-8 rounded-[2rem] bg-[#112240]/40 border border-white/5 backdrop-blur-sm mb-12">
          <p className="text-base leading-relaxed text-gray-300">
            {language === 'ar' ? (
              <>
                مرحباً بك في منصة <span className="text-white font-bold mx-1">Pharaoh Code</span> للبرمجيات. تُنظم هذه الصفحة القواعد، الشروط، والأحكام القانونية والتقنية الحاكمة لاستخدامك لموقعنا الإلكتروني وتعاملك معنا كبيت برمجيات متكامل. بدخولك وتعاملك مع منصتنا أو طلب أي من خدماتنا الرقمية، فإنك توافق بشكل كامل ودون قيد أو شرط على الالتزام بجميع البنود المذكورة أدناه.
              </>
            ) : (
              <>
                Welcome to <span className="text-white font-bold mx-1">Pharaoh Code</span> Software Platform. This page regulates the terms, rules, and technical and legal agreements governing your use of our platform and collaboration with us. By accessing our services or commissioning digital systems, you fully and unconditionally agree to comply with all terms outlined below.
              </>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TERMS_ITEMS.map((item, index) => (
            <TermsCard key={index} item={item} />
          ))}
        </div>

        <div className="text-center pt-16 border-t border-white/5 mt-16">
          <p className="text-sm text-gray-500">
            {language === 'ar' 
              ? 'تعتبر موافقتك على بدء المشروع بمثابة توقيع رقمي صريح والتزام كامل بهذه الشروط.'
              : 'Your authorization to commence a project acts as an express digital signature adhering to these terms.'}
          </p>
          <a
            href="/contact"
            className="inline-block mt-4 text-[#C5A16F] font-bold hover:text-white transition-colors"
          >
            {language === 'ar'
              ? 'هل لديك أي استفسار قانوني؟ تواصل مع مستشارينا الفنيين الآن ←'
              : 'Have any legal inquiries? Speak with our technical advisors now →'}
          </a>
        </div>
      </div>
    </section>
  );
}
