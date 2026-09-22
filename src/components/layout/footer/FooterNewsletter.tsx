'use client';
import { useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { subscribeNewsletter } from '@/app/actions/frontend';

type Status = 'idle' | 'loading' | 'done' | 'exists' | 'error';

export function FooterNewsletter() {
  const { t, language, direction } = useTranslation();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || status === 'loading') return;
    setStatus('loading');
    try {
      const fd = new FormData();
      fd.append('email', newsletterEmail);
      const res = await subscribeNewsletter(fd);
      if (res.success) {
        setStatus(res.alreadySubscribed ? 'exists' : 'done');
        setNewsletterEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  const feedback: Record<Status, string> = {
    idle: '',
    loading: language === 'ar' ? 'جاري الاشتراك...' : 'Subscribing...',
    done: language === 'ar' ? 'تم الاشتراك بنجاح، أهلاً بك!' : 'Subscribed successfully, welcome!',
    exists: language === 'ar' ? 'هذا البريد مشترك بالفعل.' : 'This email is already subscribed.',
    error: language === 'ar' ? 'تعذر الاشتراك، تأكد من البريد وحاول مجدداً.' : 'Could not subscribe, check the email and try again.',
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
          name="email"
          value={newsletterEmail}
          onChange={(e) => setNewsletterEmail(e.target.value)}
          placeholder={t("contact.emailLabel") || "your@email.com"}
          required
          disabled={status === 'loading'}
          className="w-full bg-[#0B1528] border border-white/10 rounded-2xl p-4 pe-28 text-sm text-white focus:border-[#C5A16F] outline-none transition-all shadow-inner placeholder:text-gray-500 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="absolute top-2 bottom-2 end-2 bg-[#C5A16F] hover:bg-[#d6b07d] text-[#040810] px-4 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center disabled:opacity-60"
        >
          {status === 'done' || status === 'exists'
            ? (language === 'ar' ? '✓ تم' : '✓ Done')
            : (t("footer.subscribeBtn") || (language === 'ar' ? 'اشتراك' : 'Join'))}
        </button>
      </form>
      {status !== 'idle' && (
        <p className={`mt-2 text-[11px] ${status === 'error' ? 'text-red-400' : 'text-emerald-400'}`} role="status">
          {feedback[status]}
        </p>
      )}
    </div>
  );
}
