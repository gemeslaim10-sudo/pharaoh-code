'use client';

import { useEffect } from 'react';

export default function DesignScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Original Script injected
    
    // بريلودر التحميل
    window.$(window).on('load', function() {
        setTimeout(function() {
            window.$('#preloader').fadeOut(800, function() {
                window.$('body').css('overflow', 'auto');
            });
        }, 2500);
    });

    // تشغيل وإغلاق القائمة الجانبية للموبايل
    window.$(document).ready(function() {
        window.$('#open-menu, #close-menu, .m-link').click(function() {
            window.$('#mobile-nav').toggleClass('active');
        });
    });
    
  }, []);

  return null;
}
