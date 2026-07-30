'use client';

import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";

export default function FooterInfo() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <h2 className="text-white text-2xl font-black tracking-tighter">
          PHARAOH <span className="text-[#C5A16F]">CODE</span>
        </h2>
      </div>
      <p className="text-gray-400 leading-relaxed text-sm">
        {t("footer.brandDesc")}
      </p>
      <div className="flex gap-4">
        <Link href="#" className="w-10 h-10 bg-[#112240] border border-[#C5A16F]/20 rounded-xl flex items-center justify-center text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#0A192F] transition-all duration-500 transform hover:-translate-y-2">
          <span className="text-xs font-bold">Fb</span>
        </Link>
        <Link href="#" className="w-10 h-10 bg-[#112240] border border-[#C5A16F]/20 rounded-xl flex items-center justify-center text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#0A192F] transition-all duration-500 transform hover:-translate-y-2">
          <span className="text-xs font-bold">In</span>
        </Link>
        <Link href="#" className="w-10 h-10 bg-[#112240] border border-[#C5A16F]/20 rounded-xl flex items-center justify-center text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#0A192F] transition-all duration-500 transform hover:-translate-y-2">
          <span className="text-xs font-bold">X</span>
        </Link>
      </div>
    </div>
  );
}
