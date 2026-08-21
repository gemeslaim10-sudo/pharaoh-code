'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { NavLinkItem } from './NavbarDesktopLinks';
import { NavbarMobileDrawerFooter } from './NavbarMobileDrawerFooter';
import { NavbarMobileDrawerHeader } from './NavbarMobileDrawerHeader';
import { NavbarMobileDrawerLinks } from './NavbarMobileDrawerLinks';
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
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const drawerVariants = {
    closed: {
      x: direction === 'rtl' ? '-105%' : '105%',
      opacity: 0.85,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 320,
        damping: 32,
        staggerChildren: 0.04,
        delayChildren: 0.08,
      },
    },
    exit: {
      x: direction === 'rtl' ? '-105%' : '105%',
      opacity: 0,
      transition: { duration: 0.28, ease: 'easeInOut' as const },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: direction === 'rtl' ? -14 : 14 },
    open: { opacity: 1, x: 0, transition: { duration: 0.28 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] lg:hidden select-none" dir={direction}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/65 backdrop-blur-md"
          />

          {/* Drawer panel */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className={`
              absolute top-0 bottom-0 ${direction === 'rtl' ? 'left-0' : 'right-0'}
              w-full sm:max-w-[380px]
              flex flex-col justify-between
              overflow-y-auto overflow-x-hidden
              z-10
              ${isLight
                ? 'bg-white/97 backdrop-blur-2xl border-e border-slate-100 shadow-[20px_0_80px_rgba(0,0,0,0.12)]'
                : 'bg-gradient-to-b from-[#070F1F] via-[#060D1B] to-[#040A15] border-e border-white/[0.06] shadow-[-20px_0_80px_rgba(0,0,0,0.8)]'
              }
            `}
          >
            {/* Top ambient glow */}
            {!isLight && (
              <>
                <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#C5A16F]/06 to-transparent pointer-events-none" />
                <div className="absolute top-1/3 -end-16 w-40 h-40 rounded-full bg-[#C5A16F]/05 blur-3xl pointer-events-none" />
              </>
            )}

            <div className="relative p-5 sm:p-6">
              <NavbarMobileDrawerHeader
                siteName={siteName}
                activeLogo={activeLogo}
                onClose={() => setIsOpen(false)}
              />

              <NavbarMobileDrawerLinks
                links={links}
                pathname={pathname}
                direction={direction}
                onClose={() => setIsOpen(false)}
                itemVariants={itemVariants}
              />
            </div>

            <div className={`relative p-5 sm:p-6 border-t ${isLight ? 'border-slate-100' : 'border-white/[0.06]'}`}>
              <NavbarMobileDrawerFooter onClose={() => setIsOpen(false)} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
