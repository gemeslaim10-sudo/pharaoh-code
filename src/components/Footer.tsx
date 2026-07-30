import Link from "next/link";
import FooterInfo from "./layout/FooterInfo";
import FooterLinks from "./layout/FooterLinks";
import FooterServices from "./layout/FooterServices";
import FooterNewsletter from "./layout/FooterNewsletter";

export default function Footer() {
  return (
    <footer
      className="relative bg-[#0A192F] pt-24 pb-12 overflow-hidden border-t border-[#C5A16F]/10"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none text-center">
        <span className="text-[15vw] font-black text-[#C5A16F] select-none uppercase tracking-[2rem]">
          Pharaoh
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <FooterInfo />
          <FooterLinks />
          <FooterServices />
          <FooterNewsletter />
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
          <p className="text-gray-500 text-xs tracking-widest">
            &copy; 2026 <span className="text-[#C5A16F] font-bold">PHARAOH CODE</span>. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-xs text-gray-500">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              سياسة الخصوصية
            </Link>
            <Link
              href="/terms-conditions"
              className="hover:text-white transition-colors"
            >
              الشروط والأحكام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
