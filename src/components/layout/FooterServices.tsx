'use client';

import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";

export default function FooterServices() {
  const { t } = useTranslation();

  return (
    <div>
      <h4 className="text-white text-lg font-black mb-8 border-r-4 border-[#C5A16F] pr-4">{t("footer.servicesTitle")}</h4>
      <ul className="space-y-4 text-gray-400">
        <li><Link href="/mobile-apps" className="hover:text-[#C5A16F] transition-colors">{t("portfolio.filterApp")}</Link></li>
        <li><Link href="/web-development" className="hover:text-[#C5A16F] transition-colors">{t("portfolio.filterWeb")}</Link></li>
        <li><Link href="/web-development" className="hover:text-[#C5A16F] transition-colors">{t("services.titlePart1")} {t("services.titlePart2")}</Link></li>
      </ul>
    </div>
  );
}
