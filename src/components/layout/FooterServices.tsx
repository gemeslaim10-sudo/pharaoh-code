'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import { getServices } from "@/app/actions/dashboard/services";
import { getDynamicText } from "@/lib/i18nHelper";

export default function FooterServices() {
  const { t, language } = useTranslation();
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
      <h4 className="text-white text-lg font-black mb-8 border-r-4 border-[#C5A16F] pr-4">
        {t("footer.servicesTitle") || (language === 'ar' ? 'خدماتنا' : 'Our Services')}
      </h4>
      <ul className="space-y-4 text-gray-400">
        {services.length > 0 ? (
          services.slice(0, 4).map((service) => {
            const title = getDynamicText(service, 'title', language) || service.title_ar || service.title_en || service.title;
            return (
              <li key={service.id}>
                <Link 
                  href={`/services/${service.id}`} 
                  className="hover:text-[#C5A16F] transition-colors line-clamp-1 block text-sm"
                >
                  {title}
                </Link>
              </li>
            );
          })
        ) : (
          <li>
            <Link href="/services" className="hover:text-[#C5A16F] transition-colors text-sm">
              {t("services.titlePart1")} {t("services.titlePart2")}
            </Link>
          </li>
        )}

        <li className="pt-2 border-t border-white/5">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-xs font-bold text-[#C5A16F] hover:text-white transition-colors"
          >
            {language === 'ar' ? 'عرض جميع الخدمات ←' : 'View All Services →'}
          </Link>
        </li>
      </ul>
    </div>
  );
}
