'use client';
import { useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';

export function FooterNewsletter() {
  const { t, language, direction } = useTranslation();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <div className="lg:col-span-3">
      <h4 className={`text-white text-base sm:text-lg font-black mb-5 sm:mb-8 ${direction === 'rtl' ? 'border-r-4 pr-3 sm:pr-4' : 'border-l-4 pl-3 sm:pl-4'} border-[#C5A16F]`}>
        {t("footer.newsletterTitle")}
      </h4>
      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">
        {language === 'ar' 
          ? 'اشترك في نشرتنا البرمجية ليصلك أحدث الاتجاهات التقنية وتحديثات مشاريعنا.' 
          : 'Subscribe to our software dispatch for the latest technical trends and architectural insights.'}
      </p>

      <form onSubmit={handleSubscribe} className="relative group">
        <input 
          type="email" 
          value={newsletterEmail}
          onChange={(e) => setNewsletterEmail(e.target.value)}
          placeholder={t("contact.emailLabel") || "your@email.com"} 
          required
          className="w-full bg-[#0B1528] border border-white/10 rounded-2xl p-4 pe-28 text-sm text-white focus:border-[#C5A16F] outline-none transition-all shadow-inner placeholder:text-gray-500" 
        />
        <button 
          type="submit"
          className="absolute top-2 bottom-2 end-2 bg-[#C5A16F] hover:bg-[#d6b07d] text-[#040810] px-4 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center"
        >
          {subscribed 
            ? (language === 'ar' ? '✓ تم' : '✓ Done') 
            : (t("footer.subscribeBtn") || (language === 'ar' ? 'اشتراك' : 'Join'))}
        </button>
      </form>
    </div>
  );
}
