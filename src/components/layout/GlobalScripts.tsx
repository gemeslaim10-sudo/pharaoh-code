'use client';

import { useEffect } from 'react';

export default function GlobalScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const runScript = () => {
      // @ts-ignore
      if (!window.$ || !window.Swiper) {
        setTimeout(runScript, 100);
        return;
      }
      
      // @ts-ignore
      const $ = window.$;

      // Preloader Logic
      const hidePreloader = () => {
          setTimeout(function() {
              $('#preloader').fadeOut(400, function() {
                  $('body').css('overflow', 'auto');
              });
          }, 300);
      };

      hidePreloader();


      $(document).ready(function() {
          $('#open-menu, #close-menu, .m-link').click(function() {
              $('#mobile-nav').toggleClass('active');
          });

          // Navigation and other global interactions can go here
      });

      // Stats Counter Logic handled natively via React in HomeStats.tsx
    };

    runScript();
  }, []);

  return null;
}
