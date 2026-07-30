'use client';

import { useEffect } from 'react';

export default function HomeScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const runScript = () => {
        if (!window.$) {
            setTimeout(runScript, 100);
            return;
        }
        
        window.$(window).on('load', function() {
            setTimeout(function() {
                window.$('#preloader').fadeOut(800, function() {
                    window.$('body').css('overflow', 'auto');
                });
            }, 2500);
        });

        window.$(document).ready(function() {
            window.$('#open-menu, #close-menu, .m-link').click(function() {
                window.$('#mobile-nav').toggleClass('active');
            });
        });
    };
    runScript();
  }, []);

  return null;
}
