'use client';

import { useTranslation } from '@/contexts/LanguageContext';
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
            <div>
              <NavbarMobileDrawerHeader
                siteName={siteName}
                activeLogo={activeLogo}
                onClose={() => setIsOpen(false)}
              />

              {/* Navigation Links List */}
              <NavbarMobileDrawerLinks
                links={links}
                pathname={pathname}
                direction={direction}
                onClose={() => setIsOpen(false)}
                itemVariants={itemVariants}
              />
            </div>

            <NavbarMobileDrawerFooter onClose={() => setIsOpen(false)} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
