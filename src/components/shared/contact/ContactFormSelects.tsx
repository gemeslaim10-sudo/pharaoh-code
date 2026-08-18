'use client';

interface ContactFormSelectsProps {
  isLight: boolean;
  language: string;
}

export function ContactFormSelects({
  isLight,
  language,
}: ContactFormSelectsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
      <div className="relative group">
        <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
          {language === 'ar' ? "ما هو هدفك / نوع الخدمة؟ *" : "What is your goal / service? *"}
        </label>
        <div className="relative">
          <select 
            name="goal" 
            required 
            className={`w-full rounded-xl px-4 py-3 sm:py-3.5 text-sm outline-none transition-all border appearance-none cursor-pointer ${
              isLight 
                ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#C5A16F] focus:bg-white' 
                : 'bg-[#0A192F] border-white/10 text-white focus:border-[#C5A16F]'
            }`}
          >
            <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="تطوير تطبيق جوال">{language === 'ar' ? "تطوير تطبيق جوال (iOS & Android)" : "Mobile App Development (iOS & Android)"}</option>
            <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="بناء موقع ويب احترافي">{language === 'ar' ? "بناء موقع ويب احترافي / منصة إلكترونية" : "Web Development / Digital Platform"}</option>
            <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="نظام لإدارة الشركات">{language === 'ar' ? "نظام لإدارة الشركات (ERP / CRM)" : "Enterprise System (ERP / CRM)"}</option>
            <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="تصميم واجهات UI/UX">{language === 'ar' ? "تصميم واجهات UI/UX وهوية بصرية" : "UI/UX & Branding Design"}</option>
            <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="أمن سيبراني واستضافة">{language === 'ar' ? "أمن سيبراني واستضافة سحابية" : "Cybersecurity & Cloud Hosting"}</option>
            <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="استفسار عام">{language === 'ar' ? "استفسار عام / أخرى" : "General Inquiry / Other"}</option>
          </select>
          <div className="absolute top-1/2 end-4 -translate-y-1/2 pointer-events-none text-[#C5A16F]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative group">
        <label className={`text-xs font-bold uppercase tracking-wider mb-1.5 block ${isLight ? 'text-slate-700' : 'text-gray-300'}`}>
          {language === 'ar' ? "الميزانية التقديرية (EGP) *" : "Estimated Budget *"}</label>
        <div className="relative">
          <select 
            name="budget" 
            required 
            className={`w-full rounded-xl px-4 py-3 sm:py-3.5 text-sm outline-none transition-all border appearance-none cursor-pointer ${
              isLight 
                ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#C5A16F] focus:bg-white' 
                : 'bg-[#0A192F] border-white/10 text-white focus:border-[#C5A16F]'
            }`}
          >
            <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="من 20,000 إلى 50,000">{language === 'ar' ? "من 20,000 إلى 50,000 ج.م" : "20,000 - 50,000 EGP"}</option>
            <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="من 50,000 إلى 100,000">{language === 'ar' ? "من 50,000 إلى 100,000 ج.م" : "50,000 - 100,000 EGP"}</option>
            <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="من 100,000 إلى 250,000">{language === 'ar' ? "من 100,000 إلى 250,000 ج.م" : "100,000 - 250,000 EGP"}</option>
            <option className={isLight ? "bg-white text-slate-900" : "bg-[#0A192F] text-white"} value="أكثر من 250,000">{language === 'ar' ? "أكثر من 250,000 ج.م (مشاريع كبرى)" : "+250,000 EGP (Enterprise Projects)"}</option>
          </select>
          <div className="absolute top-1/2 end-4 -translate-y-1/2 pointer-events-none text-[#C5A16F]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
