'use client';

import React, { useState } from 'react';
import { submitContactMessage } from '@/app/actions/frontend';
import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { ContactFormSuccess } from './contact/ContactFormSuccess';
import { ContactFormHeader } from './contact/ContactFormHeader';
import { ContactFormInputs } from './contact/ContactFormInputs';
import { ContactFormSelects } from './contact/ContactFormSelects';

interface UnifiedContactFormProps {
  badgeText?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export default function UnifiedContactForm({
  badgeText,
  title,
  subtitle,
  buttonText
}: UnifiedContactFormProps) {
  const { language, direction } = useTranslation();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const defaultBadge = badgeText !== undefined ? badgeText : (language === 'ar' ? "🚀 تواصل مباشر مع الخبراء" : "🚀 Direct Contact with Experts");
  const defaultTitle = title !== undefined ? title : (language === 'ar' ? "ابدأ مشروعك الفاخر معنا الآن" : "Start Your Project With Us Now");
  const defaultSubtitle = subtitle !== undefined ? subtitle : (language === 'ar' ? "احصل فوراً على الاستشارة المجانية الشاملة + مستند الهيكل الفني للمشروع." : "Get a free technical consultation and project architectural document.");
  const defaultBtnText = buttonText || (language === 'ar' ? "إطلاق الطلب الآن" : "Submit Request Now");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactMessage(formData);

    if (result.success) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      window.alert(result.error || (language === 'ar' ? 'حدث خطأ أثناء إرسال الرسالة.' : 'An error occurred while sending message.'));
    }
    
    setLoading(false);
  };

  if (success) {
    return <ContactFormSuccess isLight={isLight} direction={direction} language={language} />;
  }

  return (
    <div className="w-full relative z-10" dir={direction}>
      <ContactFormHeader
        defaultBadge={defaultBadge}
        defaultTitle={defaultTitle}
        defaultSubtitle={defaultSubtitle}
        isLight={isLight}
      />

      <form 
        className={`w-full p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border shadow-xl relative transition-all duration-300 ${
          isLight 
            ? 'bg-white border-slate-200/90 shadow-slate-200/60' 
            : 'bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050C18] border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.5)]'
        }`} 
        onSubmit={handleSubmit}
      >
        {/* Top ambient glow flare */}
        <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#C5A16F] to-transparent opacity-80" />

        {/* Name, Email, Phone inputs */}
        <ContactFormInputs isLight={isLight} language={language} />

        {/* Goal and Budget selects */}
        <ContactFormSelects isLight={isLight} language={language} />

        {/* Project Details Textarea */}
        <div className="mb-6">
          <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
            {language === 'ar' ? "احكِ لنا عن طموحك أو تفاصيل مشروعك *" : "Tell us about your project details *"}
          </label>
          <textarea 
            name="details" 
            rows={3} 
            required 
            placeholder={language === 'ar' ? "يرجى كتابة لمحة عن فكرتك وأهم المتطلبات..." : "Write a brief summary of your project idea and requirements..."} 
            className={`w-full rounded-xl px-4 py-3 sm:py-3.5 text-sm outline-none transition-all border resize-none ${
              isLight 
                ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#C5A16F] focus:bg-white focus:ring-1 focus:ring-[#C5A16F]' 
                : 'bg-[#0A192F] border-white/10 text-white placeholder:text-gray-500 focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F]'
            }`}
          />
        </div>

        {/* Action Submit Button */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#C5A16F]/30 via-[#DFB77D]/50 to-[#C5A16F]/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <motion.button 
            type="submit" 
            disabled={loading} 
            whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`w-full relative overflow-hidden py-3.5 sm:py-4 px-6 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-300 shadow-xl cursor-pointer ${
              loading 
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#C5A16F] via-[#DFB77D] to-[#C5A16F] hover:from-[#DFB77D] hover:to-[#C5A16F] text-[#070F1E] shadow-[#C5A16F]/25 hover:shadow-[#C5A16F]/40'
            }`}
          >
            {!loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
            )}

            <span className="relative z-10">{loading ? (language === 'ar' ? 'جاري إرسال الطلب...' : 'Submitting Request...') : defaultBtnText}</span>
            {!loading && (
              <svg
                className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10 ${direction === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
