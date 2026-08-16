'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import { getServices } from "@/app/actions/dashboard/services";
import { getDynamicText } from "@/lib/i18nHelper";

export default function FooterServices() {
  const { t, language, direction } = useTranslation();
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    getServices().then(res => {
      if (isMounted && res && Array.isArray(res) && res.length > 0) {
        setServices(res);
      }
    });
    return () => { isMounted = false; };
  }, []);

  return (
    <div>
      <h4 className={`text-white text-base sm:text-lg font-black mb-5 sm:mb-8 ${direction === 'rtl' ? 'border-r-4 pr-3 sm:pr-4' : 'border-l-4 pl-3 sm:pl-4'} border-[#C5A16F]`}>
        {t("footer.servicesTitle") || (language === 'ar' ? 'خدماتنا' : 'Our Services')}
      </h4>
      
      <ul className="space-y-3 sm:space-y-4 text-gray-400">
        {services.length > 0 ? (
          services.slice(0, 4).map((service) => {
            const title = getDynamicText(service, 'title', language) || service.title_ar || service.title_en || service.title;
            return (
              <li key={service.id}>
                <Link 
                  href={`/services/${service.id}`} 
                  className="hover:text-[#C5A16F] transition-colors line-clamp-1 block text-sm group flex items-center gap-2"
                >
                  <span className="text-[#C5A16F]/40 group-hover:text-[#C5A16F] transition-colors text-xs">◆</span>
                  <span>{title}</span>
                </Link>
              </li>
            );
          })
        ) : (
          <li>
            <Link href="/services" className="hover:text-[#C5A16F] transition-colors text-sm flex items-center gap-2">
              <span className="text-[#C5A16F]/40 text-xs">◆</span>
              <span>{t("services.titlePart1")} {t("services.titlePart2")}</span>
            </Link>
          </li>
        )}

        <li className="pt-3 border-t border-white/5">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A16F] hover:text-white transition-colors"
          >
            <span>{language === 'ar' ? 'عرض جميع الخدمات' : 'View All Services'}</span>
            <span className={`transition-transform duration-300 ${direction === 'rtl' ? 'rotate-180' : ''}`}>→</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
