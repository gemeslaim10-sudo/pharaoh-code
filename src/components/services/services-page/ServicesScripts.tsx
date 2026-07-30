'use client';

import { useEffect } from 'react';

export default function ServicesScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if jQuery and Swiper are loaded before running
    const runScript = () => {
        if (!window.$) {
            setTimeout(runScript, 100);
            return;
        }
        
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

            // Swiper Init
            if(window.Swiper) {
                void new window.Swiper(".heroSwiper", {
                    loop: true,
                    speed: 1000,
                    autoplay: { delay: 5000, disableOnInteraction: false },
                    pagination: { el: ".swiper-pagination", clickable: true },
                    effect: "fade",
                    fadeEffect: { crossFade: true },
                });
            }
        });
    };
    
    runScript();
    
  }, []);

  return null;
}
