'use client';

import Link from "next/link";
import FooterServices from "./FooterServices";
import { useTranslation } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function Footer({ 
  siteName = "PHARAOH CODE",
  logoUrl,
  logoLightUrl,
  socialLinks = { fb: '#', wa: '#', ig: '#' }
}: { 
  siteName?: string,
  logoUrl?: string,
  logoLightUrl?: string,
  socialLinks?: { fb?: string, wa?: string, ig?: string }
}) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const nameParts = siteName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');
  
  const activeLogo = theme === 'light' ? (logoLightUrl || '') : (logoUrl || '');

  return (
    <footer className="relative bg-[#0A192F] pt-24 pb-12 overflow-hidden border-t border-[#C5A16F]/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none text-center">
            <span className="text-[15vw] font-black text-[#C5A16F] select-none uppercase tracking-[2rem]">{firstWord}</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="text-white text-2xl font-black tracking-tighter uppercase flex items-center">
                            {activeLogo ? (
                                <img src={activeLogo} alt={siteName} className="h-10 w-auto object-contain drop-shadow-md" />
                            ) : (
                                <>
                                    {firstWord} {restWords && <span className="text-[#C5A16F]">{restWords}</span>}
                                </>
                            )}
                        </Link>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm">
                        {t("footer.brandDesc")}
                    </p>
                    <div className="flex gap-3">
                        {socialLinks.fb && socialLinks.fb !== '#' && (
                            <a href={socialLinks.fb} target="_blank" rel="noopener noreferrer" title="Facebook" className="w-10 h-10 bg-[#112240] border border-[#C5A16F]/20 rounded-xl flex items-center justify-center text-[#C5A16F] hover:bg-[#C5A16F] hover:text-[#0A192F] transition-all duration-500 transform hover:-translate-y-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                        )}
                        {socialLinks.wa && socialLinks.wa !== '#' && (
                            <a href={socialLinks.wa.startsWith('http') ? socialLinks.wa : `https://wa.me/${socialLinks.wa.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="w-10 h-10 bg-[#112240] border border-[#C5A16F]/20 rounded-xl flex items-center justify-center text-[#C5A16F] hover:bg-green-600 hover:text-white transition-all duration-500 transform hover:-translate-y-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                                </svg>
                            </a>
                        )}
                        {socialLinks.ig && socialLinks.ig !== '#' && (
                            <a href={socialLinks.ig} target="_blank" rel="noopener noreferrer" title="Instagram" className="w-10 h-10 bg-[#112240] border border-[#C5A16F]/20 rounded-xl flex items-center justify-center text-[#C5A16F] hover:bg-pink-600 hover:text-white transition-all duration-500 transform hover:-translate-y-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
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

                <FooterServices />

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
