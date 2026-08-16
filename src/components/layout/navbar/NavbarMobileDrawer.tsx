'use client';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { NavLinkItem } from './NavbarDesktopLinks';
import { NavbarMobileDrawerFooter } from './NavbarMobileDrawerFooter';

interface NavbarMobileDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  siteName: string;
  activeLogo?: string;
  links: NavLinkItem[];
  pathname: string;
}

export function NavbarMobileDrawer({
  isOpen,
  setIsOpen,
  siteName,
  activeLogo,
  links,
  pathname,
}: NavbarMobileDrawerProps) {
  const { direction } = useTranslation();

  const nameParts = siteName.split(' ');
  const firstWord = nameParts[0];
  const restWords = nameParts.slice(1).join(' ');

  return (
    <div 
      className={`fixed inset-0 z-[110] lg:hidden transition-all duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      dir={direction}
    >
      {/* Backdrop overlay */}
      <div 
        onClick={() => setIsOpen(false)}
        className={`absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* Drawer container */}
      <div 
        className={`absolute top-0 bottom-0 ${direction === 'rtl' ? 'left-0' : 'right-0'} w-full sm:max-w-md bg-gradient-to-b from-[#0B1528] via-[#070F1E] to-[#040810] border-l border-white/10 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] mobile-nav-drawer ${
          isOpen 
            ? 'translate-x-0' 
            : direction === 'rtl' ? '-translate-x-full' : 'translate-x-full'
        }`}
      >
        {/* Top Bar inside Drawer */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
              {activeLogo ? (
                <img src={activeLogo} alt={siteName} className="h-10 w-auto object-contain" />
              ) : (
                <span className="text-white font-black text-xl tracking-tight">
                  {firstWord} {restWords && <span className="text-[#C5A16F]">{restWords}</span>}
                </span>
              )}
            </Link>

            <div className="flex items-center gap-2.5">
              <ThemeSwitcher />
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Links List */}
          <div className="py-6 flex flex-col gap-2">
            {links.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{ transitionDelay: `${idx * 30}ms` }}
                  className={`flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-[#C5A16F] text-[#050B14] font-black shadow-[0_4px_20px_rgba(197,161,111,0.3)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-[#050B14]/20 text-[#050B14]' : 'bg-white/5 text-[#C5A16F]'}`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                      </svg>
                    </div>
                    <span className="text-base font-bold">{link.label}</span>
                  </div>

                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${direction === 'rtl' ? 'rotate-180' : ''} ${isActive ? 'translate-x-1' : 'opacity-40'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </div>

        <NavbarMobileDrawerFooter onClose={() => setIsOpen(false)} />
      </div>
    </div>
  );
}
