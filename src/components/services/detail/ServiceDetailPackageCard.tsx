'use client';

import { motion, Variants } from 'framer-motion';
import { getDynamicText } from '@/lib/i18nHelper';
import { Language } from '@/types/i18n';

export interface PackageItem {
  level_ar?: string;
  level_en?: string;
  badge?: string;
  badge_ar?: string;
  badge_en?: string;
  title?: string;
  title_ar?: string;
  title_en?: string;
  price?: string;
  period?: string;
  period_ar?: string;
  period_en?: string;
  desc?: string;
  desc_ar?: string;
  desc_en?: string;
  description?: string;
  features_heading_ar?: string;
  features_heading_en?: string;
  features_list_ar?: string[];
  features_list_en?: string[];
  features?: (string | { title?: string; text?: string })[];
  isPopular?: boolean;
}

interface ServiceDetailPackageCardProps {
  pkg: PackageItem;
  serviceTitle?: string;
  whatsappNumber?: string;
  language: Language;
  itemVariants: Variants;
}

export function ServiceDetailPackageCard({
  pkg,
  serviceTitle = '',
  whatsappNumber = '+201000000000',
  language,
  itemVariants,
}: ServiceDetailPackageCardProps) {
  const pLevel = getDynamicText(pkg, 'level', language) || getDynamicText(pkg, 'badge', language) || pkg.badge;
  const pTitle = getDynamicText(pkg, 'title', language) || pkg.title;
  const pPrice = getDynamicText(pkg, 'price', language) || pkg.price;
  const pPeriod = getDynamicText(pkg, 'period', language) || pkg.period;
  const pDesc = getDynamicText(pkg, 'desc', language) || getDynamicText(pkg, 'description', language) || pkg.desc;
  const pFeaturesHeading = getDynamicText(pkg, 'features_heading', language) || (language === 'ar' ? 'المميزات المضمنة في الباقة:' : 'Included Features:');

  const rawFeatures = (language === 'ar' ? pkg.features_list_ar : pkg.features_list_en) || pkg.features || [];
  const featuresList = Array.isArray(rawFeatures)
    ? rawFeatures.filter(f => Boolean(typeof f === 'string' ? f.trim() : f))
    : [];

  const cleanWa = whatsappNumber.replace(/[^0-9]/g, '');
  const enquiryMsg = language === 'ar'
    ? `مرحباً صرح فرعون، أود الاستفسار والتعاقد على (${pTitle || ''} - ${pLevel || ''}) الخاصة بخدمة (${serviceTitle}).`
    : `Hello Pharaoh Code, I would like to inquire about (${pTitle || ''} - ${pLevel || ''}) for service (${serviceTitle}).`;

  const whatsappUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(enquiryMsg)}`;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className={`bg-[#112240] rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
        pkg.isPopular ? 'border-2 border-[#C5A16F] shadow-2xl scale-105' : 'border border-white/5 hover:border-[#C5A16F]/30'
      }`}
    >
      {pkg.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C5A16F] text-[#0A192F] font-black text-[10px] tracking-widest px-4 py-1 rounded-full uppercase shadow-md whitespace-nowrap">
          {language === 'ar' ? 'الأكثر طلباً ومبيعاً' : 'MOST POPULAR'}
        </div>
      )}

      <div>
        {/* 1. Level */}
        {pLevel && (
          <div className="text-pharaohGold font-bold text-xs uppercase mb-1 tracking-wider">
            {pLevel}
          </div>
        )}

        {/* 2. Package Title */}
        <h4 className="text-white font-black text-xl mb-2">{pTitle}</h4>

        {/* 3. Price */}
        <div className="my-3 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-[#C5A16F] font-black text-2xl sm:text-3xl tracking-tight">{pPrice}</span>
          {pPeriod && <span className="text-gray-400 font-medium text-xs">{pPeriod}</span>}
        </div>

        {/* 4. Description Paragraph */}
        {pDesc && (
          <p className="text-gray-300 text-xs sm:text-sm font-normal mb-5 leading-relaxed">
            {pDesc}
          </p>
        )}

        <div className="h-px bg-white/10 mb-4" />

        {/* 5. Features Heading */}
        <h5 className="text-xs font-bold text-gray-300 mb-3">{pFeaturesHeading}</h5>

        {/* 6. Features Points List */}
        <ul className="space-y-2.5 text-gray-300 text-xs sm:text-sm font-medium">
          {featuresList.map((f, fIdx: number) => {
            const fText = typeof f === 'string' ? f : (getDynamicText(f, 'title', language) || (f as any).title || (f as any).text);
            return (
              <li key={fIdx} className="flex items-start gap-2">
                <span className="text-[#C5A16F] font-bold shrink-0 mt-0.5">✔</span>
                <span className="leading-snug">{fText as string}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 7. Action Button linking directly to WhatsApp with prefilled message */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`mt-8 flex items-center justify-center gap-2 font-bold py-3.5 px-4 rounded-xl transition-all text-sm cursor-pointer shadow-lg ${
          pkg.isPopular
            ? 'bg-[#C5A16F] text-[#0A192F] hover:bg-white shadow-[#C5A16F]/20'
            : 'bg-[#25D366]/90 hover:bg-[#25D366] text-white shadow-emerald-900/20'
        }`}
      >
        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span>{language === 'ar' ? 'طلب وحجز هذه الباقة عبر واتساب' : 'Select Package on WhatsApp'}</span>
      </motion.a>
    </motion.div>
  );
}
