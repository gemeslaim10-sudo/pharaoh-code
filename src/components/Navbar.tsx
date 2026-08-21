'use client';

import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface NavbarProps {
  onOpenMenu: () => void;
}

export default function Navbar({ onOpenMenu }: NavbarProps) {
  const { t, direction } = useTranslation();
  const pathname = usePathname();

  const navLinks = useMemo(() => [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/portfolio", label: t("nav.portfolio") },
    { href: "/team", label: t("nav.team") },
    { href: "/clients", label: t("nav.clients") },
    { href: "/contact", label: t("nav.contact") },
  ], [t]);

  return (
    <>
      {/* Navbar Glow Atmosphere */}
      <div className="fixed top-0 left-0 right-0 z-[99] h-[1px] bg-gradient-to-r from-transparent via-[#C5A16F]/60 to-transparent pointer-events-none" />

      <nav
        dir={direction}
        className="
          fixed w-full z-[100] h-[72px]
          bg-[#05101F]/75 backdrop-blur-2xl
          border-b border-white/[0.06]
          shadow-[0_1px_0_0_rgba(197,161,111,0.08),0_8px_40px_-8px_rgba(0,0,0,0.6)]
          transition-all duration-500
        "
      >
        {/* Inner container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">

          {/* ── LOGO ── */}
          <Link href="/" className="group flex items-center gap-2.5 shrink-0 select-none">
            {/* Pharaoh emblem */}
            <div className="
              relative w-9 h-9 rounded-xl flex items-center justify-center shrink-0
              bg-gradient-to-br from-[#C5A16F]/20 to-[#9E7D47]/10
              border border-[#C5A16F]/25
              shadow-[0_0_12px_rgba(197,161,111,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]
              group-hover:shadow-[0_0_24px_rgba(197,161,111,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]
              group-hover:border-[#C5A16F]/60
              transition-all duration-500
            ">
              {/* Triangle / pyramid hieroglyph */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C5A16F] group-hover:text-[#E8C98A] transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L22 20H2L12 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v5M12 17h.01" />
              </svg>
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-xl ring-1 ring-[#C5A16F]/0 group-hover:ring-[#C5A16F]/30 group-hover:scale-110 transition-all duration-500" />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-white font-black text-[15px] tracking-tight leading-none">
                PHARAOH <span className="text-[#C5A16F]">CODE</span>
              </span>
              <span className="text-[#C5A16F]/50 text-[9px] font-medium tracking-[0.18em] uppercase mt-0.5 hidden sm:block">
                Software House
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAV LINKS ── */}
          <div className="hidden lg:flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-2 py-1.5 backdrop-blur-sm shadow-inner">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    relative px-3.5 py-2 rounded-xl text-[13px] font-semibold
                    transition-all duration-300 group/link
                    ${isActive
                      ? "text-[#C5A16F] bg-[#C5A16F]/10"
                      : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                    }
                  `}
                >
                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C5A16F] shadow-[0_0_6px_#C5A16F]" />
                  )}
                  {label}
                </Link>
              );
            })}
          </div>

          {/* ── RIGHT SIDE ACTIONS ── */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Language Switcher */}
            <LanguageSwitcher iconOnly={true} />

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-0.5" />

            {/* CTA Button */}
            <Link
              href="/start-project"
              className="
                relative overflow-hidden group/cta
                flex items-center gap-2
                px-5 py-2.5 rounded-xl
                bg-gradient-to-r from-[#D4AF37] via-[#C5A16F] to-[#9E7D47]
                text-[#040810] font-black text-[13px] tracking-wide
                shadow-[0_4px_16px_rgba(197,161,111,0.35),0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.5)]
                hover:shadow-[0_8px_28px_rgba(197,161,111,0.55),0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.7)]
                hover:scale-[1.03] hover:-translate-y-[1px]
                transition-all duration-300
              "
            >
              {/* Shimmer sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 ease-in-out" />
              {/* Star icon */}
              <svg className="w-3.5 h-3.5 shrink-0 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.928 8.856H23l-7.208 5.144 2.77 8.856L12 19.712l-6.562 5.144 2.77-8.856L1 10.856h8.072z" />
              </svg>
              <span className="relative z-10">{t("nav.startProject")}</span>
            </Link>
          </div>

          {/* ── MOBILE ACTIONS ── */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <LanguageSwitcher iconOnly={true} />

            {/* Hamburger */}
            <button
              onClick={onOpenMenu}
              aria-label="Open menu"
              className="
                relative w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-[5px]
                bg-white/[0.04] border border-white/[0.08]
                hover:bg-[#C5A16F]/15 hover:border-[#C5A16F]/40
                transition-all duration-300 group/hamburger shrink-0
              "
            >
              <span className="w-5 h-[1.5px] bg-white/80 group-hover/hamburger:bg-[#C5A16F] transition-colors duration-300 rounded-full" />
              <span className="w-3.5 h-[1.5px] bg-white/80 group-hover/hamburger:bg-[#C5A16F] transition-colors duration-300 rounded-full self-start ms-2.5" />
              <span className="w-5 h-[1.5px] bg-white/80 group-hover/hamburger:bg-[#C5A16F] transition-colors duration-300 rounded-full" />
            </button>
          </div>

        </div>
      </nav>
    </>
  );
}
