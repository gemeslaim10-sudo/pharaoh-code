'use client';

import { useState } from "react";
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
  const { t, language, direction } = useTranslation();
  const { theme } = useTheme();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const nameParts = siteName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');
  
  const activeLogo = theme === 'light' ? (logoLightUrl || '') : (logoUrl || '');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer 
      className="relative bg-[#040810] pt-16 sm:pt-24 pb-10 overflow-hidden border-t border-white/5 text-white select-none" 
      dir={direction}
    >
      {/* Background ambient gold & blue glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#C5A16F]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Cyber Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Giant Monumental Watermark Text */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full opacity-[0.02] pointer-events-none text-center select-none">
        <span className="text-[20vw] font-black text-[#C5A16F] uppercase tracking-[1.5rem] whitespace-nowrap">
          {firstWord}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Main 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">

          {/* COLUMN 1: BRAND INFO & SOCIAL ICONS (4 Cols on desktop) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              {activeLogo ? (
                <img src={activeLogo} alt={siteName} className="h-10 sm:h-12 w-auto object-contain drop-shadow-md py-1 transition-transform group-hover:scale-105" />
              ) : (
                <div className="flex items-center gap-2 text-2xl font-black tracking-tight">
                  <span className="text-[#C5A16F] text-2xl">𓂀</span>
                  <span>{firstWord}</span>
                  {restWords && <span className="text-[#C5A16F]">{restWords}</span>}
                </div>
              )}
            </Link>

            <p className="text-gray-400 leading-relaxed text-sm max-w-sm font-light">
              {t("footer.brandDesc")}
            </p>

            {/* Social Media Channels */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.fb && socialLinks.fb !== '#' && (
                <a 
                  href={socialLinks.fb} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="Facebook" 
                  aria-label="Facebook"
                  className="w-11 h-11 bg-[#091528] border border-white/10 rounded-xl flex items-center justify-center text-gray-300 hover:text-[#050B14] hover:bg-[#C5A16F] hover:border-[#C5A16F] transition-all duration-300 shadow-md hover:-translate-y-1"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}

              {socialLinks.wa && socialLinks.wa !== '#' && (
                <a 
                  href={socialLinks.wa.startsWith('http') ? socialLinks.wa : `https://wa.me/${socialLinks.wa.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="WhatsApp" 
                  aria-label="WhatsApp"
                  className="w-11 h-11 bg-[#091528] border border-white/10 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-300 shadow-md hover:-translate-y-1"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                </a>
              )}

              {socialLinks.ig && socialLinks.ig !== '#' && (
                <a 
                  href={socialLinks.ig} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="Instagram" 
                  aria-label="Instagram"
                  className="w-11 h-11 bg-[#091528] border border-white/10 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:border-transparent transition-all duration-300 shadow-md hover:-translate-y-1"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS (2.5 Cols) */}
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

          {/* COLUMN 3: SERVICES LIST (2.5 Cols) */}
          <div className="lg:col-span-3">
            <FooterServices />
          </div>

          {/* COLUMN 4: NEWSLETTER (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className={`text-white text-base sm:text-lg font-black mb-5 sm:mb-8 ${direction === 'rtl' ? 'border-r-4 pr-3 sm:pr-4' : 'border-l-4 pl-3 sm:pl-4'} border-[#C5A16F]`}>
              {t("footer.newsletterTitle")}
            </h4>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">
              {language === 'ar' 
                ? 'اشترك في نشرتنا البرمجية ليصلك أحدث الاتجاهات التقنية وتحديثات مشاريعنا.' 
                : 'Subscribe to our software dispatch for the latest technical trends and architectural insights.'}
            </p>

            <form onSubmit={handleSubscribe} className="relative group">
              <input 
                type="email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={t("contact.emailLabel") || "your@email.com"} 
                required
                className="w-full bg-[#0B1528] border border-white/10 rounded-2xl p-4 pe-28 text-sm text-white focus:border-[#C5A16F] outline-none transition-all shadow-inner placeholder:text-gray-500" 
              />
              <button 
                type="submit"
                className="absolute top-2 bottom-2 end-2 bg-[#C5A16F] hover:bg-[#d6b07d] text-[#040810] px-4 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center"
              >
                {subscribed 
                  ? (language === 'ar' ? '✓ تم' : '✓ Done') 
                  : (t("footer.subscribeBtn") || (language === 'ar' ? 'اشتراك' : 'Join'))}
              </button>
            </form>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL BAR */}
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

      </div>
    </footer>
  );
}
