'use client';

interface ContactFormSuccessProps {
  isLight: boolean;
  direction: 'rtl' | 'ltr';
  language: string;
}

export function ContactFormSuccess({
  isLight,
  direction,
  language,
}: ContactFormSuccessProps) {
  return (
    <div className="w-full relative z-10" dir={direction}>
      <div className={`p-8 sm:p-12 rounded-2xl sm:rounded-3xl border shadow-2xl relative text-center py-16 flex flex-col justify-center ${
        isLight 
          ? 'bg-white border-slate-200/90 shadow-slate-200/50' 
          : 'bg-gradient-to-b from-[#0F1E38] via-[#091528] to-[#050C18] border-[#C5A16F]/30'
      }`}>
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`text-2xl font-black mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
          {language === 'ar' ? "تم استلام طلبك بنجاح!" : "Request Received Successfully!"}
        </h3>
        <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
          {language === 'ar' ? "شكراً لتواصلك معنا، سيقوم مهندسونا بالتواصل معك فوراً." : "Thank you for reaching out, our engineering team will contact you shortly."}
        </p>
      </div>
    </div>
  );
}
