'use client';

import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { NavbarBrandLogo } from "./navbar/NavbarBrandLogo";
import { NavbarDesktopNav } from "./navbar/NavbarDesktopNav";

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
          {/* Logo */}
          <NavbarBrandLogo />

          {/* Desktop Nav Links */}
          <NavbarDesktopNav navLinks={navLinks} pathname={pathname} />

          {/* Right Side Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <LanguageSwitcher iconOnly={true} />
            <div className="w-px h-5 bg-white/10 mx-0.5" />
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
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 ease-in-out" />
              <svg className="w-3.5 h-3.5 shrink-0 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l2.928 8.856H23l-7.208 5.144 2.77 8.856L12 19.712l-6.562 5.144 2.77-8.856L1 10.856h8.072z" />
              </svg>
              <span className="relative z-10">{t("nav.startProject")}</span>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <LanguageSwitcher iconOnly={true} />
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
