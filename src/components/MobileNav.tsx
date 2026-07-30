import Link from "next/link";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <div
      className={`fixed inset-0 z-[110] bg-pharaohNavy mobile-menu lg:hidden ${
        isOpen ? "active" : ""
      }`}
    >
      <div className="p-6 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-white font-black text-2xl tracking-tighter uppercase">
            PHARAOH <span className="text-pharaohGold">CODE</span>
          </span>
        </div>

        <button
          onClick={onClose}
          className="text-pharaohGold hover:rotate-90 transition-all duration-300"
        >
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <div className="flex flex-col p-8 gap-8 text-white text-xl font-bold">
        <Link href="/" onClick={onClose} className="m-link hover:text-pharaohGold transition-colors">
          الرئيسية
        </Link>
        <Link href="/about" onClick={onClose} className="m-link hover:text-pharaohGold transition-colors">
          من نحن
        </Link>
        <Link href="/services" onClick={onClose} className="m-link hover:text-pharaohGold transition-colors">
          الخدمات
        </Link>
        <Link href="/portfolio" onClick={onClose} className="m-link hover:text-pharaohGold transition-colors">
          الأعمال
        </Link>
        <Link href="/team" onClick={onClose} className="m-link hover:text-pharaohGold transition-colors">
          فريق العمل
        </Link>
        <Link href="/contact" onClick={onClose} className="m-link hover:text-pharaohGold transition-colors">
          تواصل معنا
        </Link>

        <Link
          href="/start-project"
          onClick={onClose}
          className="mt-4 bg-pharaohGold text-pharaohNavy px-6 py-4 rounded-xl font-black text-center shadow-[0_10px_20px_rgba(197,161,111,0.2)] hover:bg-white transition-all"
        >
          ابدأ مشروعك
        </Link>
      </div>
    </div>
  );
}
