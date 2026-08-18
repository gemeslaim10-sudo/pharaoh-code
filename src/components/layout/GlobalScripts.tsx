'use client';

import { useEffect } from 'react';

export default function GlobalScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fallback menu toggle if needed
    const handleMenuClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('#open-menu, #close-menu, .m-link')) {
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav) {
          mobileNav.classList.toggle('active');
        }
      }
    };

    document.addEventListener('click', handleMenuClick);
    return () => {
      document.removeEventListener('click', handleMenuClick);
    };
  }, []);

  return null;
}
