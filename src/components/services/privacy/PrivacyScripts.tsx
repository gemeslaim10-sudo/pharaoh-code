'use client';

import { useEffect } from 'react';

export default function PrivacyScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if jQuery and Swiper are loaded before running
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
            }, 1500); // متناسق مع نفس ميكانيكية التحميل الخاصة بالشركة
        });

        window.$(document).ready(function() {
            // تفعيل وإغلاق قائمة الموبايل التفاعلية بنقرة واحدة
            window.$('#open-menu, #close-menu, .m-link').click(function() {
                window.$('#mobile-nav').toggleClass('active');
            });
        });
    };
    
    runScript();
    
  }, []);

  return null;
}
