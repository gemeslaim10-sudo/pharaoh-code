'use client';

import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";

export default function Footer({ 
  siteName = "PHARAOH CODE",
  socialLinks = { fb: '#', li: '#', tw: '#', gh: '#' }
}: { 
  siteName?: string,
  socialLinks?: { fb?: string, li?: string, tw?: string, gh?: string }
}) {
  const { t } = useTranslation();
  const nameParts = siteName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');
  
  return (
    <footer className="relative bg-[#0A192F] pt-24 pb-12 overflow-hidden border-t border-[#C5A16F]/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none text-center">
            <span className="text-[15vw] font-black text-[#C5A16F] select-none uppercase tracking-[2rem]">{firstWord}</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="text-white text-2xl font-black tracking-tighter uppercase">
                            {firstWord} {restWords && <span className="text-[#C5A16F]">{restWords}</span>}
                        </Link>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm">
                        {t("footer.brandDesc")}
                    </p>
                    <div className="flex gap-4">
                        {socialLinks.fb && socialLinks.fb !== '#' && (
                            <a href={socialLinks.fb} target="_blank" className="w-10 h-10 bg-[#112240] border border-[#C5A16F]/20 rounded-xl flex items-center justify-center text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#0A192F] transition-all duration-500 transform hover:-translate-y-2">
                                <span className="text-xs font-bold">Fb</span>
                            </a>
                        )}
                        {socialLinks.li && socialLinks.li !== '#' && (
                            <a href={socialLinks.li} target="_blank" className="w-10 h-10 bg-[#112240] border border-[#C5A16F]/20 rounded-xl flex items-center justify-center text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#0A192F] transition-all duration-500 transform hover:-translate-y-2">
                                <span className="text-xs font-bold">In</span>
                            </a>
                        )}
                        {socialLinks.tw && socialLinks.tw !== '#' && (
                            <a href={socialLinks.tw} target="_blank" className="w-10 h-10 bg-[#112240] border border-[#C5A16F]/20 rounded-xl flex items-center justify-center text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#0A192F] transition-all duration-500 transform hover:-translate-y-2">
                                <span className="text-xs font-bold">X</span>
                            </a>
                        )}
                        {socialLinks.gh && socialLinks.gh !== '#' && (
                            <a href={socialLinks.gh} target="_blank" className="w-10 h-10 bg-[#112240] border border-[#C5A16F]/20 rounded-xl flex items-center justify-center text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#0A192F] transition-all duration-500 transform hover:-translate-y-2">
                                <span className="text-xs font-bold">Gh</span>
                            </a>
                        )}
                    </div>
                </div>

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

                <div>
                    <h4 className="text-white text-lg font-black mb-8 border-r-4 border-[#C5A16F] pr-4">{t("footer.servicesTitle")}</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><Link href="/mobile-apps" className="hover:text-[#C5A16F] transition-colors">{t("portfolio.filterApp")}</Link></li>
                        <li><Link href="/web-development" className="hover:text-[#C5A16F] transition-colors">{t("portfolio.filterWeb")}</Link></li>
                        <li><Link href="/web-development" className="hover:text-[#C5A16F] transition-colors">{t("services.titlePart1")} {t("services.titlePart2")}</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white text-lg font-black mb-8 border-r-4 border-[#C5A16F] pr-4">{t("footer.newsletterTitle")}</h4>
                    <p className="text-gray-400 text-sm mb-6">{t("footer.brandDesc")}</p>
                    <div className="relative group">
                        <input type="email" placeholder={t("contact.emailLabel")} className="w-full bg-[#112240] border border-white/5 rounded-2xl p-4 text-white focus:border-[#C5A16F] outline-none transition-all" />
                        <button className="absolute left-2 top-2 bottom-2 bg-[#C5A16F] text-[#0A192F] px-4 rounded-xl font-black text-xs hover:bg-white transition-all">
                            {t("footer.subscribeBtn")}
                        </button>
                    </div>
                </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
                <p className="text-gray-500 text-xs tracking-widest">
                    &copy; {new Date().getFullYear()} <Link href="/login" className="text-[#C5A16F] font-bold hover:text-white transition-colors uppercase">{siteName}</Link>. {t("footer.rights")}
                </p>
                <div className="flex gap-8 text-xs text-gray-500">
                    <Link href="/privacy-policy" className="hover:text-white transition-colors">{t("footer.privacyPolicy")}</Link>
                    <Link href="/terms-conditions" className="hover:text-white transition-colors">{t("footer.termsConditions")}</Link>
                </div>
            </div>
        </div>
    </footer>
  );
}
