'use client';

import { useEffect } from 'react';

export default function SEOScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Original Script injected
    
    // Preloader Logic
    window.$(window).on('load', function() {
        setTimeout(function() {
            window.$('#preloader').fadeOut(800, function() {
                window.$('body').css('overflow', 'auto');
            });
        }, 2500);
    });

    window.$(document).ready(function() {
        // Mobile Menu Toggle
        window.$('#open-menu, #close-menu, .m-link').click(function() {
            window.$('#mobile-nav').toggleClass('active');
        });
    });
    
  }, []);

  return null;
}
