'use client';

import { SectionData } from '@/types';
import { useState } from 'react';
import { submitComment } from '@/app/actions/frontend';
import { useTranslation } from '@/contexts/LanguageContext';
import { getDynamicText } from '@/lib/i18nHelper';

export default function AboutComments({ data }: { data: SectionData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { t, language, direction } = useTranslation();

  if (!data) return null;

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

  return (
    <section id="comments-section" className="relative py-24 bg-[#0A192F] overflow-hidden border-t border-white/5" dir={direction}>
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] select-none z-0">
            <span className="text-[18vw] font-black text-[#C5A16F] uppercase tracking-[3rem] font-mono">
                {data.backgroundText || "PHARAOH"}
            </span>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
                <h3 className="text-[#C5A16F] font-bold tracking-widest text-xs uppercase mb-2">
                    {getDynamicText(data, 'subtitle', language) || t('about.communityVoices')}
                </h3>
                <h2 className="text-4xl font-black text-white">
                    {getDynamicText(data, 'titlePart1', language) || t('about.leaveDigitalMark')} <span className="text-[#C5A16F]">{getDynamicText(data, 'titlePart2', language) || ''}</span>
                </h2>
                <p className="text-gray-400 mt-2 text-sm">{getDynamicText(data, 'description', language) || t('about.commentsDesc')}</p>
            </div>

            <div className="bg-[#112240]/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl shadow-xl mb-12 group hover:border-[#C5A16F]/30 transition-all duration-500">
                <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                    <span className="text-[#C5A16F]">✦</span> {getDynamicText(data, 'formTitle', language) || t('about.addCommentTitle')}
                </h4>
                
                {submitStatus === 'success' ? (
                    <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-6 rounded-xl text-center">
                        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h5 className="text-xl font-bold mb-2">{t('about.thankYou')}</h5>
                        <p>{t('about.commentSuccess')}</p>
                    </div>
                ) : (
                    <form id="commentForm" onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2 font-medium">{t('about.yourName')}</label>
                                <input type="text" name="name" required placeholder={t('about.namePlaceholder')} 
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-4 text-white focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2 font-medium">{t('about.emailPrivate')}</label>
                                <input type="email" name="email" required placeholder="name@example.com" 
                                    className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-4 text-white focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">{t('about.phoneWhatsapp')}</label>
                            <input type="tel" name="phone" required placeholder="+20100000000" dir="ltr"
                                className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-4 text-white focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2 font-medium">{t('about.yourComment')}</label>
                            <textarea name="comment" required rows={4} placeholder={t('about.commentPlaceholder')} 
                                className="w-full bg-[#0A192F] border border-white/10 rounded-xl p-4 text-white focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F] outline-none transition-all resize-none"></textarea>
                        </div>
                        {submitStatus === 'error' && (
                            <p className="text-red-400 text-sm text-center">{t('about.commentError')}</p>
                        )}
                        <div className="text-left">
                            <button type="submit" disabled={isSubmitting}
                                className="bg-[#C5A16F] text-[#0A192F] px-8 py-3 rounded-xl font-black hover:bg-white transition-all duration-300 shadow-[0_4px_15px_rgba(197,161,111,0.2)] disabled:opacity-50 disabled:cursor-not-allowed">
                                {isSubmitting ? t('about.submitting') : t('about.submitComment')}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    </section>
  );
}
