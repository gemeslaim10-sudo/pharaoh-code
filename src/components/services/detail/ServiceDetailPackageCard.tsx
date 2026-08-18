'use client';

import { motion, Variants } from 'framer-motion';
import { getDynamicText } from '@/lib/i18nHelper';
import { Language } from '@/types/i18n';

export interface PackageItem {
  badge?: string;
  title?: string;
  price?: string;
  period?: string;
  desc?: string;
  description?: string;
  features?: (string | { title?: string; text?: string })[];
  isPopular?: boolean;
}

interface ServiceDetailPackageCardProps {
  pkg: PackageItem;
  language: Language;
  itemVariants: Variants;
}

export function ServiceDetailPackageCard({
  pkg,
  language,
  itemVariants,
}: ServiceDetailPackageCardProps) {
  const pBadge = getDynamicText(pkg, 'badge', language) || pkg.badge;
  const pTitle = getDynamicText(pkg, 'title', language) || pkg.title;
  const pPrice = getDynamicText(pkg, 'price', language) || pkg.price;
  const pPeriod = getDynamicText(pkg, 'period', language) || pkg.period;
  const pDesc = getDynamicText(pkg, 'desc', language) || getDynamicText(pkg, 'description', language) || pkg.desc;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className={`bg-[#112240] rounded-2xl p-8 flex flex-col justify-between relative transition-colors duration-300 ${
        pkg.isPopular ? 'border-2 border-[#C5A16F] shadow-2xl scale-105' : 'border border-white/5 hover:border-[#C5A16F]/30'
      }`}
    >
      {pkg.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C5A16F] text-[#0A192F] font-bold text-[10px] tracking-widest px-4 py-1 rounded-full uppercase shadow-md">
          {language === 'ar' ? 'الأكثر طلباً ومبيعاً' : 'MOST POPULAR'}
        </div>
      )}
      <div>
        <div className="text-gray-400 font-bold text-xs uppercase mb-1">{pBadge}</div>
        <h4 className="text-white font-bold text-xl mb-2">{pTitle}</h4>

        <div className="my-4">
          <span className="text-[#C5A16F] font-black text-3xl tracking-tight">{pPrice}</span>
          <span className="text-gray-400 font-medium text-xs"> {pPeriod}</span>
        </div>

        <p className="text-gray-400 text-xs md:text-sm font-medium mb-6 leading-relaxed">{pDesc}</p>
        <div className="h-px bg-white/5 mb-6" />
        <ul className="space-y-3 text-gray-300 text-xs md:text-sm font-medium">
          {Array.isArray(pkg.features) && pkg.features.map((f, fIdx: number) => {
            const fText = typeof f === 'string' ? f : (getDynamicText(f, 'title', language) || (f as Record<string, unknown>).title || (f as Record<string, unknown>).text);
            return (
              <li key={fIdx} className="flex items-center gap-2">
                <span className="text-[#C5A16F]">✔</span>
                <span>{fText as string}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <motion.a
        href="#start-project-form"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`mt-8 block text-center font-bold py-3.5 rounded-xl transition-colors text-sm ${
          pkg.isPopular
            ? 'bg-[#C5A16F] text-[#0A192F] hover:bg-white shadow-lg shadow-[#C5A16F]/10'
            : 'bg-white/5 hover:bg-[#C5A16F] hover:text-[#0A192F] text-white'
        }`}
      >
        {language === 'ar' ? 'اختيار هذه الباقة' : 'Select This Package'}
      </motion.a>
    </motion.div>
  );
}
