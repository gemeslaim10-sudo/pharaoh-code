'use client';

interface ContactFormInputsProps {
  isLight: boolean;
  language: string;
}

export function ContactFormInputs({
  isLight,
  language,
}: ContactFormInputsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-4 sm:mb-5">
      <div className="relative group">
        <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
          {language === 'ar' ? "الاسم الكامل / المفوض *" : "Full Name *"}
        </label>
        <input 
          type="text" 
          name="name" 
          required 
          placeholder={language === 'ar' ? "مثال: أحمد محمد" : "e.g. Ahmed Mohamed"} 
          className={`w-full rounded-xl px-4 py-3 sm:py-3.5 text-sm outline-none transition-all border ${
            isLight 
              ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#C5A16F] focus:bg-white focus:ring-1 focus:ring-[#C5A16F]' 
              : 'bg-[#0A192F] border-white/10 text-white placeholder:text-gray-500 focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F]'
          }`} 
        />
      </div>

      <div className="relative group">
        <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
          {language === 'ar' ? "البريد الإلكتروني *" : "Email Address *"}
        </label>
        <input 
          type="email" 
          name="email" 
          required 
          placeholder="email@domain.com" 
          className={`w-full rounded-xl px-4 py-3 sm:py-3.5 text-sm outline-none transition-all border ${
            isLight 
              ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#C5A16F] focus:bg-white focus:ring-1 focus:ring-[#C5A16F]' 
              : 'bg-[#0A192F] border-white/10 text-white placeholder:text-gray-500 focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F]'
          }`} 
        />
      </div>

      <div className="relative group sm:col-span-2 lg:col-span-1">
        <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
          {language === 'ar' ? "رقم الواتساب *" : "WhatsApp Phone *"}
        </label>
        <input 
          type="tel" 
          name="phone" 
          required 
          placeholder="+2010xxxxxxxx" 
          dir="ltr"
          className={`w-full rounded-xl px-4 py-3 sm:py-3.5 text-sm outline-none transition-all border ${
            isLight 
              ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#C5A16F] focus:bg-white focus:ring-1 focus:ring-[#C5A16F]' 
              : 'bg-[#0A192F] border-white/10 text-white placeholder:text-gray-500 focus:border-[#C5A16F] focus:ring-1 focus:ring-[#C5A16F]'
          }`} 
        />
      </div>
    </div>
  );
}
