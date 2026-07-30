'use client';

import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavbarProps {
  onOpenMenu: () => void;
}

export default function Navbar({ onOpenMenu }: NavbarProps) {
  const { t } = useTranslation();

  return (
    <nav className="fixed w-full z-[100] bg-pharaohNavy/80 backdrop-blur-lg border-b border-white/5 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* <img src="/assets/Gemini_Generated_Image_83my1d83my1d83my.png" className="h-12 w-auto" alt="Logo" /> */}
          <span className="text-white font-black text-xl sm:block tracking-tighter">
            PHARAOH <span className="text-pharaohGold">CODE</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-white/90 font-medium text-sm">
          <Link href="/" className="hover:text-pharaohGold transition">
            {t("nav.home")}
          </Link>
          <Link href="/about" className="hover:text-pharaohGold transition">
            {t("nav.about")}
          </Link>
          <Link href="/services" className="hover:text-pharaohGold transition">
            {t("nav.services")}
          </Link>
          <Link href="/portfolio" className="hover:text-pharaohGold transition">
            {t("nav.portfolio")}
          </Link>
          <Link href="/team" className="hover:text-pharaohGold transition">
            {t("nav.team")}
          </Link>
          <Link href="/clients" className="hover:text-pharaohGold transition">
            {t("nav.clients")}
          </Link>
          <Link href="/contact" className="hover:text-pharaohGold transition">
            {t("nav.contact")}
          </Link>
          
          <LanguageSwitcher />

          <Link
            href="/start-project"
            className="bg-pharaohGold text-pharaohNavy px-6 py-2 rounded-lg font-bold hover:bg-white transition-all"
          >
            {t("nav.startProject")}
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button onClick={onOpenMenu} className="text-pharaohGold p-1">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
