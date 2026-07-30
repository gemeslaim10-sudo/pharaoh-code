'use client';

import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";

export default function FooterLinks() {
  const { t } = useTranslation();

  return (
    <div>
      <h4 className="text-white text-lg font-black mb-8 border-r-4 border-[#C5A16F] pr-4">{t("footer.quickLinksTitle")}</h4>
      <ul className="space-y-4 text-gray-400">
        <li><Link href="/" className="hover:text-[#C5A16F] transition-colors flex items-center gap-2"><span>•</span> {t("nav.home")}</Link></li>
        <li><Link href="/services" className="hover:text-[#C5A16F] transition-colors flex items-center gap-2"><span>•</span> {t("nav.services")}</Link></li>
        <li><Link href="/portfolio" className="hover:text-[#C5A16F] transition-colors flex items-center gap-2"><span>•</span> {t("nav.portfolio")}</Link></li>
        <li><Link href="/about" className="hover:text-[#C5A16F] transition-colors flex items-center gap-2"><span>•</span> {t("nav.about")}</Link></li>
        <li><Link href="/team" className="hover:text-[#C5A16F] transition-colors flex items-center gap-2"><span>•</span> {t("nav.team")}</Link></li>
      </ul>
    </div>
  );
}
