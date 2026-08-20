'use client';

import { useTranslation } from "@/contexts/LanguageContext";

export default function FooterNewsletter() {
  const { t } = useTranslation();

  return (
    <div>
      <h4 className="text-white text-lg font-black mb-8 border-r-4 border-[#C5A16F] pr-4">{t("footer.newsletterTitle")}</h4>
      <p className="text-gray-400 text-sm mb-6">{t("footer.brandDesc")}</p>
      <div className="relative group">
        <input type="email" placeholder={t("contact.emailLabel")} className="w-full bg-[#112240] border border-white/5 rounded-2xl p-4 text-white focus:border-[#C5A16F] outline-none transition-all" />
        <button className="absolute left-2 top-2 bottom-2 bg-[#C5A16F] text-[#0A192F] px-3.5 sm:px-4 rounded-xl font-black text-xs hover:bg-white transition-all whitespace-nowrap shrink-0 cursor-pointer">{t("footer.subscribeBtn")}</button>
      </div>
    </div>
  );
}
