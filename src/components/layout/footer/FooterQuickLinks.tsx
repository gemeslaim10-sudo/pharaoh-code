'use client';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';

export function FooterQuickLinks() {
  const { t, direction } = useTranslation();

  return (
    <div className="lg:col-span-2 sm:ps-2">
      <h4 className={`text-white text-base sm:text-lg font-black mb-5 sm:mb-8 ${direction === 'rtl' ? 'border-r-4 pr-3 sm:pr-4' : 'border-l-4 pl-3 sm:pl-4'} border-[#C5A16F]`}>
        {t("footer.quickLinksTitle")}
      </h4>
      <ul className="space-y-3 sm:space-y-4 text-gray-400 text-sm">
        <li>
          <Link href="/" className="hover:text-[#C5A16F] transition-colors flex items-center gap-2 group">
            <span className="text-[#C5A16F]/40 group-hover:text-[#C5A16F] transition-colors text-xs">◆</span>
            <span>{t("nav.home")}</span>
          </Link>
        </li>
        <li>
          <Link href="/services" className="hover:text-[#C5A16F] transition-colors flex items-center gap-2 group">
            <span className="text-[#C5A16F]/40 group-hover:text-[#C5A16F] transition-colors text-xs">◆</span>
            <span>{t("nav.services")}</span>
          </Link>
        </li>
        <li>
          <Link href="/portfolio" className="hover:text-[#C5A16F] transition-colors flex items-center gap-2 group">
            <span className="text-[#C5A16F]/40 group-hover:text-[#C5A16F] transition-colors text-xs">◆</span>
            <span>{t("nav.portfolio")}</span>
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-[#C5A16F] transition-colors flex items-center gap-2 group">
            <span className="text-[#C5A16F]/40 group-hover:text-[#C5A16F] transition-colors text-xs">◆</span>
            <span>{t("nav.about")}</span>
          </Link>
        </li>
        <li>
          <Link href="/team" className="hover:text-[#C5A16F] transition-colors flex items-center gap-2 group">
            <span className="text-[#C5A16F]/40 group-hover:text-[#C5A16F] transition-colors text-xs">◆</span>
            <span>{t("nav.team")}</span>
          </Link>
        </li>
        <li>
          <Link href="/clients" className="hover:text-[#C5A16F] transition-colors flex items-center gap-2 group">
            <span className="text-[#C5A16F]/40 group-hover:text-[#C5A16F] transition-colors text-xs">◆</span>
            <span>{t("nav.clients")}</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
