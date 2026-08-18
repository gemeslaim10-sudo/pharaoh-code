'use client';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { NavLinkItem } from './NavbarDesktopLinks';
import { NavbarMobileDrawerFooter } from './NavbarMobileDrawerFooter';
import { motion, AnimatePresence } from 'framer-motion';

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

  const drawerVariants = {
    closed: {
      x: direction === 'rtl' ? '-100%' : '100%',
      opacity: 0.8,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 350,
        damping: 35,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      x: direction === 'rtl' ? '-100%' : '100%',
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeInOut' as const },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: direction === 'rtl' ? -15 : 15 },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] lg:hidden" dir={direction}>
          {/* Backdrop overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl" 
          />

          {/* Drawer container */}
          <motion.div 
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className={`absolute top-0 bottom-0 ${direction === 'rtl' ? 'left-0' : 'right-0'} w-full sm:max-w-md bg-gradient-to-b from-[#0B1528] via-[#070F1E] to-[#040810] border-l border-white/10 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto mobile-nav-drawer`}
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
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Navigation Links List */}
              <div className="py-6 flex flex-col gap-2">
                {links.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div key={link.href} variants={itemVariants}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 group ${
                          isActive
                            ? 'bg-[#C5A16F] text-[#050B14] font-black shadow-[0_4px_20px_rgba(197,161,111,0.35)]'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          {/* Delicate Levitating Floating Icon */}
                          <motion.div 
                            animate={{
                              y: [0, -2, 0],
                            }}
                            transition={{
                              duration: 4.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: idx * 0.2,
                            }}
                            className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center relative shadow-sm transition-all duration-300 group-hover:scale-108 ${
                              isActive 
                                ? 'bg-[#050B14]/20 text-[#050B14]' 
                                : 'bg-[#C5A16F]/[0.08] border border-[#C5A16F]/15 text-[#C5A16F] group-hover:bg-[#C5A16F] group-hover:text-[#050B14]'
                            }`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                              <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
                            </svg>
                          </motion.div>

                          <span className="text-base font-bold">{link.label}</span>
                        </div>

                        <svg 
                          className={`w-4 h-4 transition-transform duration-300 ${direction === 'rtl' ? 'rotate-180' : ''} ${isActive ? 'translate-x-1' : 'opacity-40 group-hover:opacity-100 group-hover:translate-x-1'}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor" 
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <NavbarMobileDrawerFooter onClose={() => setIsOpen(false)} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
