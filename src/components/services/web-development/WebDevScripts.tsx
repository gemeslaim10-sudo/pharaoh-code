'use client';

import { useEffect } from 'react';

export default function WebDevScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if jQuery and Swiper are loaded before running
    const runScript = () => {
        if (!window.$) {
            setTimeout(runScript, 100);
            return;
        }
        
        // بريلودر التحميل الخاص بك
        window.$(window).on('load', function() {
            setTimeout(function() {
                window.$('#preloader').fadeOut(800, function() {
                    window.$('body').css('overflow', 'auto');
                });
            }, 2500); // القيمة من ملفك
        });

        // تشغيل وإغلاق القائمة الجانبية للموبايل مثل ملفك بالظبط
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
