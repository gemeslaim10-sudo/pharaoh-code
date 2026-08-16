'use client';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';

interface FooterBottomBarProps {
  siteName?: string;
}

export function FooterBottomBar({ siteName = 'PHARAOH CODE' }: FooterBottomBarProps) {
  const { t } = useTranslation();

  return (
    <div className="pt-8 sm:pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
      <p className="text-gray-400 text-xs tracking-wider font-light">
        &copy; {new Date().getFullYear()}{' '}
        <Link href="/login" className="text-[#C5A16F] font-bold hover:text-white transition-colors uppercase">
          {siteName}
        </Link>
        . {t("footer.rights")}
      </p>

      <div className="flex items-center gap-6 text-xs text-gray-400">
        <Link href="/privacy-policy" className="hover:text-[#C5A16F] transition-colors">
          {t("footer.privacyPolicy")}
        </Link>
        <span className="text-gray-700">•</span>
        <Link href="/terms-conditions" className="hover:text-[#C5A16F] transition-colors">
          {t("footer.termsConditions")}
        </Link>
      </div>
    </div>
  );
}
