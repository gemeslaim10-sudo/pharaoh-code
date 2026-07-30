'use client';

import { useEffect } from 'react';

export default function StartProjectScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if jQuery and Swiper are loaded before running
    const runScript = () => {
        if (!window.$) {
            setTimeout(runScript, 100);
            return;
        }
        
        // شاشة التحميل
        window.$(window).on('load', function() {
            setTimeout(function() {
                window.$('#preloader').fadeOut(800, function() {
                    window.$('body').css('overflow', 'auto');
                });
            }, 2000);
        });

        window.$(document).ready(function() {
            // منيو الموبايل
            window.$('#open-menu, #close-menu, .m-link').click(function() {
                window.$('#mobile-nav').toggleClass('active');
            });

            // فورم التواصل
            window.$('#contactForm').submit(function(this: Element, e) {
                e.preventDefault();
                console.warn('تم استلام بيانات مشروعك بنجاح! فريق Pharaoh Code سيتواصل معك قريباً.');
                (this as HTMLFormElement).reset();
            });
        });
    };
    
    runScript();
    
  }, []);

  return null;
}
