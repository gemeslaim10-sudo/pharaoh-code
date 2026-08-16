'use client';
import { useState } from 'react';
import { submitComment } from '@/app/actions/frontend';
import { useTranslation } from '@/contexts/LanguageContext';

interface AboutCommentsFormProps {
  formTitle: string;
}

export function AboutCommentsForm({ formTitle }: AboutCommentsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { t, direction } = useTranslation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    const formData = new FormData(e.currentTarget);
    const result = await submitComment(formData);
    setIsSubmitting(false);
    if (result.success) {
      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } else {
      setSubmitStatus('error');
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-500/10 border border-green-500/25 text-green-400 p-6 rounded-xl text-center">
        <svg className="w-10 h-10 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h5 className="text-lg font-bold mb-1">{t('about.thankYou')}</h5>
        <p className="text-sm">{t('about.commentSuccess')}</p>
      </div>
    );
  }

  return (
    <>
      <h4 className="text-white text-base font-bold mb-6 flex items-center gap-2">
        <span className="w-6 h-6 bg-[#C5A16F]/15 rounded-lg flex items-center justify-center">
          <span className="text-[#C5A16F] text-xs">✦</span>
        </span>
        {formTitle}
      </h4>

      <form id="commentForm" onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-400 text-xs mb-1.5 font-semibold uppercase tracking-wider">
              {t('about.yourName')}
            </label>
            <input
              type="text" name="name" required
              placeholder={t('about.namePlaceholder')}
              className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1.5 font-semibold uppercase tracking-wider">
              {t('about.emailPrivate')}
            </label>
            <input
              type="email" name="email" required
              placeholder="name@example.com"
              className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1.5 font-semibold uppercase tracking-wider">
            {t('about.phoneWhatsapp')}
          </label>
          <input
            type="tel" name="phone" required
            placeholder="+20100000000" dir="ltr"
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1.5 font-semibold uppercase tracking-wider">
            {t('about.yourComment')}
          </label>
          <textarea
            name="comment" required rows={4}
            placeholder={t('about.commentPlaceholder')}
            className="w-full bg-[#0A192F] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all resize-none"
          />
        </div>
        {submitStatus === 'error' && (
          <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-lg p-2">
            {t('about.commentError')}
          </p>
        )}
        <div className={`flex ${direction === 'rtl' ? 'justify-end' : 'justify-start'}`}>
          <button
            type="submit" disabled={isSubmitting}
            className="bg-[#C5A16F] text-[#0A192F] px-7 py-3 rounded-xl font-black text-sm hover:bg-white transition-all duration-300 shadow-[0_4px_20px_rgba(197,161,111,0.25)] hover:shadow-[0_4px_30px_rgba(197,161,111,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t('about.submitting')}
              </>
            ) : t('about.submitComment')}
          </button>
        </div>
      </form>
    </>
  );
}
